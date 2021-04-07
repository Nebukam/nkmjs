'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldDescriptorTyped = require(`../field-descriptor-typed`);


/**
 * @class
 * @augments ecosystem.fields.FieldDescriptorTyped
 * @memberof ecosystem.fields.lists
 */
class FieldList extends FieldDescriptorTyped {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `field-list`,
        [com.IDS.UID]: `@nkmjs/ecosystem:field-list`
    };

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);
        localSettings.maxSize = (localSettings.maxSize || -1);
        return localSettings;
    }

}

module.exports = FieldList;
