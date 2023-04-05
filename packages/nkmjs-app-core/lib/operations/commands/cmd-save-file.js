'use strict';

const CmdFileDialog = require(`./cmd-system-dialog-file`);

class CmdSaveFile extends CmdFileDialog {
    constructor() { super(); }

    static __dialogType = 'save';
    static __dialogProperties = null;

    /**
     * 
     * @param {*} p_response 
     * @returns 
     */
    _OnInternalPicked(p_response) {

        if (p_response.canceled) { this._Cancel(); return; }

        p_response.filePaths = [p_response.filePath];

        super._OnInternalPicked(p_response);

    }

    // TODO : Finish this 

}

module.exports = CmdSaveFile;