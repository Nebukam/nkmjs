const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldInt2 = require("./field-int2");

/**
 * A field of type 'number', with no particular settings. It is the base type of more
 * specific implementations such as fields.Int, fields.UInt, fields.Float etc
 */
class FieldInt3 extends FieldInt2 {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    InitSettings(p_settings){ 
        let settings = super.InitSettings(p_settings);
        return settings;
    }

    InitValues(p_settings, p_dataObject){ 
        let values = super.InitValues(p_settings, p_dataObject);
        if(!(IDS.VALUE3 in values)){ values[IDS.VALUE3] = 0; }
        return values;
    }

}

module.exports = FieldInt3;
