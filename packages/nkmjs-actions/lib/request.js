'use strict';

const com = require("@nkmjs/common"); //{ POOL, Disposable }

const RELAY = require(`./relay`);

/**
 * @description
 * A Request object to be consumed by whatever object is listening to its request type.
 * You can use ```nkm.actions.Emit()``` to create & dispatch an app-wide request.
 * @class
 * @hideconstructor
 * @augments common.helpers.OptionObject
 * @memberof actions 
 */
class Request extends com.helpers.OptionsObject {
    constructor() { super(); }

    /**
     * @description TODO
     * @param {*} p_requestType 
     * @param {object} [p_options] 
     * @param {*} [p_emitter] 
     * @param {function} [p_onSuccess] 
     * @param {function} [p_onFail] 
     * @param {number} [p_timeout] 
     * @param {constructor} [p_requestClass] 
     * @param {boolean} [p_global] 
     */
    static Emit(p_requestType,
        p_options = null,
        p_emitter = null,
        p_onSuccess = null,
        p_onFail = null,
        p_timeout = 0,
        p_requestClass = Request,
        p_global = true) {
        let request = com.Rent(p_requestClass);
        request.requestType = p_requestType;
        request.emitter = p_emitter;

        request.onFail = p_onFail;
        request.onSuccess = p_onSuccess;
        request.timeout = p_timeout;

        request.options = p_options;

        if (p_global) {
            RELAY.HandleRequest(request);
        }

        return request;

    }

    _Init() {
        super._Init();
        this._emitter = null;
        this._requestType = null;
        this._handled = false;
        this._handler = null;
        this._onFail = null;
        this._onSuccess = null;
        this._timeout = 0;
        this._life = 0;
        this._failReason = ``;

    }

    /**
     * @description TODO
     * @type {*}
     */
    get requestType() { return this._requestType; }
    set requestType(p_value) { this._requestType = p_value; }

    /**
     * @description TODO
     * @type {*}
     */
    get emitter() { return this._emitter; }
    set emitter(p_value) { this._emitter = p_value; }

    /**
     * @description TODO
     * @type {function}
     */
    get onSuccess() { return this._onSuccess; }
    set onSuccess(p_value) { this._onSuccess = p_value; }

    /**
     * @description TODO
     * @type {function}
     */
    get onFail() { return this._onFail; }
    set onFail(p_value) { this._onFail = p_value; }

    /**
     * @access protected
     * @description TODO
     */
    _Success() {
        if (this._onSuccess) {
            this._onSuccess.call(this._emitter, this);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_reason 
     */
    _Fail(p_reason) {
        this._failReason = p_reason ? p_reason : `undocumented`;
        console.warn(`Request failed :: ${this._failReason}`);
        if (this._onFail) {
            this._onFail.call(this._emitter, this);
        }
    }

    /**
     * @description TODO
     * @type {number}
     */
    get timeout() { return this._timeout; }
    set timeout(p_value) { this._timeout = p_value; }

    /**
     * @description TODO
     * @type {number}
     */
    get life() { return this._life; }
    set life(p_value) { this._life = p_value; }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_value) { this._options = p_value; }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get failReason() { return this._failReason; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isHandled() { return this._handled; }

    /**
     * @description TODO
     * @param {*} p_handler 
     */
    HandleSuccess(p_handler) {
        if (this._handled) { throw new Error(`A request may not be handled twice.`); }
        this._handled = true;
        this._handler = p_handler;
        this._Success();
    }

    /**
     * @description TODO
     * @param {*} p_reason 
     */
    HandleFail(p_reason) {
        this._Fail(p_reason);
    }

    _CleanUp() {

        this._emitter = null;
        this._requestType = null;
        this._options = null;
        this._handled = false;
        this._handler = null;
        this._onFail = null;
        this._onSuccess = null;
        this._timeout = 0;
        this._life = 0;

        super._CleanUp();
    }

    toString() {
        let type = (this._requestType && `toString` in this._requestType) ? this._requestType.toString() : this._requestType,
            from = this._emitter ? this._emitter.constructor.name : `---`;

        return `${type} (from '${from}')`;
    }

}

module.exports = Request;