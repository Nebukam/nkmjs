'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldList = require(`./field-list`);
const FieldKVP = require("../types/field-kvp");


/**
 * @class
 * @augments ecosystem.fields.lists.FieldList
 * @memberof ecosystem.fields.lists
 */
class FieldMap extends FieldList {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-map`,
        [com.IDS.ICON]: `field-map`
    };

    static __default_typeClass = FieldKVP;

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = new Map(); }
        return values;
    }

}

module.exports = FieldMap;
