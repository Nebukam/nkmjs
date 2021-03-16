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
class StorageIODelete extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageRemoved);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        env.ENV.FEATURES.storageArea.local.remove(this._operation.fullPath, this._OnStorageRemoved);

    }

    _OnStorageRemoved(p_evt) {
        if(env.ENV.FEATURES.runtime.lastError){
            this._OnError(env.ENV.FEATURES.runtime.lastError);
            return;
        }
        this._OnProgress(1);
        this._OnSuccess();
    }

}

module.exports = StorageIODelete;