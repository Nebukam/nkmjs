'use strict';

/**
 * @description A Singleton base class, for all your singleton needs. If your singleton needs to broadcast
 * signals, consider using `{@link common.helpers.SingletonEx}` instead.
 * @class
 * @hideconstructor
 * @memberof common.helpers
 */
class Singleton {

    constructor() {

        if(this.constructor.__instance){
            throw new Error(`Cannot create multiple instance of a singleton.`);
        }

        this.constructor.__instance = this;

        try {
            let w = window;
            this._isBrowser = true;
        } catch (e) {
            this._isBrowser = false;
        }

        this._Init();
        this._PostInit();

    }

    /**
     * @access protected
     * @description Holds the reference to the singleton instance.
     * @discreet
     */
    static __instance = null;

    /**
     * @description Return the reference to the singleton instance.
     * @type {common.helpers.Singleton}
     */
    static get instance() {
        if (!this.__instance) { new this(); }
        return this.__instance;
    }

    /**
     * @description Whether or not the code is executed in a browser context
     * @type {boolean}
     */
    get isBrowser() { return this._isBrowser; }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_func 
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    /**
     * @access protected
     * @description TODO
     */
    _Init() {

    }

    /**
     * @access protected
     * @description TODO
     */
    _PostInit() {

    }



}

module.exports = Singleton;