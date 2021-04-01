'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

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
        [com.IDS.ICON]: `field-int2`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int2`
    };

    _Init() {
        super._Init();
    }

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);
        return localSettings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE2 in values)) { values[IDS.VALUE2] = 0; }
        return values;
    }

}

module.exports = FieldInt2;
