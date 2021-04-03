'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldNumber = require("./field-number");

/**
 * @class
 * @augments ecosystem.fields.numbers.FieldNumber
 * @memberof ecosystem.fields.numbers
 */
class FieldNumberClamped extends FieldNumber {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-number-clamped`,
        [com.IDS.ICON]: `field-number-clamped`
    };

    _Init() {
        super._Init();
    }

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);

        localSettings.clamp = (localSettings.clamp || false);
        localSettings.min = (localSettings.min || 0);
        localSettings.max = (localSettings.max || 0);

        return localSettings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = 0; }
        return values;
    }

}

module.exports = FieldNumberClamped;
