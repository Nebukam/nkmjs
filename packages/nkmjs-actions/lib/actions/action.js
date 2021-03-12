'use strict';

const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof actions
 */
class Action extends com.pool.DisposableObject {
    constructor() { super(); }

    static get mergeable() { return false; }

    // ----> Init

    _Init() {
        super._Init();
        this._operation = null;
        this._undoed = false;
    }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get operation() { return this._operation; }

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
    Do(p_operation, p_merge = false) {
        if (!p_merge) { this._operation = p_operation; }
        this._InternalDo(p_operation, p_merge);
        return this;
    }

    /**
     * @description Undo the action based on its current stored operation.
     */
    Undo() {
        this._undoed = true;
        this._InternalUndo();
    }

    /**
     * @description Redo the action based on its current stored operation.
     */
    Redo() {
        this._undoed = false;
        this._InternalRedo();
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_operation 
     * @param {boolean} p_merge 
     * @customtag override-me
     */
    _InternalDo(p_operation, p_merge = false) {

    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _InternalUndo() {

    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _InternalRedo() {

    }

    _CleanUp() {
        this._operation = null;
        this._undoed = false;
        super._CleanUp();
    }



}

module.exports = Action;