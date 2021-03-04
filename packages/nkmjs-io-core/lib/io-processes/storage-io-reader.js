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

        ENV.FEATURES.storageArea.local.get(this._operation.fullPath, this._OnStorageRead);

    }

    _OnStorageRead(p_evt) {

        console.log(p_evt);
        let data = p_evt[this._operation.fullPath];
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