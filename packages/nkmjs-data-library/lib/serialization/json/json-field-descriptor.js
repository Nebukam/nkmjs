const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

/**
 * IMPORTANT NOTE : Due to to how slot & descriptors work, 
 * The FieldDescriptorJSONSerializer doesn't follow the same logic as the
 * other serializers.
 * Since a descriptor doesn't actually hold data, these serializer serialize
 * & deserialize the slot settings.
 */
class FieldDescriptorJSONSerializer extends data.serialization.json.Base {
    constructor() { super(); }

    //#region Serialization

    static Serialize(p_data, p_options = null) {
        //p_data === slot.descriptor
        return p_data.slot._settings;
    }

    //#endregion

    //#region Deserialization

    static Deserialize(p_serial, p_data, p_options = null, p_meta = null) {
        //p_data === slot
        p_data._settings = p_serial;
    }

    //#endregion

}

module.exports = FieldDescriptorJSONSerializer;