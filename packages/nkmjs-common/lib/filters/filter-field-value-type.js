'use strict';

const u = require("@nkmjs/utils");

const FilterFieldValue = require(`./filter-field-value`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.filters.FilterFieldValue
 * @memberof common.filters
 */
class FilterFieldValueType extends FilterFieldValue {

    constructor() { super(); }

    //#region Checks

    Check(p_obj) {
        if (u.isInstanceOf(this._FetchValue(p_obj), this._checkValue)) { this._Accept(p_obj); }
        else { this._Deny(p_obj); }
    }

    //#endregion


}

module.exports = FilterFieldValueType;