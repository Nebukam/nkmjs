'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldFloat4 = require("./field-float3");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldFloat3
 * @memberof ecosystem.fields.numbers
 */
class FieldColor extends FieldFloat4 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-color`,
        [com.IDS.ICON]: `field-color`
    };

}

module.exports = FieldColor;
