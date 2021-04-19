'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);


const _flag_CHECKED = `checked`;

class InputBoolean extends ui.inputs.InputField {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/boolean.css`]
    }, ui.inputs.InputField, ['css']);

    _Init() {
        super._Init();

        this._flags.Add(this, _flag_CHECKED);
        this._label = null;

    }

    // ----> DOM

    get label(){ return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    _Style() {
        return style.Extends({
            '.field': { '@': [`invisible-fill`] }
        }, super._Style());
    }

    _Render() {

        this._label = new ui.manipulators.Text(u.dom.El(`span`, { class: `label` }, this._host));
        let body = u.dom.El(`div`, { class: `body` }, this._host);
        this._handle = u.dom.El(`div`, { class: `handle` }, body);
        this._inputField = u.dom.El(`input`, { class: 'field', type: 'checkbox' }, this._host);
    }

    _GrabValue() { return this._inputField.checked; }

    _UpdatePreview() {
        this._inputField.checked = this._changedValue;
        this._flags.Set(_flag_CHECKED, this._changedValue);
    }

}

module.exports = InputBoolean;
ui.Register(`nkmjs-input-boolean`, InputBoolean);