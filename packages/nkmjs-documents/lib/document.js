'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);

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

    static __NFO__ = {
        [com.IDS.ICON]: `document`,
        resource: io.Resource,
        encoding: io.ENCODING.UTF8,
        serializationContext: data.serialization.CONTEXT.NONE,
        defaultIOType: io.IO_TYPE.DEFAULT
    };

    _Init() {

        super._Init();

        this._currentPath = null;
        this._currentRsc = null;
        this._options = null;
        this._isDirty = false;

        this._callbacks = new com.helpers.Callbacks();

        this._resourceObserver = new com.signals.Observer();
        this._resourceObserver.Hook(com.SIGNAL.RELEASED, this._OnRscReleased, this);
        this._resourceObserver.Hook(io.IO_SIGNAL.READ_COMPLETE, this._OnReadComplete, this);
        this._resourceObserver.Hook(io.IO_SIGNAL.WRITE_START, this._OnWriteStart, this);

        this._dataObserver = new com.signals.Observer();
        this._dataObserver.Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this);
        this._dataObserver.Hook(data.SIGNAL.DIRTY, this._OnDataDirty, this);
        this._dataObserver.Hook(data.SIGNAL.DIRTY_CLEARED, this._OnDataCleaned, this);

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

    /**
     * @description TODO
     * @type {string}
     */
    get currentPath() { }
    set currentPath(p_value) {

        p_value = u.PATH.SHORT(p_value);

        if (this._currentPath === p_value) { return; }

        this._currentPath = p_value;

        if (!u.isEmpty(p_value) && this._currentRsc) {
            if (this._currentRsc.path != p_value) {
                // Current resource doesn't have the provided path : unlink it.
                // Document will fetch the correct resource when required.
                this._currentRsc = null;
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

        let oldRsc = this._currentRsc; //TODO : Take a stance on what to do with the old resource.
        this._currentRsc = p_value;
        if (oldRsc) { this._resourceObserver.Unobserve(oldRsc); }
        if (p_value) {
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
        if (oldData) { this._dataObserver.Unobserve(oldData); }
        if (p_value) {
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
        this._Broadcast(data.SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty() {
        if (!this._isDirty) { return; }
        this._isDirty = false;
        this._Broadcast(data.SIGNAL.DIRTY_CLEARED, this);
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

    _OnDataReleased(p_data) { this.data = null; }

    _OnDataDirty(p_data) {
        this.Dirty();
    }

    _OnDataCleaned(p_data) {
        this.ClearDirty();
    }

    // ----> Load

    /**
     * @description TODO
     * @param {object} p_options 
     */
    Load(p_options = null) {

        let nfo = com.NFOS.Get(this),
            rsc = this._GetRsc(
                u.tils.Get(p_options, `path`, null),
                { cl: nfo.resource, encoding: nfo.encoding });

        if (!rsc) { throw new Error(`No resource set.`); }
        if (rsc.Read({
            io: u.tils.Get(p_options, `io`, nfo.defaultIOType),
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
        this.currentData = this._Unpack(p_rsc.content, this._currentData);
        this._callbacks.OnSuccess(this).Clear();
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
            com.NFOS.Get(this).serializationContext), // TODO : Fetch serialization context based on resource type instead ?
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

        let nfo = com.NFOS.Get(this),
            rsc = this._GetRsc(
                u.tils.Get(p_options, `path`, null),
                { cl: nfo.resource, encoding: nfo.encoding });

        if (!rsc) {
            throw new Error(`No resource set.`);
        }

        if (rsc.Write({
            io: u.tils.Get(p_options, `io`, nfo.defaultIOType),
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
            com.NFOS.Get(this).serializationContext); // TODO : Fetch serialization context based on resource type instead ?

        return serializer.Serialize(p_data, this._options);
    }

    // ----> Delete

    /**
     * @description TODO
     * @param {object} p_options 
     */
    Delete(p_options = null) {

    }

    _CleanUp() {

        this.currentRsc = null;
        this._currentPath = null;
        this._options = null;

        super._CleanUp();

    }

}

module.exports = Document;