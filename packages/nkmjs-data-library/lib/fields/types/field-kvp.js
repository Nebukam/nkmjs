'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const FieldDescriptorTyped = require("../field-descriptor-typed");

const FieldType = require("./field-type");

const __valueTypeID = data.ID.New(IDS.VALUE_TYPE);

/**
 * @class
 * @augments ecosystem.fields.FieldDescriptorTyped
 * @memberof ecosystem.fields
 */
class FieldKVP extends FieldDescriptorTyped {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:field-kvp`,
        [com.IDS.ICON]: `field-kvp`
    };

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
