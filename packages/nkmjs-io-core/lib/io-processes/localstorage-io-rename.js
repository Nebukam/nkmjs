'use strict';

const u = require("@nkmjs/utils");

const IOProcess = require(`../io-process`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.IOProcess
 * @memberof io.core.ioprocesses
 */
class LocalStorageIORename extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._targetPath = null;
        this._oldPath = null;

    }

    set targetPath(p_value) { this._targetPath = p_value; }
    get targetPath() { return this._targetPath; }

    Validate() {
        if (!super.Validate()) { return false; }

        let existing = RESOURCES.Get(u.SHORT(this._targetPath));
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

        // Use browser sync localStorage
        let existingData = localStorage.getItem(this._targetPath);
        if (!existingData) {
            // Success : data does not exists
            localStorage.setItem(this._targetPath, localStorage.getItem(this._oldPath));
            localStorage.removeItem(this._oldPath);
            this._OnProgress(1);
            this._UpdatePath(this._targetPath);
            this._OnSuccess();

        } else {
            // Fail : data already exists
            this._OnError(new Error(`Can't rename '${this._oldPath}' to '${this._targetPath}' : data is already present.`));
        }

    }

    _CleanUp() {
        this._targetPath = null;
        this._oldPath = null;
        super._CleanUp();
    }

}

module.exports = LocalStorageIORename;