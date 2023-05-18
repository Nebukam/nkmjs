'use strict';

var _optionID = ``;
var _compareMethod = null;

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
module.exports = {

    ORDER_ASC: function (p_a, p_b) { return p_a?.order || 0 - p_b?.order || 0; },
    ORDER_DSC: function (p_a, p_b) { return p_b?.order || 0 - p_a?.order || 0; },

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    NAME_ASC: function (p_a, p_b) {
        if (typeof p_a === 'string' && typeof p_b === 'string') {
            return p_a.localeCompare(p_b);
        }

        let a = p_a.isDir, b = p_b.isDir;
        if ((a && b) || (!a && !b)) {
            return p_a.name.localeCompare(p_b.name);
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    },

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    NAME_DSC: function (p_a, p_b) {
        if (typeof p_a === 'string' && typeof p_b === 'string') {
            return p_a.localeCompare(p_b) * -1;
        }

        let a = p_a.isDir, b = p_b.isDir;
        if ((a && b) || (!a && !b)) {
            return p_a.name.localeCompare(p_b.name) * -1;
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    },

    /**
     * @description 0, 1, 2
     * @param {*} p_a 
     * @param {*} p_b 
     */
    NUMERIC_ASC: function (p_a, p_b) {
        return p_a - p_b;
    },

    /**
     * @description 2, 1, 0
     * @param {*} p_a 
     * @param {*} p_b 
     */
    NUMERIC_DSC: function (p_a, p_b) {
        return p_b - p_a;
    },

    /**
     * @description a, b, c
     * @param {*} p_a 
     * @param {*} p_b 
     */
    STRING_ASC: function (p_a, p_b) {
        return p_a.localeCompare(p_b);
    },

    /**
     * @description c, b, a
     * @param {*} p_a 
     * @param {*} p_b 
     */
    STRING_DSC: function (p_a, p_b) {
        return p_a.localeCompare(p_b) * -1;
    },

    /**
     * @description TODO
     * @param {*} p_a 
     * @param {*} p_b 
     */
    OPTION: function (p_a, p_b) {
        let a = p_a.isDir, b = p_b.isDir;
        if ((a && b) || (!a && !b)) {
            return _compareMethod(p_a.GetOption(_optionID), p_b.GetOption(_optionID));
        } else if (!a) {
            return 1;
        } else {
            return -1;
        }
    },

    /**
     * @description c, b, a
     * @param {data.core.Catalog} p_array 
     * @param {string} p_member 
     * @param {function} p_method 
     */
    SortByMember: function (p_array, p_member, p_method) {
        _optionID = p_member;
        _compareMethod = p_method;
        p_array._items.sort(SORTING.OPTION);
    }

}