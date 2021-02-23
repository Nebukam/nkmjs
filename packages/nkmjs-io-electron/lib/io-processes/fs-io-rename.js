'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);
const { IOProcess } = require(`@nkmjs/io-core`);

const fs = require(`fs`);
/**
 * Desktop IO Reader
 */

class FSIORename extends IOProcess {

    constructor() { super(); }

    _Init() {
        super._Init();

        this._targetPath = null;
        this._oldPath = null;

        this._Bind(this._OnRenamed);

    }

    set targetPath(p_value) { this._targetPath = PATH.FULL(p_value); }
    get targetPath() { return this._targetPath; }

    Validate() {

        if (!super.Validate()) { return false; }

        let existing = this._resources.Get(PATH.SHORT(this._targetPath));
        if (existing && existing != this.rsc) {
            this._OnError(new Error(`Cannot rename resource from '${this.rsc.path}' to '${this._targetPath}' : destination already exists`));
            return false;
        }

        //TODO : Make sure we're not renaming a folder into a file
        //or a file into a folder.

        return true;

    }

    Process() {

        this._OnStart();
        this._OnProgress(0);

        this._oldPath = this._operation.fullPath;
        fs.rename(this._oldPath, this._targetPath, this._OnRenamed);

    }

    _OnRenamed(p_err) {
        
        if (p_err) { return this._OnError(p_err); }
        
        this.rsc._UpdatePath(this._targetPath);
        this._OnProgress(1);
        this._OnSuccess();
    
    }

    _CleanUp() {
        this._expandedPath = null;
        super._CleanUp();
    }

}

module.exports = FSIORename;