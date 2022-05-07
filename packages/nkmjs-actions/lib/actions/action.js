'use strict';

const com = require("@nkmjs/common");
const ACTION_STATE = require(`./action-state`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helper.InfosObject
 * @memberof actions
 */
class Action extends com.helpers.InfosObject {
    constructor() { super(); }

    static get mergeable() { return false; }

    static __displayIcon = `action`;
    static __deepCleanFn = null;

    // ----> Init

    _Init() {
        super._Init();
        this._operation = null;
        this._undone = false;
        this._stack = null;
    }

    get stack() { return this._stack; }
    set stack(p_value) { 
        this._stack = p_value; 
    }

    _UpdateDisplayInfos(){

    }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get operation() { return this._operation; }
    get state() { return this._undone ? ACTION_STATE.UNDONE : ACTION_STATE.DONE; }

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
        this._UpdateDisplayInfos();
        if (this._stack) {
            this._stack._OnActionStateChanged(this, this.state); 
        }
        return this;
    }

    /**
     * @description Undo the action based on its current stored operation.
     */
    Undo() {
        this._undone = true;
        this._InternalUndo();
        if (this._stack) { this._stack._OnActionStateChanged(this, this.state); }
    }

    /**
     * @description Redo the action based on its current stored operation.
     */
    Redo() {
        this._undone = false;
        this._InternalRedo();
        if (this._stack) { this._stack._OnActionStateChanged(this, this.state); }
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

        if (!this._undone) {
            if (this.constructor.__deepCleanFn != null) {
                this.constructor.__deepCleanFn(this);
            }
        }
        this._operation = null;
        this._undone = false;
        this._stack = null;
        super._CleanUp();
    }



}

module.exports = Action;