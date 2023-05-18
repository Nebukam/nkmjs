const { app, ipcMain, BrowserWindow, Menu, MenuItem, globalShortcut, remote } = require(`electron`);
const path = require(`path`);
const url = require(`url`);
const fs = require(`fs`);

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);
const APP_MESSAGES = require(`@nkmjs/app-core/lib/app-messages`);

const WindowWrapper = require(`./helpers/window-wrapper`);

let DEV_MODE = false;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof electron.core
 */
class WINDOWS extends com.Observable {// PORT_TO_MODULE

    constructor() { super(); }

    get ID_MAIN() { return '__MAIN'; }
    get mainWindow() { return this._mainWindow; }

    _Init() {

        super._Init();

        this._windows = new collections.List();
        this._mapIDToWrapper = new collections.Dictionary();
        this._mapWindowToID = new collections.Dictionary();

        DEV_MODE = process.argv.includes('--dev') || process.argv.includes('-dev') || process.argv.includes('dev');

        this._mainWindow = null;
        this._closingSet = new Set();

        this._Bind(this._OnWindowClosed);
        this._Bind(this._OnWindowClosing)

        this._Bind(this._OnRequestWindowOpen);
        this._Bind(this._OnRequestedWindowReady);
        this._Bind(this._OnRequestWindowClose);
        this._Bind(this._OnRequestWindowReload);
        this._Bind(this._OnRequestWindowPrint);
        this._Bind(this._OnRequestWindowPrintHandleCallback);
        this._Bind(this._OnRequestWindowAndPrint);
        this._Bind(this._OnRequestedWindowReady);
        this._Bind(this._DelayedPrintCall);
        this._Bind(this._OnContextMenuShow);

        ipcMain.on(APP_MESSAGES.DO_OPEN_WINDOW, this._OnRequestWindowOpen);
        ipcMain.on(APP_MESSAGES.DO_CLOSE_WINDOW, this._OnRequestWindowClose);
        ipcMain.on(APP_MESSAGES.DO_RELOAD_WINDOW, this._OnRequestWindowReload);

        ipcMain.on(APP_MESSAGES.DO_PRINT_WINDOW, this._OnRequestWindowPrint);
        ipcMain.on(APP_MESSAGES.DO_OPEN_AND_PRINT_WINDOW, this._OnRequestWindowAndPrint);
        ipcMain.on(APP_MESSAGES.CONTEXT_MENU_SHOW, this._OnContextMenuShow);

    }



    /**
     * @description TODO
     * @param {object} p_options window options, see https://www.electronjs.org/docs/api/browser-window#new-browserwindowoptions
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
     * @param {function} p_options.onDomReady attach the window onDomReady event to this callback
     * @param {BrowserWindow} p_parent attach the window onDomReady event to this callback
     * @returns {WindowWrapper}
     */
    CreateWindow(p_options, p_parent = null) {

        let winID = p_options.id || `unidentified_window`,
            wrapper = this._mapIDToWrapper.Get(winID);

        console.log(`WINDOWS >> CreateWindow ${winID}`);

        if (!wrapper) {

            let webPreferences = p_options.webPreferences || {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                experimentalFeatures: true,
                webSecurity: false
            },
                winOptions = {
                    webPreferences: webPreferences,
                    //width: 1920,
                    //height: 1080,
                    //minWidth: 1280,
                    //minHeight: 720,
                    frame: true,
                    show: true,
                    backgroundColor: '#2b2b2b',
                    icon: path.join(__dirname, `./app-icon.png`)
                }

            if (!p_parent) { p_parent = this._mainWindow; }
            if (p_parent) { winOptions.parent = p_parent; }

            for (let name in p_options) { winOptions[name] = p_options[name]; }

            if (winOptions.show) {
                winOptions.show = false;
                winOptions.delayShow = true;
            }

            let newWindow = new BrowserWindow(winOptions);
            newWindow.removeMenu();

            if (winOptions.id === WINDOWS.ID_MAIN) { this._mainWindow = newWindow; }

            wrapper = com.Rent(WindowWrapper);
            wrapper.initOptions = winOptions;
            wrapper.window = newWindow;

            this._windows.Add(newWindow);
            this._mapIDToWrapper.Set(winID, wrapper);
            this._mapWindowToID.Set(newWindow, winID);

            // Clean up mainWindow when closed
            newWindow.on(`close`, this._OnWindowClosing);
            newWindow.on(`closed`, this._OnWindowClosed);

            console.log(`[+] ${winOptions.id}`);

        }

        if (`pathname` in p_options) {
            let ppath = p_options.pathname;
            console.log(`will load path : ${ppath}`);

            let loadOptions = {
                pathname: ppath,
                protocol: p_options.protocol || `file:`,
                slashes: 'slashes' in p_options ? p_options.slashes : true
            }

            if (p_options.ipcOn) {
                for (let o in p_options.ipcOn) {
                    console.log(`on:${o}`);
                    wrapper.window.webContents.on(o, p_options.ipcOn[o]);
                }
            }

            if (p_options.ipcOnce) {
                for (let o in p_options.ipcOnce) {
                    console.log(`once:${o}`);
                    wrapper.window.webContents.once(o, p_options.ipcOnce[o]);
                }
            }

            if (p_options.onDomReady) {
                wrapper.window.webContents.once(`did-finish-load`, p_options.onDomReady);  //did-frame-finish-load
            }

            // Load index.html into main window
            wrapper.window.loadURL(url.format(loadOptions));
        }

        if (('show' in p_options ? p_options.show : true)) { wrapper.window.show(); }

        return wrapper;

    }

