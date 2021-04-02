'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldModel = require(`../../field-model`);

/**
 * @class
 * @augments ecosystem.FieldModel
 * @memberof ecosystem.fields
 */
class FieldType extends FieldModel {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-type`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-type`
    };

    static FAMILY_FIELD = `field`;
    static FAMILY_MODEL = `model`;
    static FAMILY_ENTRY = `entry`;

    _Init() {
        super._Init();
    }

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);
        localSettings.family = FieldType.FAMILY_FIELD;
        return localSettings;
    }

    InitValues(p_settings, p_dataObject) {
        let values = super.InitValues(p_settings, p_dataObject);
        return values;
    }

}

module.exports = FieldType;
