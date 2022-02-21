'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputText extends ui.inputs.InputField {
    constructor() { super(); }

    static __inputProperties = { type: 'search' };

    _Init() {
        super._Init();

        this._handler._updatePreviewOnInput = false;
        this._handler._changeOnInput = false;
        this._handler._updatePreviewOnChange = true;
        this._handler._submitOnChange = true;
    }

}

module.exports = InputText;
ui.Register(`nkmjs-input-text`, InputText);