'use strict';

const io = require(`@nkmjs/io-core`);
const path = require(`path`);
const fs = require(`fs`);

const PathCreate = require(`../helpers/path-create`);

/**
 * Desktop IO Reader
 */

class FSIOWriter extends nkm.io.IOProcess {

    constructor() { super(); }

    _Init() {

        super._Init();

        this._Bind(this._OnPathCreated);
        this._Bind(this._OnFileWritten);

    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        let dirPath = this._operation.fullPath;
        if (!this.rsc.isDir) { dirPath = nkm.u.PATH.dir(dirPath); }

        nkm.com.Rent(PathCreate).Do(dirPath, this._OnPathCreated);

    }

    _OnPathCreated(p_err) {

        if (p_err) { return this._OnError(p_err); }

        if (this.rsc.isDir) {
            this._OnProgress(1);
            this._OnSuccess();
            return;
        }

        fs.writeFile(this._operation.fullPath, this.rsc.raw, this.rsc.encoding, this._OnFileWritten);

    }

    _OnFileWritten(p_err) {

        if (p_err) { return this._OnError(p_err); }

        this._OnProgress(1);
        this._OnSuccess();

    }

}

module.exports = FSIOWriter;