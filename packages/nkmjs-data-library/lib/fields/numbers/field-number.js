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
 * @memberof ecosystem.fields.numbers
 */
class FieldNumber extends FieldDescriptor {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-number`,
        [com.IDS.ICON]: `field-number`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = 0; }
        return values;
    }

}

module.exports = FieldNumber;
