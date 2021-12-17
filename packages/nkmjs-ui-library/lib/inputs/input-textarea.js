'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

class InputTextarea extends ui.inputs.InputField {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/expandable.css`]
    }, ui.inputs.InputField, ['css']);

    _Init() {
        super._Init();
        this._handler._updatePreviewOnChange = false;
        this._handler._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = ui.dom.El(`textarea`, { class: 'field', rows: 3 }, this._host);
    }
    
}

module.exports = InputTextarea;
ui.Register(`nkmjs-input-textarea`, InputTextarea);