'use strict';

const io = require(`@nkmjs/io-core`);

const fs = require(`fs`);

/**
 * Desktop IO Reader
 */

class FSIOReader extends nkmcore.io.IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._Bind(this._OnStatRead);
        this._Bind(this._OnPathRead);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        if (this.rsc.isDir) { fs.readdir(this._operation.fullPath, this.rsc.encoding, this._OnPathRead); }
        else { fs.readFile(this._operation.fullPath, this.rsc.encoding, this._OnPathRead); }

    }

    _OnStatRead(p_err, p_stats) {
        if (p_err) { return this._OnError(p_err); }
        if (this.rsc.isDir) { fs.readdir(this._operation.fullPath, this.rsc.encoding, this._OnPathRead); }
        else { fs.readFile(this._operation.fullPath, this.rsc.encoding, this._OnPathRead); }
    }

    _OnPathRead(p_err, p_data) {
        
        if (p_err) { return this._OnError(p_err); }
        this._OnProgress(1);
        this.rsc.raw = p_data; //if dir, p_data = file list
        this._OnSuccess();
        
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = FSIOReader;