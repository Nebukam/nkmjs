'use strict';

const CmdSystemDialogDirectory = require(`./cmd-system-dialog-directory`);

class CmdOpenFileList extends CmdSystemDialogDirectory {
    constructor() { super(); }

    static __dialogProperties = ['openDirectory', 'multiSelections'];

}

module.exports = CmdOpenFileList;