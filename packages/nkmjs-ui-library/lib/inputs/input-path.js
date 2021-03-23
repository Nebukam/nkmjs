'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputPath extends ui.inputs.InputField {
    constructor() { super(); }

    _SanitizeValue(p_value) {
        return u.PATH.Sanitize(super._SanitizeValue(p_value));
    }

}

module.exports = InputPath;
ui.Register(`nkmjs-input-path`, InputPath);