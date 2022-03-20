'use strict';

const uuid = require('uuid');
const CHECKS = require(`./checks`);

/**
 * UTILS is a wrapper class that contains a bunch of utilitary static methods.
 * These include type-checking, object manipulation, etc.
 * @class
 * @hideconstructor
 * @memberof utils
 */
class UTILS {

    constructor() { }

    static DELIM_PROTOCOL = `://`;
    static DELIM_DRIVE = `:/`;
    static DELIM_DIR = `/`;
    static DELIM_EXT = `.`;
    static DELIM_COLON = `:`;
    static DELIM_SEMI = `;`;
    static DELIM_COMMA = `,`;
    static DELIM_PIPE = `|`;

    static JSONStripEmpty(p_key, p_value) {
        if (CHECKS.isEmpty(p_value)) { return undefined; }
        if (CHECKS.isObject(p_value)) {
            for (let k in p_value) {
                if (p_value.hasOwnProperty(k)) {
                    return p_value;
                }
            }
            return undefined;
        }
        return p_value;
    }

    /**
     * @description Returns the first non-void value
     * @param {*} args A list of values to test
     * @returns {*} The first non-void value, otherwise null.
     */
    static Default(...args) {
        for (let i = 0, n = args.length; i < n; i++) {
            let val = args[i];
            if (!CHECKS.isVoid(val)) { return val; }
        }
        return null;
    }

    /**
     * @description Attempts to get the property value on a given object.
     * @param {object} p_obj The object to extract the property value from
     * @param {string} p_key The property's name
     * @param {*} p_fallback The fallback value that will be returned if the property cannot be found, 
     * or if its value is 'void'
     * @returns {*} The value, otherwise the provided fallback.
     */
    static Get(p_obj, p_key, p_fallback = null) {
        if (CHECKS.isVoid(p_obj)) { return p_fallback; }
        let val = p_obj[p_key];
        if (CHECKS.isVoid(val)) { return p_fallback; }
        else { return val; }
    }

    /**
     * Resolve a path
     * @param {*} p_obj 
     * @param  {...any} path 
     * @returns 
     */
    static GetPath(p_obj, p_fallback, ...path) {
        let value = p_obj;
        for (let i = 0, n = path.length; i < n; i++) {
            value = value[path[i]];
            if (!value) { return p_fallback; }
        }
        return value ? value : p_fallback;
    }

    /**
     * @description Ensure a value is set on a object.
     * @param {object} p_obj The target object
     * @param {string} p_key The property's name
     * @param {*} p_value The default value to set the property to if it does not exists
     */
    static Ensure(p_obj, p_key, p_value) {
        if (!(p_key in p_obj)) { p_obj[p_key] = p_value; }
        return p_obj;
    }

    /**
     * @description Ensure a value is set on a object.
     * @param {object} p_obj The target object
     * @param {object} p_kvp The property's name
     */
    static EnsureMultiple(p_obj, p_kvp) {
        for (let key in p_kvp) { if (!(key in p_obj)) { p_obj[key] = p_kvp[key]; } }
        return p_obj;
    }

    /**
     * @description Breaks down a path into an object to the following format :
     * {
     *      path:[catalog, catalog, ...],
     *      item:tailName,
     *      ext:extention,
     * }
     * @param {string} p_stringPath 
     */
    static ParsePath(p_stringPath) {

        if (CHECKS.isVoid(p_stringPath)) { return null; }

        let parseResult = {};

        let hasProtocol = p_stringPath.includes(this.DELIM_PROTOCOL);
        if (hasProtocol) {
            let protocolSplit = p_stringPath.split(this.DELIM_PROTOCOL);
            if (protocolSplit.length != 2) { throw new Error(`Path '${p_stringPath}' cannot be parsed (protocol malformed).`); }
            parseResult.protocol = protocolSplit[0] + this.DELIM_PROTOCOL;
            p_stringPath = protocolSplit[1];
        }

        let hasDrive = p_stringPath.includes(this.DELIM_DRIVE);
        if (hasDrive) {
            let driveSplit = p_stringPath.split(this.DELIM_DRIVE);
            if (driveSplit.length > 2) { throw new Error(`Path '${p_stringPath}' cannot be parsed (drive malformed).`); }
            parseResult.drive = driveSplit[0] + this.DELIM_PROTOCOL;
            p_stringPath = driveSplit[1];
        }

        let split = p_stringPath.split(this.DELIM_DIR),
            lastIndex = split.length - 1,
            fname = split[lastIndex],
            splitEx = fname.split(this.DELIM_EXT);

        split.splice(lastIndex, 1);

        for (let i = 0, n = split.length; i < n; i++) { if (split[i] === ``) { split.splice(i, 1); i--; } }

        parseResult.path = split.join(this.DELIM_DIR) + this.DELIM_DIR;
        parseResult.pathArray = split;
        parseResult.name = splitEx[0];
        parseResult.ext = this.DELIM_EXT + splitEx[splitEx.length - 1];

        return parseResult;

    }

