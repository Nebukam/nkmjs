'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputText extends ui.inputs.InputField {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._handler._updatePreviewOnChange = false;
        this._handler._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = ui.dom.El(`input`, { class: 'field', type: 'search' }, this._host);
    }

}

module.exports = InputText;
ui.Register(`nkmjs-input-text`, InputText);