'use strict';

const toString = Object.prototype.toString;

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

        if (UTILS.isVoid(p_source)
            || UTILS.isVoid(p_target)) {
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
        if (UTILS.isVoid(p_value) || p_value === ``) {
            return true;
        }
        if (UTILS.isArray(p_value)) { return p_value.length === 0; }
        if (UTILS.isObject(p_value)) {
            for (let key in p_value) { return false; }
            return true;
        }
        return false;
    }

    static JSONStripEmpty(p_key, p_value) {
        if (UTILS.isEmpty(p_value)) { return undefined; }
        if (UTILS.isObject(p_value)) {
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
            if (!UTILS.isVoid(val)) { return val; }
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
        if (UTILS.isVoid(p_obj)) { return p_fallback; }
        let val = p_obj[p_key];
        if (UTILS.isVoid(val)) { return p_fallback; }
        else { return val; }
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

        if (UTILS.isVoid(p_stringPath)) { return null; }

        let parseResult = {};

        let hasProtocol = p_stringPath.includes(UTILS.DELIM_PROTOCOL);
        if (hasProtocol) {
            let protocolSplit = p_stringPath.split(UTILS.DELIM_PROTOCOL);
            if (protocolSplit.length != 2) { throw new Error(`Path '${p_stringPath}' cannot be parsed (protocol malformed).`); }
            parseResult.protocol = protocolSplit[0] + UTILS.DELIM_PROTOCOL;
            p_stringPath = protocolSplit[1];
        }

        let hasDrive = p_stringPath.includes(UTILS.DELIM_DRIVE);
        if (hasDrive) {
            let driveSplit = p_stringPath.split(UTILS.DELIM_DRIVE);
            if (driveSplit.length > 2) { throw new Error(`Path '${p_stringPath}' cannot be parsed (drive malformed).`); }
            parseResult.drive = driveSplit[0] + UTILS.DELIM_PROTOCOL;
            p_stringPath = driveSplit[1];
        }

        let split = p_stringPath.split(UTILS.DELIM_DIR),
            lastIndex = split.length - 1,
            fname = split[lastIndex],
            splitEx = fname.split(UTILS.DELIM_EXT);

        split.splice(lastIndex, 1);

        for (let i = 0, n = split.length; i < n; i++) { if (split[i] === ``) { split.splice(i, 1); i--; } }

        parseResult.path = split.join(UTILS.DELIM_DIR) + UTILS.DELIM_DIR;
        parseResult.pathArray = split;
        parseResult.name = splitEx[0];
        parseResult.ext = UTILS.DELIM_EXT + splitEx[splitEx.length - 1];

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

        if (UTILS.isVoid(p_base)) { p_base = {}; }
        if (UTILS.isVoid(p_source)) { return p_base; }
        for (let member in p_source) {
            if (p_base.hasOwnProperty(member)) { continue; }
            p_base[member] = p_source[member];
        }
        return p_base;
    }

    /**
     * @description Merges the value of an Object into another. 
     * Recursive, overwrites (unless p_skipExisting === true)
     * @param {object} p_base The base object to append into
     * @param {object} p_source The reference object to fetch values from
     * @param {object} p_skipExisting Whether or not to overwrite on existing values
     * @returns {object} The p_base object
     */
    static Merge(p_base, p_source, p_skipExisting = false) {

        if (UTILS.isVoid(p_base)) { return p_source; }

        for (let member in p_source) {

            if (!(p_source.hasOwnProperty(member))) { continue; }
            let sourceValue = p_source[member];

            if (p_base.hasOwnProperty(member) && !p_skipExisting) {
                //Property exist in base, update its values
                let baseValue = p_base[member];
                if (!UTILS.isArray(baseValue) && UTILS.isObject(baseValue)) {
                    if (!UTILS.isArray(sourceValue) && UTILS.isObject(sourceValue)) {
                        UTILS.Merge(baseValue, sourceValue);
                    } else {
                        p_base[member] = sourceValue;
                    }
                } else {
                    p_base[member] = sourceValue;
                }
            } else {
                //Simply assign value
                p_base[member] = sourceValue;
            }
        }

        return p_base;

    }

    /**
     * @description Copy values from p_source currently missing in p_base.
     * Merge object properties
     * @param {*} p_base 
     * @param {*} p_source 
     * @param {*} p_mergeArrays if true, will unshift array values from source into base when the two values are arrays.
     */
    static SetMissing(p_base, p_source, p_mergeArrays = false) {

        for (let key in p_source) {
            let sourceValue = p_source[key];
            if (!(p_base.hasOwnProperty(key))) {
                if (UTILS.isArray(sourceValue)) {
                    p_base[key] = [...sourceValue];
                } else if (UTILS.isObject()) {
                    p_base[key] = UTILS.SetMissing({}, sourceValue);
                } else {
                    p_base[key] = sourceValue;
                }
            } else {
                let baseValue = p_base[key];
                if (UTILS.isArray(baseValue)) {
                    if (UTILS.isArray(sourceValue) && p_mergeArrays) {
                        for (let i = 0, n = sourceValue.length; i < n; i++) {
                            if (!baseValue.includes(sourceValue[i])) { baseValue.unshift(sourceValue[i]); }
                        }
                    }
                } else if (UTILS.isObject(baseValue) && UTILS.isObject(sourceValue)) {
                    UTILS.SetMissing(baseValue, sourceValue);
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
                if (UTILS.isArray(sourceValue)) {
                    p_base[key] = sourceValue;
                } else if (UTILS.isObject()) {
                    p_base[key] = sourceValue;
                } else {
                    p_base[key] = sourceValue;
                }
            } else {
                let baseValue = p_base[key];
                if (UTILS.isArray(baseValue)) {
                    p_base[key] = sourceValue;
                } else if (UTILS.isObject(sourceValue)) {
                    if (UTILS.isObject(baseValue)) { UTILS.SetOverwrite(baseValue, sourceValue); }
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
     * @returns {array}
     */
    static MergeArray(p_base, p_source) {

        if (!p_base) {
            p_base = new Array(0);
            if (!p_source) { return p_base; }
            p_base = [...p_source];
            return p_base;
        }

        if (!p_source) { return p_base; }

        for (let i = 0, n = p_source.length; i < n; i++) {
            if (!p_base.includes(p_source[i])) { p_base.push(p_source[i]); }
        }

        return p_base;
    }

    /**
     * @description Clone an Object.
     * @param {object} p_base The base object to clone
     * @returns {object} Clone of p_base
     */
    static Clone(p_base) {
        if (!UTILS.isObject(p_base)) { throw new Error(`Cannot Clone the non-object '${p_base}'`); }
        let clone = {};
        for (let member in p_base) {
            if (!p_base.hasOwnProperty(member)) { continue; }
            let value = p_base[member];
            if (value != null) {
                if (UTILS.isArray(value)) { value = UTILS.CloneArray(value); }
                else if (UTILS.isObject(value)) { value = UTILS.Clone(value); }
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
        if (!UTILS.isArray(p_base)) { throw new Error(`Cannot CloneArray the non-array '${p_base}'`); }
        let arr = new Array(0);
        for (let i = 0, n = p_base.length; i < n; i++) {
            let arrValue = p_base[i];
            if (arrValue != null) {
                if (UTILS.isArray(arrValue)) { arrValue = UTILS.CloneArray(arrValue); }
                else if (UTILS.isObject(arrValue)) { arrValue = UTILS.Clone(arrValue); }
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
    static CamelSplit(p_string) { return p_string.replace(/([a-z0-9])([A-Z#])/g, '$1 $2'); }

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

        if (UTILS.isVoid(p_oldArray)) {
            if (UTILS.isVoid(p_newArray)) { return; }
            //Everything in
            for (let i = 0, n = p_newArray.length; i < n; i++) {
                p_in.push(p_newArray[i]);
            }
            return;
        } else if (UTILS.isVoid(p_newArray)) {
            if (UTILS.isVoid(p_oldArray)) { return; }
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


        if (UTILS.isVoid(p_oldArray)) {
            if (UTILS.isVoid(p_newArray)) { return; }
            //Everything in
            for (let i = 0, n = p_newArray.length; i < n; i++) {
                p_inCallback(p_newArray[i], i);
            }
            return;
        } else if (UTILS.isVoid(p_newArray)) {
            if (UTILS.isVoid(p_oldArray)) { return; }
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
        if (!UTILS.isInstanceOf(p_from, p_to)) { return -1; }

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
            if (UTILS.isArray(value)) { UTILS.DeepClearArray(value); }
            else if (UTILS.isObject(value)) { UTILS.DeepClear(value); }
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
            if (UTILS.isArray(value)) { UTILS.DeepClearArray(value); }
            else if (UTILS.isObject(value)) { UTILS.DeepClear(value); }
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
                        if (UTILS.isArray(value)) {
                            if (!UTILS.isSameArray(value, otherValue)) { return false; }
                        } else if (tof === 'object') {
                            if (!UTILS.isSame(value, otherValue)) { return false; }
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
                    if (UTILS.isArray(value)) {
                        if (!UTILS.isSameArray(value, otherValue)) { return false; }
                    } else if (tof === 'object') {
                        if (!UTILS.isSame(value, otherValue)) { return false; }
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
    static Join(p_array, p_joinStr, p_fromIndex = 0, p_toIndex = -1) {
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

    static Move(p_array, p_currentIndex, p_newIndex) {
        if (p_currentIndex === p_newIndex) { return; }
        if (p_currentIndex === -1) { throw new Error(`Item is not in array`); }
        p_array.splice(p_newIndex, 0, p_array.splice(p_currentIndex, 1)[0]);
    }

    /**
     * Pad a number with leading 0's
     * @param {number} p_num 
     * @param {number} p_size 
     */
    static Pad(p_num, p_size = 2) {
        p_num = p_num.toString();
        while (p_num.length < p_size) { p_num = "0" + p_num; }
        return p_num;
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

        if(result.days > 0){
            str = `${result.days}d${result.hours}h${result.minutes}m${result.seconds}s${result.ms}ms`;
        }else if(result.hours > 0){
            str = `${result.hours}h${result.minutes}m${result.seconds}s${result.ms}ms`;
        }else if(result.minutes > 0){
            str = `${result.minutes}m${result.seconds}s${result.ms}ms`;
        }else if(result.seconds > 0){
            str = `${result.seconds}s${result.ms}ms`;
        }else{
            str = `${result.ms}ms`;
        }

        result.string = str;

        return result;
    }

}

module.exports = UTILS;