    /**
     * @description TODO
     * @param {string} p_id 
     */
    CloseWindow(p_id) {
        let wrapper = this._mapIDToWrapper.Get(p_id);
        if (wrapper) {
            this._closingSet.add(wrapper.window);
            wrapper.window.close();
        }
    }

    _OnWindowClosing(p_evt) {
        let win = p_evt.sender;
        if (this._closingSet.has(win)) { this._closingSet.delete(win); }
        else {
            p_evt.preventDefault();
            win.webContents.send(APP_MESSAGES.EXT_CLOSE_WINDOW);
        }
    }

    _OnWindowClosed(p_evt) {

        let p_win = p_evt.sender,
            winID = this._mapWindowToID.Get(p_win),
            wrapper = this._mapIDToWrapper.Get(winID);

        this._windows.Remove(p_win);

        wrapper.Release();

        this._mapIDToWrapper.Remove(winID);
        this._mapWindowToID.Remove(p_win);

        console.log(`[x] ${winID}`);

    }

    // ----> Messages handling

    /**
     * @access private
     * @param {*} p_evt 
     * @param {*} p_data 
     */
    _OnRequestWindowOpen(p_evt, p_data) {

        p_data.onDomReady = this._OnRequestedWindowReady;

        let originID = this._mapWindowToID(p_evt.sender),
            originWrapper = this._mapIDToWrapper.Get(originID),
            newWrapper = this.CreateWindow(p_data);

    }

    _OnRequestedWindowReady(p_evt) {
        let winID = this._mapWindowToID(p_evt.sender);

        //originator.webContent.send "yey your window is ready"
    }

    /**
     * @access private
     * @param {*} p_evt 
     * @param {*} p_data 
     */
    _OnRequestWindowClose(p_evt, p_data) {
        let win = BrowserWindow.fromWebContents(p_evt.sender);

        if (p_data) {
            this.CloseWindow(p_data.id);
        } else {
            this._closingSet.add(win);
            win.close();
        }
    }

    /**
     * @access private
     * @param {*} p_evt 
     * @param {*} p_data 
     */
    _OnRequestWindowReload(p_evt, p_data) {
        let wrapper = this._mapIDToWrapper.Get(p_data.id);
        //if (wrapper) { wrapper.window.webContents }
    }

    /**
     * @access private
     * @param {*} p_evt 
     * @param {*} p_data 
     */
    _OnRequestWindowAndPrint(p_evt, p_data) {
        p_data.onDomReady = this._OnRequestedWindowReady;
        let win = this.CreateWindow(p_data);
        p_data.window = win;
        this._printData = p_data;
    }

    /**
     * @access private
     * @param {*} p_evt 
     */
    _OnRequestedWindowReady(p_evt) {
        p_evt.sender.removeListener(`did-frame-finish-load`, this._OnRequestedWindowReady);
        setTimeout(this._DelayedPrintCall, 500);
    }

    /**
     * @access private
     */
    _DelayedPrintCall() {
        this._OnRequestWindowPrint(null, this._printData);
    }

    // ----> Printing

    _OnRequestWindowPrint(p_evt, p_data) {

        //TODO : MAke this a promise instead of a direct callback

        let wrapper = this._mapIDToWrapper.Get(p_data.id);

        if (!wrapper) { return; }

        const pdfPath = p_data.outputPath || path.join(__dirname, '/print.pdf');
        wrapper.window.webContents.printToPDF(
            {
                marginsType: 'marginsType' in p_data ? p_data.marginsType : 1,
                pageSize: p_data.pageSize || Letter,
                printBackground: `printBackground` in p_data ? p_data.printBackground : true,
                printSelectionOnly: `printSelectionOnly` in p_data ? p_data.printSelectionOnly : false,
                landscape: `landscape` in p_data ? p_data.landscape : false
            },
            function (error, data) {
                if (error) { this._SendError(error); return; }
                fs.writeFile(pdfPath, data, function (error) {
                    if (error) { throw error }
                });
            });

    }

    _OnRequestWindowPrintHandleCallback(error, data) {
        if (error) { this._SendError(error); return; }
        fs.writeFile(pdfPath, data, function (error) {
            if (error) { this._SendError(error); }
        });
    }

    /**
     * Expects object format :
     * { x:, y:, items:[ { ... }, { ... } ] }
     * @param {*} p_evt 
     * @param {object} p_data 
     */
    _OnContextMenuShow(p_evt, p_data) {

        //https://www.electronjs.org/docs/latest/api/menu#render-process

        let itemList = [];

        if (DEV_MODE) { //Show inspect
            itemList.push(
                {
                    label: 'Inspect',
                    click: () => { BrowserWindow.fromWebContents(p_evt.sender).inspectElement(p_data.x, p_data.y); }
                }
            );
        }

        if (p_data.items) {
            for (let i = 0; i < p_data.items.length; i++) {
                let cmd = p_data.items[i];
                itemList.push({
                    label: cmd.label || cmd.name || `unnamed menu item`,
                    click: () => { p_evt.sender.send(APP_MESSAGES.CONTEXT_MENU_COMMAND, cmd); }
                });
            }
        }
        /*
            const template = [
                {
                    label: 'Inspect',
                    click: () => { BrowserWindow.fromWebContents(p_evt.sender).inspectElement(p_data.x, p_data.y); }
                },
                {
                    label: 'Template menu item',
                    click: () => { p_evt.sender.send(APP_MESSAGES.CONTEXT_MENU_COMMAND, 'menu-item-1') }
                }
            ]*/
        if (itemList.length == 0) { return; }

        var menu = Menu.buildFromTemplate(itemList);
        menu.popup(BrowserWindow.fromWebContents(p_evt.sender));

    }

}



module.exports = (typeof window === 'undefined') ? new WINDOWS() : null;