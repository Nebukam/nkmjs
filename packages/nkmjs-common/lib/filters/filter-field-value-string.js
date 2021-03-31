'use strict';

const FilterFieldValue = require(`./filter-field-value`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.filters.FilterFieldValue
 * @memberof common.filters
 */
class FilterFieldValueNumber extends FilterFieldValue {

    constructor() { super(); }
    _Init() {
        super._Init();

        this._rangeStart = NaN;
        this._rangeEnd = NaN;

        this._Bind(this.CheckString);
        this._Bind(this.CheckStringRange);
        this._Bind(this.CheckStringMin);
        this._Bind(this.CheckStringMax);

    }

    /**
     * @description TODO
     * @type {number}
     */
    get rangeStart() { return this._rangeStart; }
    set rangeStart(p_value) { this._rangeStart = p_value; this._UpdateFn(); }

    /**
     * @description TODO
     * @type {number}
     */
    get rangeEnd() { return this._rangeEnd; }
    set rangeEnd(p_value) { this._rangeEnd = p_value; this._UpdateFn(); }

    _UpdateFn() {
        this._checkFn = this.CheckString;
        if (this._rangeStart != NaN) {
            if (this._rangeEnd != NaN) { this.CheckStringRange; }
            else { this._checkFn = this.CheckStringMin; }
        } else if (this._rangeEnd != NaN) {
            this._checkFn = this.CheckStringMax;
        }
    }

    //#region Checks

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckString(p_obj) {
        if (this._FetchValue(p_obj).includes(this._checkValue)) { return this._Accept(p_obj); }
        else { return this._Deny(p_obj); }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckStringRange(p_obj) {
        let value = p_obj[this._checkName],
            len = value.length, clen = this._checkValue.length;

        if (len < this._rangeStart
            || len < clen
            || len < this._rangeEnd
            || (len - this._rangeStart) < clen
            || !value.substring(this._rangeStart, this._rangeEnd).includes(this._checkValue)) {
            return this._Accept(p_obj);
        }
        else { return this._Deny(p_obj); }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckStringMin(p_obj) {
        let value = p_obj[this._checkName],
            len = value.length, clen = this._checkValue.length;

        if (len < this._rangeStart
            || len < clen
            || (len - this._rangeStart) < clen
            || !value.substr(this._rangeStart).includes(this._checkValue)) {
            return this._Accept(p_obj);
        }
        else { return this._Deny(p_obj); }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckStringMax(p_obj) {
        let value = p_obj[this._checkName],
            len = value.length, clen = this._checkValue.length;

        if (len < this._rangeStart
            || len < clen
            || len < this._rangeEnd
            || !value.substring(0, this._rangeEnd).includes(this._checkValue)) {
            return this._Accept(p_obj);
        }
        else { return this._Deny(p_obj); }
    }

    //#endregion

    _CleanUp() {
        this._rangeStart = NaN;
        this._rangeEnd = NaN;
        super._CleanUp();
    }


}

module.exports = FilterFieldValueNumber;