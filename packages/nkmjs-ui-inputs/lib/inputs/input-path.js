'use strict';

const u = require("@nkmjs/utils");
const { UI } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputPath extends InputField {
    constructor() { super(); }

    _SanitizeValue(p_value) {
        return u.PATH.Sanitize(super._SanitizeValue(p_value));
    }

}

module.exports = InputPath;
UI.Register(`nkmjs-input-path`, InputPath);