'use strict';

const com = require("@nkmjs/common");
const fs = require(`fs`);
const path = require(`path`);

/**
 * Delete a file or directory.
 * In case of a directory, recursively deletes everything inside.
 */
class PathDelete extends com.pool.DisposableObject {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._Bind(this._OnStatsRead);
        this._Bind(this._OnUnlinkSelf);
        this._Bind(this._OnDirRead);
        this._Bind(this._OnDirUnlinkSelf);

        this._Reset();

    }

    _Reset() {

        this._discovered = 0;
        this._removed = 0;

        this._basePath = ``;
        this._parent = null;
        this._endCallback = null;
        this._error = null;

        this._isDir = false;

    }

    Do(p_basePath, p_parent = null, p_stats = null, p_endCallback = null) {

        this._basePath = p_basePath;
        this._parent = p_parent;
        this._endCallback = p_endCallback;

        if (this._parent) { this._parent.discovered += 1; }
        else { this._parent = this; }

        if (p_stats) { this._OnStatsRead(null, p_stats); }
        else { fs.stat(p_basePath, this._OnStatsRead); }

    }

    get discovered() { return this._discovered; }
    set discovered(p_value) { this._discovered = p_value; }

    get removed() { return this._removed; }
    set removed(p_value) {
        this._removed = p_value;
        if (this._removed >= this._discovered && this._isDir) { fs.rmdir(this._basePath, this._OnDirUnlinkSelf); }
    }

    get root() {
        if (this._parent === this) { return this; }
        return this._parent.root;
    }

    _OnStatsRead(p_err, p_stats) {

        if (p_err) {
            this.root._error = p_err;
            this._parent.removed += 1;
            return;
        }

        if (p_stats.isDirectory()) {
            this._isDir = true;
            fs.readdir(this._basePath, this._OnDirRead);
        } else {
            fs.unlink(this._basePath, this._OnUnlinkSelf);
        }

    }

    _OnDirRead(p_err, p_fileList) {
        if (p_err) {
            this.root._error = p_err;
            this._parent.removed += 1;
            return;
        }

        let n = p_fileList.length;

        if (n === 0) {
            this.removed += 1;
            return;
        }

        let pathDelete = null;
        for (let i = 0; i < n; i++) {
            com.Rent(PathDelete).Do(path.join(this._basePath, p_fileList[i]), this);
        }
    }

    _OnDirUnlinkSelf(p_err) { this._OnEnd(p_err); }

    _OnUnlinkSelf(p_err) { this._OnEnd(p_err); }

    _OnEnd(p_err) {
        if (p_err) { this.root._error = p_err; }

        if (this._parent != this) { this._parent.removed += 1; }
        else { this._endCallback(this._error); }

        this.Release();
    }

    _CleanUp() {
        this._Reset();
        super._CleanUp();
    }

}

module.exports = PathDelete;