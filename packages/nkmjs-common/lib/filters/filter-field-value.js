'use strict';

const Filter = require(`./filter`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.filters.Filter
 * @memberof common.filters
 */
class FilterFieldValue extends Filter {

    constructor() { super(); }
    _Init() {
        super._Init();

        this._checkName = null;
        this._checkValue = null;

    }

    /**
     * @description TODO
     * @type {string}
     */
    get checkName() { return this._checkName; }
    set checkName(p_value) { this._checkName = p_value; this._UpdateFn(); }

    /**
     * @description TODO
     * @type {*}
     */
    get checkValue() { return this._checkValue; }
    set checkValue(p_value) { this._checkValue = p_value; this._UpdateFn(); }

    _UpdateFn() {

    }

    _FetchValue(p_obj){
        return p_obj[this._checkName];
    }

    //#region Checks

    Check(p_obj) {
        let value = this._FetchValue(p_obj);
        if (value === this._checkValue) { return this._Accept(p_obj); }
        else { return this._Deny(p_obj); }
    }   

    //#endregion

    _CleanUp() {
        this._checkName = null;
        this._checkValue = null;
        super._CleanUp();
    }


}

module.exports = FilterFieldValue;