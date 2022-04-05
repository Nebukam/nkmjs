'use strict';

const com = require("@nkmjs/common");
const Action = require(`./action`);
const ACTION_STATE = require(`./action-state`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof actions
 */
class ActionRoot extends Action {
    constructor() { super(); }

    static get mergeable() { return false; }

    get stack() { return this._stack; }
    set stack(p_value) { this._stack = p_value; }

    static __displayIcon = `action`;
    static __displayName = `Root`;
    static __displayTitle = `Action stack root`;

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get operation() { return null; }
    get state() { return ACTION_STATE.DONE; }

    // ----> Can merge ?

    /**
     * @description Checks whether the given operation can be merged with the current one.
     * This is especially useful for small-increment actions that can be merged into a 
     * single one instead of clogging the undo/redo stack.
     * @param {object} p_operation 
     * @returns {boolean} True if the operations can be merged into a single action, otherwise false.
     */
    CanMerge(p_operation) { return false; }

    // ----> Do / undo

    /**
     * @description Performs the action.
     * @param {object} p_operation 
     * @param {boolean} p_merge True if the operation should be merged, otherwise false.
     * @returns {actions.Action} self
     */
    Do(p_operation, p_merge = false) { return this; }

    /**
     * @description Undo the action based on its current stored operation.
     */
    Undo() {
        if (this._stack) { this._stack._OnActionStateChanged(this, this.state); }
    }

    /**
     * @description Redo the action based on its current stored operation.
     */
    Redo() {
        if (this._stack) { this._stack._OnActionStateChanged(this, this.state); }
    }

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = ActionRoot;