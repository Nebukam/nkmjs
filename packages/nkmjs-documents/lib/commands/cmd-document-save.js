
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const path = require(`path`);

const CMD_TYPE = require(`./cmd-type`);
const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentSave extends CommandDocumentBase {
    constructor() { super(); }

    static __docCmdType = CMD_TYPE.SAVE;

    static __displayName = `Save document`;
    static __displayIcon = `save`;

    _Init() {
        super._Init();
        this._Bind(this._OnPicked);
        this._defaultSaveLocation = null;
    }

    get defaultSaveLocation() { return this._defaultSaveLocation; }
    set defaultSaveLocation(p_value) { this._defaultSaveLocation = p_value; }

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

                let dialogOptions = {
                    filters: [{ ...this._fileInfos }],
                    type: `save`,
                    title: `Save "${document.title}"`
                };

                if (this._defaultSaveLocation) {
                    dialogOptions.defaultPath = this._defaultSaveLocation.replaceAll(`/`, path.sep);
                }

                actions.RELAY.ShowOpenDialog(dialogOptions, this._OnPicked);
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