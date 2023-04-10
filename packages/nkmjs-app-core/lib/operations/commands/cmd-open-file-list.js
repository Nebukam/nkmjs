'use strict';

const CmdSystemDialogFile = require(`./cmd-system-dialog-file`);

class CmdOpenFileList extends CmdSystemDialogFile {
    constructor() { super(); }

    static __dialogProperties = ['openFile', 'multiSelections'];

}

module.exports = CmdOpenFileList;