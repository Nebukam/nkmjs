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

const base = InputBase;

class InputField extends base {
    constructor() { super(); }

    static __inputProperties = {};

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/field.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`preventTabIndexing`)
        .To(`placeholder`, `placeholderValue`);

    _Init() {
        super._Init();
        this._inputField = null;
        this._inFocus = false;
        this._preventTabIndexing = false;
        this._updatePreviewWhenFocused = false;
        this._restoreUpdatePreviewOnFocus = false;

        this._handler._updatePreviewOnInput = false;
        this._handler._changeOnInput = false;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;

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

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.pos.rel,
                ...style.rules.flex.stretch,
                'align-items': `center`,
                'min-height': `28px !important` //min height for input field
            },
            '.field': {
                ...style.rules.display.none,
                ...style.rules.item.fill,
                'min-width': 0
            }
        }, base._Style());

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
        if (INPUT.shiftKey) { return; }
        if (p_evt) { p_evt.preventDefault(); }
        this._inputField.blur();
    }

    _onFocusIn(p_evt) {
        this._inFocus = true;
        INPUT.focusedField = this;
        INPUT.ONKeyDown(KB.KEYS._enter, this._FOut);
        this._restoreUpdatePreviewOnFocus = this._handler._updatePreviewOnInput;
        this._handler._updatePreviewOnInput = this._updatePreviewWhenFocused;
        // TODO : Prevent keystrokes from being triggered while an input is in focus
    }

    _onFocusOut(p_evt) {
        this._inFocus = false;
        if (INPUT.focusedField == this) { INPUT.focusedField = null; }
        INPUT.OFFKeyDown(KB.KEYS._enter, this._FOut);
        this._handler._updatePreviewOnInput = this._restoreUpdatePreviewOnFocus;
        this._handler.SubmitValue();
        // TODO : Release keystroke lock if current input locker is self
    }

    _UpdatePreview() {
        this._inputField.value = this.inputValue;
    }

    _CleanUp(){
        this._inputField.value = null;
        super._CleanUp();
        this.handler.currentValue = null;
        this.handler.changedValue = null;
        this.handler.inputValue = null;
    }

}

module.exports = InputField;
UI.Register(`nkmjs-input-field`, InputField);