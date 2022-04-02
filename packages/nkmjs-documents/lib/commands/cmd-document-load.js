
const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");

const CommandDocumentBase = require(`./cmd-document-base`);

class CommandDocumentLoad extends CommandDocumentBase {
    constructor() { super(); }

    static __defaultName = `Save document`;
    static __defaultIcon = `save`;

    _Init() {
        super._Init();

        this._Bind(this._Success);
        this._Bind(this._Fail);
        this._Bind(this._OnPicked);
        //this._Bind(this._OnReadError);
        this._Bind(this._OnReadSuccess);
    }

    _InternalExecute() {

        if (u.isVoid(this._context) ||
            !u.isString(this._context)) {

            if (nkm.env.isNodeEnabled) {

                actions.RELAY.ShowOpenDialog({
                    filters: [{ ...this._fileInfos }],
                    properties: ['openFile']
                }, this._OnPicked);
                
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
        let document = this._GetDoc();
        document.Load({
            success: this._OnReadSuccess,
            error: this._Fail,
        });

    }

    _OnReadSuccess(p_doc) {
        this._doc.currentData.CommitUpdate();
        this._RequestEdit();
    }

    _Fail(p_msg) {
        this._ClearDocumentAndData();
        super._Fail(p_msg);
    }

}

module.exports = CommandDocumentLoad;