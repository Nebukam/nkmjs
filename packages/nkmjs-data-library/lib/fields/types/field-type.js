'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const FieldDescriptor = require(`../../field-descriptor`);

/**
 * @class
 * @augments ecosystem.FieldDescriptor
 * @memberof ecosystem.fields
 */
class FieldType extends FieldDescriptor {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-type`,
        [com.IDS.ICON]: `field-type`
    };

    static FAMILY_FIELD = `field`;
    static FAMILY_MODEL = `model`;
    static FAMILY_ENTRY = `entry`;

    InitSettings(p_settings) {
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
