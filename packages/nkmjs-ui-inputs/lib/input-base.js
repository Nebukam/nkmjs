/**
 * Input are abstract data manipulator.
 * They don't know what they are manipulating, or why.
 */

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

const INPUT_SIGNAL = require(`./input-signal`);

class BaseInput extends ui.Widget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/shared.css`]
    }, ui.Widget, ['css']);

    // ----> Init

    _Init() {
        super._Init();
        this._currentValue = null;
        this._changedValue = null;

        this._invalidInput = false;
        this._inputErrors = new Array(0);
        this._externalValidationStack = new Array(0);
        this._externalSanitizationStack = new Array(0);
        this._errorFeedbacks = new Array(0);

        this._updatePreviewOnChange = true;
        this._submitOnChange = true;

        this._inputId = ``;

        this._sizeEnum = new ui.helpers.FlagEnum(ui.FLAGS.sizes, true);
        this._sizeEnum.Add(this);

        this._flavorEnum = new ui.helpers.FlagEnum(ui.FLAGS.flavors, true);
        this._flavorEnum.Add(this);

    }

    set size(p_value){ this._sizeEnum.Set(p_value); }
    get size(){ return this._sizeEnum.currentFlag; }

    // ----> Current value

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
        this._UpdatePreview();
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
        this._Broadcast(INPUT_SIGNAL.VALUE_CHANGED, this, this._changedValue);
        if (this._updatePreviewOnChange) { this._UpdatePreview(); }
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
     */
    _SelectionLost() {
        super._SelectionLost();
        this.SubmitValue(); //Auto-commit on selection lost
        this.SoftReset();
    }

    /**
     * @access protected
     * @param {*} p_value 
     */
    _SanitizeValue(p_value) {
        //Check external validation callbacks
        let check = null;
        for (let i = 0, n = this._externalSanitizationStack.length; i < n; i++) {
            check = this._externalSanitizationStack[i];
            p_value = check.fn.call(check.thisArg, p_value);
        }

        return p_value;
    }

    /**
     * @access protected
     * @param {*} p_value 
     */
    _ValidateChangedValue(p_value) {

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

        this._ClearErrors();
        this._ValidateChangedValue(this._changedValue);

        //Check external validation callbacks
        for (let i = 0, n = this._externalValidationStack.length; i < n; i++) {
            let check = this._externalValidationStack[i],
                result = check.fn.call(check.thisArg, this._changedValue);
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
        if (u.tils.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }
        this._externalSanitizationStack.push(item);
    }

    /**
     * Add a validation callback
     * @param {*} p_fn 
     * @param {*} p_thisArg 
     */
    AddValidation(p_fn, p_thisArg = null) {
        let item = null;
        if (u.tils.isObject(p_fn)) { item = p_fn; }
        else { item = { fn: p_fn, thisArg: p_thisArg }; }
        this._externalValidationStack.push(item);
    }

    /**
     * @access protected
     * @param {*} p_err 
     */
    _PushError(p_err) {
        if (u.tils.isString(p_err)) { p_err = { type: com.FLAGS.ERROR, message: p_err }; }

        if (this._inputErrors.includes(p_err)) { return; }

        this._inputErrors.push(p_err);
        this._invalidInput = true;
    }

    /**
     * @access protected
     */
    _internalOnInputError() {
        this._OnInputErrors();
        this._Broadcast(INPUT_SIGNAL.INPUT_ERROR, this, this._inputErrors);
    }

    /**
     * @access protected
     */
    _OnInputErrors() {

        for (let i = 0, n = this._inputErrors.length; i < n; i++) {

            let err = this._inputErrors[i],
                feedback = this._AddFeedback(err);
                this._flavorEnum.Bump(err.type);
            if (feedback) { this._errorFeedbacks.push(feedback); }
        }

    }

    /**
     * @access protected
     */
    _UpdatePreview() {

    }

    /**
     * @access protected
     * @param {*} p_err 
     */
    _AddFeedback(p_err) {
        return null;
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

        this._flavorEnum.Set(null);

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
        this.changedValue = this._SanitizeValue(this._changedValue);

        // Ignore submit if value is left unchanged
        if (!this._IsValueChanged()) { return; }
        if (!this._internalValidateChangedValue()) {
            this.changedValue = this._currentValue;
            return;
        }

        this._Broadcast(INPUT_SIGNAL.VALUE_SUBMITTED, this, this._changedValue);
        this._UpdatePreview();

    }

    // ----> Soft reset input

    /**
     * Soft reset input : revert input value back to the stored one, clears feedbacks etc.
     */
    SoftReset() {
        this.changedValue = this.currentValue;
        this._ClearErrors();
        this._UpdatePreview();
    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();

        this._flavorEnum.Set(null);

        this._ClearErrors();
        this._externalValidationStack.length = 0;
        this._inputId = ``;
        this._currentValue = null;
        this._changedValue = null;
    }

}

module.exports = BaseInput;
//UI.Register(`nkmjs-input-base`, BaseInput);