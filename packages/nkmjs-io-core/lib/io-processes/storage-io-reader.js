'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);
const { ENV } = require(`@nkmjs/environment`);
const axios = require('axios');

const IOProcess = require(`../io-process`);
const ENCODING = require(`../encoding`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class StorageIOReader extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageRead);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        if (ENV.FEATURES.hasStorage) {
            // Use chromium async storage (Chrome/Edge/Mozilla)
            let storage = ENV.FEATURES.storageArea;
            storage.sync.get(this._operation.fullPath, this._OnStorageRead);

        } else {
            // Use browser sync localStorage
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

    _OnStorageRead(p_evt) {

        let data = p_data[this._operation.fullPath];
        if (U.isVoid(data)) {
            // Data do not exists
            this._OnError(new Error(`Key '${this._operation.fullPath}' is not set.`));
        } else {
            // Data exists
            this._OnProgress(1);
            this.rsc.raw = data;
            this._OnSuccess();
        }

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = StorageIOReader;