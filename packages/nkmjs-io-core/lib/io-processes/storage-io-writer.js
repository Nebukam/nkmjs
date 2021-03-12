'use strict';

const { ENV } = require(`@nkmjs/environment`);

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class StorageIOWriter extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageWritten);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        ENV.FEATURES.storageArea.local.set({ [this._operation.fullPath]: this.rsc.raw }, this._OnStorageWritten);

    }

    _OnStorageWritten() {

        if (ENV.FEATURES.runtime.lastError) {
            this._OnError(ENV.FEATURES.runtime.lastError);
            return;
        }

        this._OnProgress(1);
        this._OnSuccess();

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = StorageIOWriter;