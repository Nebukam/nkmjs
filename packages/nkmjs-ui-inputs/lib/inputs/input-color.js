'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS } = require(`@nkmjs/common`);
const { CSS } = require("@nkmjs/style");
const { UI, TextManipulator } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputColor extends InputField {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/inputs/color.css`]
    }, InputField, ['css']);

    _Init() {
        super._Init();
        this._label = null;
        this._body = null;
    }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    _Style() {
        return CSS.Extends({
            '.field': { '@': [`invisible-fill`] }
        }, super._Style());
    }

    _Render() {
        this._label = new TextManipulator(UDOM.New(`span`, { class: `label` }, this._host));
        this._inputField = UDOM.New(`input`, { class: 'field', type: 'color' }, this._host);
        this._body = UDOM.New(`div`, { class: 'body' }, this._host);
    }

    _UpdatePreview() {
        super._UpdatePreview();
        this._body.style['background-color'] = this._changedValue;
    }

}

module.exports = InputColor;
UI.Register(`nkmjs-input-color`, InputColor);