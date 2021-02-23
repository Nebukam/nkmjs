'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { POOL } = require(`@nkmjs/common`);
const { IOProcess } = require(`@nkmjs/io-core`);
const PathDelete = require(`../helpers/path-delete`);

const fs = require(`fs`);
/**
 * Desktop IO Reader
 */

class FSIODelete extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStatRead);
        this._Bind(this._OnPathDeleted);
    }


    Process() {
        this._OnStart();
        this._OnProgress(0);
        fs.stat(this._operation.fullPath, this._OnStatRead);
    }

    _OnStatRead(p_err, p_stats) {
        if (p_err) { return this._OnError(p_err); }
        POOL.Rent(PathDelete).Do(this._operation.fullPath, null, p_stats, this._OnPathDeleted);
    }

    _OnPathDeleted(p_err) {

        if (p_err) { return this._OnError(p_err); }

        this._OnProgress(1);
        this._OnSuccess();

    }

}

module.exports = FSIODelete;