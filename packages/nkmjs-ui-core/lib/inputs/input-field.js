//implement this : https://javascript.info/events-change-input

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const INPUT = require(`../input`);
const KB = actions.KEYBOARD;

const InputBase = require(`./input-base`);

class InputField extends InputBase {
    constructor() { super(); }

    static __inputProperties = {};

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/field.css`]
    }, InputBase, ['css']);

    _Init() {
        super._Init();
        this._inputField = null;
        this._preventTabIndexing = false;

        this._optionsHandler.Hook(`preventTabIndexing`);

        this._Bind(this._onInput);
        this._Bind(this._onChange);
        this._Bind(this._onFocusIn);
        this._Bind(this._onFocusOut);
        this._Bind(this._FOut);
        this._Bind(this._FIn);
    }

    _PostInit() {
        super._PostInit();
        this._inputField.addEventListener('focus', this._onFocusIn);
        this._inputField.addEventListener('focusout', this._onFocusOut);
        this._inputField.addEventListener(`input`, this._onInput);
        this._inputField.addEventListener(`change`, this._onChange);

        if (this._preventTabIndexing) { this.preventTabIndexing = true; }
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `center`,
                'min-height': `28px !important` //min height for input field
            },
            '.field': {
                display: 'none',
                flex: `1 1 auto`,
                'min-width': 0
            }
        }, super._Style());

    }

    _Render() {
        this._inputField = dom.El(`input`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }

    set placeholderValue(p_value) {
        this._inputField.setAttribute(`placeholder`, p_value);
    }

    set preventTabIndexing(p_value) {
        this._preventTabIndexing = p_value;
        if (p_value) { this._inputField.setAttribute(`tabindex`, -1); }
        else { this._inputField.removeAttribute(`tabindex`); }
    }

    _onInput(p_evt) {
        this._handler.inputValue = this._GrabValue(); 
        //TODO: Need to refactor handler in order to dissociate check methods from "change" event
        //so we can have checks on current input without overriding it if it doesn't pass validation.
    }

    _onChange(p_evt) { this._handler.changedValue = this._GrabValue(); }

    _GrabValue() { return this._inputField.value; }

    _FIn() { this._inputField.focus(); }

    _FOut(p_evt) {
        if (INPUT.shift) { return; }

        if (p_evt) { p_evt.preventDefault(); }
        this._inputField.blur();
    }

    _onFocusIn(p_evt) {
        INPUT.ONKeyDown(KB._enter, this._FOut);
        // TODO : Prevent keystrokes from being triggered while an input is in focus
    }

    _onFocusOut(p_evt) {
        INPUT.OFFKeyDown(KB._enter, this._FOut);
        this._handler.SubmitValue();
        // TODO : Release keystroke lock if current input locker is self
    }

    _UpdatePreview() {
        this._inputField.value = this.changedValue;
    }

}

module.exports = InputField;
UI.Register(`nkmjs-input-field`, InputField);