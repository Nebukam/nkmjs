
const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");

const CMD_TYPE = require(`./cmd-type`);
const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentRelease extends CommandDocumentBase {
    constructor() { super(); }

    static __docCmdType = CMD_TYPE.RELEASE;

    static __defaultName = `Release document`;
    static __defaultIcon = `remove`;

    _Init() {
        super._Init();
    }

    _InternalExecute() {

        let document = this._FindDoc();

        if (!document) {
            this._Fail(`Could not find bound document`);
        } else {
            this._ClearDocumentAndData(true);
            this._Success();
        }

    }


}

module.exports = CommandDocumentRelease;