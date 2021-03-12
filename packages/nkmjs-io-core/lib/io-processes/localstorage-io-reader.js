'use strict';

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class LocalStorageIOReader extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        let data = localStorage.getItem(this._operation.fullPath);
        if (!data) {
            // Fail : data do not exists
            this._OnError(new Error(`Key '${this._operation.fullPath}' is not set.`));
        } else {
            // Success 
            this._OnProgress(1);
            this.rsc.raw = data;
            this._OnSuccess();
        }

    }

}

module.exports = LocalStorageIOReader;