    /**
     * @description Replaces ``\`` with `/`
     * @param {string} p_string The string to sanitize
     * @returns {string} Sanitized string
     */
    static FixSlash(p_string) {
        return p_string.split('\\').join('/');
    }

    /**
     * @description Checks whether a value is not equal to any of the provided ones
     * @param {*} p_value The value to test
     * @param {*} args The values to test against
     * @returns {boolean} False if any of the args values equals the test value, otherwise true.
     */
    static isNot(p_value, ...args) {
        for (let i = 0, n = args.length; i < n; i++) {
            if (args[i] === p_value) { return false; }
        }
        return true;
    }

    /**
     * @description Appends the value of an Object into another. 
     * First-level properties only, no overwriting.
     * @param {object} p_base The base object to append into
     * @param {object} p_source The reference object to fetch values from
     * @returns {object} The p_base object
     */
    static Append(p_base, p_source) {

        if (CHECKS.isVoid(p_base)) { p_base = {}; }
        if (CHECKS.isVoid(p_source)) { return p_base; }
        for (let member in p_source) {
            if (p_base.hasOwnProperty(member)) { continue; }
            p_base[member] = p_source[member];
        }
        return p_base;
    }

    /**
     * @description Copy values from p_source currently missing in p_base.
     * Merge object properties
     * @param {*} p_base 
     * @param {*} p_source 
     * @param {number} p_mergeArrays 0 doesn't merge, -1 unshifts missing values, 1 pushes them.
     */
    static SetMissing(p_base, p_source, p_mergeArrays = 0) {

        for (let key in p_source) {
            let sourceValue = p_source[key];
            if (!(p_base.hasOwnProperty(key))) {
                if (CHECKS.isArray(sourceValue)) {
                    p_base[key] = [...sourceValue];
                } else if (CHECKS.isObject(sourceValue)) {
                    p_base[key] = this.SetMissing({}, sourceValue);
                } else {
                    p_base[key] = sourceValue;
                }
            } else {
                let baseValue = p_base[key];
                if (CHECKS.isArray(baseValue)) {
                    if (CHECKS.isArray(sourceValue) && p_mergeArrays !== 0) {
                        for (let i = 0, n = sourceValue.length; i < n; i++) {
                            if (!baseValue.includes(sourceValue[i])) {
                                if (p_mergeArrays < 0) { baseValue.unshift(sourceValue[i]); }
                                else { baseValue.push(sourceValue[i]); }
                            }
                        }
                    }
                } else if (CHECKS.isObject(baseValue) && CHECKS.isObject(sourceValue)) {
                    this.SetMissing(baseValue, sourceValue);
                } else {
                    // Ignore
                }
            }
        }

        return p_base;

    }

    /**
     * @description Set values from p_source to p_base, overriding existing values.
     * Merge objects properties.
     * @param {*} p_base 
     * @param {*} p_source 
     */
    static SetOverwrite(p_base, p_source) {

        for (let key in p_source) {
            let sourceValue = p_source[key];
            if (!(p_base.hasOwnProperty(key))) {
                if (CHECKS.isArray(sourceValue)) {
                    p_base[key] = sourceValue;
                } else if (CHECKS.isObject()) {
                    p_base[key] = sourceValue;
                } else {
                    p_base[key] = sourceValue;
                }
            } else {
                let baseValue = p_base[key];
                if (CHECKS.isArray(baseValue)) {
                    p_base[key] = sourceValue;
                } else if (CHECKS.isObject(sourceValue)) {
                    if (CHECKS.isObject(baseValue)) { this.SetOverwrite(baseValue, sourceValue); }
                    else { p_base[key] = sourceValue; }
                } else {
                    p_base[key] = sourceValue;
                }
            }
        }

        return p_base;

    }

