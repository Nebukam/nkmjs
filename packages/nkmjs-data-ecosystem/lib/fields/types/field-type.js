const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldModel = require(`../../field-model`);

/**
 * A field of type 'type' references another TypeModel.
 */
class FieldType extends FieldModel {
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
        return values;
    }

}

module.exports = FieldType;
