'use strict';

const { U, UDOM, PATH } = require(`@nkmjs/utils`);
const { COMMON_FLAG } = require(`@nkmjs/common`);
const { UI } = require(`@nkmjs/ui-core`);

const InputField = require(`../input-field`);

class InputPath extends InputField {
    constructor() { super(); }

    _SanitizeValue(p_value) {
        return PATH.Sanitize(super._SanitizeValue(p_value));
    }

}

module.exports = InputPath;
UI.Register(`nkmjs-input-path`, InputPath);