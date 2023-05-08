'use strict';

const com = require("@nkmjs/common");
const { BrowserWindow } = require("electron");

/**
 * Helper class that hold windows data and help sort out ipcMessaging between windows
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof electron.core
 */
class WindowWrapper extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._id = null;
        this._window = null;
        this._initOptions = null;
        this._Bind(this.Show);
    }

    /**
     * @description TODO
     * @type {object}
     */
    get initOptions() { return this._initOptions; }
    set initOptions(p_value) {
        this._initOptions = p_value;
        if (this._initOptions) {
            this.id = this._initOptions.id;
        }
    }

    /**
     * @description TODO
     * @type {BrowserWindow}
     */
    get window() { return this._window; }
    set window(p_value) {
        if (this._window === p_value) { return; }
        let oldWindow = this._window;
        this._window = p_value;

        if (oldWindow) {
            // Remove ipc listeners
        }

        if (this._window) {
            // Add ipc listeners
            if (this._initOptions.delayShow) {
                this._window.once('ready-to-show', this.Show);
            }
        }
    }

    /**
     * @description TODO
     * @type {string}
     */
    get id() { return this._id; }
    set id(p_value) { this._id = p_value; }

    Show() {
        this._window.show();
    }

    _CleanUp() {
        this.id = null;
        this._initOptions = null;
        this.window = null;
        super._CleanUp();
    }

}

module.exports = WindowWrapper;