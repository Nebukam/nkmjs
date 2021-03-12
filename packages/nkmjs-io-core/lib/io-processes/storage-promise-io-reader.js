'use strict';

const u = require("@nkmjs/utils");
const { ENV } = require(`@nkmjs/environment`);
const axios = require('axios');

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class StoragePromiseIOReader extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageRead);
        this._Bind(this._OnStorageReadError);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        ENV.FEATURES.storageArea.local.get(this._operation.fullPath)
            .then(this._OnStorageRead)
            .catct(this._OnStorageReadError);

    }

    _OnStorageReadError(p_err) {
        this._OnError(p_err);
    }

    _OnStorageRead(p_results) {

        console.log(p_results);
        let data = p_results[this._operation.fullPath];
        if (u.tils.isVoid(data)) {
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

module.exports = StoragePromiseIOReader;