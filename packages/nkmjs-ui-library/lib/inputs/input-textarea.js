'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const style = require(`@nkmjs/style`);

class InputTextarea extends ui.inputs.InputField {
    constructor() { super(); }

    static __inputProperties = { rows: 3 };

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/expandable.css`]
    }, ui.inputs.InputField, ['css']);

    _Init() {
        super._Init();
        this._handler._updatePreviewOnInput = false;
        this._handler._changeOnInput = false;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                'height':'auto !important'
            }
        }, super._Style());
    }

    _Render() {
        this._inputField = ui.dom.El(`textarea`, { class: 'field', ...this.constructor.__inputProperties }, this._host);
    }
    
}

module.exports = InputTextarea;
ui.Register(`nkmjs-input-textarea`, InputTextarea);