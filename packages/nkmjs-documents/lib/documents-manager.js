'use strict';

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const CONTEXT = require(`./context`);

/**
 * Helper class that hold windows data and help sort out ipcMessaging between windows
 * @class
 * @hideconstructor
 * @augments common.helper.SingletonEx
 * @memberof documents
 */
class DOCUMENTS extends com.helpers.SingletonEx {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._dataMap = new collections.DictionaryList();
        this._documents = new collections.List();
        this._dirtyDocuments = new collections.List();

        this._documentObserver = new com.signals.Observer();
        this._documentObserver
            .Hook(data.SIGNAL.DIRTY, this._OnDocDirty, this)
            .Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDocDirtyCleared, this);

    }

    static HasUnsavedDocuments() {
        return !this._dirtyDocuments.isEmpty;
    }

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {data.DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */
    static Get(p_options) { return this.instance._Get(p_options); }

    /**
     * @access private
     * @param {object} p_options 
     * @param {object} p_options.path Document's resource path
     * @param {Document|Function} p_options.document Document object or constructor
     * @param {data.DataBlock|Function} p_options.data DataBlock object or constructor
     * @returns {Document}
     */
    _Get(p_options) {

        let docClass, data, path;
        // First, check if data is set. If so, it should drive the type of document (if not set)
        data = p_options.data || null;
        docClass = p_options.document || null;
        path = p_options.path || null;

        if (data && !docClass) { docClass = com.BINDINGS.Get(CONTEXT.DOCUMENT, data, null); }
        if (!docClass) { throw new Error(`Not enough options set to create a new document.`); }

        docClass = com.Rent(docClass);
        if (path) { docClass.currentPath = path; }

        data = data || com.BINDINGS.Get(CONTEXT.DOCUMENT_DEFAULT_DATA, docClass, null);

        if (data) {
            if (u.isFunc(data)) { data = com.Rent(data); }
            docClass.currentData = data;
        }

        return docClass;

    }

    static FindDocument(p_data, p_docType = null) {
        return this.instance._FindDocument(p_data, p_docType);
    }

    _FindDocument(p_data, p_docType = null) {

        let list = this._dataMap.Get(p_data);

        console.log(p_data, p_docType);
        console.log(list, this._dataMap);

        if (!list || list.length == 0) { return null; }
        if (!p_docType) { return list[0]; }

        for (let i = 0; i < list.length; i++) {
            let doc = list[i];
            if (u.isInstanceOf(doc, p_docType)) {
                return doc;
            }
        }

        return null;

    }

    _RegisterDataDoc(p_data, p_document) {
        this._dataMap.Set(p_data, p_document);
        this._documentObserver.Observe(p_document);
    }

    _UnregisterDataDoc(p_data, p_document) {
        this._dataMap.Remove(p_data, p_document);
        this._documentObserver.Unobserve(p_document);
    }

    _Register(p_doc) { this._documents.Add(p_doc); }
    _Unregister(p_doc) { this._documents.Remove(p_doc); }

    _OnDocDirty(p_doc) { this._dirtyDocuments.Add(p_doc); }
    _OnDocDirtyCleared(p_doc) { this._dirtyDocuments.Remove(p_doc); }

}

module.exports = DOCUMENTS;