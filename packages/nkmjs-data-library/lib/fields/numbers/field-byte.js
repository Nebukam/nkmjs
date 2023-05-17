'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const FieldNumber = require(`./field-number`);

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldNumber
 * @memberof ecosystem.fields.numbers
 */
class FieldByte extends FieldNumber {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-byte`,
        [com.IDS.ICON]: `field-byte`
    };

}

module.exports = FieldByte;
