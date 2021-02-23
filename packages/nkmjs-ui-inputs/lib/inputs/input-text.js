'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { COMMON_FLAG } = require(`@nkmjs/common`);
const { CSS } = require("@nkmjs/style");
const { UI } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);


class InputText extends InputField {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = UDOM.New(`input`, { class: 'field', type: 'search' }, this._host);
    }

}

module.exports = InputText;
UI.Register(`nkmjs-input-text`, InputText);