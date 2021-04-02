'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldInt3 = require("./field-int3");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldInt3
 * @memberof ecosystem.fields.numbers
 */
class FieldInt4 extends FieldInt3 {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-int4`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-int4`
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

module.exports = FieldInt4;
