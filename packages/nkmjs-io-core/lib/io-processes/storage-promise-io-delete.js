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
class StoragePromiseIODelete extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageRemoved);
        this._Bind(this._OnStorageRemovedError);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        ENV.FEATURES.storageArea.local.remove(this._operation.fullPath)
            .then(this._OnStorageRemoved)
            .catch(this._OnStorageRemovedError);

    }

    _OnStorageRemovedError(p_err) {
        this._OnError(p_err);
    }

    _OnStorageRemoved(p_evt) {
        this._OnProgress(1);
        this._OnSuccess();
    }

}

module.exports = StoragePromiseIODelete;