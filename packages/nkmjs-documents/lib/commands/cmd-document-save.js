
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");

const CMD_TYPE = require(`./cmd-type`);
const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentSave extends CommandDocumentBase {
    constructor() { super(); }

    static __docCmdType = CMD_TYPE.SAVE;

    static __defaultName = `Save document`;
    static __defaultIcon = `save`;

    _Init() {
        super._Init();

        this._Bind(this._OnPicked);
        this._Bind(this._Fail);
        this._Bind(this._Success);

        this._shortcut = actions.Keystroke.CreateFromString("Ctrl S");

        this.Disable();

    }

    _InternalExecute() {

        let document = this._FindDoc();

        if (!document) {
            this._Fail(`Could not find bound document`);
        } else {
            if (document.currentPath) {
                document.Save({
                    success: this._Success,
                    error: this._Fail,
                });
            } else {
                actions.RELAY.ShowOpenDialog({
                    filters: [{ ...this._fileInfos }],
                    type: `save`,
                }, this._OnPicked);
            }
        }

    }

    _OnPicked(p_response) {

        if (p_response.canceled) {
            this._Cancel();
            return;
        }

        this._doc.currentPath = p_response.filePath;
        this._doc.Save({
            success: this._Success,
            error: this._Fail,
        });

    }


}

module.exports = CommandDocumentSave;