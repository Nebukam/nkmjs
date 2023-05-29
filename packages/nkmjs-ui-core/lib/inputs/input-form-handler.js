/**
 * For manipulating a group of input as a single input.
 * Abstract handler.
 */
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const col = require(`@nkmjs/collections`);

const SIGNAL = require(`./input-signal`);
const InputBase = require(`./input-base`);

class InputFormHandler extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._inputList = [];
        this._inputValues = {};
        this._errorCount = 0;
        this._invalidForm = false;

        this._handlerObserver = new com.signals.Observer();
        this._handlerObserver
            .Hook(SIGNAL.VALUE_SUBMITTED, this._OnInputSubmit, this)
            .Hook(com.SIGNAL.VALUE_CHANGED, this._OnInputChanged, this)
            .Hook(SIGNAL.INPUT_ERROR, this._OnInputError, this);
    }

    get inputValues() { return this._inputValues; }

    get invalidForm() { return this._invalidForm; }

    Register(p_input) {

        if (!u.isInstanceOf(p_input, InputBase)) {
            throw new Error(`InputFormHandler cannot register non-input items.`);
        }

        if (!this._inputList.AddNew(p_input)) { return; }

        this._inputValues[p_input.inputId] = p_input.currentValue;
        p_input._internalValidateChangedValue();

        if (p_input.invalidInput) {
            this._invalidForm = true;
            this.Broadcast(SIGNAL.FORM_INVALID, this);
        } else if (!this._invalidForm) {
            this.Broadcast(SIGNAL.FORM_READY, this);
        }

        this._handlerObserver.Observe(p_input._handler);

    }

    Unregister(p_input) {

        if (!this._inputList.Remove(p_input)) { return; }

        delete this._inputValues[p_input.inputId];

        this._handlerObserver.Unobserve(p_input._handler);

    }

    ValidateForm() {
        let was = this._invalidForm;
        this._invalidForm = false;
        this._errorCount = 0;

        for (const i of this._inputList) { this._CheckInput(i); }

        if (this._invalidForm != was) {
            if (this._invalidForm) {
                // Form is now invalid
                this.Broadcast(SIGNAL.FORM_INVALID, this);
            } else {
                // For is now valid
                this.Broadcast(SIGNAL.FORM_READY, this);
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
        while (this._inputList.length) { this.Unregister(this._inputList.last); }
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