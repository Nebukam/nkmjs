'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldFloat3 = require("./field-float3");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldFloat3
 * @memberof ecosystem.fields.numbers
 */
class FieldFloat4 extends FieldFloat3 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-float4`,
        [com.IDS.ICON]: `field-float4`
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
        if (!(IDS.VALUE4 in values)) { values[IDS.VALUE4] = 0; }
        return values;
    }

}

module.exports = FieldFloat4;
