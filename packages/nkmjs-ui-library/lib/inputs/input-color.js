'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

class InputColor extends ui.inputs.InputField {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/color.css`]
    }, ui.inputs.InputField, ['css']);

    _Init() {
        super._Init();
        this._label = null;
        this._body = null;
    }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    _Style() {
        return style.Extends({
            '.field': { '@': [`invisible-fill`] }
        }, super._Style());
    }

    _Render() {
        this._label = new ui.manipulators.Text(u.dom.El(`span`, { class: `label` }, this._host));
        this._inputField = u.dom.El(`input`, { class: 'field', type: 'color' }, this._host);
        this._body = u.dom.El(`div`, { class: 'body' }, this._host);
    }

    _UpdatePreview() {
        super._UpdatePreview();
        this._body.style['background-color'] = this._changedValue;
    }

}

module.exports = InputColor;
ui.Register(`nkmjs-input-color`, InputColor);