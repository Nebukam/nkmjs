'use strict';

const io = require("@nkmjs/io-core");

const fs = require(`fs`);
const path = require(`path`);

const fileWatcher = require("chokidar");
const SIGNAL = require(`../signal`);

const PathWatcher = require(`./path-watcher`);

const base = PathWatcher;

/**
 * Create all missing directories in a provided path.
 * Input path is assumed to be a directory, not a file.
 * path/to/something
 */
class ResourceWatcher extends base {
    constructor() { super(); }

    static __distribute = base.__distribute.Ext()
        .To(`readOptions`)
        .To(`readOnChange`)
        .To(`releaseRscOnDelete`)
        .To(`resourceBound`)
        .To(`resource`, `currentRsc`);

    _Init() {

        super._Init();
        this._currentRsc = null;
        this._readOnChange = false;
        this._releaseRscOnDelete = false;
        this._resourceBound = false;
        this._readOptions = null;
        this._rscOptions = null;

        this._rscObserver = new nkmcore.com.signals.Observer();
        this._rscObserver.Hook(nkmcore.io.IO_SIGNAL.READ_COMPLETE, this._OnReadComplete, this);

    }

    set rscOptions(p_value) { this._rscOptions = p_value; }

    Hook(p_evt, p_fn, p_subscriber = null) { this._rscObserver.Hook(p_evt, p_fn, p_subscriber); return this; }
    Unhook(p_evt, p_fn, p_subscriber = null) { this._rscObserver.Unhook(p_evt, p_fn, p_subscriber); return this; }

    _OnPathChanged(p_path, p_oldPath) {
        this.currentRsc = p_path ? this._GetRsc(p_path) : null;
        super._OnPathChanged(p_path, p_oldPath);
    }

    _GetRsc(p_path) { return nkmcore.io.Get(p_path, this._rscOptions); }

    get readOptions() { return this._readOptions; }
    set readOptions(p_value) { this._readOptions = p_value; }

    get readOnChange() { return this._readOnChange; }
    set readOnChange(p_value) { this._readOnChange = p_value; }

    get releaseRscOnDelete() { return this._releaseRscOnDelete; }
    set releaseRscOnDelete(p_value) { this._releaseRscOnDelete = p_value; }

    get resourceBound() { return this._resourceBound; }
    set resourceBound(p_value) { this._resourceBound = p_value; }

    get currentRsc() { return this._currentRsc; }
    set currentRsc(p_value) {
        if (this._currentRsc == p_value) { return; }
        let oldValue = this._currentRsc;
        this._currentRsc = p_value;
        if (this._currentRsc) { this.path = this._currentRsc.path; }
        this._rscObserver.ObserveOnly(this._currentRsc);
        this._OnRscChanged(this._currentRsc, oldValue);
    }

    _OnRscChanged(p_new, p_old) {
        if (p_old) { p_old.Unwatch(nkmcore.com.SIGNAL.RELEASED, this._OnRscReleased, this); }
        if (p_new) { p_new.Watch(nkmcore.com.SIGNAL.RELEASED, this._OnRscReleased, this); }
        this.Broadcast(nkmcore.com.SIGNAL.ITEM_UPDATED, this, p_new, p_old);
    }

    _OnRscReleased() {
        this.currentRsc = null;
        if (this._resourceBound) { this.Release(); }
    }

    //_OnWatcherError(p_err) { super._OnWatcherError(p_err); }

    //_OnWatcherReady() { super._OnWatcherReady(); }

    //_OnFileAdded(p_path) { super._OnFileAdded(p_path); }

    _OnFileChange(p_path) {
        super._OnFileChange(p_path);
        p_path = nkmcore.u.FULL(p_path);
        if (this._path == p_path && this._readOnChange) {
            this.Read(this._readOptions);
        }
    }

    _OnReadComplete(p_rsc) {
        this.Broadcast(nkmcore.io.IO_SIGNAL.READ_COMPLETE, this, p_rsc);
    }

    _OnFileDeleted(p_path) {
        super._OnFileDeleted(p_path);
        p_path = nkmcore.u.FULL(p_path);
        if (this._path == p_path && this._releaseRscOnDelete) {
            if (this._currentRsc) { this._currentRsc.Release(); }
        }
    }

    //_OnDirectoryAdded(p_path) { super._OnDirectoryAdded(p_path); }

    _OnDirectoryDeleted(p_path) {
        super._OnDirectoryDeleted(p_path);
        p_path = nkmcore.u.FULL(p_path);
        if (this._path == p_path && this._releaseRscOnDelete) {
            if (this._currentRsc) { this._currentRsc.Release(); }
        }
    }

    Write(p_content, p_options = null) {
        this._currentRsc.content = p_content;
        return this._currentRsc.Write(p_options);
    }

    Read(p_options = null) {
        return this._currentRsc.Read(p_options);
    }

    _CleanUp() {
        this.currentRsc = null;
        this._readOnChange = false;
        this._releaseRscOnDelete = false;
        this._resourceBound = false;
        this._readOptions = null;
        this._rscOptions = null;
        super._CleanUp();
    }

}

module.exports = ResourceWatcher;