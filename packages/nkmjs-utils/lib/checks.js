
'use strict';

const toString = Object.prototype.toString;

/**
 * CHECKS is a wrapper class that contains a bunch of utilitary static methods
 * focusing on type-checking.
 * @class
 * @hideconstructor
 * @memberof utils
 */
class CHECKS {

    /**
     * @description Determine if a value is an Array
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    static isArray(p_value) { return Array.isArray(p_value); }

    /**
     * @description Determine if a value is an ArrayBuffer
     * @param {object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    static isArrayBuffer(p_value) {
        return toString.call(p_value) === '[object ArrayBuffer]';
    }

    /**
     * @description Determine if a value is an Object
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    static isSymbol(p_value) { return typeof p_value === 'symbol'; }

    /**
     * @description Determine if a value is an Object
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    static isObject(p_value) { return p_value !== null && typeof p_value === 'object'; }

    /**
     * @description Determine if a value is a Function
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Function, otherwise false
     */
    static isFunc(p_value) { return typeof p_value === 'function'; }

    /**
     * @description Determine if a value is a string
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an string, otherwise false
     */
    static isString(p_value) { return typeof p_value === 'string'; }

    /**
     * @description Determine if a value is a Number
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Number, otherwise false
     */
    static isNumber(p_value) { return typeof p_value === 'number'; }

    /**
     * @description Determine if a string value is a valid hexadecimal number
     * @param {*} p_value The value to test
     * @returns {Number} True if string is a valid hex value, otherwise false
     */
    static isHex(p_value, p_pad = 0) {
        if (!this.isString(p_value)) { return false; }
        let result = parseInt(p_value, 16);
        return (result.toString(16).padStart(p_pad, `0`) === p_value.toLowerCase());
    }

    /**
     * @description Determine if a value is a Boolean
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    static isBool(p_value) { return typeof p_value === 'boolean'; }

    /**
     * @description Determine if a value is undefined
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is undefined, otherwise false
     */
    static isUndefined(p_value) { return typeof p_value === 'undefined'; }

    /**
     * @description Determine if a value is either undefined or null
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is either undefined or null, otherwise false
     */
    static isVoid(p_value) { return (typeof p_value === 'undefined' || p_value === null); }

    /**
     * @description Determine if a (source) Class or Instance of a constructor is an instance of another (target) Class 
     * or Instance of a given Class.     *
     * @param {Object|Function} p_source The value to test
     * @param {Object|Function} p_target The value to test against 
     * @returns {boolean} True if p_source is or extends target type, otherwise false
     */
    static isInstanceOf(p_source, p_target) {

        if (this.isVoid(p_source)
            || this.isVoid(p_target)) {
            return false;
        }

        let AisFunc = (typeof p_source) === 'function',
            BisFunc = (typeof p_target) === 'function';

        if (AisFunc && BisFunc && p_source === p_target) {
            return true;
        }

        let A = AisFunc ? p_source.prototype : p_source,
            B = BisFunc ? p_target : p_target.constructor;

        return A instanceof B;

    }


    /**
     * @description Determine if an object is empty
     * @param {*} p_value The value to test
     * @returns {boolean} True if p_value is empty, otherwise false
     */
    static isEmpty(p_value) {
        if (this.isVoid(p_value) || p_value === ``) {
            return true;
        }
        if (this.isArray(p_value)) { return p_value.length === 0; }
        if (this.isObject(p_value)) {
            for (let key in p_value) { return false; }
            return true;
        }
        return false;
    }

}

module.exports = CHECKS;