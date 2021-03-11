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

const { U, UDOM, PATH, LOG } = require(`@nkmjs/utils`);
const { SIGNAL, TIME, SingletonEx, POOL, COM_ID } = require(`@nkmjs/common`);
const { ENV, ENV_SIGNAL } = require(`@nkmjs/environment`);
const { ACTION_REQUEST, RELAY, CommandBox } = require(`@nkmjs/actions`);
const { RESOURCES } = require(`@nkmjs/io-core`);
const { STYLE } = require(`@nkmjs/style`);
const { UI, OverlayHandler, LayerContainer } = require(`@nkmjs/ui-core`);
const { Metadata } = require(`@nkmjs/data-core`);
const { DIALOG, DialogHandler, AutoUpdateDialogBox } = require(`@nkmjs/dialog`)

const APP_MESSAGES = require(`./app-messages`);
const UserPreferences = require(`./helpers/user-preferences`);


/*

    #1 - Create app instance
        -> App instance registers itself to environment
        -> App instance hook to environment readiness

    #2 - Set environment config (that will allow the app to bootstrap correctly)
        -> App is starting with a cleanly set environment

*/

class AppBase extends SingletonEx {

    constructor() { super(); }

    static __loading_cssAnimationOut = `__loading__fadeOut`;

    _Init() {

        super._Init();

        this._APPID = `${this.constructor.name}`;

        this._darkPaletteBuilder = null;
        this._lightPaletteBuilder = null;

        this._userPreferences = POOL.Rent(UserPreferences);
        this._defaultUserPreferences = {};

        this._mainWrapperClass = LayerContainer;
        this._mainWrapper = null;

        this._layers = null;

        this._overlayHandlerClass = DialogHandler;
        this._overlayHandler = null;

        this._commands = new CommandBox();

        this._ipcBindings = [
            { evt: APP_MESSAGES.NODE_MESSAGE, fn: this._Bind(this._onNodeMessage) },
            { evt: APP_MESSAGES.NODE_ERROR, fn: this._Bind(this._onNodeError) },
            { evt: APP_MESSAGES.NODE_WARNING, fn: this._Bind(this._onNodeWarning) },
        ];


        ENV.FEATURES.Watch(ENV_SIGNAL.COLORSCHEME_CHANGED, this._OnColorschemeChange, this);

        let loadingDiv = document.getElementById(`__loading__`);
        if(loadingDiv && ENV.ARGV.Has(`no-loading`)){
            UDOM.Detach(loadingDiv);
        }

    }

    /**
     * Called by constructor.
     */
    _PostInit() {
        super._PostInit();

        ENV.instance.RegisterServices(
            RELAY,
            RESOURCES,
            DIALOG
        );

        if (!this._mainWrapperClass) {
            throw new Error(`No app wrapper constructor defined.`);
        }

        if (!U.isInstanceOf(this._mainWrapperClass, LayerContainer)) {
            throw new Error(`App wrapper constructor (${this._mainWrapperClass.name}) must implement LayerContainer.`);
        }

    }

    /**
     * @type {LayerContainer}
     */
    get mainWrapper() { return this._mainWrapper; }

    /**
     * @type {Metadata}
     */
    get userPreferences() { return this._userPreferences; }

    /**
     * Called once by the environment when the DOM
     * readyState >= interactive
     */
    SetUp() {

        LOG._(`${this._APPID} : SETUP`, `#339a6e`, `#212121`);

        if (ENV.FEATURES.isNodeEnabled) { this._RegisterIPCBindings(); }

        // ----> At that point, the Service Manager has started.
        // Initialize and start critical services.

        // TODO : Move what's below AFTER App Start.

        STYLE.instance.defaultPalette._themeId = (ENV.instance.config.theme || `default`);

        this._mainWrapper = UI.Rent(this._mainWrapperClass);
        this._mainWrapper.setAttribute(`id`, `app`);

        // Insert main.css in ShadowDom so all subsequent elements benefit from it
        UDOM.AttachFirst(
            UDOM.New(`link`, { href: STYLE.instance.current.GetCSSLink(`@/main.css`), rel: `stylesheet` })
            , this._mainWrapper._host);

        if (this._layers) {
            for (let i = 0, n = this._layers.length; i < n; i++) {
                let conf = this._layers[i],
                    layer = this._mainWrapper.Add(conf.cl);
                if (conf.id) { this[conf.id] = layer; }
            }
        }

        this._overlayHandler = this._mainWrapper.Add(this._overlayHandlerClass);

    }

