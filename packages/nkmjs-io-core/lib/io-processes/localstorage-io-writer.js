'use strict';

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class LocalStorageIOWriter extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        this._OnProgress(1);
        localStorage.setItem(this._operation.fullPath, this.rsc.raw);
        this._OnSuccess();

    }

}

module.exports = LocalStorageIOWriter;