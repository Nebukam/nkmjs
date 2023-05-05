'use strict';

const com = require(`@nkmjs/common`);

class ActionManager extends com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._actions = {};
    }

    static GetModel(p_actionId) {
        let cl = this._actions[p_id];
        if (!cl) { return null; }
        return cl.__model;
    }

    static Get(p_actionId) {
        let cl = this._actions[p_id];
        if (!cl) { return null; }
        return com.Rent(cl);
    }

    /**
     * 
     * @param {Object} p_actions { action:actionClass }
     */
    static AddMultiple(p_actions) {
        for (let id in p_actions) {
            this._actions[id] = p_actions[id];
        }
    }

    static Add(p_id, p_actionClass) {
        this.instance._actions[p_id] = p_actionClass;
    }

}

module.exports = ActionManager;