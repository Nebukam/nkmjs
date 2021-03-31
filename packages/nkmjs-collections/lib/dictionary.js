'use strict';

const isVoid = require(`./helpers/isVoid`);

/**
 * @description TODO
 * @class
 * @memberof collections
 */
class Dictionary {

    constructor() {
        this._map = new Map();
    }

    /**
     * @description TODO
     * @type {map}
     * @customtag read-only
     */
    get internalMap() { return this._map; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._map.size; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty(){ return this._map.size <= 0; }

    /**
     * @description TODO
     * @type {IterableIterator<any>}
     * @customtag read-only
     */
    get keys() { return Array.from(this._map.keys()); }

    /**
     * @description Return whether or not the Dictionary contains the given key.
     * @param {*} p_key 
     * @returns {boolean} True if the Dictionary contains the key, otherwise false
     */
    Contains(p_key) {
        return this._map.has(p_key);
    }

    /**
     * @description Associate a value to a given key.
     * @param {*} p_key 
     * @param {*} p_value
     */
    Set(p_key, p_value) {
        this._map.set(p_key, p_value);
    }

    /**
     * @description Return the value associated with the given key.
     * @param {*} p_key 
     * @returns {*} 
     */
    Get(p_key) {
        return this._map.get(p_key);
    }

    /**
     * @description Reverse lookup through the keys and return an array 
     * of keys mapped to given value. Costly function, avoid.
     * @param {*} p_value 
     * @returns {array} 
     */
    GetValueKeys(p_value) {
        if (isVoid(p_value)) { return null; }

        let result = null,
            keyList = this.keys;

        for (let i = 0, n = keyList.length; i < n; i++) {
            let key = keyList[i];
            if (this._map.get(key) === p_value) {
                if (result === null) { result = []; }
                result.push(key);
            }
        }
        return result;
    }

    /**
     * @description Remove the given key from the Dictionary, along with its associated value.
     * Returns true if the key existed and has been removed, otherwise return false.
     * @param {*} p_key 
     * @returns {boolean} True if the value has been deleted, otherwise false
     */
    Remove(p_key) {
        return this._map.delete(p_key);
    }

    /**
     * @description Loops through all keys in Dictionary. Callback should match the signature : (key, value).
     * @param {function} p_fn
     * @param {object} p_this
     * @param {boolean} p_reverse
     */
    ForEach(p_fn, p_this = null, p_reverse = false) {

        let keys = Array.from(this._map.keys());

        if (p_reverse) {
            for (let i = keys.length - 1; i >= 0; i--) {
                let key = keys[i];
                p_fn.call(p_this, key, this._map.get(key));
            }
        }
        else {
            for (let i = 0, n = keys.length; i < n; i++) {
                let key = keys[i];
                p_fn.call(p_this, key, this._map.get(key));
            }
        }
    }

    /**
     * @description Clears the Dictionary from all keys and values.
     */
    Clear() {
        this._map.clear();
    }

}

module.exports = Dictionary;