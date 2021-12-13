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
class FetchIORename extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._targetPath = null;
    }

    set targetPath(p_value) { this._targetPath = u.PATH.FULL(p_value); }
    get targetPath() { return this._targetPath; }

    Validate() {
        if (!super.Validate()) { return false; }

        let existing = this._resources.Get(u.PATH.SHORT(this._targetPath));
        if (existing && existing != this.rsc) {
            this._OnError(new Error(`Cannot rename resource from '${this.rsc.path}' to '${this._targetPath}' : destination already exists`));
            return false;
        }

        return true;
    }

    Process() {
        this._OnStart();
        this._OnProgress(0);
        this._OnError(new Error(`HTTP rename not supported.`));
    }

    _CleanUp() {
        this._targetPath = null;
        super._CleanUp();
    }

}

module.exports = FetchIORename;