'use strict';

let _optionID = ``;
let _compareMethod = null;

/*

compareFunction(a,b) < 0
Then a comes before b in the answer.

compareFunction(a,b) > 0
Then b comes before a in the answer.

compareFunction(a,b) = 0
Then the order of a and b remains unchanged.

*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core.catalog
 */
class CATALOG_SORTING {
    constructor() { }

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static NAME_ASC(p_a, p_b) {
        let a = p_a._isDir, b = p_b._isDir;
        if ((a && b) || (!a && !b)) {
            return p_a.name.localeCompare(p_b.name);
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static NAME_DSC(p_a, p_b) {
        let a = p_a._isDir, b = p_b._isDir;
        if ((a && b) || (!a && !b)) {
            return p_a.name.localeCompare(p_b.name) * -1;
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * @description 0, 1, 2
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static NUMERIC_ASC(p_a, p_b) {
        return p_a - p_b;
    }

    /**
     * @description 2, 1, 0
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static NUMERIC_DSC(p_a, p_b) {
        return p_b - p_a;
    }

    /**
     * @description a, b, c
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static STRING_ASC(p_a, p_b) {
        return p_a.localeCompare(p_b);
    }

    /**
     * @description c, b, a
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static STRING_DSC(p_a, p_b) {
        return p_a.localeCompare(p_b) * -1;
    }

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    static OPTION(p_a, p_b) {
        let a = p_a._isDir, b = p_b._isDir;
        if ((a && b) || (!a && !b)) {
            return _compareMethod(p_a.GetOption(_optionID), p_b.GetOption(_optionID));
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    }

    /**
     * @description c, b, a
     * @param {data.core.Catalog} p_catalog 
     * @param {string} p_optionId 
     * @param {function} p_method 
     */
    static SortByOption(p_catalog, p_optionId, p_method) {
        _optionID = p_optionId;
        _compareMethod = p_method;
        p_catalog._items.sort(CATALOG_SORTING.OPTION);
    }

}

module.exports = CATALOG_SORTING;