'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);


const __direct = Symbol(`direct`);

/**
 * A OptionHandler is an helper class to bind value update to callbacks & functions.
 * It is designed for objects that commonly accept an arbitrary set of options with
 * or without default values.
 * @class
 * @memberof common.helpers
 */
class OptionsHandler {

    /**
     * @description TODO
     * @param {function} [p_wrapUpFn] 
     * @param {function} [p_beginFn] 
     * @param {function} [p_defaults] 
     */
    constructor(p_wrapUpFn = null, p_beginFn = null, p_defaults = null) {
        this._hooks = new collections.DictionaryList();
        this._defaults = p_defaults;
        this._beginFn = p_beginFn;
        this._wrapUpFn = p_wrapUpFn;
    }

    /**
     * @description Default options values
     * @type {object}
     */
    set defaults(p_value) { this._defaults = p_value; }
    get defaults() { return this._defaults; }

    /**
     * @description A unique function to be called before the option
     * handler starts its update cycle.  
     * That callback will be provided with the input options allowing
     * for some preparations or alterations.
     * @type {function}
     */
    set beginFn(p_value) { this._beginFn = p_value; }
    get beginFn() { return this._beginFn; }

    /**
     * @description A unique function to be called when the option
     * handler is done processing its update cycle.  
     * The callback will be provided with the input options allowing
     * for some wrap-up operations to take place.
     */
    set wrapUpFn(p_value) { this._wrapUpFn = p_value; }
    get wrapUpFn() { return this._wrapUpFn; }

    /**
     * @description Hook an option ID to a function or member ID.
     * @param {string} p_optionID 
     * @param {Function|string} [p_fn] If left null, the hook is assumed to be a setter
     * with the same name as the optionID.
     * @param {*} [p_default]
     */
    Hook(p_optionID, p_fn = null, p_default = undefined) {

        if (p_fn === null) { p_fn = __direct; }

        this._hooks.Set(p_optionID, p_fn);

        if (p_default != undefined) {
            if (!this._defaults) { this._defaults = {} }
            this._defaults[p_optionID] = p_default;
        }

    }

    /**
     * @description Removes handlers associated with a given option ID
     * @param {string} p_optionID 
     * @param {Function|string} [p_fn]
     */
    UnHook(p_optionID, p_fn = null) {
        if (p_fn === null) { p_fn = __direct; }
        this._hooks.Remove(p_optionID, p_fn);
    }

    /**
     * @description Process an option object and trigger associated callbacks with the option value
     * as well as the options themselves.
     * @param {*} p_target target object on which properties are set, and functions are called.
     * @param {object} p_options 
     * @param {object} p_altOptions an alternative set of options to forward to handlers (used when appending options)
     */
    Process(p_target, p_options, p_altOptions = null) {

        if (this._beginFn) { this._beginFn(p_options, p_altOptions); }

        if (this._defaults) {
            for (let key in this._defaults) {
                if (!(key in p_options)) { // Force defaults
                    p_options[key] = this._defaults[key];
                }
            }
        }

        if(!p_altOptions){ p_altOptions = p_options; }

        for (let key in p_options) {

            let callList = this._hooks.Get(key),
                value = p_options[key];

            if (!callList) { continue; }

            for (let i = 0, n = callList.length; i < n; i++) {
                let fn = callList[i];

                if (fn === __direct) {
                    p_target[key] = value;
                    continue;
                }

                if (u.isString(fn)) { // Consider string property setters
                    p_target[fn] = value;
                } else {
                    fn(value, p_altOptions);
                }
            }
        }

        if (this._wrapUpFn) { this._wrapUpFn.call(null, p_altOptions); }
    }

    /**
     * @description Process a single option.  
     * Will not call `beginFn`.
     * @param {*} p_target 
     * @param {string} p_optionID 
     * @param {*} p_optionValue 
     * @param {*} p_others An alternative set of options.
     * @param {boolean} p_wrapUp whether or not to wrap-up option call 
     */
    ProcessSingle(p_target, p_optionID, p_optionValue, p_others = null, p_wrapUp = false) {

        let callList = this._hooks.Get(p_optionID);

        if (callList === __direct) {
            p_target[p_optionID] = p_optionValue;
            return;
        }

        if (!callList) { return; }

        for (let i = 0, n = callList.count; i < n; i++) {
            let fn = callList.At(i);
            if (u.isString(fn)) { // Consider string property setters
                p_target[fn] = p_optionValue;
            } else {
                fn(p_optionValue, p_others);
            }
        }

        if (p_wrapUp && this._wrapUpFn) { this._wrapUpFn.call(null, p_others); }

    }

    /**
     * @access private
     * @param {*} p_options 
     */
    WrapUp(p_options) {
        if (this._wrapUpFn) { this._wrapUpFn.call(null, p_options); }
    }

    /**
     * @description Resets the handler, removing all registered hooks.
     */
    Clear() {
        this._hooks.Clear();
        this._defaults = null;
    }

}

module.exports = OptionsHandler;