const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldModelTyped = require("../field-model-typed");

const FieldType = require("./field-type");

const __valueTypeID = data.ID.New(IDS.VALUE_TYPE);
/**
 * A field of type 'number', with no particular settings. It is the base type of more
 * specific implementations such as fields.Int, fields.UInt, fields.Float etc
 */
class FieldKVP extends FieldModelTyped {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._valueType = this._Add(FieldType, __valueTypeID);
    }

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = null; }
        if (!(IDS.KEY in values)) { values[IDS.KEY] = null; }
        return values;
    }

}

module.exports = FieldKVP;
