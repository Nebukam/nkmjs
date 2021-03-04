'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
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
class StorageIORename extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._targetPath = null;
        this._oldPath = null;

        this._Bind(this._OnRenameExistsCheck);
        this._Bind(this._OnRenameStorageWritten);
        this._Bind(this._OnRenameStorageOldDeleted);

    }

    set targetPath(p_value) { this._targetPath = p_value; }
    get targetPath() { return this._targetPath; }

    Validate() {
        if (!super.Validate()) { return false; }

        let existing = this._resources.Get(PATH.SHORT(this._targetPath));
        if (existing && existing != this.rsc) {
            this._OnError(new Error(`Cannot rename resource from '${this._operation.fullPath}' to '${this._targetPath}' : destination already exists`));
            return false;
        }

        return true;
    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        this._oldPath = this._operation.fullPath;

        ENV.FEATURES.storageArea.local.get(this._targetPath, this._OnRenameExistsCheck);

    }

    /**
     * @access private
     */
    _OnRenameExistsCheck(p_data) {

        let data = p_data[this._oldPath];
        if (U.isVoid(data)) {
            // Data do not exists !
            let storage = ENV.FEATURES.storageArea, dataCopy = {};
            dataCopy[this._targetPath] = data;
            storage.local.set(dataCopy, this._OnRenameStorageWritten);
        } else {
            // Data exists
            this._OnError(new Error(`Can't rename '${this._oldPath}' to '${this._targetPath}' : data is already present.`));
        }

    }

    /**
     * @access private
     */
    _OnRenameStorageWritten() {

        if (!ENV.FEATURES.runtime.lastError) {
            this._OnError(ENV.FEATURES.runtime.lastError);
            return;
        }

        this._OnProgress(0.5);
        storage.local.remove(this._oldPath, this._OnRenameStorageOldDeleted);

    }

    /**
     * @access private
     */
    _OnRenameStorageOldDeleted() {

        if (ENV.FEATURES.runtime.lastError) {
            this._OnError(ENV.FEATURES.runtime.lastError);
            return;
        }

        this._OnProgress(1);
        this._UpdatePath(this._targetPath);
        this._OnSuccess();

    }


    _CleanUp() {
        this._targetPath = null;
        this._oldPath = null;
        super._CleanUp();
    }

}

module.exports = StorageIORename;