'use strict';

const u = require("@nkmjs/utils");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof com.helpers
 */
class Setter {
    constructor(p_owner, p_defaultID) {
        this._owner = p_owner;
        this._targets = [];
        this._relatives = null;
        this._defaultId = p_defaultID;
    }

    AddRelatives(p_setter, p_fn, p_batchSet = false) {
        if (!this._relatives) { this._relatives = []; }
        this._relatives.push(p_batchSet ?
            { member: p_setter, fn: p_fn } :
            { setter: p_setter, fn: p_fn });
    }

    /**
     * 
     * @param {ui.core.Widget|string} p_target 
     * @param {object} p_config
     * @param {object} [p_config.set]
     * @param {string} [p_config.get] child data id to forward
     * @param {object} [p_config.preprocess] preprocess Call object { fn [,thisArg, arg|args] }
     * @param {boolean} p_static 
     */
    To(p_target, p_config = null, p_static = true) {

        if (!p_target) { return this; }

        p_config = p_config || {};

        if (u.isString(p_target)) { p_config.member = p_target; }
        else { p_config.target = p_target; }

        if (p_static) { p_config.static = true; }

        this._targets.push(p_config);

        return this;

    }

    Update(p_target, p_config = null, p_static = true) {

        let existingConfig = this.Find(p_target);

        if (!existingConfig) {
            this.To(p_target, p_config, p_static);
            return this;
        }

        existingConfig.set = p_config.set;
        existingConfig.member = p_config.member;
        existingConfig.get = p_config.get;

        return this;
    }

    Find(p_target) {
        for (let i = 0; i < this._targets.length; i++) {
            let fwd = this._targets[i];
            if (fwd.member == p_target || fwd.target == p_target) { return fwd; }
        }
        return null;
    }

    Remove(p_target) {
        for (let i = 0; i < this._targets.length; i++) {
            let fwd = this._targets[i];
            if (fwd.member == p_target || fwd.target == p_target) {
                this._targets.splice(i, 1);
                return;
            }
        }
    }

    Set(p_data, p_relativesFirst = true) {

        if (p_relativesFirst) { this._TriggerRelatives(); }

        if (!p_data) {

            for (const nfo of this._targets) {

                let target = nfo.target || this._owner[nfo.member];
                if (!target) { continue; }

                let setter = nfo.set;
                if (setter) {
                    if (u.isObject(setter) || u.isFunc(setter)) { u.Call(setter, null); }
                    else { target[setter] = null; }
                } else {
                    target[this._defaultId] = null;
                }

            };

        } else {

            for (const nfo of this._targets) {

                let target = nfo.target || this._owner[nfo.member];
                if (!target) { continue; }

                let value = nfo.get ? p_data[nfo.get] : p_data;
                if (nfo.preprocess) { value = u.Call(nfo.preprocess, value, p_data); }
               

                let setter = nfo.set;
                if (setter) {
                    if (u.isObject(setter) || u.isFunc(setter)) { u.Call(setter, value); }
                    else { target[setter] = value; }
                } else {
                    target[this._defaultId] = value;
                }

            };
        }

        if (!p_relativesFirst) { this._TriggerRelatives(); }

    }

    _TriggerRelatives() {

        if (this._relatives) {
            for (const rel of this._relatives) {
                let value = u.Call(rel.fn);
                if (rel.setter) { rel.setter.Set(value) }
                else if (rel.member) { this._BatchSet(rel.member, value) }
            }
        }

    }

    /**
     * Helper method to batch-set the a set member value to every 
     * available forward target
     * @param {string} p_member 
     * @param {*} p_value 
     */
    _BatchSet(p_member, p_value) {
        for (const nfo of this._targets) {
            let target = nfo.target || this._owner[nfo.member];
            if (target) { target[p_member] = p_value; }
        };
    }

    Clear(p_all = false) {

        if (p_all) {
            this._targets.length = 0;
            return;
        }

        for (let i = 0; i < this._targets.length; i++) {
            if (!this._targets[i].static) {
                this._targets.splice(i, 1);
                i--;
            }
        }
    }

}

module.exports = Setter;