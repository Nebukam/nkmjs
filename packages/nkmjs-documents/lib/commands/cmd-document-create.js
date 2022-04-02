
const com = require("@nkmjs/common");

const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentCreate extends CommandDocumentBase {
    constructor() { super(); }

    static __defaultName = `New document`;
    static __defaultIcon = `new`;

    _InternalExecute() {

        let document = this._GetDoc();
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