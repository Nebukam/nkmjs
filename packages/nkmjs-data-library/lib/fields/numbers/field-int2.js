'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldInt = require("./field-int");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldInt
 * @memberof ecosystem.fields.numbers
 */
class FieldInt2 extends FieldInt {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int2`,
        [com.IDS.ICON]: `field-int2`
    };

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE2 in values)) { values[IDS.VALUE2] = 0; }
        return values;
    }

}

module.exports = FieldInt2;
