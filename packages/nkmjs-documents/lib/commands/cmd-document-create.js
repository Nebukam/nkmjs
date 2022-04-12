
const com = require("@nkmjs/common");

const CMD_TYPE = require(`./cmd-type`);
const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentCreate extends CommandDocumentBase {
    constructor() { super(); }

    static __docCmdType = CMD_TYPE.CREATE;

    static __displayName = `New document`;
    static __displayIcon = `new`;

    _InternalExecute() {

        let document = this._GetDoc(true);

        document.currentData.CommitUpdate();
        this._RequestEdit();

    }

    _Cancel() {
        this._ClearDocumentAndData();
        super._Cancel();
    }

    _Fail(p_msg) {
        this._ClearDocumentAndData();
        super._Fail(p_msg);
    }

}

module.exports = CommandDocumentCreate;