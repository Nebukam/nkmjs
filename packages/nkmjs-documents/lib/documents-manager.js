'use strict';

const u = require("@nkmjs/utils");
const col = require("@nkmjs/collections");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const actions = require("@nkmjs/actions");
const env = require("@nkmjs/environment");

const CMD_TYPE = require(`./commands/cmd-type`);
const CTX = require(`./context`);
const AutosaveHandler = require(`./helpers/autosave-handler`);

/**
 * Helper class that hold windows data and help sort out ipcMessaging between windows
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof documents
 */
class DOCUMENTS extends com.Observable {// PORT_TO_MODULE

    constructor() { super(); }

    _Init() {
        super._Init();

        this._definitions = [];

        this._dataMap = new col.DictionaryList();
        this._rscMap = new col.DictionaryList();
        this._defaultCommands = new col.KDictionary();

        this._documents = [];
        this._dirtyDocuments = [];

        this._documentObserver = new com.signals.Observer();
        this._documentObserver
            .Hook(data.SIGNAL.DIRTY, this._OnDocDirty, this)
            .Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDocDirtyCleared, this);

        this._autosaveHandler = new AutosaveHandler(this);

    }

    _RegisterDefaultCommand(p_type, p_cmd) {
        this._defaultCommands.Set(p_type, p_cmd.docType, p_cmd.dataType, p_cmd);
    }

    _TryGetDefaultCommand(p_type, p_doc) {
        if (!p_doc.currentData) { return null; }
        return this._defaultCommands.Get(p_type, p_doc.constructor, p_doc.currentData.constructor);
    }

    get lastDirtyDoc() { return this._dirtyDocuments.last; }

    HasUnsavedDocuments() {
        return !this._dirtyDocuments.length;
    }

    /**
     * @access private
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {data.DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */
    Get(p_options, p_forceNew = false) {

        let docClass, data, path;
        // First, check if data is set. If so, it should drive the type of document (if not set)
        data = p_options.data || null;
        docClass = p_options.document || null;
        path = u.SHORT(p_options.path) || null;

        if (data && !docClass) { docClass = com.GetBinding(CTX.DOCUMENT, data, null); }
        if (!docClass) { throw new Error(`Not enough options set to create a new document.`); }

        if (!p_forceNew) {
            let existingDoc = this.FindDocument(data, docClass, path);
            if (existingDoc) { return existingDoc; }
        }

        let doc = com.Rent(docClass);
        if (path) { doc.currentPath = path; }

        data = data || com.GetBinding(CTX.DOCUMENT_DATA, docClass, null);

        if (data) {
            if (u.isFunc(data)) { data = com.Rent(data); }
            doc.currentData = data;
        }

        return doc;

    }

    _CheckMatch(p_doc, p_data = null, p_docType = null, p_path = null) {


        //Check docType
        if (p_docType) {
            if (p_doc.constructor != p_docType) {
                // Type mismatch
                return false;
            }
            // If docType exists, there's a match
        }

        //Check data
        if (p_data) {
            if (u.isFunc(p_data)) {
                // Type mismatch
                if (!u.isInstanceOf(p_doc.currentData, p_data)) { return false; }
            } else {
                // Instance mismatch
                if (p_doc.currentData != p_data) { return false; }
            }

            // If data exists, there's a match.
        }

        if (p_path) {

            if (p_doc.currentPath != p_path) {
                if (p_doc.currentRsc) {
                    // Path mismatch, on resource
                    if (p_doc.currentRsc.path != p_path) { return false; }
                } else {
                    // Path mismatch, no resource to confirm
                    return false;
                }
            }

            // If path exists, there's a match
        }

        return true;

    }

    FindDocument(p_data = null, p_docType = null, p_path = null) {

        p_path = u.SHORT(p_path);

        for (let i = 0, n = this._documents.length; i < n; i++) {
            let doc = this._documents[i];
            if (this._CheckMatch(doc, p_data, p_docType, p_path)) { return doc; }
        }

        return null;

    }

    _MapToData(p_data, p_doc) { this._dataMap.Set(p_data, p_doc); }
    _UnmapFromData(p_data, p_doc) { this._dataMap.Remove(p_data, p_doc); }

    _MapToRsc(p_rsc, p_doc) { this._rscMap.Set(p_rsc, p_doc); }
    _UnmapFromRsc(p_rsc, p_doc) { this._rscMap.Remove(p_rsc, p_doc); }

    _Register(p_doc) {
        this._documents.Add(p_doc);
        this._documentObserver.Observe(p_doc);
    }
    _Unregister(p_doc) {
        this._documents.Remove(p_doc);
        this._dirtyDocuments.Remove(p_doc);
        this._documentObserver.Unobserve(p_doc);
    }

    _OnDocDirty(p_doc) { this._dirtyDocuments.Add(p_doc); }
    _OnDocDirtyCleared(p_doc) { this._dirtyDocuments.Remove(p_doc); }

    ToggleAutoSave(p_toggle, p_delay = null) {
        if (p_toggle) { this._autosaveHandler.Enable(p_delay); }
        else { this._autosaveHandler.Disable(); }
    }

}

module.exports = new DOCUMENTS();