'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

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
        [com.IDS.ICON]: `field-float3`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-float3`
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
        if (!(IDS.VALUE3 in values)) { values[IDS.VALUE3] = 0; }
        return values;
    }

}

module.exports = FieldFloat3;
