'use strict';

const com = require(`@nkmjs/common`);

const fs = require(`fs`);

const fileWatcher = require("chokidar");
const SIGNAL = require(`../signal`);

/**
 * Create all missing directories in a provided path.
 * Input path is assumed to be a directory, not a file.
 * path/to/something
 */
class PathWatcher extends com.Observable {
    constructor() { super(); }

    static __distribute = com.helpers.OptionsDistribute.Ext()
        .To(`path`)
        .To(`depth`)
        .To(`usePolling`)
        .To(`ignoreInitial`);

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

        this._depth = 0;
        this._usePolling = true;
        this._ignoreInitial = true;

    }

    set options(p_options) { this.constructor.__distribute.Update(this, p_options); }

    get depth() { return this._depth; }
    set depth(p_value) { this._depth = p_value; }

    get ignoreInitial() { return this._ignoreInitial; }
    set ignoreInitial(p_value) { this._ignoreInitial = p_value; }

    get usePolling() { return this._usePolling; }
    set usePolling(p_value) { this._usePolling = p_value; }

    get path() { return this._path; }
    set path(p_value) {
        p_value = nkmCore.u.FULL(p_value);
        if (this._path == p_value) { return; }
        let oldPath = this._path;
        this._path = p_value;
        this._OnPathChanged(this._path, oldPath);
    }

    _OnPathChanged(p_path, p_oldPath) {
        if (this._watcher) {
            this._watcher.close();
            this._watcher = null;
        }
        if (this._enabled && p_path) {
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
            this._OnWatcherError(p_err);
            return;
        }

        if (p_stats.isDirectory() || p_stats.isFile()) {
            this._watcher = fileWatcher.watch(this._path, {
                ignored: /[\/\\]\./,
                persistent: true,
                usePolling: true,
                depth:this._depth,
                ignoreInitial:this._ignoreInitial
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
            this.Broadcast(SIGNAL.WATCH_ERROR, this);
            return;
        }


    }

    _OnWatcherError(p_err) {
        console.error(p_err);
        this.Disable();
        this.Broadcast(SIGNAL.WATCH_ERROR, this);
    }

    _OnWatcherReady() {
        this.Broadcast(SIGNAL.WATCH_STARTED, this);
    }

    _OnFileAdded(p_path) {
        this.Broadcast(SIGNAL.FILE_ADDED, this, p_path);
    }

    _OnFileChange(p_path) {
        this.Broadcast(SIGNAL.FILE_CHANGED, this, p_path);
    }

    _OnFileDeleted(p_path) {
        this.Broadcast(SIGNAL.FILE_DELETE, this, p_path);
    }

    _OnDirectoryAdded(p_path) {
        this.Broadcast(SIGNAL.DIR_ADDED, this, p_path);
    }

    _OnDirectoryDeleted(p_path) {
        this.Broadcast(SIGNAL.DIR_DELETE, this, p_path);
    }

    _CleanUp() {
        this.Disable();
        this.path = null;
        this._depth = 0;
        this._usePolling = true;
        this._ignoreInitial = true;
        super._CleanUp();
    }

}

module.exports = PathWatcher;