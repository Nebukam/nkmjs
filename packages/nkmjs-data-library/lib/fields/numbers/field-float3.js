'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldFloat2 = require("./field-float2");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldFloat2
 * @memberof ecosystem.fields.numbers
 */
class FieldFloat3 extends FieldFloat2 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-float3`,
        [com.IDS.ICON]: `field-float3`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE3 in values)) { values[IDS.VALUE3] = 0; }
        return values;
    }

}

module.exports = FieldFloat3;
