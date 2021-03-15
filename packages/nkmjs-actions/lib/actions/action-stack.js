'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const ActionGroup = require(`./action-group`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof actions
 */
class ActionStack {

    constructor() {
        this._Init();
        this._PostInit();
    }


    // ----> Init

    _Init() {
        this._maxCount = -1;
        this._headIndex = -1;
        this._stack = new Array(0);
        this._isEnabled = true;
        this._groupingActive = false;
        this._group = null;
    }

    _PostInit() {

    }

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

    /**
     * @description TODO
     * @param {boolean} p_toggle 
     */
    ToggleGrouping(p_toggle) {

        if (this._groupingActive === p_toggle) { return; }

        this._groupingActive = p_toggle;

        if (!p_toggle && this._group) {

            //TODO : If group has only one action merge it with the stack instead
            this._group = null;
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
            if (!this._group) { this._group = this._Register(com.Rent(ActionGroup)); }
        }

        // Check if last action can be updated instead of creating a new one.
        let lastAction;
        if (this._group) {
            lastAction = this._group.last;
        } else {
            lastAction = this._stack.length > 0 ? this._stack[this._stack.length - 1] : null;
        }

        if (p_actionClass.mergeable) {
            if (u.tils.isInstanceOf(lastAction, p_actionClass)) {
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
            for (let i = index; i < stack.length; i++) { stack[i].Release(); }
            stack.length = index;
        }

        stack.push(p_action);
        this._headIndex = stack.length - 1;

        return p_action;
    }

    /**
     * @description Undo the last action in line
     */
    Undo() {

        let stack = this._stack;

        if (stack.length === 0) { return; }

        let index = this._headIndex;

        //No more action in line.
        if (index === -1) { return; }

        let action = stack[index];
        this._headIndex = index - 1;

        action.Undo();

    }

    /**
     * @description Redo the next action in line, if any
     */
    Redo() {

        if (this._stack.length === 0) { return; }

        let index = this._headIndex;
        index += 1;

        //Redo-ing action that hasn`t happened yet.
        if (index >= this._stack.length) { return; }

        let action = this._stack[index];
        this._headIndex = index;

        action.Redo();

    }

    /**
     * @description Clear all actions in the stack. **does not undo them, only clear the history.**
     */
    Clear() {
        this.ToggleGrouping(false);
        let stack = this._stack;
        while (stack.length != 0) { stack.pop().Release(); }
        stack.length = 0;
        this._headIndex = -1;
        this._groupingActive = false;
    }

}

module.exports = ActionStack;