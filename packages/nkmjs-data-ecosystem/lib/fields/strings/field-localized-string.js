'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldString = require(`./field-string`);

/**
 * @class
 * @augments ecosystem.fields.strings.FieldString
 * @memberof ecosystem.fields.strings
 */
class FieldLocalizedString extends FieldString {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-string-localized`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-string-localized`
    };

    _Init() {
        super._Init();
    }

}

module.exports = FieldLocalizedString;
