
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");

const IDS = require(`../ids`);
const DOCUMENTS = require(`../documents-manager`);

class CommandDocumentBase extends actions.Command {
    constructor() { super(); }

    static __defaultName = `New document`;
    static __defaultIcon = `new`;

    static __docType = null;
    static __dataType = null;
    static __fileInfos = { name: `File type`, extensions: ['.file'] };

    _Init() {
        super._Init();
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

    _GetDoc() {
        
        let document = DOCUMENTS.Get({
            data: this._dataType,
            document: this._docType,
            path: this._docPath
        });

        this._doc = document;

        return document;

    }

    _FindDoc() {
        let document = DOCUMENTS.FindDocument(this._context, this._docType);
        this._doc = document;
        return document;
    }

    _RequestEdit() {
        actions.Emit(
            actions.REQUEST.EDIT,
            { data: this._doc.currentData },
            this, this._Success, this._Fail);
    }

    _End() {
        this._doc = null;
        super._End();
    }

    _ClearDocumentAndData() {
        if (!this._doc) { return; }
        if (this._doc.currentData) { this._doc.currentData.Release(); }
        if (!com.NFOS.GetOption(this._doc, IDS.DATA_BOUND, false)) { this._doc.Release(); }
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