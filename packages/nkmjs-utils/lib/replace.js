'use strict';

/**
 * TODO
 * @class
 * @hideconstructor
 * @memberof utils
 */
class REPLACE {

    constructor() { }

    /**
     * 
     * @param {*} p_inputString 
     * @param {object} p_keys 
     * @param {object} p_tokens 
     * @param {string} [p_format.token]
     * @param {string} [p_format.prefix]
     * @param {string} [p_format.suffix]
     * @returns 
     */
    static Replace(p_inputString, p_keys, p_tokens) {

        for (let key in p_keys) {

            let value = p_keys[key];

            if (p_tokens.token) {
                key = `${p_tokens.token}${key}${p_tokens.token}`;
            } else {
                if (p_tokens.prefix) { key = `${p_tokens.prefix}${key}`; }
                if (p_tokens.suffix) { key = `${key}${p_tokens.suffix}`; }
            }

            try { p_inputString = p_inputString.replaceAll(key, value); }
            catch (e) { }

        }

        return p_keys;

    }

}

module.exports = REPLACE;