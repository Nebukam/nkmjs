'use strict';

/**
 * @description TODO
 * @class
 * @memberof collections
 */
class DictionaryList {

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
     * If a value is specified, return whether or not the key has the given value registered.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the Dictionary contains the matching KVP, otherwise false.
     */
    Contains(p_key, p_value = undefined) {

        if (!this._map.has(p_key)) {
            return false;
        }

        if (p_value === undefined) {
            return true;
        } else {
            return this._map.get(p_key).includes(p_value);
        }

    }

    /**
     * @description Return the value count for the given key.
     * @param {*} p_key 
     * @returns {number} 
     */
    Count(p_key) {

        if (this._map.has(p_key)) {
            return this._map.get(p_key).length;
        } else {
            return 0;
        }

    }

    /**
     * @description Add a value to the list associated with the given key.
     * @param {*} p_key 
     * @param {*} p_value 
     */
    Set(p_key, p_value) {

        let list = null;

        if (this._map.has(p_key)) {
            list = this._map.get(p_key);
        } else {
            list = new Array(0);
            this._map.set(p_key, list);
        }

        if (list.includes(p_value)) { return; }

        list.push(p_value);

    }

    /**
     * @description Return the list associated with the given key.
     * If index is specified (>= 0), return the value at the given index or undefined if out-of-bounds
     * @param {*} p_key 
     * @param {number} p_index 
     * @returns {*} 
     */
    Get(p_key, p_index = -1) {

        if (!this._map.has(p_key)) { return undefined; }

        let list = this._map.get(p_key);

        if (p_index === -1) { return list; }
        else if (list.length < p_index) { return list[p_index]; }
        else { throw new Error(`index is out of bounds`); }

    }

    /**
     * @description Remove the given value from the list associated with the given key.
     * Returns true if the value existed and has been removed, otherwise return false.
     * @param {*} p_key 
     * @param {*} p_value 
     * @returns {boolean} True if the KVP has been found and removed, otherwise false.
     */
    Remove(p_key, p_value) {

        if (!p_value || !p_key) { return false; }

        let list = this._map.get(p_key);

        if (!list) { return false; }

        let index = list.indexOf(p_value);
        if (index != -1) {
            list.splice(index, 1);
            if (list.length === 0) {
                this._map.delete(p_key);
            }
            return true;
        }

        return false;

    }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param  {...any} args 
     */
    RemoveMultiple(p_key, ...args) {
        throw new Error("RemoveMultiple not implemented");
    }

    /**
     * @description Remove and return the last value from the list associated with the given key
     * @param {*} p_key 
     * @returns {*} 
     */
    Pop(p_key) {

        if (!this._map.has(p_key)) { return undefined; }

        let list = this._map.get(p_key),
            value = list.pop();

        if (list.length === 0) {
            this._map.delete(p_key);
        }

        return value;

    }

    /**
     * @description Clears all keys and values.
     */
    Clear() {
        this._map.forEach(this._Clear, this);
        this._map.clear();
    }

    /**
     * @access private
     * @param {*} p_value 
     * @param {*} p_key 
     * @param {*} p_map 
     */
    _Clear(p_value, p_key, p_map) {
        p_value.length = 0;
    }

}

module.exports = DictionaryList;