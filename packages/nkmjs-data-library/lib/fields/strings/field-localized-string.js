'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

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
        [com.IDS.UID]: `@nkmjs/ecosystem:field-string-localized`,
        [com.IDS.ICON]: `field-string-localized`
    };
    
}

module.exports = FieldLocalizedString;
