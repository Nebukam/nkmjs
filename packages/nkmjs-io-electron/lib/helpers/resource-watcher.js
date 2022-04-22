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


        this._rscObserver = new nkm.com.signals.Observer();

    }

    Hook(p_evt, p_fn, p_subscriber = null) { this._rscObserver.Hook(p_evt, p_fn, p_subscriber); }
    Unhook(p_evt, p_fn, p_subscriber = null) { this._rscObserver.Unhook(p_evt, p_fn, p_subscriber); }

    _OnPathChanged(p_path, p_oldPath) {
        this.currentRsc = p_path ? this._GetRsc(p_path) : null;
        super._OnPathChanged(p_path, p_oldPath);
    }

    _GetRsc(p_path) { return nkm.io.Get(p_path); }

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
        if (p_old) { p_old.Unwatch(nkm.com.SIGNAL.RELEASED, this._OnRscReleased, this); }
        if (p_new) { p_new.Watch(nkm.com.SIGNAL.RELEASED, this._OnRscReleased, this); }
    }

    _OnRscReleased() {
        this.currentRsc = null;
        if (this._resourceBound) { this.Release(); }
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
        if (this._readOnChange) {
            this.Read(this._readOptions);
        }
    }

    _OnFileDeleted(p_path) {
        super._OnFileDeleted(p_path);
        if (this._releaseRscOnDelete) {
            if (this._currentRsc) { this._currentRsc.Release(); }
        }
    }

    _OnDirectoryAdded(p_path) {
        super._OnDirectoryAdded(p_path);
    }

    _OnDirectoryDeleted(p_path) {
        super._OnDirectoryDeleted(p_path);
        if (this._releaseRscOnDelete) {
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
        super._CleanUp();
    }

}

module.exports = ResourceWatcher;