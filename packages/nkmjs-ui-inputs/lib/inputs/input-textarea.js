'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputTextarea extends InputField {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inputs/expandable.css`]
    }, InputField, ['css']);

    _Init() {
        super._Init();
        this._updatePreviewOnChange = false;
        this._submitOnChange = false;
    }

    // ----> DOM

    _Render() {
        this._inputField = u.dom.New(`textarea`, { class: 'field', rows: 3 }, this._host);
    }
    
}

module.exports = InputTextarea;
ui.Register(`nkmjs-input-textarea`, InputTextarea);