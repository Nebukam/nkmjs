'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldInt3 = require("./field-int3");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldInt3
 * @memberof ecosystem.fields.numbers
 */
class FieldInt4 extends FieldInt3 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int4`,
        [com.IDS.ICON]: `field-int4`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE4 in values)) { values[IDS.VALUE4] = 0; }
        return values;
    }

}

module.exports = FieldInt4;
