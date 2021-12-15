'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const IO_SIGNAL = require(`./io-signal.js`);
const RESSOURCE_STATE = require(`./resource-state`);
const ResourceOperation = require(`./resource-operation`);
const RESPONSE_TYPE = require(`./response-type.js`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof io.core
 */
class Resource extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    /**
     * @access protected
     * @description TODO
     * @customtag static
     */
    static __defaultType = RESPONSE_TYPE.TEXT;

    _Init() {

        super._Init();

        this._name = null;
        this._path = null;
        this._mime = null;
        this._type = this.constructor.__defaultType;
        this._encoding = null;

        this._stats = null;
        this._exists = false;
        this._loaded = false;

        this._raw = null;
        this._content = null;

        this._directory = null;

        this._readFn = null;
        this._writeFn = null;
        this._deleteFn = null;
        this._renameFn = null;
        this._commitRnFn = null;
        this._deserializeFn = null;
        this._serializeFn = null;

        this._state = new com.helpers.StateMachine();
        this._state.currentState = RESSOURCE_STATE.NONE;
        this._state.owner = this;

        this._operation = null;
        this._releaseOnDeleteSuccess = false;

        this._readOperationConfig = {
            prepare: { state: RESSOURCE_STATE.READ_PENDING },
            start: { state: RESSOURCE_STATE.READING, evt: IO_SIGNAL.READ_START },
            progress: { state: RESSOURCE_STATE.READING, evt: IO_SIGNAL.READ_PROGRESS },
            error: { state: RESSOURCE_STATE.NONE, evt: IO_SIGNAL.READ_ERROR },
            success: { state: RESSOURCE_STATE.READY, evt: IO_SIGNAL.READ_COMPLETE, fn: this._Bind(this._OnReadSuccess) }
        }

        this._writeOperationConfig = {
            prepare: { state: RESSOURCE_STATE.WRITE_PENDING },
            start: { state: RESSOURCE_STATE.WRITING, evt: IO_SIGNAL.WRITE_START, fn: this._Bind(this._OnWriteStart) },
            progress: { state: RESSOURCE_STATE.WRITING, evt: IO_SIGNAL.WRITE_PROGRESS },
            error: { state: RESSOURCE_STATE.NONE, evt: IO_SIGNAL.WRITE_ERROR },
            success: { state: RESSOURCE_STATE.READY, evt: IO_SIGNAL.WRITE_COMPLETE }
        }

        this._renameOperationConfig = {
            prepare: { state: RESSOURCE_STATE.RENAME_PENDING },
            start: { state: RESSOURCE_STATE.RENAMING, evt: IO_SIGNAL.RENAME_START },
            progress: { state: RESSOURCE_STATE.RENAMING, evt: IO_SIGNAL.RENAME_PROGRESS },
            error: { state: RESSOURCE_STATE.NONE, evt: IO_SIGNAL.RENAME_ERROR },
            success: { state: RESSOURCE_STATE.READY, evt: IO_SIGNAL.RENAME_COMPLETE }
        }

        this._deleteOperationConfig = {
            prepare: { state: RESSOURCE_STATE.DELETE_PENDING },
            start: { state: RESSOURCE_STATE.DELETING, evt: IO_SIGNAL.DELETE_START },
            progress: { state: RESSOURCE_STATE.DELETING, evt: IO_SIGNAL.DELETE_PROGRESS },
            error: { state: RESSOURCE_STATE.NONE, evt: IO_SIGNAL.DELETE_ERROR },
            success: { state: RESSOURCE_STATE.READY, evt: IO_SIGNAL.DELETE_COMPLETE, fn: this._Bind(this._OnDeleteSuccess) }
        }

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get loaded() { return this._loaded; }

    /**
     * @description TODO
     * @type {io.core.Resource}
     */
    get directory() { return this._directory; }
    set directory(p_value) {
        if (this._directory === p_value) { return; }
        let oldDir = this._directory;
        this._directory = p_value;
        this._OnDirectoryChanged(oldDir);
    }

    _OnDirectoryChanged(p_oldValue) {
        if (p_oldValue) { p_oldValue.Remove(this); }
        if (this._directory) { this._directory.Add(this); }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isDir() { return false; }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get name() { return this._name; }

    /**
     * @description TODO
     * @type {string}
     */
    get path() { return this._path; }
    set path(p_value) {
        if (this._path) { throw new Error(`Attempting to change the already set path of an rsc. Use Rename instead.`); }
        this._path = p_value;
        this._UpdatePathInfos();
    }

    /**
     * @description TODO
     * @type {MIMEDefinition}
     */
    get mime() { return this._mime; }
    set mime(p_value) { this._mime = p_value; }

    /**
     * @description TODO
     * @type {io.core.RESPONSE_TYPE}
     */
    get type() { return this._type; }
    set type(p_value) { this._type = p_value; }

    /**
     * @description TODO
     * @type {io.core.ENCODING}
     */
    get encoding() { return this._encoding; }
    set encoding(p_value) { this._encoding = p_value; }

    /**
     * @description TODO
     * @type {io.core.RESSOURCE_STATE}
     * @customtag read-only
     */
    get state() { return this._state.currentState; }

    /**
     * @description TODO
     * @type {object}
     */
    get stats() { return this._stats; }
    set stats(p_value) { this._stats = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     */
    get exists() { return this._exists; }
    set exists(p_value) { this._exists = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get loaded() { return this._loaded; }

    _UpdatePath(p_newPath) {
        let oldPath = this._path;
        this._path = p_newPath;
        this._UpdatePathInfos();
        this._commitRnFn(this, oldPath);
        this._OnPathUpdated(oldPath);
        this._Broadcast(IO_SIGNAL.RENAMED, this, oldPath);
    }

    _OnPathUpdated(p_oldPath) {

    }

    _UpdatePathInfos() {
        try { this._name = u.PATH.name(new URL(u.PATH.FULL(this._path)).pathname); }
        catch (err) { this._name = u.PATH.name(this._path); }

        if (!this._mime) { this._mime = u.MIME.Get(u.PATH.ext(this._path)); }
    }

    /**
     * @description TODO
     * @type {*}
     */
    get raw() { return this._raw; }
    set raw(p_value) { this._raw = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get content() { return this._content; }
    set content(p_value) { this._content = p_value; }

    // ----> OPERATIONS

    /**
     * @access private
     * @param {function} p_fn 
     * @param {object} p_states 
     * @param {object} p_options 
     * @param  {...any} args 
     */
    _PrepareOperation(p_fn, p_states, p_options = null, ...args) {

        if (this._state.IsNotAny(RESSOURCE_STATE.NONE, RESSOURCE_STATE.READY)) {
            console.warn(`Resource ${this} not in a state allowing operation`);
            return false;
        }

        this._operation = com.Rent(ResourceOperation);
        this._operation.Prepare(this, p_fn, p_states, p_options, args);
        return true;

    }

    /**
     * @description Cancels the ongoing operation, if any
     */
    CancelOperation() { if (this._operation) { this._operation.Cancel(); } }

    // ----> READ

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     * @param {boolean} p_options.important
     * @param {boolean} p_options.parallel
     */
    Read(p_options = null) {
        return this._PrepareOperation(
            this._readFn,
            this._readOperationConfig,
            p_options
        );
    }

    _OnReadSuccess() {
        this._loaded = true;
        this._content = this._Decode();
    }

    /**
     * @access protected
     * @description Deserialize is called by the IO system in order to get a readable 
     * version of the resource's content by the app.
     * @customtag override-me
     */
    _Decode() {
        if (!this._deserializeFn) {
            throw new Error(`Deserialize not implemented in resource. If you don't use a serializer, make sure to set Resource._deserializeFn.`);
        }
        return this._deserializeFn(this._raw, this);
    }

    // ----> WRITE

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     * @param {boolean} p_options.important
     */
    Write(p_options = null) {
        return this._PrepareOperation(
            this._writeFn,
            this._writeOperationConfig,
            p_options
        );
    }

    _OnWriteStart() { this._raw = this._Encode(); }

    /**
     * @access protected
     * @description Serialize is called by the IO system in order to get a 'raw', 
     * writable version of the resource's content.
     * @customtag override-me
     */
    _Encode() {
        if (!this._serializeFn) {
            throw new Error(`Serialize not implemented in resource. If you don't use a serializer, make sure to set Resource._serializeFn.`);
        }
        return this._serializeFn(this._content, this);
    }

    // ----> RENAME

    /**
     * @description TODO
     * @param {string} p_newPath 
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */
    Rename(p_newPath, p_options = null) {
        return this._PrepareOperation(
            this._renameFn,
            this._renameOperationConfig,
            p_options,
            p_newPath
        );
    }

    // ----> DELETE

    /**
     * @description TODO
     * @param {object} p_options 
     * @param {string} p_options.io IO_TYPE
     * @param {function} p_options.success
     * @param {function} p_options.error
     * @param {function} p_options.any
     */
    Delete(p_options = null) {
        return this._PrepareOperation(
            this._deleteFn,
            this._deleteOperationConfig,
            p_options
        );
    }

    /**
     * @description TODO
     */
    DeleteAndRelease() {
        this._releaseOnDeleteSuccess = true;
        return this._PrepareOperation(
            this._deleteFn,
            this._deleteOperationConfig,
            p_options
        );
    }

    _OnDeleteSuccess() {
        if (u.isInstanceOf(this._content, com.pool.DisposableObject)) { this._content.Release(); } // this might be dangerous
        this._content = null;
        this._raw = null;
        this._loaded = false;

        if (this._releaseOnDeleteSuccess) {
            this.Release();
        }
    }

    // ----> Cleanup

    _CleanUp() {

        if (this._operation) { this.CancelOperation(); }

        this._operation = null;

        this._name = null;
        this._path = null;
        this._mime = null;
        this._type = this.constructor.defaultType;
        this._encoding = null;

        this._stats = null;
        this._exists = false;
        this._loaded = false;

        this._raw = null;
        this._content = null;

        this._readFn = null;
        this._writeFn = null;

        this._readFn = null;
        this._writeFn = null;
        this._deleteFn = null;
        this._renameFn = null;
        this._commitRnFn = null;
        this._deserializeFn = null;
        this._serializeFn = null;

        this._releaseOnDeleteSuccess = false;

        this._state.currentState = RESSOURCE_STATE.NONE;

        super._CleanUp();
    }

    toString() { return `[${this.constructor.name}::${this.path}]`; }

}

module.exports = Resource;