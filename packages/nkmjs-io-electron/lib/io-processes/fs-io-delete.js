'use strict';

const io = require(`@nkmjs/io-core`);
const PathDelete = require(`../helpers/path-delete`);

const fs = require(`fs`);
/**
 * Desktop IO Reader
 */

class FSIODelete extends nkmCore.io.IOProcess {

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
        nkmCore.com.Rent(PathDelete).Do(this._operation.fullPath, null, p_stats, this._OnPathDeleted);
    }

    _OnPathDeleted(p_err) {

        if (p_err) { return this._OnError(p_err); }

        this._OnProgress(1);
        this._OnSuccess();

    }

}

module.exports = FSIODelete;