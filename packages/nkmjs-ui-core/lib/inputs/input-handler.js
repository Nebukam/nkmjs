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

        this._invalidInput = false;
        this._inputErrors = [];
        this._externalValidationStack = new collections.List();
        this._externalSanitizationStack = new collections.List();
        this._errorFeedbacks = [];

        this._updatePreviewOnChange = true;
        this._submitOnChange = true;

        this._inputId = ``;

        this._updatePreviewFn = null;
        this._onInputErrorFn = null;

    }

    set owner(p_value) {
        if (this._owner == p_value) { return; }
        let oldOwner = this._owner;
        this._owner = p_value;
    }

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
        this._changedValue = p_value; //Setting current value override the edited value.
        this._OnCurrentValueChanged(oldValue);
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
        this._RequestPreviewUpdate();
    }

    // ----> Edited value

    /**
     * @type {*}
     */
    get changedValue() { return this._changedValue; }
    set changedValue(p_value) {
        if (this._changedValue === p_value) { return; }
        let oldValue = this._changedValue;
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
        if (this._updatePreviewOnChange) { this._RequestPreviewUpdate(); }
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
        for (let i = 0, n = this._externalSanitizationStack.count; i < n; i++) {
            obj = this._externalSanitizationStack.At(i);

            if (obj.arg) { p_value = obj.fn.call(obj.thisArg, p_value, obj.arg); }
            else if (obj.args) { p_value = obj.fn.call(obj.thisArg, p_value, ...obj.args); }
            else { p_value = obj.fn.call(obj.thisArg, p_value); }

        }

        return p_value;
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

        //Check external validation callbacks
        for (let i = 0, n = this._externalValidationStack.count; i < n; i++) {

            let obj = this._externalValidationStack.At(i),
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
        this._externalSanitizationStack.Add(item);
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
        this._externalValidationStack.Add(item);
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
        this._RequestPreviewUpdate();
        return true;

    }

    // ----> Soft reset input

    /**
     * Soft reset input : revert input value back to the stored one, clears feedbacks etc.
     */
    SoftReset() {
        this.changedValue = this.currentValue;
        this._ClearErrors();
        this._RequestPreviewUpdate();
    }

    Clear() {
        this._ClearErrors();
        this._ClearFeedbacks();
        this._inputId = ``;
        this._changedValue = null;
        this._currentValue = null;
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
        this._externalValidationStack.Clear();
        this._externalSanitizationStack.Clear();
        this.Clear();
    }

}

module.exports = InputHandler;
 //UI.Register(`nkmjs-input-base`, BaseInput);