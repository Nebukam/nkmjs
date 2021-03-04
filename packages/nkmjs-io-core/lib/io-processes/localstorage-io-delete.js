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
class LocalStorageIODelete extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnStorageRemoved);
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        try{
            localStorage.removeItem(this._operation.fullPath); 
            this._OnProgress(1);
            this._OnSuccess();
        }catch(e){
            this._OnError(new Error(`Key '${this._operation.fullPath}' is not set.`));
        }

    }

}

module.exports = LocalStorageIODelete;