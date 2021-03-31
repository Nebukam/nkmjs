const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldList = require(`./field-list`);
const FieldKVP = require("../types/field-kvp");


/**
 * A field of type 'list' value is usually an iterable array.
 * Each value in the array is either a value constrainted by a specific type
 */
class FieldMap extends FieldList {
    constructor() { super(); }

    static __default_typeClass = FieldKVP;

    _Init() {
        super._Init();
    }

    InitValues(p_details, p_dataObject){ 
        let values = super.InitValues(p_details, p_dataObject);
        if(!(IDS.VALUE in values)){ values[IDS.VALUE] = new Map(); }
        return values;
    }

}

module.exports = FieldMap;
