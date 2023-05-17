'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

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