    /**
     * @description Add missing content from p_source into p_base (no duplicates)
     * @param {array} p_base 
     * @param {array} p_source 
     * @param {int} p_mode <0 unshift, >=0 push
     * @returns {array}
     */
    static MergeArray(p_base, p_source, p_mode = 1) {

        if (!p_base) {
            p_base = [];
            if (!p_source) { return p_base; }
            p_base = [...p_source];
            return p_base;
        }

        if (!p_source || p_source.length === 0) { return p_base; }

        if (p_mode >= 0) {
            for (let i = 0, n = p_source.length; i < n; i++) {
                let sourceValue = p_source[i];
                if (!p_base.includes(sourceValue)) { p_base.push(sourceValue); }
            }
        } else {
            for (let i = 0, n = p_source.length; i < n; i++) {
                let sourceValue = p_source[i];
                if (!p_base.includes(sourceValue)) { p_base.unshift(sourceValue); }
            }
        }


        return p_base;
    }

    /**
     * @description Clone an Object.
     * @param {object} p_base The base object to clone
     * @returns {object} Clone of p_base
     */
    static Clone(p_base) {
        if (!CHECKS.isObject(p_base)) { throw new Error(`Cannot Clone the non-object '${p_base}'`); }
        let clone = {};
        for (let member in p_base) {
            if (!p_base.hasOwnProperty(member)) { continue; }
            let value = p_base[member];
            if (value != null) {
                if (CHECKS.isArray(value)) { value = this.CloneArray(value); }
                else if (CHECKS.isObject(value)) { value = this.Clone(value); }
            }
            clone[member] = value;
        }
        return clone;
    }

    /**
     * @description Clone an Array.
     * Recursive.
     * @param {array} p_base The base object to clone
     * @returns {array} Clone of p_base
     */
    static CloneArray(p_base) {
        if (!CHECKS.isArray(p_base)) { throw new Error(`Cannot CloneArray the non-array '${p_base}'`); }
        let arr = [];
        for (let i = 0, n = p_base.length; i < n; i++) {
            let arrValue = p_base[i];
            if (arrValue != null) {
                if (CHECKS.isArray(arrValue)) { arrValue = this.CloneArray(arrValue); }
                else if (CHECKS.isObject(arrValue)) { arrValue = this.Clone(arrValue); }
            }
            arr.push(arrValue);
        }
        return arr;
    }

