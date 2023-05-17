'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const data = nkm.data;

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
