/**
 * For manipulating a group of input as a single input.
 * Abstract handler.
 */
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const INPUT_SIGNAL = require(`./input-signal`);
const InputBase = require(`./input-base`);

class InputFormHandler extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._inputList = new collections.List();
        this._inputValues = {};
        this._errorCount = 0;
        this._invalidForm = false;
    }

    get inputValues() { return this._inputValues; }

    get invalidForm() { return this._invalidForm; }

    Register(p_input) {

        if (!u.isInstanceOf(p_input, InputBase)) {
            throw new Error(`InputFormHandler cannot register non-input items.`);
        }

        if (!this._inputList.Add(p_input)) { return; }

        this._inputValues[p_input.inputId] = p_input.currentValue;
        p_input._internalValidateChangedValue();

        if (p_input.invalidInput) {
            this._invalidForm = true;
            this._Broadcast(INPUT_SIGNAL.FORM_INVALID, this);
        } else if (!this._invalidForm) {
            this._Broadcast(INPUT_SIGNAL.FORM_READY, this);
        }

        p_input
            .Watch(INPUT_SIGNAL.VALUE_SUBMITTED, this._OnInputSubmit, this)
            .Watch(INPUT_SIGNAL.VALUE_CHANGED, this._OnInputChanged, this)
            .Watch(INPUT_SIGNAL.INPUT_ERROR, this._OnInputError, this);

    }

    Unregister(p_input) {

        if (!this._inputList.Remove(p_input)) { return; }

        delete this._inputValues[p_input.inputId];

        p_input
            .Unwatch(INPUT_SIGNAL.VALUE_SUBMITTED, this._OnInputSubmit, this)
            .Unwatch(INPUT_SIGNAL.VALUE_CHANGED, this._OnInputChanged, this)
            .Unwatch(INPUT_SIGNAL.INPUT_ERROR, this._OnInputError, this);

    }

    ValidateForm() {
        let was = this._invalidForm;
        this._invalidForm = false;
        this._errorCount = 0;
        this._inputList.ForEach(this._CheckInput, this);

        if (this._invalidForm != was) {
            if (this._invalidForm) {
                // Form is now invalid
                this._Broadcast(INPUT_SIGNAL.FORM_INVALID, this);
            } else {
                // For is now valid
                this._Broadcast(INPUT_SIGNAL.FORM_READY, this);
            }
        }

        return this._invalidForm;
    }

    _CheckInput(p_input) {
        if (p_input.invalidInput) {
            this._invalidForm = true;
            this._errorCount += p_input._inputErrors.length;
        }
    }

    Clear() {
        for (let i = 0, n = this._inputList.count; i < n; i++) {
            this.Unregister(this._inputList.last);
        }
    }

    _OnInputSubmit(p_input, p_newValue) {
        this.ValidateForm();
        this._inputValues[p_input.inputId] = p_newValue;
    }

    _OnInputChanged(p_input, p_newValue) {
        this.ValidateForm();
        this._inputValues[p_input.inputId] = p_newValue;
    }

    _OnInputError(p_input, p_errors) {
        this.ValidateForm();
    }

}

module.exports = InputFormHandler;