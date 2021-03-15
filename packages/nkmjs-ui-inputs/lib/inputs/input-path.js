'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputPath extends InputField {
    constructor() { super(); }

    _SanitizeValue(p_value) {
        return u.PATH.Sanitize(super._SanitizeValue(p_value));
    }

}

module.exports = InputPath;
ui.Register(`nkmjs-input-path`, InputPath);