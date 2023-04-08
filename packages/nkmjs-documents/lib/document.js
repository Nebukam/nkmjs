'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);

const IDS = require(`./ids`);
const DOCUMENTS = require(`./documents-manager`);

/**
 * A document is wrapper for a resource and a data object.
 * It aims at streamlining working with custom datatypes, reading & saving them.
 * 
 * It bridges a resource, a serializer and a data instance.
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof documents
 */
class Document extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    static __registerableType = true;

    static __NFO__ = {
        [com.IDS.ICON]: `document`,
        [IDS.TYPE_RSC]: io.Resource,
        [IDS.ENCODING]: io.ENCODING.UTF8,
        [IDS.SERIAL_CTX]: data.serialization.CONTEXT.NONE,
        [IDS.TYPE_IO]: io.IO_TYPE.DOCUMENT,
        [IDS.DATA_BOUND]: true
    };

    _Init() {

        super._Init();

        this._currentPath = null;
        this._currentRsc = null;
        this._options = null;
        this._isDirty = false;
        this._readOnce = false;
        this._updateDataOnEveryRead = false;

        this._callbacks = new com.helpers.Callbacks();

        this._resourceObserver = new com.signals.Observer();
        this._resourceObserver
            .Hook(com.SIGNAL.RELEASED, this._OnRscReleased, this)
            .Hook(io.IO_SIGNAL.READ_COMPLETE, this._OnReadComplete, this)
            .Hook(io.IO_SIGNAL.WRITE_START, this._OnWriteStart, this);

        this._dataObserver = new com.signals.Observer();
        this._dataObserver
            .Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this)
            .Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this)
            .Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDataCleaned, this)
            .Hook(data.SIGNAL.NO_ACTIVE_EDITOR, this._OnDataNoActiveEditor, this)
            .Hook(data.SIGNAL.ACTIVE_EDITOR_GAIN, this._OnDataActiveEditorGain, this);

        this._Bind(this._OnLoadError);
        this._Bind(this._OnSaveError);
        this._Bind(this._OnSaveSuccess);

    }

    /*
        Whatever property is set has pre-sceance over the other.
        If you choose to set a path, if there is a resource set and it doesn't match 
        the provided path, it will be set to null.
        If you choose to set a resource, the path will be set to that resource's path.
    */

    get title() {
        let docName = ``;
        if (this._currentData) {
            docName = `${this._currentData}`;
            if (this._currentData.id) { docName = this._currentData.id.name; }
            if (docName == ``) { docName = `${this._currentData}`; }
        }
        return docName;
    }

    get updateDataOnEveryRead() { return this._updateDataOnEveryRead; }
    set updateDataOnEveryRead(p_value) { this._updateDataOnEveryRead = p_value; }

    /**
     * @description TODO
     * @type {string}
     */
    get currentPath() { return this._currentPath; }
    set currentPath(p_value) {

        p_value = u.SHORT(p_value);

        if (this._currentPath === p_value) { return; }

        this._currentPath = p_value;

        if (!u.isEmpty(p_value) && this._currentRsc) {
            if (this._currentRsc.path != p_value) {
                // Current resource doesn't have the provided path : unlink it.
                // Document will fetch the correct resource when required.
                this.currentRsc = null;
            }
        }

    }

    /**
     * @description TODO
     * @type {io.core.Resource}
     */
    get currentRsc() { return this._currentRsc; }
    set currentRsc(p_value) {

        if (this._currentRsc === p_value) { return; }

        this._readOnce = false;

        let oldRsc = this._currentRsc; //TODO : Take a stance on what to do with the old resource.
        this._currentRsc = p_value;
        if (oldRsc) {
            if (this.constructor.__registerableType) {
                DOCUMENTS.instance._MapToRsc(oldRsc, this);
            }
            this._resourceObserver.Unobserve(oldRsc);
        }
        if (p_value) {
            if (this.constructor.__registerableType) {
                DOCUMENTS.instance._UnmapFromRsc(p_value, this);
            }
            this._resourceObserver.Observe(p_value);
            this.currentPath = p_value.path; // Only update path if we're provided with a valid resource.
        }

    }

    /**
     * @description TODO
     * @type {io.core.DataBlock}
     */
    get currentData() { return this._currentData; }
    set currentData(p_value) {

        if (this._currentData === p_value) {
            if (p_value) {
                if (p_value.isDirty) { this.Dirty(); }
                else { this.ClearDirty(); }
            }
            return;
        }

        let oldData = this._currentData;
        this._currentData = p_value;
        if (oldData) {
            if (this.constructor.__registerableType) {
                DOCUMENTS.instance._UnmapFromData(oldData, this);
            }
            this._dataObserver.Unobserve(oldData);
        }
        if (p_value) {
            if (this.constructor.__registerableType) {
                DOCUMENTS.instance._MapToData(p_value, this);
            }
            this._dataObserver.Observe(p_value);
            // Dirty document if data is dirty
            if (p_value.isDirty) { this.Dirty(); }
            else { this.ClearDirty(); }
        }

    }

    /**
     * @description True if the DataBlock is dirty, otherwise false
     * @type {boolean} 
     * @customtag read-only
     */
    get isDirty() { return this._isDirty; }

    /**
     * @description TODO
     */
    Dirty() {
        if (this._isDirty) { return; }
        this._isDirty = true;
        this.Broadcast(data.SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty() {
        if (!this._isDirty) { return; }
        this._isDirty = false;
        this.Broadcast(data.SIGNAL.DIRTY_CLEARED, this);
    }

    // ----> RSC Management

    _GetRsc(p_path = null, p_options = null) {

        // Override existing path if one is provided
        if (p_path) { this.currentPath = p_path; }

        if (!this._currentRsc) {
            // No resource currently set, fetch it.
            if (u.isEmpty(this._currentPath)) { throw new Error(`Empty path.`); }
            this.currentRsc = io.RESOURCES.Get(this._currentPath, p_options);
        }

        return this._currentRsc;

    }

    _OnRscReleased(p_rsc) { this.currentRsc = null; }

    // ----> Data Management

    _OnDataReleased(p_data) {
        this.currentData = null;
        if (com.NFOS.GetOption(this, IDS.DATA_BOUND, false)) {
            this.Release();
        }
    }

    _OnDataDirty(p_data) { this.Dirty(); }

    _OnDataCleaned(p_data) { this.ClearDirty(); }

    _OnDataActiveEditorGain(p_data) {
        if (com.NFOS.GetOption(this, IDS.DATA_BOUND, false)) {

        }
    }

    _OnDataNoActiveEditor(p_data) {
        if (com.NFOS.GetOption(this, IDS.DATA_BOUND, false)) {
            DOCUMENTS.instance.Broadcast(data.SIGNAL.NO_ACTIVE_EDITOR, this);
        }
    }

    // ----> Load

    /**
     * @description TODO
     * @param {object} p_options 
     */
    Load(p_options = null) {

        this._readOnce = false;

        let nfo = com.NFOS.Get(this),
            rsc = this._GetRsc(
                u.tils.Get(p_options, `path`, null),
                { cl: nfo.resource, encoding: nfo[IDS.ENCODING] });

        if (!rsc) { throw new Error(`No resource set.`); }

        if (rsc.Read({
            io: u.tils.Get(p_options, `io`, nfo[IDS.TYPE_IO]),
            error: this._OnLoadError
        })) {
            this._options = p_options; // Store options to forward them to the serializer
            this._callbacks.Add(p_options);
            return true;
        } else {
            return false;
        }

    }

    _OnLoadError(p_err) {
        console.error(p_err);
        p_err.document = this;
        this._callbacks.OnError(p_err).Clear();
    }

    /**
     * @access protected
     * @description Use the resource's unserialized content to rebuild
     * a typed data object through this document's serializer
     * @param {*} p_rsc
     */
    _OnReadComplete(p_rsc) {

        if (!this._updateDataOnEveryRead && this._readOnce && this.currentData) {
            // Do not update existing data.
        } else {
            this.currentData = this._Unpack(p_rsc.content, this._currentData);
        }

        this._callbacks.OnSuccess(this).Clear();
        this._readOnce = true;

    }

    /**
     * @access protected
     * @description Called when the linked ressource has successfully loaded.
     * Use the serializer in __NFO__ to unserialize resource
     * @access protected
     * @param {*} p_content 
     * @param {*} [p_data]
     */
    _Unpack(p_content, p_data = null) {
        // If data already exists, attempt to unserialize into existing data.
        // Otherwise, create a new data !
        // SomeSerializer.Read( p_rsc.content )
        let serializer = com.BINDINGS.Get(
            data.serialization.CONTEXT.SERIALIZER,
            com.NFOS.GetOption(this, IDS.SERIAL_CTX)), // TODO : Fetch serialization context based on resource type instead ?
            unpacked = serializer.Deserialize(p_content, p_data, this._options);

        this.Dirty();

        return unpacked;

    }

    // ----> Save

    /**
     * @description TODO
     * @param {object} p_options 
     */
    Save(p_options = null) {

        if (!this._currentData) {
            throw new Error(`No data.`);
        }

        let nfo = com.NFOS.Get(this);

        let rsc = this._GetRsc(
            u.tils.Get(p_options, `path`, null),
            { cl: nfo[IDS.TYPE_RSC], encoding: nfo[IDS.ENCODING] });

        if (!rsc) {
            throw new Error(`No resource set.`);
        }

        if (rsc.Write({
            io: u.tils.Get(p_options, `io`, nfo[IDS.TYPE_IO]),
            error: this._OnSaveError,
            success: this._OnSaveSuccess
        })) {
            this._options = p_options; // Store options to forward them to the serializer
            this._callbacks.Add(p_options);
            return true;
        } else {
            return false;
        }

    }

    /**
     * @access private
     * @description Set the resource content to be serialized.
     * i.e : if the resource is a JSON Resource, the resource content is expect to be a { JSON }. 
     * @param {io.core.Resource} p_rsc 
     */
    _OnWriteStart(p_rsc) { p_rsc.content = this._Pack(this._currentData); }

    _OnSaveSuccess() {
        if (this._currentData) { this._currentData.ClearDirty(); }
        this.ClearDirty();
        this._callbacks.OnSuccess(this).Clear();
    }

    _OnSaveError(p_err) {
        p_err.document = this;
        this._callbacks.OnError(p_err).Clear();
    }

    /**
     * @description Called when the ressource has started writing its data (not before)
     * Used as rsc._serializeFn
     * @param {*} p_data 
     */
    _Pack(p_data) {
        //Pack document data into serializable data
        let serializer = com.BINDINGS.Get(
            data.serialization.CONTEXT.SERIALIZER,
            com.NFOS.GetOption(this, IDS.SERIAL_CTX)); // TODO : Fetch serialization context based on resource type instead ?

        return serializer.Serialize(p_data, this._options);
    }

    // ----> Delete

    /**
     * @description TODO
     * @param {object} p_options 
     */
    Delete(p_options = null) {

    }

    Wake() {
        if (this.constructor.__registerableType) {
            DOCUMENTS.instance._Register(this);
        }
    }

    _CleanUp() {

        this._readOnce = false;
        this._updateDataOnEveryRead = false;
        
        this.currentData = null;
        this.currentRsc = null;
        this._currentPath = null;
        this._options = null;

        if (this.constructor.__registerableType) {
            DOCUMENTS.instance._Unregister(this);
        }

        super._CleanUp();

    }

}

module.exports = Document;