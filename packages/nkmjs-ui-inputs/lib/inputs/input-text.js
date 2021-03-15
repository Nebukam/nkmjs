'use strict';

const u = require("@nkmjs/utils");
const { CSS } = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

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
        this._inputField = u.dom.New(`input`, { class: 'field', type: 'search' }, this._host);
    }

}

module.exports = InputText;
ui.Register(`nkmjs-input-text`, InputText);