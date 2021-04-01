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
class FieldInt extends FieldNumber {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-int`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int`
    };

    _Init() {
        super._Init();
    }


}

module.exports = FieldInt;
