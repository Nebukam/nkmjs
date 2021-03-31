const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldNumber = require("./field-number");

/**
 * A field of type 'number', that is automatically clamped between a min & max value.
 * Whether the min & max parameters are exposed is based on more specific implementations
 */
class FieldNumberClamped extends FieldNumber {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    InitSettings(p_settings) {
        let settings = super.InitSettings(p_settings);

        settings.clamp = (settings.clamp || false);
        settings.min = (settings.min || 0);
        settings.max = (settings.max || 0);

        return settings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = 0; }
        return values;
    }

}

module.exports = FieldNumberClamped;
