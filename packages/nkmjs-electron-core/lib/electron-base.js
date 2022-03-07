const { app, autoUpdater, ipcMain, BrowserWindow, Menu, MenuItem, globalShortcut, dialog } = require(`electron`);

const path = require(`path`);
const url = require(`url`);
const fs = require(`fs`);

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const APP_MESSAGES = require(`@nkmjs/app-core/lib/app-messages`);
const WINDOWS = require(`./windows`);

let DEV_MODE = true;

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof electron.core
 */
class ElectronBase {

    /**
     * @description TODO
     * @param {object} p_constants 
     * @param {array} p_constants.argv 
     * @param {string} p_constants.dirname execution directory
     * @param {string} p_constants.html landing html page for the main app window (can also be an html string)
     * @param {string} p_constants.theme default style theme
     * @param {object} p_constants.winOptions main window options, see https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
     * @param {string} p_constants.renderer path to the app to boot into the html page
     * @param {string} p_constants.autoUpdateFeed autoupdate feed url, to be used with Hazel
     */
    constructor(p_constants) {

        if (!p_constants) { throw new Error(`Undefined app constants.`); }

        this._constants = p_constants;

        this._mainWindow = null;

        //DEV_MODE = process.argv.includes('dev');

        this._dirname = (p_constants.dirname || __dirname);
        this._appindex = (p_constants.html || "");

        if (!p_constants.renderer) { this._rendererDeclaration = ``; }
        else { this._rendererDeclaration = `,renderer:require('${p_constants.renderer}')` }

        this._autoUpdateFeed = (p_constants.autoUpdateFeed || "");
        this._bootWinOptions = p_constants.winOptions ? p_constants.winOptions : {};

        console.log(`dirName:[${this._dirname}] / appIndex:[${this._appindex}]`);

        this._Bind(this._Boot);
        this._Bind(this._CreateMainWindow);
        this._Bind(this._OnMainWindowClosed);
        this._Bind(this._OnRequestReload);
        this._Bind(this._SendError);
        this._Bind(this._SendWarning);
        this._Bind(this._SendMessage);
        this._Bind(this._OnRequestDialog);
        this._Bind(this._RequestDialogResponse);

        this._windows = new collections.List();
        this._windowsMap = new collections.Dictionary();
        this._windowsIDMap = new collections.Dictionary();

        ipcMain.on(APP_MESSAGES.AU_CHECK_REQUEST, this._Bind(this._OnRequestCheckForUpdates));


        //app.commandLine.appendSwitch('js-flags', '--max-old-space-size=4096'); //Increase available memory
        app.allowRendererProcessReuse = false;

        // Run createWindow when app is ready
        app.on(`ready`, this._CreateMainWindow);

        //Quit when all window are closed (mac OS only)
        app.on(`window-all-closed`, () => {
            if (process.platform !== `darwin`) {
                app.quit();
            }
        });

        ipcMain.on(APP_MESSAGES.DO_RELOAD_APP, this._OnRequestReload);
        ipcMain.on(APP_MESSAGES.OPEN_DIALOG, this._OnRequestDialog)

    }

    /**
     * @access protected
     * @description Bind the given function to this object and returns it.
     * Note that it replaces the function reference, hence referencing function before they are being bound in `_Init`,
     * ( i.e in the constructor ) will target an obsolete function.
     * @param {*} p_func 
     * @group Utils
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    /**
     * @description TODO
     * @type {BrowserWindow}
     */
    get mainWindow() { return this._mainWindow; }

    _CreateMainWindow() {

        // Create main window
        console.log(`Create main window`);

        let winOptions = {
            id: WINDOWS.ID_MAIN,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                experimentalFeatures: true,
                webSecurity: false,
                enableRemoteModule: true
            },
            width: 1920,
            height: 1080,
            minWidth: 1280,
            minHeight: 720,
            frame: true,
            icon: path.join(this._dirname, `./app-icon.png`),

            pathname: path.join(this._dirname, this._appindex),
            protocol: `file:`,
            slashes: true,
            onDomReady: this._Boot
        }

        for (let name in this._bootWinOptions) { winOptions[name] = this._bootWinOptions[name]; }

        this._mainWindow = WINDOWS.instance.CreateWindow(winOptions).window;

        // Open devtools
        if (DEV_MODE) { this._mainWindow.webContents.openDevTools(); }
        else { this._mainWindow.setMenu(null); }

        // Clean up mainWindow when closed
        this._mainWindow.on(`closed`, this._OnMainWindowClosed);

        //***//

        if (DEV_MODE) {
            globalShortcut.register(`f5`, this._OnRequestReload);
            globalShortcut.register(`CommandOrControl+R`, this._OnRequestReload);
        }


