'use strict';

const u = require("@nkmjs/utils");

let _METAS = new Map();
let _TEMPLATES = new Map();

class META {

    constructor() { }

    static ETA(p_obj) {

        if (u.isVoid(p_obj)) { return null; }

        // We can be provided with either a constructor or an object.

        let cstr = null;

        if (U.isObject(p_obj)) { // Need to get the object constructor

            // Prioritize object's own _NFO_ if any/non-null
            if (`_NFO_` in p_obj) {
                let localNFO = null;
                if (u.isFunc(p_obj._NFO_)) { localNFO = p_obj._NFO_(); }
                else { localNFO = p_obj._NFO_; }
                if (!u.isVoid(localNFO)) { return localNFO; }
            }

            cstr = p_obj.constructor;

        } else if (u.isFunc(p_obj)) { //Need to get the prototype
            cstr = p_obj.prototype.constructor;
        }

        // Check if cstr has an _NFO_ property
        if (`_NFO_` in cstr) {
            let result = _METAS.get(cstr);
            if (!u.isVoid(result)) { return result; }

            // Register new NFO
            result = cstr._NFO_;
            _METAS.set(cstr, result);

            return result;
        } else {
            // Try to go up the __proto__ chain

            // Fallback to assumed model relationship
            return META.ETA(p_obj.model);
        }

    }

    static _CSTR(p_obj) {

        if (!p_obj) { return p_obj; }

        let cstr = null;

        if (u.isFunc(p_obj)) {
            cstr = p_obj.prototype.constructor;
        } else if (u.isObject(p_obj)) {
            cstr = p_obj.constructor;
        }

        return cstr;
    }

    static TEMPLATE(p_obj) {

        let ctnr = null;

        if (u.isFunc(p_obj)) {
            ctnr = p_obj.prototype.constructor;
        } else if (u.isObject(p_obj)) {
            ctnr = p_obj.constructor;
        }

        if (!ctnr || !ctnr._templateNFO) {
            return null;
        }

        let result = _TEMPLATES.get(ctnr);

        if (!result) {
            result = ctnr._templateNFO();
            _TEMPLATES.set(ctnr, result);
        }

        return result;

    }
}

module.exports = META;
