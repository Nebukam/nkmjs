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
class PathWatcher extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._Bind(this._OnStats);
        this._Bind(this._OnWatcherError);
        this._Bind(this._OnWatcherReady);
        this._Bind(this._OnFileAdded);
        this._Bind(this._OnDirectoryAdded);
        this._Bind(this._OnFileChange);
        this._Bind(this._OnFileDeleted);
        this._Bind(this._OnDirectoryDeleted);

        this._path = null;
        this._watcher = null;
        this._enabled = false;
    }

    get path() { return this._path; }
    set path(p_value) {
        if (this._path == p_value) { return; }
        let oldPath = this._path;
        this._path = p_value;
        this._OnPathChanged(this._path, oldPath);
    }

    _OnPathChanged(p_path, p_oldPath) {
        if (this._watcher) { this._watcher.close(); }
        if (this._enabled && p_path) {
            this._watcher.close();
            this._watcher = null;
            fs.stat(p_path, this._OnStats);
        }
    }

    Enable() {
        if (this._enabled) { return; }
        this._enabled = true;
        if (this._path) { fs.stat(this._path, this._OnStats); }
    }

    Disable() {
        if (!this._enabled) { return; }
        this._enabled = false;
        if (this._watcher) {
            this._watcher.close();
            this._watcher = null;
        }
    }

    _OnStats(p_err, p_stats) {

        if (p_err) {
            this._OnWatcherError();
            return;
        }

        if (p_stats.isDirectory() || p_stats.isFile()) {
            this._watcher = chokidar.watch(this._path, {
                ignored: /[\/\\]\./,
                persistent: true
            });

            this._watcher
                .on('add', this._OnFileAdded)
                .on('addDir', this._OnDirectoryAdded)
                .on('change', this._OnFileChange)
                .on('unlink', this._OnFileDeleted)
                .on('unlinkDir', this._OnDirectoryDeleted)
                .on('error', this._OnWatcherError)
                .on('ready', this._OnWatcherReady);

        } else {
            this._Broadcast(SIGNAL.WATCH_ERROR, this);
            return;
        }


    }

    _OnWatcherError() {
        this.Disable();
        this._Broadcast(SIGNAL.WATCH_ERROR, this);
    }

    _OnWatcherReady() {
        this._Broadcast(SIGNAL.WATCH_STARTED, this);
    }

    _OnFileAdded(p_path) {
        this._Broadcast(SIGNAL.FILE_ADDED, this);
    }

    _OnFileChange(p_path) {
        this._Broadcast(SIGNAL.FILE_CHANGED, this);
    }

    _OnFileDeleted(p_path) {
        this._Broadcast(SIGNAL.FILE_DELETE, this);
    }

    _OnDirectoryAdded(p_path) {
        this._Broadcast(SIGNAL.DIR_ADDED, this);
    }

    _OnDirectoryDeleted(p_path) {
        this._Broadcast(SIGNAL.DIR_DELETE, this);
    }

    _CleanUp() {
        this.Disable();
        super._CleanUp();
    }

}

module.exports = PathWatcher;