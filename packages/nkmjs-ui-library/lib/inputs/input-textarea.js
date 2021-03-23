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
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = u.dom.El(`textarea`, { class: 'field', rows: 3 }, this._host);
    }
    
}

module.exports = InputTextarea;
ui.Register(`nkmjs-input-textarea`, InputTextarea);