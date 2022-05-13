'use strict';

const u = require("@nkmjs/utils");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class DataForward {
    constructor(p_owner) {
        this._owner = p_owner;
        this._forwards = [];
    }

    /**
     * 
     * @param {ui.core.Widget|string} p_target 
     * @param {object} p_config
     * @param {object} [p_config.mapping]
     * @param {string} [p_config.dataMember] child data id to forward
     * @param {object} [p_config.preprocess] preprocess Call object { fn [,thisArg, arg|args] }
     * @param {boolean} p_static 
     */
    To(p_target, p_config = null, p_static = true) {

        if (!p_target) { return this; }

        p_config = p_config || {};

        if (u.isString(p_target)) { p_config.member = p_target; }
        else { p_config.target = p_target; }

        if (p_static) { p_config.static = true; }

        this._forwards.push(p_config);

        return this;

    }

    Remove(p_target) {
        for (let i = 0; i < this._forwards.length; i++) {
            let fwd = this._forwards[i];
            if (fwd.member == p_target || fwd.target == p_target) {
                this._forwards.splice(i, 1);
                return;
            }
        }
    }

    Set(p_data) {

        this._forwards.forEach(fwd => {

            let target;

            if (fwd.member) { target = this._owner[fwd.member]; }
            else { target = fwd.target; }

            if (!target) { return; }

            let dataMember = null;

            if (p_data) {
                dataMember = fwd.dataMember ? p_data[fwd.dataMember] : p_data;
                if (fwd.preprocess) {
                    dataMember = u.Call(fwd.preprocess, dataMember, p_data);
                }
            }

            if (fwd.mapping) {
                let mapping = fwd.mapping;
                if (u.isString(mapping)) { target[mapping] = dataMember; }
                else if (u.isObject(mapping) || u.isFunc(mapping)) { u.Call(mapping, dataMember); }
                else { target.data = dataMember; }
            } else {
                target.data = dataMember;
            }

        });

    }

    /**
     * Helper method to batch-set the a set member value to every 
     * available forward target
     * @param {string} p_member 
     * @param {*} p_value 
     */
    _BatchSet(p_member, p_value) {

        this._forwards.forEach(fwd => {

            let target;

            if (fwd.member) { target = this._owner[fwd.member]; }
            else { target = fwd.target; }

            if (!target) { return; }

            target[p_member] = p_value;

        });
    }


    Clear(p_all = false) {

        if (p_all) {
            this._forwards.length = 0;
            return;
        }

        for (let i = 0; i < this._forwards.length; i++) {
            if (!this._forwards[i].static) {
                this._forwards.splice(i, 1);
                i--;
            }
        }
    }

}

module.exports = DataForward;