'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.inputs.InputField;

class InputColor extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/color.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._label = null;
        this._body = null;
        this._updatePreviewWhenFocused = true;
    }

    // ----> DOM

    get label() { return this._label; }
    set label(p_value){ this._label.Set(p_value); }

    static _Style() {
        return style.Extends({
            '.field': { ...style.rules.invisibleFill, },
            '.body':{ 'pointer-events':'none' }
        }, base._Style());
    }

    _Render() {
        this._label = new ui.manipulators.Text(ui.dom.El(`span`, { class: `label` }, this._host));
        this._inputField = ui.dom.El(`input`, { class: 'field', type: 'color' }, this._host);
        this._body = ui.dom.El(`div`, { class: 'body' }, this._host);
    }

    _UpdatePreview() {
        super._UpdatePreview();
        this._body.style['background-color'] = this.changedValue;
    }

}

module.exports = InputColor;
ui.Register(`nkmjs-input-color`, InputColor);