'use strict';

/**
 * @description TODO
 * @class
 * @memberof collections
 */
class KDictionary {

    constructor() {
        this._rootMap = new Map();
    }

    /**
     * @description TODO
     * @type {Map}
     * @customtag read-only
     */
    get rootMap() { return this._rootMap; }

    /**
     * @description TODO
     * @param {*} keyChain 
     * @returns {boolean} True if the KDictionary contains the provided keyChain, otherwise false.
     */
    Contains(...keyChain) {
        let map = this._rootMap;
        for (let i = 0, n = keyChain.length; i < n; i++) {
            map = map.get(keyChain[i]);
            if (!map) { return false; }
        }
        return true;
    }

    /**
     * @description TODO
     * @param {*} keyChain 
     */
    Set(...keyChain) {

        let value = keyChain.pop(),
            key = keyChain.pop(),
            map = this._rootMap,
            lastMap = map;

        for (let i = 0, n = keyChain.length; i < n; i++) {
            let kkey = keyChain[i];
            map = map.get(kkey);
            if (!map) {
                map = new Map();
                lastMap.set(kkey, map);
            }
            lastMap = map;
        }

        lastMap.set(key, value);

    }

    /**
     * @description TODO
     * @param {*} keyChain 
     * @returns {*} 
     */
    Get(...keyChain) {
        let key = keyChain.pop(),
            map = this._rootMap;
        for (let i = 0, n = keyChain.length; i < n; i++) {
            map = map.get(keyChain[i]);
            if (!map) { return null; }
        }
        return map.get(key);
    }

    /**
     * @description TODO
     * @param {*} keyChain 
     */
    Remove(...keyChain) {
        let key = keyChain.pop(),
            map = this._rootMap;
        for (let i = 0, n = keyChain.length; i < n; i++) {
            map = map.get(keyChain[i]);
            if (!map) { return null; }
        }
        let value = map.get(key);
        if (typeof p_value === 'undefined' || p_value === null) { return; }
        if ((typeof value === 'function' ? value.prototype : value) instanceof Map) { value.clear(); }
        map.remove(key);
    }

    /**
     * @description Clears the Dictionary from all keys and values.
     */
    Clear() {
        //TODO : In-depth clear to avoid generating too much garbage
        this._rootMap.clear();
    }

}

module.exports = KDictionary;