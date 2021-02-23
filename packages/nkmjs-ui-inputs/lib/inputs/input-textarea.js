'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS, COMMON_FLAG } = require(`@nkmjs/common`);
const { CSS } = require("@nkmjs/style");
const { UI } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputTextarea extends InputField {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/inputs/expandable.css`]
    }, InputField, ['css']);

    _Init() {
        super._Init();
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = UDOM.New(`textarea`, { class: 'field', rows: 3 }, this._host);
    }
    expandable
}

module.exports = InputTextarea;
UI.Register(`nkmjs-input-textarea`, InputTextarea);