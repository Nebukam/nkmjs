'use strict';

const fs = require(`fs`);
const path = require(`path`);

const fileWatcher = require("chokidar");
const SIGNAL = require(`../signal`);

const tmp = require('tmp');

const ResourceWatcher = require(`./resource-watcher`);

/**
 * Create all missing directories in a provided path.
 * Input path is assumed to be a directory, not a file.
 * path/to/something
 */
class TempResourceWatcher extends ResourceWatcher {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._tempObj = null;
        this._rscOptions = null;

        this._distribute
            .To(`rscOptions`);
    }

    set rscOptions(p_value) { this._rscOptions = p_value; }

    _GetRsc(p_path) { return nkm.io.Get(p_path, this._rscOptions); }

    Create(p_options = null, p_tmpOpts = null) {
        this.Flush();
        if (p_options) { this._rscOptions = p_options; }
        let tops = p_tmpOpts || {};
        this._tempObj = tmp.fileSync({
            prefix: this._rscOptions ? this._rscOptions.prefix || `nkmjs-` : `nkmjs-`,
            postfix: this._rscOptions ? this._rscOptions.ext || `.tmp` : `.tmp`,
            ...tops
        });
        this.path = this._tempObj.name;
    }

    Flush() {
        if (this._currentRsc) {
            this._currentRsc.Release();
            this.currentRsc = null;
        }
        if (this._tempObj) {
            this._tempObj.removeCallback();
            this._tempObj = null;
        }
    }

    Enable() {
        if (this._enabled) { return; }
        super.Enable();
    }

    Disable() {
        if (!this._enabled) { return; }
        super.Disable();
    }

    _OnWatcherError() {
        super._OnWatcherError();
    }

    _OnWatcherReady() {
        super._OnWatcherReady();
    }

    _OnFileAdded(p_path) {
        super._OnFileAdded(p_path);
    }

    _OnFileChange(p_path) {
        super._OnFileChange(p_path);
    }

    _OnFileDeleted(p_path) {
        super._OnFileDeleted(p_path);
    }

    _OnDirectoryAdded(p_path) {
        super._OnDirectoryAdded(p_path);
    }

    _OnDirectoryDeleted(p_path) {
        super._OnDirectoryDeleted(p_path);
    }

    _CleanUp() {
        this.Flush();
        super._CleanUp();
    }

}

module.exports = TempResourceWatcher;