    /**
     * @description Split a 'CamelCase' string into a 'Camel Case' one
     * @param {string} p_string The string to split
     * @returns {string} Spaced string
     */
    static CamelSplit(p_string, p_spacer = ` `) { return p_string.replace(/([a-z0-9])([A-Z#])/g, `$1${p_spacer}$2`); }

    /**
     * @description Creates a diff of two array, and 'old' one and a 'new' one,
     * and outputs the result into two array (out & in) that must
     * be provided.
     * @param {array} p_oldArray The old array to compare p_newArray against
     * @param {array} p_newArray The new array to compare p_oldArray against
     * @param {array} p_out Empty Array, will be filled with the items 
     * that are present in p_oldArray, but not in p_newArray
     * @param {array} p_in Empty Array, will be filled with the items 
     * that are not in p_oldArray, but present in p_newArray
     */
    static ArrayDiff(p_oldArray, p_newArray, p_out, p_in) {
        //Checks the difference between old and new.
        //p_out is the items from oldArray not in the new one
        //p_int are the items from the newArray not in the old one

        if (CHECKS.isVoid(p_oldArray)) {
            if (CHECKS.isVoid(p_newArray)) { return; }
            //Everything in
            for (let i = 0, n = p_newArray.length; i < n; i++) {
                p_in.push(p_newArray[i]);
            }
            return;
        } else if (CHECKS.isVoid(p_newArray)) {
            if (CHECKS.isVoid(p_oldArray)) { return; }
            //Everything out
            for (let i = 0, n = p_oldArray.length; i < n; i++) {
                p_out.push(p_oldArray[i]);
            }
            return;
        }

        for (let i = 0, n = p_oldArray.length; i < n; i++) {
            let item = p_oldArray[i];
            if (!p_newArray.includes(item)) { p_out.push(item); }
        }
        for (let i = 0, n = p_newArray.length; i < n; i++) {
            let item = p_oldArray[i];
            if (!p_newArray.includes(item)) { p_in.push(item); }
        }
    }

    /**
     * @description Creates a diff of two array, and 'old' one and a 'new' one,
     * and call functions for each item that has been either added or removed
     * @param {array} p_oldArray The old array to compare p_newArray against
     * @param {array} p_newArray The new array to compare p_oldArray against
     * @param {array} p_outCallback Will be called each time an item
     * is present in p_oldArray, but not in p_newArray
     * @param {array} p_inCallback Will be called each time an item
     * is not in p_oldArray, but present in p_newArray
     */
    static ArrayDiffCallbacks(p_oldArray, p_newArray, p_outCallback, p_inCallback) {


        if (CHECKS.isVoid(p_oldArray)) {
            if (CHECKS.isVoid(p_newArray)) { return; }
            //Everything in
            for (let i = 0, n = p_newArray.length; i < n; i++) {
                p_inCallback(p_newArray[i], i);
            }
            return;
        } else if (CHECKS.isVoid(p_newArray)) {
            if (CHECKS.isVoid(p_oldArray)) { return; }
            //Everything out
            for (let i = 0, n = p_oldArray.length; i < n; i++) {
                p_outCallback(p_oldArray[i], i);
            }
            return;
        }

        for (let i = 0, n = p_oldArray.length; i < n; i++) {
            let item = p_oldArray[i];
            if (!p_newArray.includes(item)) {
                p_outCallback(item, i);
            }
        }
        for (let i = 0, n = p_newArray.length; i < n; i++) {
            let item = p_newArray[i];
            if (!p_oldArray.includes(item)) {
                p_inCallback(item, i);
            }
        }

    }

    /**
     * @description Checks the 'inheritance distance' between two Classe or Instances thereof.
     * p_to should be a 'distant child' of p_from, not the other way around.
     * @param {Object|class} p_from The base Class or Instance
     * @param {Object|class} p_to The target Class or Instance
     * @returns {number} The 'distance' if any, otherwise -1
     */
    static InheritanceDistance(p_from, p_to) {
        //Return -1 if no inheritance
        let dist = 0;
        if (!CHECKS.isInstanceOf(p_from, p_to)) { return -1; }

        let cl = Object.getPrototypeOf(p_from);

        while (cl != null && dist < 100) {
            if (cl === p_to) { return dist; }
            else { cl = Object.getPrototypeOf(cl); }
            dist++;
        }

        // Seriously, 100+ ?
        if (dist === 100) { console.warn(`InheritanceDistance reached 100 iterations. Stopping.`); }

        return -1;
    }

    /**
     * @description Deletes all properties on an a given object.
     * First-level properties only.
     * @param {object} p_obj The object to be emptied
     * @param {boolean} p_returnNewEmpty Wether to return a new empty object or not
     * @returns {object} Either a new object, or the emptied one.
     */
    static Clear(p_obj, p_returnNewEmpty = false) {
        for (let member in p_obj) { delete p_obj[member]; }
        if (p_returnNewEmpty) { return {}; }
    }

    /**
     * @description Deletes all properties on an a given object, 
     * and clears any value that is an object or an array itself.
     * Recursive.
     * @param {object} p_obj The object to be emptied
     * @param {boolean} p_returnNewEmpty Wether to return a new empty object or not
     * @returns {object} Either a new object, or the emptied one.
     */
    static DeepClear(p_obj, p_returnNewEmpty = false) {

        let value = null;
        for (let member in p_obj) {
            value = p_obj[member];
            if (CHECKS.isArray(value)) { this.DeepClearArray(value); }
            else if (CHECKS.isObject(value)) { this.DeepClear(value); }
            p_obj[member] = null; // delete is too slow
        }
        if (p_returnNewEmpty) { return {}; }
    }

    /**
     * @description Empty an array and clears any value that is an object or an array itself.
     * Recursive.
     * @param {array} p_arr The object to be emptied
     */
    static DeepClearArray(p_arr) {
        let value = null;
        while (p_arr.length != 0) {
            value = p_arr.pop();
            if (CHECKS.isArray(value)) { this.DeepClearArray(value); }
            else if (CHECKS.isObject(value)) { this.DeepClear(value); }
        }
    }

    /**
     * @description Checks whether two objects contains exactly the same values
     * @param {object} p_source The object to test
     * @param {object} p_other The object to test against
     * @returns {boolean} True if the objects contains the exact same values, otherwise false
     */
    static isSame(p_source, p_other) {
        if (p_source === p_other) { return true; }
        let i = 0;
        for (let member in p_source) {
            i++;
            if (member in p_other) {

                let value = p_source[member],
                    otherValue = p_other[member];

                if (value !== otherValue) {

                    let tof = typeof value,
                        otherTof = typeof otherValue;

                    if (tof === otherTof) {
                        if (CHECKS.isArray(value)) {
                            if (!this.isSameArray(value, otherValue)) { return false; }
                        } else if (tof === 'object') {
                            if (!this.isSame(value, otherValue)) { return false; }
                        } else {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        let j = 0;
        for (let member in p_other) { j++; }

        if (i != j) { return false; }
        return true;
    }

    /**
     * @description Checks whether two arrays contains exactly the same values at the same index
     * @param {array} p_source The array to test
     * @param {array} p_other The array to test against
     * @returns {boolean} True if the arrays contains the exact same values, otherwise false
     */
    static isSameArray(p_source, p_other) {

        if (p_source === p_other) { return true; }

        let n = p_source.length;

        if (n != p_other.length) { return false; }

        for (let i = 0; i < n; i++) {

            let value = p_source[i],
                otherValue = p_other[i];

            if (value !== otherValue) {

                let tof = typeof value,
                    otherTof = typeof otherValue;

                if (tof === otherTof) {
                    if (CHECKS.isArray(value)) {
                        if (!this.isSameArray(value, otherValue)) { return false; }
                    } else if (tof === 'object') {
                        if (!this.isSame(value, otherValue)) { return false; }
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * @description Join the content of an array from/to specific indices
     * @param {array} p_array The array to join
     * @param {string} p_joinStr string to join with
     * @param {number} p_fromIndex Start join index
     * @param {number} p_toIndex End join index
     * @returns {string} The joined result
     */
    static Join(p_array, p_join, p_fromIndex = 0, p_toIndex = -1) {
        if (p_toIndex === -1) { p_toIndex = p_array.length - 1; }
        let str = `${p_array[p_fromIndex]}`;
        p_fromIndex++;
        for (let i = p_fromIndex; i <= p_toIndex; i++) {
            str += `${p_join}${p_array[i]}`;
        }
        return str;
    }

    static Resolve(p_obj, p_path) {
        let paths = p_path.split('.'),
            current = p_obj;

        for (let i = 0, n = paths.length; i < n; i++) {
            if (current[paths[i]] === undefined) {
                return undefined;
            } else {
                current = current[paths[i]];
            }
        }
        return current;
    }

    /*
    static Set(){
        

        if(this._val === p_value){return;}
        let oldValue = this._val;
        this._val = p_value;

        if(oldValue){

        }
        if(p_value){

        }

        this.UpdateCallback(oldValue);

        
    }
    */

    

    // ----> Regex

    /**
     * @description Checks whether a string is a valid identifier.
     * @customtag REGEX
     * @param {string} p_str String to test
     * @returns {boolean} True if the provided string is a valid identifier, otherwise false.
     */
    static ValidIdentifier(p_str) { return /^[A-Za-z_][A-Za-z0-9_]*$/.test(p_str); }

    /**
     * @description Checks whether a string starts with a digit.
     * @customtag REGEX
     * @param {string} p_str String to test
     * @returns {boolean} True if the provided string starts with a number, otherwise false.
     */
    static StartWithNumber(p_str) { return /^\d/.test(p_str); }
    static ContainsAnySpace(p_str) {
        return p_str.includes(
            ` `,
            ` `, //No break space
            ` `, //Ogham space mark
            `᠎`, //Mongolian vowel separator
            ` `, //EN Quad
            ` `, //EM Quad
            ` `, //EN space
            ` `, //EM space
            ` `, //1/3
            ` `, //1/4 EM
            ` `, //1/6 EM
            ` `, //Figure space
            ` `, //punctuation space
            ` `, //thin space
            ` `, //hair space
            `​`, //zero-width space
            ` `, //narrow no break space
            ` `, //mathematical space
            `　`, //ideographic space
            `﻿`, //zero width nobreak space
        );
    }

    /**
     * @description Compute an 'unsafe' UID. While unsafe, it'll still do a decent job of being unique
     * over the course of a session, but is based on Math.random() so limited and possibly redundant
     * @type {string}
     */
    static get unsafeUID() {
        return `_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * @description Compute an 'safe' RFC4122 UUID.
     * @type {string}
     */
    static get UUID() {
        return uuid.v4();
    }

    static Move(p_array, p_currentIndex, p_newIndex) {
        if (p_currentIndex === p_newIndex) { return; }
        if (p_currentIndex === -1) { throw new Error(`ListItem is not in array`); }
        p_array.splice(p_newIndex, 0, p_array.splice(p_currentIndex, 1)[0]);
    }

    /**
     * Pad a number with leading 0's
     * @param {number} p_num 
     * @param {number} p_size 
     */
    static Pad(p_num, p_size = 2) {
        return p_size < 0 ? p_num.toString().padEnd(p_size * -1, `0`) : p_num.toString().padStart(p_size, `0`);
    }



    /**
     * A - B
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static DateDiff(p_a, p_b) {

        let totalMs = p_a.getTime() - p_b.getTime(),
            totalSeconds = (totalMs / 1000),
            totalMinutes = totalSeconds / 60,
            totalHours = totalMinutes / 60,
            totalDays = totalHours / 24,
            ms = totalMs % 1000,
            seconds = ((totalMs - ms) / 1000) % 60,
            minutes = ((totalSeconds - seconds) / 60) % 60,
            hours = ((totalMinutes - minutes) / 60) % 60,
            days = ((totalHours - hours) / 24),
            result = {
                totalMs: totalMs,
                totalSeconds: totalSeconds,
                totalMinutes: totalMinutes,
                totalHours: totalHours,
                totalDays: totalDays,
                ms: ms < 1 ? 0 : ms,
                seconds: seconds < 1 ? 0 : seconds,
                minutes: minutes < 1 ? 0 : minutes,
                hours: hours < 1 ? 0 : hours,
                days: days < 1 ? 0 : days
            },
            str = ``;

        if (result.days > 0) {
            str = `${result.days}d${result.hours}h${result.minutes}m${result.seconds}s${result.ms}ms`;
        } else if (result.hours > 0) {
            str = `${result.hours}h${result.minutes}m${result.seconds}s${result.ms}ms`;
        } else if (result.minutes > 0) {
            str = `${result.minutes}m${result.seconds}s${result.ms}ms`;
        } else if (result.seconds > 0) {
            str = `${result.seconds}s${result.ms}ms`;
        } else {
            str = `${result.ms}ms`;
        }

        result.string = str;

        return result;
    }

    static ToCustomElementID(p_id, p_addGUID = false) {
        return this.CamelSplit(`${p_id}${p_addGUID ? this.unsafeUID : ''}`, `-`)
            .replace(`_`, `-`)
            .replace(` `, `-`)
            .toLowerCase();
    }

    static Map(p_value, p_oMin, p_oMax, p_nMin, p_nMax) {
        return p_nMin + (p_value - p_oMin) * (p_nMax - p_nMin) / (p_oMax - p_oMin);
    }

    static ArrayBufferToBase64(buffer) {
        return this.BytesToBase64(new Uint8Array(buffer));
    }

    static BytesToBase64(bytes) {
        let binary = '';
        let len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }

    //

    static Call(p_callConf, ...args) {

        let thisArg = p_callConf.thisArg || null;
        if (args) { return p_callConf.fn.call(thisArg, ...args); }
        else if (p_callConf.args) { return p_callConf.fn.call(thisArg, ...p_callConf.args); }
        else if (p_callConf.arg) { return p_callConf.fn.call(thisArg, p_callConf.arg); }
        else { return p_callConf.fn.call(thisArg); }

    }

    static CallPrepend(p_callConf, ...args) {

        let thisArg = p_callConf.thisArg || null;

        if (p_callConf.args) { return p_callConf.fn.call(thisArg, ...args, ...p_callConf.args); }
        else if (p_callConf.arg) { return p_callConf.fn.call(thisArg, ...args, p_callConf.arg); }
        else if (args) { return p_callConf.fn.call(thisArg, ...args); }
        else { return p_callConf.fn.call(thisArg); }

    }

    static Assign(p_conf, p_obj, p_owner = null) {
        if (!p_conf) { return; }
        if (p_conf.member) { p_conf = p_conf.member; }
        if (p_conf.owner) { if (!p_owner) { return; } p_owner = p_conf.owner; }
        p_owner[p_conf.id] = p_obj;
    }

}

module.exports = UTILS;