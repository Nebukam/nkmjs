'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const fs = require(`fs`);
const path = require(`path`);

const fileWatcher = require("chokidar");
const SIGNAL = require(`../signal`);

/**
 * Create all missing directories in a provided path.
 * Input path is assumed to be a directory, not a file.
 * path/to/something
 */
class ResourceWatcher extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _OnPathChanged(p_path, p_oldPath) {
        super._OnPathChanged(p_path, p_oldPath);
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
        super._CleanUp();
    }

}

module.exports = ResourceWatcher;