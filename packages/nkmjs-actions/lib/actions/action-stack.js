'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const ActionGroup = require(`./action-group`);
const RootAction = require(`./action-root`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof actions
 */
class ActionStack extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    // ----> Init

    static ROOT = new RootAction();

    _Init() {
        super._Init();
        this._maxCount = -1;
        this._headIndex = -1;
        this._stack = [];
        this._isEnabled = true;
        this._groupingActive = false;
        this._group = null;
        this._groupDisplayInfos = null;
    }

    get count() { return this._stack.length; }

    // ----> Availability

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEnabled() { return this._isEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set enabled(p_value) {
        if (p_value) { this.Enable(); }
        else { this.Disable(); }
    }

    /**
     * @description TODO
     */
    Enable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = true;
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!this._isEnabled) { return false; }
        this._isEnabled = false;
        return true;
    }

    get groupingActive() { return this._groupingActive; }

    /**
     * @description TODO
     * @param {boolean} p_toggle 
     */
    ToggleGrouping(p_toggle, p_groupDisplayInfos = null) {

        if (this._groupingActive === p_toggle) { return; }

        this._groupingActive = p_toggle;

        if (!p_toggle && this._group) {
            //TODO : If group has only one action merge it with the stack instead
            this._group = null;
            this._groupDisplayInfos = null;
        } else if (p_toggle) {
            this._groupDisplayInfos = p_groupDisplayInfos;
        }

    }

    // ----> Registration

    /**
     * @description TODO
     * @param {actions.Action} p_actionClass constructor
     * @param {object} p_operation 
     */
    Do(p_actionClass, p_operation) {

        if (!this._isEnabled) { return null; }

        if (this._groupingActive) {
            if (!this._group) {
                let newGroup = com.Rent(ActionGroup);
                newGroup.displayInfos = this._groupDisplayInfos;
                this._group = this._Register(newGroup);
            }
        }

        // Check if last action can be updated instead of creating a new one.
        let lastAction;
        if (this._group) {
            lastAction = this._group.last;
        } else {
            lastAction = this._stack.length > 0 ? this._stack[this._stack.length - 1] : null;
        }

        if (p_actionClass.mergeable) {
            if (u.isInstanceOf(lastAction, p_actionClass)) {
                if (lastAction.CanMerge(p_operation)) {
                    //Merge if mergeable & can merge current options
                    return lastAction.Do(p_operation, true);;
                }
            }
        }

        if (this._group) {
            return this._group._Register(com.Rent(p_actionClass).Do(p_operation, false));
        } else {
            return this._Register(com.Rent(p_actionClass).Do(p_operation, false));
        }

    }

    /**
     * @access protected
     * @description TODORegister an action that has just been performed.
     * Clears any action undoed before.
     * @param {actions.Action} p_action 
     */
    _Register(p_action) {
        let stack = this._stack;

        if (this._headIndex != stack.length - 1) {
            //Actions have be undoed but still in line.
            let index = this._headIndex + 1;
            let diff = stack.length - index;
            for (let i = 0; i < diff; i++) {
                let action = stack.pop();
                this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, action);
                action.Release();
            }
        }

        p_action.stack = this;
        stack.push(p_action);
        this._headIndex = stack.length - 1;

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_action);

        return p_action;
    }

    /**
     * @description Undo the last action in line
     */
    Undo() {

        let stack = this._stack;

        if (stack.length === 0) { return false; }

        let index = this._headIndex;

        //No more action in line.
        if (index === -1) { return false; }

        let action = stack[index];
        this._headIndex = index - 1;

        action.Undo();

        return true;

    }

    /**
     * @description Redo the next action in line, if any
     */
    Redo() {

        if (this._stack.length === 0) { return false; }

        let index = this._headIndex;
        index += 1;

        //Redo-ing action that hasn`t happened yet.
        if (index >= this._stack.length) { return false; }

        let action = this._stack[index];
        this._headIndex = index;

        action.Redo();

        return true;

    }

    GoToAction(p_action) {
        let index = p_action == this.constructor.ROOT ? 0 : this._stack.indexOf(p_action);
        if (index == -1) { return; }

        let diff = this._headIndex - index;
        if (diff > 0) {
            // Undo until we reach index
            for (let i = 0; i < diff; i++) { this.Undo(); }
        } else if (diff < 0) {
            // Redo until we reach index
            diff = Math.abs(diff);
            for (let i = 0; i < diff; i++) { this.Redo(); }
        }

    }

    /**
     * @description Clear all actions in the stack. **does not undo them, only clear the history.**
     */
    Clear() {
        this.ToggleGrouping(false);
        let stack = this._stack;
        while (stack.length != 0) {
            let action = stack.pop();
            this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, action);
            action.Release();
        }
        stack.length = 0;
        this._headIndex = -1;
        this._groupingActive = false;
    }

    _OnActionStateChanged(p_action, p_state) {
        this.Broadcast(com.SIGNAL.UPDATED, this, p_action);
    }

}

module.exports = ActionStack;