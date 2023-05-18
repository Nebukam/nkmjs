'use strict';

const checks = require(`./checks`);

module.exports = {

    /**
     * Merge given defaults into a base object.
     * @param {*} p_base 
     * @param {*} p_defaults 
     * @param {*} p_arrayMergeMethod 
     * @param {*} p_recursive 
     * @param {*} p_replaceNullValues 
     * @returns 
     */
    Defaults: function (
        p_base,
        p_defaults,
        p_arrayMergeMethod = null,
        p_recursive = true,
        p_replaceNullValues = false) {

        if (!p_base) { return { ...p_defaults }; }
        if (!p_recursive) {
            for (let d in p_defaults) {
                if (!(d in p_base)) { p_base[d] = p_defaults[d]; }
            }
        } else {
            for (let d in p_defaults) {
                let baseValue = p_base[d],
                    defaultValue = p_defaults[d],
                    finalValue = baseValue;
                if (!(d in p_base)) {
                    finalValue = defaultValue;
                } else {
                    if (p_replaceNullValues && (baseValue === null || baseValue === undefined)) {
                        finalValue = defaultValue;
                    } else if (checks.isSameType(base, defaultValue)) {
                        if (checks.isArray(baseValue)) {
                            if (p_arrayMergeMethod) { finalValue = p_arrayMergeMethod(baseValue, defaultValue, d); }
                        } else if (checks.isObject(baseValue)) {
                            if (p_recursive) { finalValue = module.exports.Defaults(baseValue, defaultValue, p_arrayMergeMethod, p_recursive, p_replaceNullValues); }
                        }
                    }
                }
                p_base[d] = finalValue;
            }
        }
        return p_base;

    },

    /**
     * Add values from b into a
     * Values are added at the end
     * @param {Array} a 
     * @param {Array} b 
     * @param {string} [p_id] name of the property containing the array, if available
     */
    ArrayAddPush: function (a, b, p_id = null) {
        for (const e of b) { a.push(e) };
        return a;
    },

    /**
     * Add values from b into a
     * Values are added at the beginning
     * @param {Array} a 
     * @param {Array} b 
     * @param {string} [p_id] name of the property containing the array, if available
     */
    ArrayAddUnshift: function (a, b, p_id = null) {
        for (const e of b) { a.unshift(e) };
        return a;
    },

    /**
     * Add values from b into a, if not already present
     * Values are added at the end
     * @param {Array} a 
     * @param {Array} b 
     * @param {string} [p_id] name of the property containing the array, if available
     */
    ArrayCombinePush: function (a, b, p_id = null) {
        for (const e of b) { if (b.indexOf(e) == -1) { a.push(e) } };
        return a;
    },

    /**
     * Add values from b into a, if not already present
     * Values are added at the beginning
     * @param {Array} a 
     * @param {Array} b 
     * @param {string} [p_id] name of the property containing the array, if available
     */
    ArrayCombineUnshift: function (a, b, p_id = null) {
        for (const e of b) { if (b.indexOf(e) == -1) { a.unshift(e) } };
        return a;
    },

}