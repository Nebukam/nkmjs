/**
 * Abstract input handler
 * This is to circumvent having to extend a single input widget class
 * and streamline input behavior across the ui.
 */

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const Widget = require(`../widget`);
const FlagEnum = require(`../helpers/flag-enum`);

const SIGNAL = require(`./input-signal`);

class InputHandler extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._owner = null;

        this._currentValue = null;
        this._changedValue = null;
        this._inputValue = null;

        this._invalidInput = false;
        this._inputErrors = [];
        this._externalValidationStack = new collections.List();
        this._externalSanitizationStack = new collections.List();
        this._errorFeedbacks = [];

        this._updatePreviewOnInput = true;
        this._changeOnInput = false;
        this._updatePreviewOnChange = true;
        this._submitOnChange = true;

        this._managedUpdateInput = true;
        this._managedUpdateChange = true;

        this._inputId = ``;

        this._updatePreviewFn = null;
        this._onInputErrorFn = null;

        this._managed = new collections.List();
        this._manager = null;

        this._delayedPreviewUpdate = new com.time.DelayedCall(this._Bind(this._RequestPreviewUpdate));

    }

    set owner(p_value) {
        if (this._owner == p_value) { return; }
        let oldOwner = this._owner;
        this._owner = p_value;
    }

    /**
     * @type {boolean}
     */
    get changeOnInput() { return this._changeOnInput; }
    set changeOnInput(p_value) { this._changeOnInput = p_value; }

    /**
     * @type {boolean}
     */
    get submitOnChange() { return this._submitOnChange; }
    set submitOnChange(p_value) { this._submitOnChange = p_value; }

    /**
     * @type {*}
     */
    get currentValue() { return this._currentValue; }
    set currentValue(p_value) {
        if (this._currentValue === p_value) {
            this.changedValue = p_value;
            return;
        }
        let oldValue = this._currentValue;
        this._currentValue = p_value;
        this._inputValue = p_value;

        if (this._changedValue != this._currentValue) {
            this._changedValue = p_value; //Setting current value override the edited value.
            this._OnCurrentValueChanged(oldValue);
        }

    }

    /**
     * @type {boolean}
     */
    get invalidInput() { return this._invalidInput; }

    /**
     * @type {string}
     */
    get inputId() { return this._inputId; }
    set inputId(p_value) { this._inputId = p_value; }

    /**
     * @access protected
     * @param {*} p_oldValue 
     */
    _OnCurrentValueChanged(p_oldValue) {

        for (let i = 0; i < this._managed.count; i++) {
            this._managed.At(i).currentValue = this._currentValue;
        }

        this._delayedPreviewUpdate.Schedule();
    }

    // ----> Edited value

    /**
     * @type {*}
     */
    get changedValue() { return this._changedValue; }
    set changedValue(p_value) {
        if (this._changedValue === p_value) { return; }
        let oldValue = this._changedValue;
        this._inputValue = p_value;
        this._changedValue = p_value;
        this._OnValueChanged(oldValue);
    }

    /**
     * @access protected
     * @param {*} p_oldValue 
     */
    _OnValueChanged(p_oldValue) {
        this._internalValidateChangedValue();
        this._Broadcast(SIGNAL.VALUE_CHANGED, this, this._changedValue);

        for (let i = 0; i < this._managed.count; i++) {
            this._managed.At(i).changedValue = this._changedValue;
        }

        if (this._updatePreviewOnChange) { this._delayedPreviewUpdate.Schedule(); }
        if (this._submitOnChange) { this.SubmitValue(); }
    }

    /**
     * @access protected
     */
    _IsValueChanged() {
        return this._currentValue != this._changedValue;
    }

    /**
     * @access protected
     * @param {*} p_value 
     */
    _SanitizeValue(p_value) {
        //Check external validation callbacks
        let obj = null;

        let stack = this._manager
            ? this._manager._externalSanitizationStack
            : this._externalSanitizationStack;

        for (let i = 0, n = stack.count; i < n; i++) {
            obj = stack.At(i);

            if (obj.arg) { p_value = obj.fn.call(obj.thisArg, p_value, obj.arg); }
            else if (obj.args) { p_value = obj.fn.call(obj.thisArg, p_value, ...obj.args); }
            else { p_value = obj.fn.call(obj.thisArg, p_value); }

        }

        return p_value;
    }

    get inputValue() { return this._inputValue; }
    set inputValue(p_value) {
        if (this._inputValue === p_value) { return; }
        let oldValue = this._inputValue;
        this._inputValue = p_value;
        this._OnInputValueChanged(oldValue);
    }

    /**
     * @access protected
     * @param {*} p_oldValue 
     */
    _OnInputValueChanged(p_oldValue) {

        this._Broadcast(SIGNAL.VALUE_INPUT_CHANGED, this, this._inputValue);

        for (let i = 0; i < this._managed.count; i++) {
            this._managed.At(i).inputValue = this._inputValue;
        }

        if (this._changeOnInput) { this.changedValue = this._inputValue; }
        if (this._updatePreviewOnInput) { this._delayedPreviewUpdate.Schedule(); }
        
    }

    /**
     * @access protected
     */
    _ClearErrors() {
        this._ClearFeedbacks();
        this._invalidInput = false;
        this._inputErrors.length = 0;
    }

    /**
     * Validate whether the current 'changedValue' is valid or not
     * and generate an error report in the form { type:'', message:'' }
     * Make your life easier : store preset messages.
     * @access protected
     */
    _internalValidateChangedValue() {

        let cValue = this._changedValue;

        this._ClearErrors();

        let stack = this._manager
            ? this._manager._externalValidationStack
            : this._externalValidationStack;

        //Check external validation callbacks
        for (let i = 0, n = stack.count; i < n; i++) {

            let obj = stack.At(i),
                result = null;

            if (obj.arg) { result = obj.fn.call(obj.thisArg, cValue, obj.arg); }
            else if (obj.args) { result = obj.fn.call(obj.thisArg, cValue, ...obj.args); }
            else { result = obj.fn.call(obj.thisArg, cValue); }

            if (result) { this._PushError(result); }

        }

        this._invalidInput = (this._inputErrors.length > 0);
        if (this._invalidInput) { this._internalOnInputError(); }

        return !this._invalidInput;

    }

    /**
     * Add a sanitization callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */
    AddSanitization(p_fn, p_thisArg = null) {
        let item = null;
        if (u.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }

        if (this.__GetInternalListItemIndex(item, this._externalSanitizationStack) != -1) { return; }

        this._externalSanitizationStack.Add(item);
    }

    /**
     * Removes a sanitization callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */
    RemoveSanitization(p_fn, p_thisArg = null) {
        let item = null;
        if (u.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }
        let index = this.__GetInternalListItemIndex(item, this._externalSanitizationStack);
        if (index == -1) { return; }
        this._externalSanitizationStack.RemoveAt(index);
    }

    /**
     * Add a validation callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */
    AddValidation(p_fn, p_thisArg = null) {
        let item = null;
        if (u.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }

        if (this.__GetInternalListItemIndex(item, this._externalValidationStack) != -1) { return; }

        this._externalValidationStack.Add(item);
    }

    /**
     * Removes a validation callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */
    RemoveValidation(p_fn, p_thisArg = null) {
        let item = null;
        if (u.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }
        let index = this.__GetInternalListItemIndex(item, this._externalValidationStack);
        if (index == -1) { return; }
        this._externalValidationStack.RemoveAt(index);
    }

    __GetInternalListItemIndex(p_item, p_list) {
        for (let i = 0; i < p_list.count; i++) {
            let existingItem = p_list.At(i);
            if (existingItem.fn == p_item.fn && existingItem.thisArg == p_item.thisArg) { return i; }
        }
        return -1;
    }

    /**
     * @access protected
     * @param {*} p_err 
     */
    _PushError(p_err) {
        if (u.isString(p_err)) {

            for (let i = 0, n = this._inputErrors.length; i < n; i++) {
                if (this._inputErrors.message === p_err) { return; }
            }

            p_err = { type: com.FLAGS.ERROR, message: p_err };
        }
        else {
            if (!p_err.type) { p_err.type = com.FLAGS.ERROR }
        }

        if (this._inputErrors.includes(p_err)) { return; }

        this._inputErrors.push(p_err);
        this._invalidInput = true;
    }

    /**
     * @access protected
     */
    _internalOnInputError() {
        this._OnInputErrors();
        this._Broadcast(SIGNAL.INPUT_ERROR, this, this._inputErrors);
    }

    /**
     * @access protected
     */
    _OnInputErrors() {
        if (this._onInputErrorFn) { this._onInputErrorFn(this._inputErrors); }
    }

    _AddFeedback(p_item) {
        this._errorFeedbacks.push(feedback);
    }

    /**
     * @access protected
     */
    _RequestPreviewUpdate() {
        if (this._updatePreviewFn) { this._updatePreviewFn(); }
    }


    /**
     * Concat all error messages associated with a given flag.
     * @access protected
     * @param {*} p_flag
     * @returns {string} 
     */
    _ConcatErrors(p_flag, p_break = '<br/>') {
        let str = ``;
        for (let i = 0, n = this._inputErrors.length, nMinus = n - 1; i < n; i++) {
            let obj = this._inputErrors[i];
            if (obj.type != p_flag) { continue; }
            str += obj.message;
            if (i != nMinus) {
                str += p_break;
            }
        }
        return str;
    }

    /**
     * @access protected
     */
    _ClearFeedbacks() {

        this._owner.flavor = null;

        for (let i = 0, n = this._errorFeedbacks.length; i < n; i++) {
            this._errorFeedbacks[i].Release();
        }

        this._errorFeedbacks.length = 0;

    }

    // ----> Submit

    /**
     * 
     */
    SubmitValue() {

        // Silently sanitize value right before submit
        // This way it does not intrudes with user input while input happens
        this._changedValue = this._SanitizeValue(this._changedValue);

        // Ignore submit if value is left unchanged
        if (!this._IsValueChanged()) {
            this.SoftReset();
            return false;
        }

        if (!this._internalValidateChangedValue()) {
            this.changedValue = this._currentValue;
            this.SoftReset();
            return false;
        }

        this.currentValue = this._changedValue;
        this._changedValue = this._currentValue;

        this._Broadcast(SIGNAL.VALUE_SUBMITTED, this, this._changedValue);
        this._delayedPreviewUpdate.Schedule();
        return true;

    }

    // ----> Soft reset input

    /**
     * Soft reset input : revert input value back to the stored one, clears feedbacks etc.
     */
    SoftReset() {
        this.changedValue = this.currentValue;
        this._ClearErrors();
        this._delayedPreviewUpdate.Schedule();
    }

    Clear() {
        this._ClearErrors();
        this._ClearFeedbacks();
        this._inputId = ``;
        this._changedValue = null;
        this._currentValue = null;
    }

    // ----> Managed

    set manager(p_value) {

        if (this._manager == p_value) { return; }

        let oldManager = this._manager;
        this._manager = p_value;

        if (oldManager) {
            oldManager.Unwatch(SIGNAL.VALUE_CHANGED, this._OnManagerValueChanged, this);
            oldManager.Unwatch(SIGNAL.VALUE_SUBMITTED, this._OnManagerValueSubmitted, this);
            oldManager.RemoveManaged(this);
        }

        if (this._manager) {
            this.changedValue = this._manager.changedValue;
            this.currentValue = this._manager.currentValue;
            this._manager.Watch(SIGNAL.VALUE_CHANGED, this._OnManagerValueChanged, this);
            this._manager.Watch(SIGNAL.VALUE_SUBMITTED, this._OnManagerValueSubmitted, this);
            this._manager.AddManaged(this);
        }

    }
    get manager() { return this._manager; }

    AddManaged(p_handler) {
        if (!this._managed.Add(p_handler)) { return; }
        p_handler.manager = this;
        p_handler.Watch(SIGNAL.VALUE_INPUT_CHANGED, this._OnManagedInputValueChanged, this);
        p_handler.Watch(SIGNAL.VALUE_CHANGED, this._OnManagedValueChanged, this);
        p_handler.Watch(SIGNAL.VALUE_SUBMITTED, this._OnManagedValueSubmitted, this);
    }

    RemoveManaged(p_handler) {
        if (!this._managed.Remove(p_handler)) { return; }
        if (p_handler.manager == this) { p_handler.manager = null; }
        p_handler.Unwatch(SIGNAL.VALUE_INPUT_CHANGED, this._OnManagedInputValueChanged, this);
        p_handler.Unwatch(SIGNAL.VALUE_CHANGED, this._OnManagedValueChanged, this);
        p_handler.Unwatch(SIGNAL.VALUE_SUBMITTED, this._OnManagedValueSubmitted, this);
    }

    _OnManagedInputValueChanged(p_managed, p_value) {
        if(!this._managedUpdateInput){ return; }
        this.inputValue = p_value;
    }

    _OnManagedValueChanged(p_managed, p_value) {
        if(!this._managedUpdateChange){ return; }
        this.changedValue = p_value;
    }

    _OnManagedValueSubmitted(p_managed, p_value) {
        this.changedValue = p_value;
        this.SubmitValue();
    }

    _OnManagerValueChanged(p_manager, p_value) {
        this.changedValue = p_value;
    }

    _OnManagerValueSubmitted(p_manager, p_value) {
        this.currentValue = p_value;
    }

    // ----> Pooling

    _CleanUp() {
        this.manager = null;
        super._CleanUp();
        this._externalValidationStack.Clear();
        this._externalSanitizationStack.Clear();
        this.Clear();
    }

}

module.exports = InputHandler;
 //UI.Register(`nkmjs-input-base`, BaseInput);