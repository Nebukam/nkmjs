const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../ids`);
const FieldModel = require(`../field-model`);

/**
 * A field of type 'number', with no particular settings. It is the base type of more
 * specific implementations such as fields.Int, fields.UInt, fields.Float etc
 */
class FieldBoolean extends FieldModel {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    InitValues(p_details, p_dataObject) {
        let values = super.InitValues(p_details, p_dataObject);
        if (!(IDS.VALUE in values)) { values[IDS.VALUE] = false; }
        return values;
    }

}

module.exports = FieldBoolean;
