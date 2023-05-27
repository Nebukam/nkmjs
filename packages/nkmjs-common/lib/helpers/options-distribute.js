'use strict';

const u = require("@nkmjs/utils");

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

        this._indices = {};
        this._hooks = []; // [ ['id','set','default'],[],[],...]

        this._defaults = p_defaults;
        this._beginFn = p_beginFn;
        this._wrapUpFn = p_wrapUpFn;
    }

    static Ext(p_source, p_config = null) {

        if (u.isFunc(p_source)) { p_source = p_source.__distribute; }

        let newDistribute = new OptionsDistribute();

        if (p_source) {
            newDistribute._indices = { ...p_source._indices };
            newDistribute._hooks = [...p_source._hooks];
            newDistribute._beginFn = p_source._beginFn;
            newDistribute._wrapUpFn = p_source._wrapUpFn;
        }

        if (p_config) {
            newDistribute._wrapUpFn = p_config.wrapUpFn || newDistribute._wrapUpFn;
            newDistribute._beginFn = p_config.beginFn || newDistribute._beginFn;
        }

        return newDistribute;

    }

    Ext(p_config = null) { return OptionsDistribute.Ext(this, p_config); }

    Attach(p_object, p_member = `options`) {
        let distributor = this;
        Object.defineProperty(
            p_object,
            p_member,
            {
                set(p_value) {
                    if (!p_value) { return; }
                    distributor.Update(this, p_value);
                },
                enumerable: true,
                configurable: true,
            });
    }

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
    To(p_optionID, p_fn = null, p_default = undefined, p_staticTargetMember = null) {

        if (p_fn === null) { p_fn = __direct; }

        let hook = null;
        if (p_optionID in this._indices) {
            hook = this._hooks[this._indices[p_optionID]];
        } else {
            hook = [p_optionID, undefined, null];
            this._indices[p_optionID] = this._hooks.length;
            this._hooks.push(hook);
        }

        hook[1] = p_fn;
        hook[2] = p_staticTargetMember;

        if (p_default != undefined) {
            if (!this._defaults) { this._defaults = {} }
            this._defaults[p_optionID] = p_default;
        }

        return this;
    }

    Move(p_optionID) {
        if (p_optionID in this._indices) {
            let hook = this._hooks[this._indices[p_optionID]];
            this._hooks.splice(this._indices[p_optionID], 1);
            this._hooks.push(hook);

            let index = 0;
            for (const h of this._hooks) { this._indices[h[0]] = index++; }
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

        if (!p_options) { return; }

        if (p_callBegin) { this._Begin(p_target, p_options, p_altOptions); }

        for (let i = 0, n = this._hooks.length; i < n; i++) {

            let hook = this._hooks[i],
                key = hook[0],
                fn = hook[1],
                val = __null,
                staticMember = hook[2];

            if (key in p_options) { val = p_options[key]; }
            else if (staticMember) { val = p_target.constructor[staticMember]; }
            else if (this._defaults && key in this._defaults) { val = this._defaults[key]; }

            if (val == __null) { continue; }

            if (fn == __direct) { p_target[key] = val; }
            else if (u.isString(fn)) { p_target[fn] = val; }
            else { u.Call(fn, p_target, val, p_altOptions); }

        }

        if (p_callWrapUp) { this._WrapUp(p_target, p_options, p_altOptions); }
    }

    /**
     * @description Process an option object and trigger associated callbacks with the option value
     * as well as the options themselves. Process only existing properties and does not assign defaults.
     * Lookup properties based on hooked values only. Does not trigger begin/end callbacks
     * @param {*} p_target target object on which properties are set, and functions are called.
     * @param {object} p_options 
     * @param {object} p_altOptions an alternative set of options to forward to handlers (used when appending options)
     */
    UpdateNoDefaults(p_target, p_options, p_altOptions = null, p_callBegin = true, p_callWrapUp = true) {

        if (!p_options) { return; }

        if (p_callBegin) { this._Begin(p_target, p_options, p_altOptions); }

        for (let i = 0, n = this._hooks.length; i < n; i++) {

            let hook = this._hooks[i],
                key = hook[0],
                fn = hook[1],
                val = __null;

            if (key in p_options) { val = p_options[key]; }
            if (val == __null) { continue; }

            if (fn == __direct) { p_target[key] = val; }
            else if (u.isString(fn)) { p_target[fn] = val; }
            else { u.Call(fn, p_target, val, p_altOptions); }

        }

        if (p_callWrapUp) { this._WrapUp(p_target, p_options, p_altOptions); }

    }

    /**
     * @description Process a single option.  
     * Will not call `beginFn`.
     * @param {*} p_target 
     * @param {string} p_optionID 
     * @param {*} p_optionValue 
     * @param {*} p_others An alternative set of options.
     * @param {boolean} p_callWrapUp whether or not to wrap-up option call 
     */
    UpdateSingle(p_target, p_optionID, p_optionValue, p_others = null, p_callWrapUp = false) {


        let hook = null;

        if (p_optionID in this._indices) { hook = this._hooks[this._indices[p_optionID]]; }
        else { return; }

        let fn = hook[1];

        if (fn == __direct) { p_target[p_optionID] = p_optionValue; }
        else if (u.isString(fn)) { p_target[fn] = p_optionValue; }
        else { u.Call(fn, p_target, p_optionValue, p_altOptions); }

        if (p_callWrapUp) { this._WrapUp(p_target, p_others); }

    }

    /**
     * @access private
     * @param {*} p_options 
     */
    _Begin(p_target, p_options, p_altOptions = null) {
        if (!this._beginFn) { return; }
        if (u.isString(this._beginFn)) { p_target[this._beginFn](p_options, p_altOptions, this._defaults); }
        else { this._beginFn(p_options, p_altOptions, this._defaults); }
    }

    /**
     * @access private
     * @param {*} p_options 
     */
    _WrapUp(p_target, p_options, p_altOptions = null) {
        if (!this._wrapUpFn) { return; }
        if (u.isString(this._wrapUpFn)) { p_target[this._wrapUpFn](p_options, p_altOptions, this._defaults); }
        else { this._wrapUpFn(p_options, p_altOptions, this._defaults); }
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