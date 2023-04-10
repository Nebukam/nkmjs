
const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");
const path = require(`path`);

const CMD_TYPE = require(`./cmd-type`);
const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentLoad extends CommandDocumentBase {
    constructor() { super(); }

    static __docCmdType = CMD_TYPE.LOAD;

    static __displayName = `Load document`;
    static __displayIcon = `document-download-small`;

    _Init() {
        super._Init();

        this._Bind(this._Success);
        this._Bind(this._Fail);
        this._Bind(this._OnPicked);
        //this._Bind(this._OnReadError);
        this._Bind(this._OnReadSuccess);

        this._bumpOnly = false;

    }

    get bumpOnly() { return this._bumpOnly; }
    set bumpOnly(p_value) { this._bumpOnly = p_value; }

    get defaultDialogLocation() { return this._defaultDialogLocation; }
    set defaultDialogLocation(p_value) { this._defaultDialogLocation = p_value; }

    _InternalExecute() {

        if (u.isVoid(this._context) ||
            !u.isString(this._context)) {

            if (nkm.env.isNodeEnabled) {

                let dialogOptions = {
                    filters: [{ ...this._fileInfos }],
                    properties: ['openFile']
                };

                if (this._defaultDialogLocation) {
                    dialogOptions.defaultPath = this._defaultDialogLocation.replaceAll(`/`, path.sep);
                }

                actions.RELAY.ShowOpenDialog(dialogOptions, this._OnPicked);

            } else {
                this._Cancel();
            }
        } else {
            this._Open(this._context);
        }

    }

    _OnPicked(p_response) {

        if (p_response.canceled) {
            this._Cancel();
            return;
        }

        this._Open(p_response.filePaths[0]);

    }

    _Open(p_filePath) {

        this._docPath = p_filePath;
        let document = this._FindDoc();

        if (document) {
            console.log(`document already exists!`);
            this._doc.currentData.CommitUpdate();
            this._doc.currentData.ClearDirty();
            this._RequestEdit();
            return;
        }

        document = this._GetDoc();

        document.Load({
            success: this._OnReadSuccess,
            error: this._Fail,
            bumpOnly:this._bumpOnly
        });

    }

    _OnReadSuccess(p_doc) {
        this._doc.currentData.CommitUpdate();
        this._doc.currentData.ClearDirty();
        this._RequestEdit();
    }

    _Fail(p_msg) {
        this._ClearDocumentAndData();
        super._Fail(p_msg);
    }

}

module.exports = CommandDocumentLoad;