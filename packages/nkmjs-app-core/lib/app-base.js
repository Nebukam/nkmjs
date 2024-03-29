/**
 * Streamlined app kickstart constructor
 * - is provided with a few basic data from electron such as global paths
 * - attempts to load preferences
 *      - on fail : create preference file
 *      - on success : read preference file
 *          - load and deploy base kit dependencies
 * 
 * TODO : In electron, notify the main process when the URL is changing, so the app can be reloaded
 * in the state in was in, and re-open where things were left off.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const actions = require("@nkmjs/actions");
const io = require(`@nkmjs/io-core`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const data = require(`@nkmjs/data-core`);
const dialog = require(`@nkmjs/dialog`);
const documents = require(`@nkmjs/documents`);

const APP_MESSAGES = require(`./app-messages`);
const WindowStateHandler = require(`./window-state-handler`);
const UserPreferences = require(`./helpers/user-preferences`);
const GlobalOverlayHandler = require(`./global-overlay-handler`);
const AppBody = require(`./app-body`);
const UnsavedDocHandler = require(`./helpers/unsaved-doc-handler`);
const FileExtBinder = require(`./helpers/file-ext-binder`);
const AppSettings = require(`./app-settings`);
const SingleViewLayer = require(`./single-view-layer`);

const IDS = require(`./ids`);

/**
 * @typedef LayerDefinition
 * @property {function} cl Layer class constructor
 * @property {string} id Layer unique id. When created, will be assigned to this[id]
 * @property {function} [fn] Callback on layer creation (in order)
 * @property {function} [postFn] Callback on layer creation (in order, after )
 */

/*

    #1 - Create app instance
        -> App instance registers itself to environment
        -> App instance hook to environment readiness

    #2 - Set environment config (that will allow the app to bootstrap correctly)
        -> App is starting with a cleanly set environment

*/

const ID_APP_SETTINGS = `appSettings`;

class AppBase extends com.Observable {
    constructor() { super(); }

    static __loading_cssAnimationOut = `__loading__fadeOut`;
    static __singleViewLayer = SingleViewLayer;

    _Init() {

        super._Init();

        this.SIGNAL_MEM_MONITOR = Symbol(`memory-monitoring`);

        this._Bind(this._InternalDisplayReadyCheck);

        this._APPID = `${this.constructor.name}`;
        this._IOFlushFn = null;
        this._commands = new actions.CommandBox();

        this._userPreferences = com.Rent(UserPreferences);
        this._appSettingsType = AppSettings;

        this._defaultUserPreferences = {};

        this._appBodyClass = AppBody;
        this._appBody = null;

        this._layers = [];

        this._overlayHandlerClass = GlobalOverlayHandler;
        this._overlayHandler = null;

        this._unsavedDocHandler = new UnsavedDocHandler(this);
        
        "#if DEFINE_NODE";

        this._fileBindings = new FileExtBinder(this);

        this._ipcBindings = [
            { evt: APP_MESSAGES.NODE_MESSAGE, fn: this._Bind(this._onNodeMessage) },
            { evt: APP_MESSAGES.NODE_ERROR, fn: this._Bind(this._onNodeError) },
            { evt: APP_MESSAGES.NODE_WARNING, fn: this._Bind(this._onNodeWarning) },
            { evt: APP_MESSAGES.CONTEXT_MENU_COMMAND, fn: this._Bind(this._onContextMenuCommand) },
            { evt: APP_MESSAGES.DEEP_LINK, fn: this._Bind(this._onDeepLink) },
        ];

        "#endif";

        env.features.Watch(env.SIGNAL.COLORSCHEME_CHANGED, this._OnColorschemeChange, this);

        "#if PWA";

        env.ENV.Watch(env.SIGNAL.PWA_UPDATE_AVAILABLE, this._OnPWAUpdateAvailable, this);

        "#endif";

        this._loadingOverlay = document.getElementById(`__loading__`);
        if (this._loadingOverlay && env.ENV.ARGV.Has(`no-loading`)) {
            ui.dom.Detach(this._loadingOverlay);
        }

        if (window) {
            //window.onerror = (message, file, line, col, error) => { return this._OnWindowError(error); };
            //window.addEventListener("error", (e) => { return this._OnWindowError(e.error); });
        }

    }

    get state() { return WindowStateHandler; }

    _OnWindowError(p_err) {
        nkm.u.LOG._(`An error occured.`, `#ffffff`, `#ff0000`);
        console.error(p_err);
        return false;
    }

