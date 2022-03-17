'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputText extends ui.inputs.InputTextBase {
    constructor() { super(); }

    static __inputProperties = { type: 'text' };

    _Init() {
        super._Init();
    }

}

module.exports = InputText;
ui.Register(`nkmjs-input-text`, InputText);