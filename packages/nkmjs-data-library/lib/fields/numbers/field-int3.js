'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldInt2 = require("./field-int2");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldInt2
 * @memberof ecosystem.fields.numbers
 */
class FieldInt3 extends FieldInt2 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int3`,
        [com.IDS.ICON]: `field-int3`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE3 in values)) { values[IDS.VALUE3] = 0; }
        return values;
    }

}

module.exports = FieldInt3;
