'use strict';

const col = require(`@nkmjs/collections`);

/**
 * A Callbacks object is a very simple helper class that stores a list of functions
 * into three distinct categories that can be called in registration order, with the ability 
 * to empty the list after it has been traversed.  
 * 
 * It exists mostly to add semantic to the code and make it more readable in contexts
 * that behave the like of a Promise.
 * @class
 * @hideconstructor
 * @memberof common.helpers
 */
class Callbacks {

    constructor() {
        this._dispatching = false;
        this._resolved = [];
        this._rejected = [];
        this._finally = [];
    }

    /**
     * @description Registers an onSuccess function
     * @type {function}
     */
    set onSuccess(p_value) {
        if (this._dispatching) { return; }
        this._resolved.Add(p_value);
    }

    /**
     * @description Registers an onError function
     * @type {function}
     */
    set onError(p_value) {
        if (this._dispatching) { return; }
        this._rejected.Add(p_value);
    }

    /**
     * @description Registers an onAny function
     * @type {function}
     */
    set onAny(p_value) {
        if (this._dispatching) { return; }
        this._finally.Add(p_value);
    }

    /**
     * @description Add a set of callbacks
     * @param {object} p_options 
     * @param {function} p_options.success onSuccess
     * @param {function} p_options.error onError
     * @param {function} p_options.any onAny
     */
    Add(p_options) {
        if (!p_options || this._dispatching) { return this; }
        if (p_options.success) { this._resolved.Add(p_options.success); }
        if (p_options.error) { this._rejected.Add(p_options.error); }
        if (p_options.any) { this._finally.Add(p_options.any); }
        return this;
    }

    /**
     * @description Promise-looking OnSuccess add.
     * @param {function} p_fn 
     */
    then(p_fn) { this.onSuccess = p_fn; return this; }

    /**
     * @description Promise-looking OnError add.
     * @param {function} p_fn 
     */
    catch(p_fn) { this.onError = p_fn; return this; }

    /**
     * @description Promise-looking OnAny add.
     * @param {function} p_fn 
     */
    finally(p_fn) { this.onAny = p_fn; return this; }

    /**
     * @description Call all success handlers with provided arguments, then all 'any'
     * @param  {...any} args 
     */
    OnSuccess(...args) {
        if (this._dispatching) { return this; }
        this._Dispatch(this._resolved, ...args);
        this._Dispatch(this._finally, ...args);
        return this;
    }

    /**
     * @description Call all error handlers with provided arguments, then all 'any'
     * @param  {...any} args 
     */
    OnError(...args) {
        if (this._dispatching) { return this; }
        this._Dispatch(this._rejected, ...args);
        this._Dispatch(this._finally, ...args);
        return this;
    }

    /**
     * @access private
     * @param {*} p_list 
     * @param  {...any} args 
     */
    _Dispatch(p_list, ...args) {
        if (this._dispatching) { return; }
        this._dispatching = true;
        for (const fn of p_list) { fn.apply(null, args); }
        this._dispatching = false;
    }

    /**
     * @description Removes all callback handlers
     */
    Clear() {
        if (this._dispatching) { return this; }
        this._resolved.length = 0;
        this._rejected.length = 0;
        this._finally.length = 0;
        return this;
    }

}

module.exports = Callbacks;