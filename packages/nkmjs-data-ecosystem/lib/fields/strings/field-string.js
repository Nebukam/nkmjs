'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldModel = require(`../../field-model`);

/**
 * @class
 * @augments ecosystem.FieldModel
 * @memberof ecosystem.fields.strings
 */
class FieldString extends FieldModel {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-string`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-string`
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
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = ''; }
        return values;
    }

}

module.exports = FieldString;
