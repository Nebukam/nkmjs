'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.inputs.InputField;
const _flag_CHECKED = `checked`;

class InputCheckbox extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/checkbox.css`]
    }, base, ['css']);

    static __distribute = base.__distribute.Ext()
        .To(`iconOn`, null, null)
        .To(`iconOff`, null, null)
        .To(`iconMixed`, null, null);

    _Init() {
        super._Init();

        this._handler.submitOnChange = true;

        this._flags.Add(this, _flag_CHECKED);
        this._label = null;
        this._currentValue = this._changedValue = false;
        this._flip
    }

    _PostInit() {
        super._PostInit();
        this.iconOn = null;
        this.iconOff = null;
        this.iconMixed = null;
    }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value) { this._label.Set(p_value); }

    set iconOn(p_value) { this._iconOn = p_value || `checkbox-on`; }
    set iconOff(p_value) { this._iconOff = p_value || `checkbox-off`; }
    set iconMixed(p_value) { this._iconMixed = p_value || `checkbox-mixed`; }

    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        super._OnOptionsUpdated(p_options, p_altOptions, p_defaults);
        this._UpdateIcon();
    }

    static _Style() {
        return style.Extends({
            '.field': {
                'width': 'var(--size)',
                'height': 'var(--size)'
            }
        }, base._Style());
    }

    _Render() {

        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `label` }, this._host));
        let body = ui.dom.El(`div`, { class: `body` }, this._host);
        this._handle = ui.dom.El(`div`, { class: `handle` }, body);
        this._inputField = ui.dom.El(`input`, { class: 'field', type: 'checkbox' }, this._host);

        this.focusArea = body;
    }

    _GrabValue() { return this._inputField.checked; }

    _UpdatePreview() {
        this._inputField.checked = this.changedValue;
        this._flags.Set(_flag_CHECKED, this.changedValue);
        this._UpdateIcon();
    }

    // ----> Mouse events

    Activate(p_evt) {
        if (!super.Activate(p_evt)) { return false; }
        this.changedValue = !this.changedValue;
        this._UpdateIcon();
        return true;
    }

    _UpdateIcon() {
        if (this._handler.currentValue == null) {
            this._inputField.setAttribute(`data-icon`, `${this._iconMixed}`);
        } else {
            if (this._inputField.checked) { this._inputField.setAttribute(`data-icon`, `${this._iconOn}`); }
            else { this._inputField.setAttribute(`data-icon`, `${this._iconOff}`); }
        }
    }

    _CleanUp() {
        this.iconOn = null;
        this.iconOff = null;
        this.iconMixed = null;
        super._CleanUp();
    }

}

module.exports = InputCheckbox;
ui.Register(`nkmjs-input-checkbox`, InputCheckbox);