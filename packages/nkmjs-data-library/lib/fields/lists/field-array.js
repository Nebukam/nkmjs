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
class FieldArray extends FieldList {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-array`,
        [com.IDS.ICON]: `field-array`
    };

    _Init() {
        super._Init();
    }

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = []; }
        return values;
    }

}

module.exports = FieldArray;
