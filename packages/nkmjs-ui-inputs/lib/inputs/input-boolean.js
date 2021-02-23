'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS } = require(`@nkmjs/common`);
const { CSS } = require("@nkmjs/style");
const { UI, TextManipulator } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);


const _flag_CHECKED = `checked`;

class InputBoolean extends InputField {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/inputs/boolean.css`]
    }, InputField, ['css']);

    _Init() {
        super._Init();

        this._flags.Add(this, _flag_CHECKED);
        this._label = null;

    }

    // ----> DOM

    get label(){ return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    _Style() {
        return CSS.Extends({
            '.field': { '@': [`invisible-fill`] }
        }, super._Style());
    }

    _Render() {

        this._label = new TextManipulator(UDOM.New(`span`, { class: `label` }, this._host));
        let body = UDOM.New(`div`, { class: `body` }, this._host);
        this._handle = UDOM.New(`div`, { class: `handle` }, body);
        this._inputField = UDOM.New(`input`, { class: 'field', type: 'checkbox' }, this._host);
    }

    _GrabValue() {
        return this._inputField.checked;
    }

    _UpdatePreview() {
        this._inputField.checked = this._changedValue;
        this._flags.Set(_flag_CHECKED, this._changedValue);
    }

}

module.exports = InputBoolean;
UI.Register(`nkmjs-input-boolean`, InputBoolean);