'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputText extends ui.inputs.InputField {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = u.dom.El(`input`, { class: 'field', type: 'search' }, this._host);
    }

}

module.exports = InputText;
ui.Register(`nkmjs-input-text`, InputText);