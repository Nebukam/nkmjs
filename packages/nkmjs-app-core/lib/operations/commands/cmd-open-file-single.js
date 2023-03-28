'use strict';

const nkm = require(`@nkmjs/core`);
const CmdSystemDialogFile = require(`./cmd-system-dialog-file`);

class CmdOpenFileSingle extends CmdSystemDialogFile {
    constructor() { super(); }
    
}

module.exports = CmdOpenFileSingle;