    _RegisterIPCBindings() {
        let binding;
        for (let i = 0, n = this._ipcBindings.length; i < n; i++) {
            binding = this._ipcBindings[i];
            RELAY.ipcOn(binding.evt, binding.fn);
        }
    }

    /**
     * Called by once the environment when the DOM
     * readyState === complete, after SetUp has been called.
     */
    _InternalStart(){
        if(ENV.ARGV.Has(`no-start`)){ return; }
        setTimeout(this._Bind(this.Start), 1000);
    }

    Start() {

        LOG._(`${this._APPID} : START`, `#339a6e`, `#212121`);

        // Push the app wrapper to the DOM
        UDOM.New(`link`, { href: STYLE.instance.current.GetCSSLink(`@/main.css`), rel: `stylesheet` }, document.head);
        UDOM.Attach(this._mainWrapper, document.body);

        this._userPreferences.Load(
            `${this._APPID}Preferences`,
            this._defaultUserPreferences,
            this._Bind(this._InitUserPreferences),
            this._Bind(this._OnAppReadyInternal)
        );

    }

    _InitUserPreferences(p_userPreferences) { }

    _OnAppReadyInternal(p_data) {

        RELAY.instance.Watch(ACTION_REQUEST.EDIT, this._OnEditRequest, this);

        // Load base kits... ?
        //this._LoadBaseKits();

        if (ENV.FEATURES.isNodeEnabled) {
            if (false) {//Check if auto-updates are enabled
                DIALOG.Push({ dialogClass: AutoUpdateDialogBox });
            }
        }

        this.AppReady();

        LOG._(`${this._APPID} : READY`, `#030107`, `#339a6e`);

        // Loading container

        let loadingDiv = document.getElementById(`__loading__`);
        if(loadingDiv){ 
            loadingDiv.addEventListener(`animationend`, (p_evt) =>{
                UDOM.Detach(p_evt.target);
            });
            loadingDiv.style.animation = `${this.constructor.__loading_cssAnimationOut} 150ms 500ms ease-in`;
        }

    }

    AppReady(p_data) {



    }

    _HandleDialogRequest(p_request) {
        this._overlayHandler.HandleOverlayRequest(p_request);
    }

    _OnEditRequest(p_request) {

    }

    // ---->

    _OnColorschemeChange() {

    }


    // ---->

    ReloadApp() { RELAY.ipcSend(APP_MESSAGES.DO_RELOAD_APP); }

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
    OpenWindow(p_options) { RELAY.ipcSend(APP_MESSAGES.DO_OPEN_WINDOW, p_options); }

    /**
     * 
     * @param {*} p_options 
     * @param {string} p_options.id
     */
    CloseWindow(p_options) { RELAY.ipcSend(APP_MESSAGES.DO_CLOSE_WINDOW, p_options); }

    Print(p_options) { RELAY.ipcSend(APP_MESSAGES.DO_PRINT_WINDOW, p_options); }

    LoadAndPrint(p_options) { RELAY.ipcSend(APP_MESSAGES.DO_OPEN_AND_PRINT_WINDOW, p_options); }

    // ----> ELECTRON Message handling (error/warning/messages)

    _onNodeError(p_evt, p_content) {
        console.error(p_content.error);
        DIALOG.Push({
            [COM_ID.TITLE]: p_content.message,
            [COM_ID.ICON]: `% ICON % /icon_error.svg`,
            [COM_ID.MESSAGE]: `${p_content.error.message}`,
            actions: [
                { text: `Close` },
            ]
        });
    }

    _onNodeWarning(p_evt, p_content) {
        console.warning(p_content.message);
        DIALOG.Push({
            [COM_ID.TITLE]: `Attention !`,
            [COM_ID.ICON]: `%ICON%/icon_warning.svg`,
            [COM_ID.MESSAGE]: `${p_content.message}`,
            actions: [
                { text: `Close` },
            ]
        });
    }

    _onNodeMessage(p_evt, p_content) {
        console.log(p_content.message);
    }

}

module.exports = AppBase;