        // this._Boot();        

    }

    /**
     * @access protected
     * @description TODO
     */
    _Boot() {

        console.log(`Boot app`);

        // Compute style path
        let stylePath = this._constants.style ? this._constants.style : `style`;

        this._mainWindow.webContents.executeJavaScript(`
            let nkmjs = require('@nkmjs/core'),
                nkmElectron = require('@nkmjs/core/electron');
            let LOG = nkmjs.utils.LOG;
            LOG.toggle(true);

            let ENV = nkmjs.env.ENV;
            ENV.instance.features._isNodeEnabled = true;
            ENV.instance.DEV_MODE = ${DEV_MODE};

            let IOElectron = nkmElectron.io.IOElectron;
            (new IOElectron()).Deploy(nkmjs);

            let IPCElectron = nkmElectron.core.IPCElectron;
            (new IPCElectron()).Deploy(nkmjs);

            ENV.instance.Start({
                paths:{
                    exe:'${u.tils.FixSlash(app.getPath('exe'))}',
                    '${u.PATH.APP}':'${u.tils.FixSlash(app.getAppPath())}',
                    '${u.PATH.HOME}':'${u.tils.FixSlash(app.getPath('home'))}',
                    '${u.PATH.APP_DATA}':'${u.tils.FixSlash(app.getPath('appData'))}',
                    '${u.PATH.USER_DATA}':'${u.tils.FixSlash(app.getPath('userData'))}',
                    '${u.PATH.TEMP}':'${u.tils.FixSlash(app.getPath('temp'))}',
                    '${u.PATH.DESKTOP}':'${u.tils.FixSlash(app.getPath('desktop'))}',
                    '${u.PATH.DOCUMENTS}':'${u.tils.FixSlash(app.getPath('documents'))}',
                    '${u.PATH.DOWNLOADS}':'${u.tils.FixSlash(app.getPath('downloads'))}',
                    '${u.PATH.MUSIC}':'${u.tils.FixSlash(app.getPath('music'))}',
                    '${u.PATH.PICTURES}':'${u.tils.FixSlash(app.getPath('pictures'))}',
                    '${u.PATH.VIDEOS}':'${u.tils.FixSlash(app.getPath('videos'))}',
                    '${u.PATH.LOGS}':'${u.tils.FixSlash(app.getPath('logs'))}',
                    '${u.PATH.STYLE}':'${stylePath}'
                },
                argv:${JSON.stringify(process.argv)},
                theme:'${(this._constants.theme || 'default')}'
                ${this._rendererDeclaration}
            });            
        `);


    }


    _OnRequestReload() {
        console.log(`RELOAD_REQUEST`);
        this._mainWindow.reload();
        this._mainWindow.webContents.session.clearCache();
    }


    // ----> Auto update handling

    _OnRequestCheckForUpdates(p_event, p_arg) {

        console.log(`_OnRequestCheckForUpdates`);

        if (u.tils.Empty(this._autoUpdateFeed)) {
            console.log(`   => No server.`);
            this._mainWindow.webContents.send(APP_MESSAGES.AU_CHECK_REQUEST_HANDLED, APP_MESSAGES.AU_NO_SERVER);
        } else {

            autoUpdater.setFeedURL(this._autoUpdateFeed);

            autoUpdater.on('error', this._Bind(this._OnAUError));
            autoUpdater.on('checking-for-update', this._Bind(this._OnAUCheckingForUpdate));

            this._mainWindow.webContents.send(APP_MESSAGES.AU_CHECK_REQUEST_HANDLED);

            console.log(`   => check for updates requested.`);
            autoUpdater.checkForUpdates();

        }
    }

    _OnAUError(p_err) {
        console.log(`   => error checking for updates : ${p_err.message}`);
        this._mainWindow.webContents.send(APP_MESSAGES.ERROR, p_err.message);
    }

    //Emitted when checking if an update has started.
    _OnAUCheckingForUpdate() {
        console.log(`   => checking for updates`);
        this._mainWindow.webContents.send(APP_MESSAGES.AU_CHECKING_FOR_UPDATE);
        autoUpdater.on('update-available', this._Bind(this._OnAUUpdateAvailable));
        autoUpdater.on('update-not-available', this._Bind(this._OnAUUpdateNotAvailable));
    }

    //Emitted when there is an available update. 
    //The update is downloaded automatically.
    _OnAUUpdateAvailable() {
        console.log(`   => update available`);
        this._mainWindow.webContents.send(APP_MESSAGES.AU_UPDATE_AVAILABLE);
        autoUpdater.on('update-downloaded', this._Bind(this._OnAUUpdateDownloaded));
    }

    //Emitted when there is no available update.
    _OnAUUpdateNotAvailable() {
        console.log(`   => update not available`);
        this._mainWindow.webContents.send(APP_MESSAGES.AU_UPDATE_NOT_AVAILABLE);
    }

    //Emitted when an update has been downloaded.
    _OnAUUpdateDownloaded(p_event, p_releaseNotes, p_releaseName, p_releaseDate, p_updateURL) {
        console.log(`   => update downloaded`);
        //TODO : Ask user if he wants to quit and update
        this._mainWindow.webContents.send(APP_MESSAGES.AU_UPDATE_DOWNLOADED);
        //autoUpdater.on('before-quit-for-update', this._Bind(this._OnAUUpdateDownloaded));
    }

    // ----> Misc callbacks

    _SendError(p_error, p_message = `An error occured`) {
        let p_content = { error: p_error, message: p_message };
        this._mainWindow.webContents.send(APP_MESSAGES.ERROR, p_content);
    }
    _SendWarning(p_content) { this._mainWindow.webContents.send(APP_MESSAGES.WARNING, p_content); }
    _SendMessage(p_content) { this._mainWindow.webContents.send(APP_MESSAGES.MESSAGE, p_content); }


    // ----> Dialog callbacks

    _OnRequestDialog(p_evt, p_options){
        dialog.showOpenDialog(p_options).then(this._RequestDialogResponse);
    }

    _RequestDialogResponse(response){
        this._mainWindow.webContents.send(APP_MESSAGES.DIALOG_RESPONSE, response);
    }

    // ----> Exit

    _OnMainWindowClosed() {
        this._mainWindow = null;
        for (let i = 0, n = this._windows.count; i < n; i++) {
            this._windows.At(0).close();
        }
    }

}

module.exports = ElectronBase;