'use strict';

const { U } = require(`@nkmjs/utils`);

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

    // ----> Checks

    Check(p_obj) {
        if (U.isInstanceOf(this._FetchValue(p_obj), this._checkValue)) { this._Accept(p_obj); }
        else { this._Deny(p_obj); }
    }


}

module.exports = FilterFieldValueType;