'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldNumber = require(`./field-number`);

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldNumber
 * @memberof ecosystem.fields.numbers
 */
class FieldFloat extends FieldNumber {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-float`,
        [com.IDS.ICON]: `field-float`
    };

}

module.exports = FieldFloat;
