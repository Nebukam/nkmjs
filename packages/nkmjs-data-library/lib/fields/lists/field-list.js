'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldModelTyped = require(`../field-model-typed`);


/**
 * @class
 * @augments ecosystem.fields.FieldModelTyped
 * @memberof ecosystem.fields.lists
 */
class FieldList extends FieldModelTyped {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-list`,
        [com.IDS.ICON]: `field-list`
    };

    _Init() {
        super._Init();
    }

    InitSettings(p_settings = null) {
        let localSettings = super.InitSettings(p_settings);
        localSettings.maxSize = (localSettings.maxSize || -1);
        return localSettings;
    }

}

module.exports = FieldList;
