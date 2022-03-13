'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);


const __direct = Symbol(`direct`);
const __null = Symbol(`null`);

/**
 * A OptionHandler is an helper class to bind value update to callbacks & functions.
 * It is designed for objects that commonly accept an arbitrary set of options with
 * or without default values.
 * 
 * The OptionHandler uses a Map internally to ensure properties are processed in the order in
 * which their are hooked. *e.g, hook order matters*.
 * @class
 * @memberof common.helpers
 */
class OptionsDistribute {

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

    Setup(p_obj, p_defaults = null) {

        if (`_OnOptionsWillUpdate` in p_obj) {
            if (`_Bind` in p_obj) { p_obj._Bind(p_obj._OnOptionsWillUpdate); }
            else { p_obj._OnOptionsWillUpdate = p_obj._OnOptionsWillUpdate.bind(p_obj); }
        }

        if (`_OnOptionsUpdated` in p_obj) {
            if (`_Bind` in p_obj) { p_obj._Bind(p_obj._OnOptionsUpdated); }
            else { p_obj._OnOptionsUpdated = p_obj._OnOptionsUpdated.bind(p_obj); }
        }

        if (p_defaults) { this._defaults = p_defaults; }

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
    To(p_optionID, p_fn = null, p_default = undefined) {

        if (p_fn === null) { p_fn = __direct; }

        this._hooks.Set(p_optionID, p_fn);

        if (p_default != undefined) {
            if (!this._defaults) { this._defaults = {} }
            this._defaults[p_optionID] = p_default;
        }

        return this;
    }

    /**
     * @description Removes handlers associated with a given option ID
     * @param {string} p_optionID 
     * @param {Function|string} [p_fn]
     */
    UnHook(p_optionID, p_fn = null) {
        if (p_fn === null) { p_fn = __direct; }
        this._hooks.Remove(p_optionID, p_fn);

        return this;
    }

    /**
     * @description Process an option object and trigger associated callbacks with the option value
     * as well as the options themselves.
     * @param {*} p_target target object on which properties are set, and functions are called.
     * @param {object} p_options 
     * @param {object} p_altOptions an alternative set of options to forward to handlers (used when appending options)
     */
    Update(p_target, p_options, p_altOptions = null, p_callBegin = true, p_callWrapUp = true) {

        if (p_callBegin && this._beginFn) { this._beginFn(p_options, p_altOptions, this._defaults); }

        let map = this._hooks._map,
            keys = map.keys(),
            kn = map.size,
            hooks;

        for (let k = 0; k < kn; k++) {

            let key = keys.next().value,
                value = key in p_options ? p_options[key] : this._defaults && key in this._defaults ? this._defaults[key] : __null;

            if (value === __null) { continue; }

            hooks = map.get(key);

            for (let i = 0, n = hooks.length; i < n; i++) {
                let fn = hooks[i];
                if (fn === __direct) { p_target[key] = value; }
                else if (u.isString(fn)) { p_target[fn] = value; }
                else { fn(value, p_altOptions); }
            }

        }

        if (p_callWrapUp && this._wrapUpFn) { this._wrapUpFn(p_options, p_altOptions, this._defaults); }
    }

    /**
     * @description Process an option object and trigger associated callbacks with the option value
     * as well as the options themselves. Process only existing properties and does not assign defaults.
     * Lookup properties based on hooked values only. Does not trigger begin/end callbacks
     * @param {*} p_target target object on which properties are set, and functions are called.
     * @param {object} p_options 
     * @param {object} p_altOptions an alternative set of options to forward to handlers (used when appending options)
     */
    ProcessExistingOnly(p_target, p_options, p_altOptions = null, p_callBegin = true, p_callWrapUp = true) {

        if (p_callBegin && this._beginFn) { this._beginFn(p_options, p_altOptions, this._defaults); }

        let map = this._hooks._map,
            keys = map.keys(),
            kn = map.size,
            hooks;

        for (let k = 0; k < kn; k++) {

            let key = keys.next().value,
                value = key in p_options ? p_options[key] : __null;

            if (value === __null) { continue; }

            hooks = map.get(key);

            for (let i = 0, n = hooks.length; i < n; i++) {
                let fn = hooks[i];
                if (fn === __direct) { p_target[key] = value; }
                else if (u.isString(fn)) { p_target[fn] = value; }
                else { fn(value, p_altOptions, this._defaults); }
            }

        }

        if (p_callWrapUp && this._wrapUpFn) { this._wrapUpFn(p_options, p_altOptions, this._defaults); }

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

        if (p_wrapUp && this._wrapUpFn) { this._wrapUpFn(p_others, null, this._defaults); }

    }

    /**
     * @access private
     * @param {*} p_options 
     */
    WrapUp(p_options) {
        if (this._wrapUpFn) { this._wrapUpFn(p_options, null, this._defaults); }
    }

    /**
     * @description Resets the handler, removing all registered hooks.
     */
    Clear() {
        this._hooks.Clear();
        this._defaults = null;
    }

}

module.exports = OptionsDistribute;