'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldDescriptor = require(`../../field-descriptor`);

/**
 * @class
 * @augments ecosystem.FieldDescriptor
 * @memberof ecosystem.fields.strings
 */
class FieldString extends FieldDescriptor {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-string`,
        [com.IDS.ICON]: `field-string`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = ''; }
        return values;
    }

}

module.exports = FieldString;
