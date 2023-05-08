'use strict';

const com = require(`@nkmjs/common`);
const _actions = {};

module.exports = {// PORT_TO_MODULE

    GetModel: function (p_actionId) {
        let cl = _actions[p_id];
        if (!cl) { return null; }
        return cl.__model;
    },

    Get: function (p_actionId) {
        let cl = _actions[p_id];
        if (!cl) { return null; }
        return com.Rent(cl);
    },

    /**
     * 
     * @param {Object} p_actions { action:actionClass }
     */
    AddMultiple: function (p_actions) {
        for (let id in p_actions) {
            _actions[id] = p_actions[id];
        }
    },

    Add: function (p_id, p_actionClass) {
        _actions[p_id] = p_actionClass;
    }

}