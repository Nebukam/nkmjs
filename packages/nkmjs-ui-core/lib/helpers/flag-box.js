'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { Dictionary, List, DictionaryList } = require(`@nkmjs/collections`);
const { RELAY, Request } = require(`@nkmjs/actions`);
const { SignalBox } = require(`@nkmjs/common`);

const { STYLE, CSS } = require(`@nkmjs/style`);

const UI = require(`../ui`);
const UI_FLAG = require("../ui-flag");

const __NULL = Symbol(`null`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class FlagBox {
    constructor() {
        this._elements = null;
        this._flags = new Dictionary();
    }

    // ----> Flags

    /**
     * @description Sets the current value of a given flag, and updates elements accordingly.
     * @param {string} p_flag 
     * @param {boolean} p_toggle 
     */
    Set(p_flag, p_toggle) {
        if (p_toggle) {
            this._flags.Set(p_flag, true);
            this.Apply(p_flag, true);
        } else {
            this._flags.Set(p_flag, false);
            this.Apply(p_flag, false);
        }
        return p_toggle;
    }

    /**
     * @description TODO
     * @param {string} p_flag 
     * @returns {boolean} Returns true if the given flag is currently set,  otherwise false.
     */
    IsSet(p_flag) {
        let flag = this._flags.Get(p_flag);
        if (!flag) { return false; }
        return flag;
    }

    /**
     * @description TODO
     * @param {string} p_flag 
     */
    Toggle(p_flag) {
        this.Set(p_flag, !this.IsSet(p_flag));
    }

    /**
     * @description Add an element to a set of possible flags. When any of the flags changes, the
     * element will be updated.
     * @param {Node} p_element 
     * @param  {...string} args 
     */
    Add(p_element, ...args) {
        if (!this._elements) { this._elements = new DictionaryList(); }
        //TODO : Check whether the flag is already active or not and apply it.
        for (let i = 0, n = args.length; i < n; i++) {
            this._elements.Set(args[i], p_element);
        }
    }

    /**
     * @description Removes an element from a possible set of flags.
     * @param {*} p_element 
     * @param  {...string} args 
     */
    Remove(p_element, ...args) {
        if (!this._elements) { return; }

        for (let i = 0, n = args.length; i < n; i++) {
            this._elements.Remove(args[i], p_element);
        }
    }

    /**
     * @description Add or remove a flag from the classList of elements currently subject to that flag.
     * @param {string} p_flag 
     * @param {boolean} p_toggle True to add to the flag, False to remove it.
     */
    Apply(p_flag, p_toggle) {

        if (!this._elements) { return; }
        let list = this._elements.Get(p_flag);

        if (!list) { return; }

        if (p_toggle) { for (let i = 0, n = list.length; i < n; i++) { list[i].classList.add(p_flag); } }
        else { for (let i = 0, n = list.length; i < n; i++) { list[i].classList.remove(p_flag); } }

    }

    /**
     * @description Update all the flags & subjected elements
     * @param {boolean} p_toggle 
     */
    ApplyAll(p_toggle) {
        if (!this._elements) { return; }
        let flagList = this._elements.keys;
        for (let i = 0, n = flagList.length; i < n; i++) {
            let flag = flagList[i],
                elList = this._elements.Get(flag);
            for (let e = 0, en = elList.length; e < en; e++) {
                if (p_toggle) { elList[e].classList.add(flag); }
                else { elList[e].classList.remove(flag); }
            }
        }
    }

    /**
     * @description Clear all flags & elements (wipe)
     */
    Clear() {
        this._flags.Clear();
        if (!this._elements) { return; }
        this._elements.Clear();
    }

}

module.exports = FlagBox;