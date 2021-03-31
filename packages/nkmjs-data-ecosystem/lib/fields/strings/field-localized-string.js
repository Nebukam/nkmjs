const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldString = require(`./field-string`);

/**
 * A field of type 'number', with no particular settings. It is the base type of more
 * specific implementations such as fields.Int, fields.UInt, fields.Float etc
 */
class FieldLocalizedString extends FieldString {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

}

module.exports = FieldLocalizedString;
