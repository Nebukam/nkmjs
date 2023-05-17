'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldFloat = require("./field-float");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldFloat
 * @memberof ecosystem.fields.numbers
 */
class FieldFloat2 extends FieldFloat {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-float2`,
        [com.IDS.ICON]: `field-float2`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE2 in values)) { values[IDS.VALUE2] = 0; }
        return values;
    }

}

module.exports = FieldFloat2;
