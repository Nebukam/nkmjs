const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldModelTyped = require(`../field-model-typed`);


/**
 * A field of type 'list' value is usually an iterable array.
 * Each value in the array is either a value constrainted by a specific type
 */
class FieldList extends FieldModelTyped {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    InitSettings(p_settings){ 
        let details = super.InitSettings(p_settings);        
        details.maxSize = (details.maxSize || -1);
        return details;
    }

    /*
    // InitValue must be implemented on a per-model basis
    InitValues(p_settings, p_dataObject){ 
        let values = super.InitValues(p_settings, p_dataObject);
        if(!(IDS.VALUE in values)){ values[IDS.VALUE] = []; }
        return values;
    }
    */
}

module.exports = FieldList;
