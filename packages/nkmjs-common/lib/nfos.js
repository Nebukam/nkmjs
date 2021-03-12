
'use strict';

const u = require("@nkmjs/utils");

const __NFO__ = `__NFO__`;

/**
 * NFOS wraps a few methods to consistantly fetch a class' NFO.  
 * These are comparable to meta-data associated with a given class, only they are used internally to
 * enforce defaut configurations & values, streamline behaviors and make everything both more modular and predictable.
 * 
 * Common use of NFOs include component external CSS definition, data icon associations, default serializer associations etc...
 * <div class="tip infos" data-title="Note"> In background, a class NFO is just a static <code>__NFO__</code> member pointing to a simple {object}, hence can be manipulated to alter some
 * architectural behaviors at a very low level.<br><br>If you want to change/edit NFOs at runtime, make sure you know what you're doing !
 * </div>
 * @class
 * @hideconstructor
 * @memberof common
 */
class NFOS {

    constructor() { }

    static KEY = __NFO__;

    /**
     * @descriptionAttempts to retrieve constructor-level metadata.
     * Checks first for a `__NFO__` property in the body of the object (if an object is provided)
     * Then checks for a static `__NFO__` method in the constructor     
     * @param {*} p_obj
     * @param {object} p_fallback
     * @returns {object} The meta information linked to the provided object, or null.
     * @order 1
     */
    static Get(p_obj, p_fallback = null) {

        if (u.tils.isObject(p_obj)) {
            if (__NFO__ in p_obj) { return p_obj[__NFO__]; }
            else if (__NFO__ in p_obj.constructor) { return p_obj.constructor[__NFO__]; }
        } else if (u.tils.isFunc(p_obj) && __NFO__ in p_obj) {
            return p_obj[__NFO__];
        }

        return p_fallback;

    }

    /**
     * Extends another class NFO by copying properties & value from that class NFO that are missing 
     * or undefined in the provided `p_base` object. Existing properties values are left untouched, while arrays can be merged on
     * a per-case basis.
     * @param {*} p_baseObject target (base) nfo object
     * @param {*} p_baseClass class to extend nfo from
     * @param {*} p_merge properties ID to be merged in (properties should be arrays)
     * @example 
     * //NFO from hypothetical 'Bar' class)
     * {
     *     name:'Bar Object',
     *     foo:'faz',
     *     someArray:['A', 'B', 'C']
     * };
     * 
     * //Base object
     * var baseNFO = { 
     *     name:'My Custom NFO',
     *     someArray:['CustomValue']
     * };
     * 
     * //Without merging options set
     * NFOS.Ext(baseNFO, Bar) == { 
     *     name:'My Custom NFO',
     *     foo:'faz',
     *     someArray:['CustomValue']
     * }
     * 
     * //With merging options set
     * NFOS.Ext(baseNFO, Bar, ['someArray']) == { 
     *     name:'My Custom NFO',
     *     foo:'faz',
     *     someArray:['A', 'B', 'C', 'CustomValue']
     * }
     */
    static Ext(p_baseObject, p_baseClass, p_merge = null) {

        let source = p_baseClass[__NFO__];

        for (let key in source) {
            let sourceValue = source[key];
            if (!(p_baseObject.hasOwnProperty(key))) {
                if (u.tils.isArray(sourceValue)) {
                    p_baseObject[key] = [...sourceValue];
                } else if (u.tils.isObject()) {
                    p_baseObject[key] = this.Ext({}, sourceValue);
                } else {
                    p_baseObject[key] = sourceValue;
                }
            } else {
                let baseValue = p_baseObject[key];
                if (u.tils.isArray(baseValue)) {
                    if (u.tils.isArray(sourceValue) && p_merge && p_merge.includes(key)) {
                        for (let i = 0, n = sourceValue.length; i < n; i++) {
                            if (!baseValue.includes(sourceValue[i])) { baseValue.push(sourceValue[i]); }
                        }
                    }
                } else if (u.tils.isObject(baseValue) && UTILS.isObject(sourceValue)) {
                    this.Ext(baseValue, sourceValue, p_merge);
                } else {
                    // Ignore
                }
            }
        }

        return p_baseObject;

    }

}

module.exports = NFOS;