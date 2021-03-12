'use strict';

const DisposableObjectEx = require(`../pool/disposable-object-ex`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof common.filters
 */
class Filter extends DisposableObjectEx {

    constructor() {
        super();
        this._checkFn = this._Bind(this.Check);
        this._invert = false;
    }

    /**
     * @description TODO
     */
    static ACCEPTED = Symbol(`accepted`);

    /**
     * @description TODO
     */
    static DENIED = Symbol(`denied`);

    /**
     * @description TODO
     * @type {function}
     */
    set checkFn(p_value) { this._checkFn = p_value; }
    get checkFn() { return this._checkFn; }

    /**
     * @description TODO
     * @type {boolean}
     */
    set invert(p_value) { this._invert = p_value; }
    get invert() { return this._invert; }

    /**
     * @description TODO
     * @param {*} p_obj 
     */
    Check(p_obj) {
        return this._Accept(p_obj);
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    _Accept(p_obj) {
        if (!this._invert) {
            this._Broadcast(Filter.ACCEPTED, p_obj);
            return true;
        } else {
            this._Broadcast(Filter.DENIED, p_obj);
            return false;
        }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    _Deny(p_obj) {

        if (!this._invert) {
            this._Broadcast(Filter.DENIED, p_obj);
            return false;
        } else {
            this._Broadcast(Filter.ACCEPTED, p_obj);
            return true;
        }
    }

}

module.exports = Filter;