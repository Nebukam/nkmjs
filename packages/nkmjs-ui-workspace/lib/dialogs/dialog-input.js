'use strict';

const { UI, Widget } = require(`@nkmjs/ui-core`);

class DialogInput extends Widget {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    set dialogBox(p_value) { this._dialogBox = p_value; }

    GetDialogData() {
        return null;
    }

}

module.exports = DialogInput;
UI.Register('nkmjs-dialog-input', DialogInput);