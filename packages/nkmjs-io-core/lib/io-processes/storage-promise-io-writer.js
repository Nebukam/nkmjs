'use strict';

const env = require(`@nkmjs/environment`);

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class StoragePromiseIOWriter extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageWritten);
        this._Bind(this._OnStorageWrittenError);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        env.ENV.FEATURES.storageArea.local.set({ [this._operation.fullPath]: this.rsc.raw })
            .then(this._OnStorageWritten)
            .catch(this._OnStorageWrittenError);

    }

    _OnStorageWrittenError(p_err) {
        this._OnError(p_err);
    }

    _OnStorageWritten() {
        this._OnProgress(1);
        this._OnSuccess();
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = StoragePromiseIOWriter;