    /**
     * Called by constructor.
     */
    _PostInit() {
        super._PostInit();

        env.ENV.RegisterServices(
            ui.INPUT,
            actions.RELAY,
            io.RESOURCES,
            dialog.DIALOG
        );

        //TODO: Register WebSocket here

        if (!this._appBodyClass) { throw new Error(`No app body constructor defined.`); }

        if (!u.isInstanceOf(this._appBodyClass, AppBody)) {
            throw new Error(`App body constructor (${this._appBodyClass.name}) must extend AppBody.`);
        }

        if (env.features.isNodeEnabled) { this.__StartMonitoring(); }

        this._appSettings = com.Rent(this._appSettingsType);
        this._appSettings
            .Watch(IDS.AUTOSAVE, (p_data, p_newValue, p_oldValue) => {
                documents.ToggleAutoSave(p_newValue);
            })
            .Watch(IDS.AUTOSAVE_TIMER, (p_data, p_newValue, p_oldValue) => {
                documents.ToggleAutoSave(this._appSettings.Get(IDS.AUTOSAVE), p_newValue * 1000 * 60);
            });

    }

    __StartMonitoring() {
        setInterval(() => {
            nkm.env.features.GetMemory()
                .then(p_result => { this.Broadcast(this.SIGNAL_MEM_MONITOR, p_result) });
        }, 1000);
    }

    //#region Setup

    /**
     * @type {LayerContainer}
     */
    get body() { return this._appBody; }

    /**
     * Called once by the environment when the DOM
     * readyState >= interactive
     */
    SetUp() {

        u.LOG._(`${this._APPID} : SETUP`, `#339a6e`, `#212121`);

        this._RegisterIPCBindings();

        this._appBody = ui.UI.Rent(this._appBodyClass);
        this._appBody.setAttribute(`id`, `app`);

        if (!this._layers || !this._layers.length) { this._layers = [{ id: `_mainLayer`, cl: this.constructor.__singleViewLayer }]; }
        this._layers.push({ id: `_overlayHandler`, cl: this._overlayHandlerClass });

        this._appBody.BuildLayers(this, this._layers);

    }

    _RegisterDocDefinition(p_fileInfos, p_documentInfos, p_defaultEditor = null) {
        return this._fileBindings.AddDefinition(
            p_fileInfos,
            p_documentInfos,
            p_defaultEditor
        );
    }

    "#if PWA";

    _OnPWAUpdateAvailable() {

        let msg = ``;
        if (env.displayMode != env.ENV_DISPLAY.STANDALONE) { msg = `An update is available, please refresh the page to apply it.`; }
        else { msg = `An update is available, please close & re-open the app to apply it.`; }

        dialog.DIALOG.Push({
            title: `Update available`,
            message: msg,
            actions: [
                { label: `Ok`, flavor: ui.FLAGS.CTA }
            ],
            origin: this
        });

    }

    "#endif";

    //#endregion

    //#region Start

    /**
     * Called by once the environment when the DOM
     * readyState === complete, after SetUp has been called.
     */
    _InternalStart() {
        if (env.ENV.ARGV.Has(`no-start`)) { return; }
        this.Start();
        //setTimeout(this._Bind(this.Start), 1000);
    }

    Start() {

        u.LOG._(`⏵${this._APPID}`, `#339a6e`, `#212121`);

        this._userPreferences.Load(
            `${this._APPID}Preferences`,
            this._defaultUserPreferences,
            this._Bind(this._InternalInitUserPreferences),
            this._Bind(this._OnAppReadyInternal)
        );

    }

    //#endregion

    //#region Preferences

    /**
     * @type {data.Metadata}
     */
    get userPreferences() { return this._userPreferences; }

    /**
     * @type {AppSettings}
     */
    get appSettings() { return this._appSettings; }

    _InternalInitUserPreferences(p_userPreferences) {
        this._InitUserPreferences(p_userPreferences);

        let existingSerial = p_userPreferences.Get(ID_APP_SETTINGS);
        if (existingSerial) { nkm.data.s11n.JSONSerializer.Deserialize(existingSerial, this._appSettings) }

        let json = nkm.data.s11n.JSONSerializer.Serialize(this._appSettings);
        p_userPreferences.Set(ID_APP_SETTINGS, json);
    }

    _InitUserPreferences(p_userPreferences) { }

    _OnAppSettingsUpdated(p_data) {
        let json = nkm.data.s11n.JSONSerializer.Serialize(this._appSettings);
        this._userPreferences.Set(ID_APP_SETTINGS, json);
    }

    _OnAppReadyInternal(p_prefsData) {
        // Update app settings and then watch them
        nkm.data.s11n.JSONSerializer.Deserialize(p_prefsData.Get(ID_APP_SETTINGS), this._appSettings);
        console.log(p_prefsData);
        this._appSettings.Watch(com.SIGNAL.UPDATED, this._OnAppSettingsUpdated, this);

        p_prefsData.Watch(com.SIGNAL.UPDATED, this._OnPrefsUpdated, this);
        actions.RELAY.Watch(actions.REQUEST.EDIT, this._OnEditRequest, this);

        // Load base kits... ?
        //this._LoadBaseKits();

        if (env.isNodeEnabled) {
            if (false) {//Check if auto-updates are enabled
                dialog.DIALOG.Push({ dialogClass: dialog.AutoUpdateDialogBox });
            }
        }

        u.LOG._(`${this._APPID} : READY`, `#030107`, `#339a6e`);

        this.AppReady();

        // Process file editing requests
        let argvs = [];
        for (let n in nkm.env.ARGV) { argvs.push(n); }
        this._fileBindings.Process(...argvs);

        this._InternalDisplayReadyCheck();

    }

