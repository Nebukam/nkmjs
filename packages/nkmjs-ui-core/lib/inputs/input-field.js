//implement this : https://javascript.info/events-change-input

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const UI = require(`../ui`);
const INPUT = require(`../input`);
const KEYBOARD = require(`../keyboard`);

const InputBase = require(`./input-base`);

class InputField extends InputBase {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/field.css`]
    }, InputBase, ['css']);

    _Init() {
        super._Init();
        this._inputField = null;

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
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                position: `relative`,
                display: `flex`,
                'align-content': `stretch`,
                'align-items': `stretch`
            },
            '.field': {
                flex: `1 1 auto`,
                'min-width': 0
            }
        }, super._Style());

    }

    _Render() {
        this._inputField = u.dom.El(`input`, { class: 'field' }, this._host); //, type:'search'
    }

    set placeholderValue(p_value) {
        this._inputField.setAttribute(`placeholder`, p_value);
    }

    _onInput(p_evt) { this._handler.changedValue = this._GrabValue(); }

    _onChange(p_evt) { this._handler.changedValue = this._GrabValue(); }

    _GrabValue() { return this._inputField.value; }

    _FIn() { this._inputField.focus(); }

    _FOut(p_evt) {
        if (INPUT.shift) { return; }

        if (p_evt) { p_evt.preventDefault(); }
        this._inputField.blur();
    }

    _onFocusIn(p_evt) {
        INPUT.ONKeyDown(KEYBOARD._enter, this._FOut);
    }

    _onFocusOut(p_evt) {
        INPUT.OFFKeyDown(KEYBOARD._enter, this._FOut);
        this._handler.SubmitValue();
    }

    _UpdatePreview() {
        this._inputField.value = this.changedValue;
    }

}

module.exports = InputField;
UI.Register(`nkmjs-input-field`, InputField);