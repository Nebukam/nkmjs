'use strict';

/**
 * @description TODO
 * @class
 * @memberof collections
 */
class DictionarySet {

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
    get length() { return this._map.size; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty() { return this._map.size <= 0; }

    /**
     * @description TODO
     * @type {IterableIterator<any>}
     * @customtag read-only
     */
    get keys() { return Array.from(this._map.keys()); }

    /**
     * @description Return whether or not the Map contains the given key.
     * If a value is specified, return whether or not the key has the given value registered.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the Map contains the matching KVP, otherwise false.
     */
    Contains(p_key, p_value = undefined) { return this._map.get(p_key)?.has(p_value) ? true : false; }

    /**
     * @description Return the value count for the given key.
     * @param {*} p_key 
     * @returns {number} 
     */
    Count(p_key) { return this._map.get(p_key)?.size || 0; }

    /**
     * @description Add a value to the list associated with the given key.
     * @param {*} p_key 
     * @param {*} p_value 
     */
    Set(p_key, p_value) {

        let set = null;

        if (this._map.has(p_key)) { set = this._map.get(p_key); }
        else { this._map.set(p_key, set = new Set()); }

        if (set.has(p_value)) { return false; }

        set.add(p_value);
        return true;

    }

    /**
     * @description Return the list associated with the given key.
     * If index is specified (>= 0), return the value at the given index or undefined if out-of-bounds
     * @param {*} p_key 
     * @param {number} p_index 
     * @returns {*} 
     */
    Get(p_key) { return this._map.get(p_key); }

    /**
     * @description Remove the given value from the list associated with the given key.
     * Returns true if the value existed and has been removed, otherwise return false.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the KVP has been found and removed, otherwise false.
     */
    Remove(p_key, p_value) {

        if (!p_value || !p_key) { return false; }

        let set = this._map.get(p_key);
        if (!set) { return false; }

        if (set.has(p_value)) {
            set.delete(p_value);
            if (!set.size) { this._map.delete(p_key); }
            return true;
        }

        return false;

    }

    /**
     * @description Remove a key from the dictionary and all of its associated values, if any.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the KVP has been found and removed, otherwise false.
     */
    RemoveKey(p_key) {
        this._map.get(p_key)?.clear();
        this._map.delete(p_key);
        return false;
    }

    /**
     * @description Clears all keys and values.
     */
    Clear() {
        this._map.forEach(set => { set.clear(); });
        this._map.clear();
    }

}

module.exports = DictionarySet;