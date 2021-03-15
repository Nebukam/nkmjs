'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`../data/data-block`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.signals.Observer
 * @memberof data.core.helpers
 */
class DataObserver extends com.signals.Observer {
    constructor() { super(); }

    /**
     * @description Starts watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Observe(p_target) { return super.Observe(this._ExtractNestedData(p_target)); }

    /**
     * @description Starts watching for signals of a given target, and removes all other targets
     * @param {*} p_target may be null
     * @returns {*} target
     */
    ObserveOnly(p_target) { return super.ObserveOnly(this._ExtractNestedData(p_target)); }

    /**
     * @description Stop watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Unobserve(p_target) { return super.Unobserve(this._ExtractNestedData(p_target)); }

    _ExtractNestedData(p_value) {
        if (p_value && !u.tils.isInstanceOf(p_value, DataBlock)) {
            if (u.tils.isInstanceOf(p_value[com.IDS.DATA], DataBlock)) { p_value = p_value[com.IDS.DATA]; }
            else { p_value = null; }
        }
        return p_value;
    }

}

module.exports = DataObserver;