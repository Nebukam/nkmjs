'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const fs = require(`fs`);
const path = require(`path`);

/**
 * Create all missing directories in a provided path.
 * Input path is assumed to be a directory, not a file.
 * path/to/something
 */
class PathCreate extends com.pool.DisposableObject {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._Bind(this._OnNextStatsRead);
        this._Bind(this._OnNextDirRead);

        this._pathArray = new Array(0);

        this._Reset();

    }

    _Reset() {
        this._endCallback = null;
        this._pathArray.length = 0;
    }

    Do(p_basePath, p_endCallback = null) {

        this._endCallback = p_endCallback;

        this._pathArray = new Array(0);
        this._splitPath = p_basePath.split(u.tils.DELIM_DIR);

        if (this._splitPath.length <= 1) { return this._OnEnd(new Error(`Invalid path : ${p_basePath}`)); }

        if (u.isEmpty(this._splitPath[this._splitPath.length - 1])) { this._splitPath.pop(); }

        fs.stat(path.resolve(...this._splitPath), this._OnNextStatsRead);

    }

    _OnNextStatsRead(p_err, p_stats) {

        if (p_err) {

            if (p_err.code != 'ENOENT') { return this._OnEnd(p_err); }

            this._pathArray.push(path.resolve(...this._splitPath)); // this._splitPath.join(u.tils.DELIM_DIR);

            this._splitPath.pop();
            let parentPath = path.resolve(...this._splitPath); //this._splitPath.join(u.tils.DELIM_DIR);

            fs.stat(parentPath, this._OnNextStatsRead);

        } else {
            if (p_stats.isDirectory()) { this._OnNextDirRead(null); }
            else { this._OnEnd(new Error(`Not a directory.`)); }
        }

    }

    _OnNextDirRead(p_err) {

        if (this._pathArray.length === 0) { return this._OnEnd(null); }

        if (p_err) { return this._OnEnd(p_err); }

        let dirPath = this._pathArray.pop();
        fs.mkdir(dirPath, this._OnNextDirRead);
    }

    _OnEnd(p_err = null) {
        this._endCallback(p_err);
        this.Release();
    }

    _CleanUp() {
        this._Reset();
        super._CleanUp();
    }

}

module.exports = PathCreate;