
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");

const IDS = require(`../ids`);
const DOCUMENTS = require(`../documents-manager`);
const Document = require(`../document`);

const CMD_TYPE = require(`./cmd-type`);

class CommandDocumentBase extends actions.Command {
    constructor() { super(); }

    static __defaultName = `New document`;
    static __defaultIcon = `new`;

    static __docCmdType = null;
    static __docType = null;
    static __dataType = null;
    static __fileInfos = { name: `File type`, extensions: ['.file'] };

    static Rent(p_options, p_registerAsDefault = false) {
        let newCmd = actions.Command.Rent(
            this,
            p_options.name || null,
            p_options.icon || null);

        newCmd.docType = p_options.docType || null;
        newCmd.dataType = p_options.dataType || null;
        newCmd.fileInfos = p_options.fileInfos || null;

        if (p_registerAsDefault && this.__docCmdType != null) {
            //Register as default command within
            DOCUMENTS.instance._RegisterDefaultCommand(
                this.__docCmdType,
                newCmd);
        }

        return newCmd;
    }

    _Init() {
        super._Init();

        this._Bind(this._Fail);
        this._Bind(this._Success);

        this._doc = null;
        this._docType = this.constructor.__docType;
        this._dataType = this.constructor.__dataType;
        this._fileInfos = this.constructor.__fileInfos;
        this._docPath = null;
    }

    get docType() { return this._docType; }
    set docType(p_value) { this._docType = p_value || this.constructor.__docType; }

    get dataType() { return this._dataType; }
    set dataType(p_value) { this._dataType = p_value || this.constructor.__dataType; }

    get fileInfos() { return this._fileInfos; }
    set fileInfos(p_value) { this._fileInfos = p_value || this.constructor.__fileInfos; }

    _FindDoc() {

        if (u.isInstanceOf(this._context, Document)) {
            this._doc = this._context;
            return this._doc;
        }

        this._doc = DOCUMENTS.FindDocument(
            this._context || this._dataType,
            this._docType,
            this._docPath
        );

        return this._doc;

    }

    _GetDoc(p_forceNew = false) {

        this._doc = DOCUMENTS.Get({
            data: this._dataType,
            document: this._docType,
            path: this._docPath
        }, p_forceNew);

        return this._doc;

    }

    _FetchContext() {
        return this._context ? this._context : this._emitter ? this._emitter.data : null;
    }

    _RequestEdit() {
        actions.Emit(
            actions.REQUEST.EDIT,
            { data: this._doc.currentData },
            this, this._Success, this._Fail);
    }

    _End() {
        this._doc = null;
        this._docPath = null;
        super._End();
    }

    _ClearDocumentAndData(p_clearResource = false) {

        if (!this._doc) { return; }

        let rsc = this._doc.currentRsc,
            data = this._doc.currentData,
            dataBound = com.NFOS.GetOption(this._doc, IDS.DATA_BOUND, false);

        if (p_clearResource && rsc) { rsc.Release(); }
        if (data) { data.Release(); }
        if (dataBound) { this._doc.Release(); }

    }

    _CleanUp() {
        this._doc = null;
        this._docType = this.constructor.__docType;
        this._dataType = this.constructor.__dataType;
        this._fileInfos = this.constructor.__fileInfos;
        super._CleanUp();
    }

}

module.exports = CommandDocumentBase;