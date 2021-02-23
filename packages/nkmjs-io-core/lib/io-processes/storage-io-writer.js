'use strict';

const { U, PATH, MIME } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);
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
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        if (ENV.FEATURES.hasStorage) {
            // Use chromium async storage (Chrome/Edge/Mozilla)
            let storage = ENV.FEATURES.storageArea, data = {};
            data[this._operation.fullPath] = this.rsc.raw;
            storage.sync.set(data, this._OnStorageWritten);

        } else {
            // Use browser sync localStorage
            this._OnProgress(1);
            localStorage.setItem(this._operation.fullPath, this.rsc.raw);
            this._OnSuccess();
        }

    }

    _OnStorageWritten(p_data) {
        if (!p_data) {
            this._OnError(runtime.lastError);
        } else {
            this._OnProgress(1);
            this._OnSuccess();
        }
    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = StorageIOWriter;