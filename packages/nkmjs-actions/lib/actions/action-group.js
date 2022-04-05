'use strict';

const Action = require(`./action`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof actions
 */
class ActionGroup extends Action {
    constructor() { super(); }

    static get mergeable() { return false; }

    static __displayIcon = `action`;
    static __displayName = `Action group`;
    static __displayTitle = `Action group`;

    // ----> Init

    _Init() {
        super._Init();
        this._actions = [];
        this._last = null;
    }

    /**
     * @description TODO
     * @type {actions.Actions}
     * @customtag read-only
     */
    get last() { return this._last; }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Action} p_action 
     */
    _Register(p_action) {
        this._actions.push(p_action);
        this._last = p_action;
        return p_action;
    }

    /**
     * @description TODO
     * @param {object} p_operation 
     * @param {boolean} p_merge 
     */
    Do(p_operation, p_merge = false) {
        //Do nothing
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_operation 
     * @param {boolean} p_merge 
     */
    _InternalDo(p_operation, p_merge = false) {
        //Do nothing
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalUndo() {
        let list = this._actions;
        for (let i = list.length - 1; i >= 0; i--) {
            list[i].Undo();
        }
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalRedo() {
        let list = this._actions;
        for (let i = 0, n = list.length; i < n; i++) {
            list[i].Redo();
        }
    }

    _CleanUp() {
        this._last = null;
        let list = this._actions;
        while (list.length != 0) { list.pop().Release(); }
        this._actions.length = 0;
        super._CleanUp();
    }

}

module.exports = ActionGroup;