    _OnPrefsUpdated(p_data) {

    }

    //#endregion

    AppReady() { }

    /**
     * Checks if the app is ready to be displayed to the user
     * and call AppDisplay as soon as _IsReadyForDisplay returns true.
     */
    _InternalDisplayReadyCheck() {
        if (!this._IsReadyForDisplay()) {
            com.WatchNextTick(this._InternalDisplayReadyCheck);
        } else {

            if (this._loadingOverlay) {

                this.AppDisplay();

                // Push the app wrapper to the DOM
                ui.dom.Attach(this._appBody, document.body);

                this._loadingOverlay.addEventListener(`animationend`, (p_evt) => {
                    ui.dom.Detach(p_evt.target);
                });

                let delay = `250ms`,
                    duration = `250ms`,
                    transition = `cubic-bezier(0.885, 0.025, 0.960, 0.030)`,
                    name = this.constructor.__loading_cssAnimationOut;

                this._loadingOverlay.style.animation = `${name} ${delay} ${duration} ${transition}`;

                if (this._mainLayer) {
                    if (this._mainCatalog) { this._mainLayer.catalog = this._mainCatalog; }
                    this._mainLayer._OnWindowViewChanged();
                }

            }

        }
    }

    /**
     * Return true by default. This is where you can test for server readyness and things like that.
     * @returns true if the app is ready for display, false otherwise
     */
    _IsReadyForDisplay() { return true; }

    AppDisplay() { }

    _HandleDialogRequest(p_request) { this._overlayHandler.HandleOverlayRequest(p_request); }

    _OnEditRequest(p_request) {

    }

    //#region ENV Watch

    _OnColorschemeChange() {

    }

    //#endregion

    //#region Electron & Node

    "#if DEFINE_NODE";

    _RegisterIPCBindings() {

        let binding;

        for (let i = 0, n = this._ipcBindings.length; i < n; i++) {
            binding = this._ipcBindings[i];
            actions.RELAY.ipcOn(binding.evt, binding.fn);
        }

    }

    _OnExternalCloseRequest() {
        if (this._IsReadyToQuit()) {

            //Flush temp resources
            if (nkm.env.features._IOFlushFn) { nkm.env.features._IOFlushFn(); }

            this.CloseWindow();
        }
    }

    _IsReadyToQuit() {
        if (this._unsavedDocHandler.CanClose()) {
            return true;
        } else {
            this._unsavedDocHandler.Advance();
            return false;
        }
    }

    _OnOpenPathRequest(p_path) {

    }

    ReloadApp() { actions.RELAY.ipcSend(APP_MESSAGES.DO_RELOAD_APP); }

    /**
     * 
     * @param {*} p_options Window options
     * @param {string} p_options.id window ID, used to check whether the window exist already
     * @param {string} p_options.pathname path to window content (html file or html string)
     * @param {number} p_options.width window width
     * @param {number} p_options.height window height
     * @param {number} p_options.minWidth window min width
     * @param {number} p_options.minHeight window min height
     * @param {boolean} p_options.frame 
     * @param {boolean} p_options.show 
     * @param {string} p_options.icon 
     * @param {string} p_options.backgroundColor 
     */
    OpenWindow(p_options) { actions.RELAY.ipcSend(APP_MESSAGES.DO_OPEN_WINDOW, p_options); }

    /**
     * 
     * @param {*} p_options 
     * @param {string} p_options.id
     */
    CloseWindow(p_options) { actions.RELAY.ipcSend(APP_MESSAGES.DO_CLOSE_WINDOW, p_options); }

    Print(p_options) { actions.RELAY.ipcSend(APP_MESSAGES.DO_PRINT_WINDOW, p_options); }

    LoadAndPrint(p_options) { actions.RELAY.ipcSend(APP_MESSAGES.DO_OPEN_AND_PRINT_WINDOW, p_options); }

    _onNodeError(p_evt, p_content) {
        console.error(p_content.error);
        dialog.DIALOG.Push({
            [com.IDS.TITLE]: p_content.message,
            [com.IDS.ICON]: `error`,
            [com.IDS.MESSAGE]: `${p_content.error.message}`,
            actions: [
                { text: `Close` },
            ]
        });
    }

    _onNodeWarning(p_evt, p_content) {
        console.warning(p_content.message);
        dialog.DIALOG.Push({
            [com.IDS.TITLE]: `Attention !`,
            [com.IDS.ICON]: `warning`,
            [com.IDS.MESSAGE]: `${p_content.message}`,
            actions: [
                { text: `Close` },
            ]
        });
    }

    _onNodeMessage(p_evt, p_content) {
        console.log(p_content.message);
    }

    _onContextMenuCommand(p_evt, p_command) {

    }

    _onDeepLink(p_evt, p_content) {
        console.log(`DEEP LINK : '${p_content}'`, p_content);
    }

    "#endif";

    //#endregion

}

module.exports = AppBase;