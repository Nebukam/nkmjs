'use strict';

const u = require(`@nkmjs/utils`);

/**
 * A Simple "Key" objects that stores key-value pairs
 * and allows to quickly batch-replace keys within a string with their
 * registered values.
 * @class
 * @memberof common.helpers
 */

class Keys {
    constructor(
        p_source = null,
        p_defaults = null,
        p_tokenStart = '%',
        p_tokenEnd = '%') {

        this.__keys = {};
        this._tokenStart = p_tokenStart;
        this._tokenEnd = p_tokenEnd;

        if (p_defaults) {
            // Ensure some default key exists
            for (var key in p_defaults) {
                if (!this.__keys.hasOwnProperty(key)) {
                    this.__keys[key] = p_defaults[key];
                }
            }
        }

        if (p_source) { this._RecursiveFlatten(p_source); }

    }

    get keys() { return this.__keys; }

    Get(p_key) { return this.__keys[p_key]; }
    Set(p_key, p_value, p_resolveSelf = true) {
        this.__keys[p_key] = p_value;
        if (p_resolveSelf) { this._ResolveSelf(); }
    }

    /**
     * @access public
     * @description  Add any key:!array!object pair contained within the source object.
     * The following example object {A:"Value A", B:{ B_1:"Value B1", B_2:"Value B2" }}
     * will register the following keys:
     * {
     *      ["A"]:"Value A",
     *      ["B.B_1"]:"Value B1",
     *      ["B.B_2"]:"Value B2",
     * }
     * @param {*} p_object 
     */
    Push(p_object, p_resolveSelf = true) {
        this._RecursiveFlatten(p_object);
        if (p_resolveSelf) { this._ResolveSelf(); }
    }

    /**
     * @access protected
     * @description Recursively flatten all values within an object
     * @param {Object} p_object 
     * @param {String} p_path 
     */
    _RecursiveFlatten(p_object, p_path = null) {
        if (p_path === null) { p_path = ``; }
        else { p_path += `.`; }

        for (var key in p_object) {
            let value = p_object[key];
            if (u.isArray(value)) {

            } else if (u.isObject(value)) {
                if (value.hasOwnProperty(`fn`)) { this.__keys[`${p_path}${key}`] = value; }
                else { this._RecursiveFlatten(value, `${p_path}${key}`); }
            } else {
                this.__keys[`${p_path}${key}`] = value;
            }
        }
    }

    /**
     * @access protected
     * @description Resolve keys within registered values
     */
    _ResolveSelf() {
        for (var key in this.__keys) {
            let value = this.__keys[key];
            if (typeof value !== 'string') { continue; }
            this.__keys[key] = this.Replace(value);
        }
    }

    /**
     * @access public
     * @description Replaces any key formatted as `%KEY%` with its corresponding value if it exists
     * @param {String} p_string 
     * @param {Number} p_recursion 
     * @returns 
     */
    ReplaceAll(p_string, p_recursion = 3) {

        if (!p_string.includes(this._tokenStart) ||
            !p_string.includes(this._tokenEnd)) { return p_string; }

        p_recursion = Math.max(1, p_recursion);

        for (var i = 0; i < p_recursion; i++) {
            for (var key in this.__keys) {
                let value = this.__keys[key];
                if (u.isFunc(value) || u.isObject(value)) { value = u.Call(value); }
                p_string = p_string.replaceAll(`${this._tokenStart}${key}${this._tokenEnd}`, value);
            }
        }

        return p_string;

    }

}

module.exports = Keys;