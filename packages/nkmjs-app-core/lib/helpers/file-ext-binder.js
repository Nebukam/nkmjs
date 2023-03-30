'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require("@nkmjs/collections");
const data = require(`@nkmjs/data-core`);
const documents = require(`@nkmjs/documents`);
const datacontrols = require(`@nkmjs/ui-data-controls`);

class FileExtBinder extends com.pool.DisposableObjectEx {

    constructor(p_owner) {
        super();
        this._owner = p_owner;
    }

    _Init() {
        super._Init();
        this._bindings = new collections.DictionaryList();
        this._queue = [];
        this._currentItem = null;
        this._processing = false;
        this._definitions = [];

        documents.DOCUMENTS.Watch(data.SIGNAL.NO_ACTIVE_EDITOR, this._OnDocDataRoaming, this);

    }

    /**
     * { name:`EXT files`, extensions:['ext'] }
     * @param {Object} p_fileInfos 
     * @param {String} p_fileInfos.name Name of the file type
     * @param {Array} p_fileInfos.extensions An array containing extensions, without the '.'
     * { dataType:data.DataBlock, docType:documents.bound.JSONDocument }
     * @param {Object} p_documentInfos 
     * @param {*} p_documentInfos.dataType DataBlock to be saved in the document
     * @param {*} [p_documentInfos.docType] Defaults to documents.bound.JSONDocument
     * @returns 
     */
    AddDefinition(p_fileInfos, p_documentInfos, p_defaultEditor = null) {

        let
            dataType = p_documentInfos.dataType,
            docType = p_documentInfos.docType || documents.bound.JSONDocument;


        p_documentInfos = {
            docType: docType,
            dataType: dataType,
            fileInfos: { ...p_fileInfos }
        };

        let definition = documents.RegisterDefinition(p_documentInfos);

        p_fileInfos.extensions.forEach(ext => {
            this.Register(ext, (p_path) => { return definition.LoadCmd.Execute(p_path); });
        });

        com.helpers.BindingKit._InternalSetClass(dataType);
        com.helpers.BindingKit._InternalSetBinding(
            documents.CONTEXT.DOCUMENT,
            { key: dataType, binding: docType });

        if (p_defaultEditor) {
            com.helpers.BindingKit._InternalSetBinding(
                datacontrols.CONTEXT.DEFAULT_EDITOR,
                { key: dataType, binding: p_defaultEditor });
        }

        this._definitions.push(definition);

        return definition;

    }

    //#region Handler registration

    /**
     * Registers an extension/callback pair
     * Appends a '.' at the beginning of the extension if not present.
     * @param {String} p_ext 
     * @param {*} p_callback 
     */
    Register(p_ext, ...p_callbacks) {
        if (!p_ext || p_ext.trim() == ``) { throw new Error(`p_ext must be a string, got:${p_ext}`); }
        if (p_ext[0] != `.`) { p_ext = `.${p_ext}`; }
        p_callbacks.forEach(cb => { this._bindings.Set(p_ext, cb); });
    }

    /**
     * Process a list of string and check if they look like valid paths,
     * queue valid items and returns by advancing the queue.
     * @param  {...any} entries 
     * @returns Returns true if any entry was valid and processed, otherwise false.
     */
    Process(...entries) {
        let
            keys = this._bindings.keys,
            queued = false;
            
        entries.forEach(entry => {
            let valid = false;
            keys.forEach(key => {
                if (!entry.includes(key)) { return; }
                //Make sure the path finishes with the extension to avoid situation where
                //an additional extension might be appended at the end
                if (entry.substr(entry.length - key.length) == key) {
                    if (this._Queue(entry, key, false)) { queued = true; }
                }
            });
        });

        if (this._processing) { return queued; }
        return queued ? this._AdvanceQueue() : false;
    }

    _Queue(p_path, p_key, p_advance = true) {
        for (let i = 0, n = this._queue.length; i < n; i++) {
            if (this._queue[i].path == p_path) { return false; }
        }

        this._queue.push({ path: p_path, key: p_key });
        if (p_advance) { return this._AdvanceQueue(); }
        return false;
    }

    /**
     * Execute registered callbacks in order, feedback the
     * return value of each callback to the next
     * @returns 
     */
    _AdvanceQueue() {

        if (this._processing || !this._queue.length) { return false; }

        this._processing = true;
        this._currentItem = this._queue[0];

        let cbs = this._bindings.Get(this._currentItem.key);
        if (!cbs || !cbs.count) { return this._ShiftQueue(); }

        let piped = this._currentItem.path;
        console.log(`Processing path -> `, piped);
        for (let i = 0, n = cbs.count; i < n; i++) {
            let cb = cbs.At(i);
            piped = u.Call(cb, piped);
            if (!piped) { return this._ShiftQueue(); }
        }

        return this._ShiftQueue();

    }

    _ShiftQueue() {
        this._queue.shift();
        return this._AdvanceQueue() ? false : true;
    }

    //#endregion

    _OnDocDataRoaming(p_document) {
        if (!p_document.currentData) { return; }
        let dataType = p_document.currentData.constructor;
        //Retrieve document handler
        for (let i = 0, n = this._definitions.length; i < n; i++) {
            let definition = this._definitions[i];
            if (definition.docInfos.dataType == dataType) {
                definition.ReleaseCmd.Execute(p_document.currentData);
                return;
            }
        }
    }

}

module.exports = FileExtBinder;