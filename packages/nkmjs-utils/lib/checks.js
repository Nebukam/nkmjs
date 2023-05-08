
'use strict';

const toString = Object.prototype.toString;

/**
 * CHECKS is a wrapper class that contains a bunch of utilitary methods
 * focusing on type-checking.
 * @class
 * @hideconstructor
 * @memberof utils
 */
module.exports = {

    /**
     * @description Determine if a value is an Array
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Array, otherwise false
     */
    isArray: function (p_value) { return Array.isArray(p_value); },

    /**
     * @description Determine if a value is an ArrayBuffer
     * @param {object} val The value to test
     * @returns {boolean} True if value is an ArrayBuffer, otherwise false
     */
    isArrayBuffer: function (p_value) {
        return toString.call(p_value) === '[object ArrayBuffer]';
    },

    /**
     * @description Determine if a value is an Object
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    isSymbol: function (p_value) { return typeof p_value === 'symbol'; },

    /**
     * @description Determine if a value is an Object
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Object, otherwise false
     */
    isObject: function (p_value) { return p_value !== null && typeof p_value === 'object'; },

    /**
     * @description Determine if a value is a Function
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Function, otherwise false
     */
    isFunc: function (p_value) { return typeof p_value === 'function'; },

    /**
     * @description Determine if a value is a string
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an string, otherwise false
     */
    isString: function (p_value) { return typeof p_value === 'string'; },

    /**
     * @description Determine if a value is a Number
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is an Number, otherwise false
     */
    isNumber: function (p_value) { return typeof p_value === 'number'; },

    /**
     * @description Determine if a string value is a valid hexadecimal number
     * @param {*} p_value The value to test
     * @returns {Number} True if string is a valid hex value, otherwise false
     */
    isHex: function (p_value, p_pad = 0) {
        if (!module.exports.isString(p_value)) { return false; }
        let result = parseInt(p_value, 16);
        return (result.toString(16).padStart(p_pad, `0`) === p_value.toLowerCase());
    },

    /**
     * @description Determine if a value is a Boolean
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is a Boolean, otherwise false
     */
    isBool: function (p_value) { return typeof p_value === 'boolean'; },

    /**
     * @description Determine if a value is undefined
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is undefined, otherwise false
     */
    isUndefined: function (p_value) { return typeof p_value === 'undefined'; },

    /**
     * @description Determine if a value is either undefined or null
     * @param {*} p_value The value to test
     * @returns {boolean} True if value is either undefined or null, otherwise false
     */
    isVoid: function (p_value) { return (typeof p_value === 'undefined' || p_value === null); },

    /**
     * @description Determine if a (source) Class or Instance of a constructor is an instance of another (target) Class 
     * or Instance of a given Class.     *
     * @param {Object|Function} p_source The value to test
     * @param {Object|Function} p_target The value to test against 
     * @returns {boolean} True if p_source is or extends target type, otherwise false
     */
    isInstanceOf: function (p_source, p_target) {

        if (module.exports.isVoid(p_source)
            || module.exports.isVoid(p_target)) {
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

    },


    /**
     * @description Determine if an object is empty
     * @param {*} p_value The value to test
     * @returns {boolean} True if p_value is empty, otherwise false
     */
    isEmpty: function (p_value) {
        if (module.exports.isVoid(p_value) || p_value === ``) {
            return true;
        }
        if (module.exports.isArray(p_value)) { return p_value.length === 0; }
        if (module.exports.isObject(p_value)) {
            for (let key in p_value) { return false; }
            return true;
        }
        return false;
    },

    isContentEqual: function (p_a, p_b) {
        // compare array lengths, if not equal then skip.
        if (p_a.length !== p_b.length) return false;

        // setup a variable of the array length
        let i = p_a.length;

        // iterate through every element in arr1 basically...
        while (i--) {
            // if arr2 doesn't include x element from arr1, return false
            if (!p_b.includes(p_a[i])) return false;

            // passes tests and checks out
        };
        return true;
    },

}