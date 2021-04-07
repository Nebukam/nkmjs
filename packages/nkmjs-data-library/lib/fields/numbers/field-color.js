'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

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
