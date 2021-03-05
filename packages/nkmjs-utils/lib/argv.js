'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof utils
 */
class Argv {
    constructor(p_args) {

        if (Array.isArray(p_args)) {
            for (let i = 0, n = p_args.length; i < n; i++) {
                let a = p_args[i];
                try {
                    // --key=value | -key=value | key=value
                    let split = a.split(`=`),
                        key = this._Shorten(split.shift()),
                        value = split.length ? split.join(`=`) : null;
                    if (value !== null) {
                        if (value.toUpperCase() === 'TRUE') { value = true; }
                        else if (value.toUpperCase() === 'FALSE') { value = false; }
                    }
                    this[key] = value === null ? true : value;
                } catch (e) {
                    // --key | -key
                    key = this._Shorten(key);
                    this[key] = true;
                }
            }
        }
        else if (typeof p_args === 'object') {
            for (var key in p_args) { this[key] = p_args.value; }
        }

    }

    /**
     * @access private
     * @param {string} key 
     * @returns {string}
     */
    _Shorten(key) {
        // get id for argname formatted as --key or -key
        try {
            if (key[0] == `-`) {
                key = key.substr(1);
                if (key[0] == `-`) { key = key.substr(1); }
            }
        } catch (e) { }

        return key;
    }

    /**
     * @description TODO
     * @param {string} p_id 
     */
    Has(p_id) {
        return this.hasOwnProperty(p_id);
    }

    /**
     * @description TODO
     * @param {string} p_id 
     * @param {*} p_fallback 
     * @returns {*}
     */
    Get(p_id, p_fallback = null) {
        return this.hasOwnProperty(p_id) ? this[p_id] : p_fallback;
    }

}

module.exports = Argv;