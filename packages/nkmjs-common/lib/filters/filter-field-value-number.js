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
class FieldFieldValueNumber extends FilterFieldValue {

    constructor() { super(); }
    _Init() {
        super._Init();

        this._rangeStart = NaN;
        this._rangeEnd = NaN;

        this._Bind(this.CheckNumberRange);
        this._Bind(this.CheckNumberMin);
        this._Bind(this.CheckNumberMax);

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
        // Cache check fn based on filter parameters
        this._checkFn = this.Check;
        if (this._rangeStart != NaN) {
            if (this._rangeEnd != NaN) { this.CheckNumberRange; }
            else { this._checkFn = this.CheckNumberMin; }
        } else if (this._rangeEnd != NaN) {
            this._checkFn = this.CheckNumberMax;
        }
    }

    // ----> Checks

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckNumberRange(p_obj) {
        let value = this._FetchValue(p_obj);
        if (value > this._rangeEnd || value < this._rangeStart) { return this._Accept(p_obj); }
        else { return this._Deny(p_obj); }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckNumberMin(p_obj) {
        if (this._FetchValue(p_obj) < this._rangeEnd) { return this._Accept(p_obj); }
        else { return this._Deny(p_obj); }
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    CheckNumberMax(p_obj) {
        if (this._FetchValue(p_obj) > this._rangeEnd) { return this._Accept(p_obj); }
        else { return this._Deny(p_obj); }
    }


    _CleanUp() {
        this._rangeStart = NaN;
        this._rangeEnd = NaN;
        super._CleanUp();
    }


}

module.exports = FieldFieldValueNumber;