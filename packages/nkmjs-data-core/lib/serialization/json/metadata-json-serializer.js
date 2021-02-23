const { U } = require(`@nkmjs/utils`);
const Metadata = require(`../../data/metadata`);
const BaseSerializer = require(`../serializer-base`);

class MetadataJSONSerializer extends BaseSerializer {
    constructor() { super(); }

    /**
     * @description Return the target as a JSON Object
     * @param {data.core.Metadata} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {
        return p_data._data;
    }

    /**
     * @description Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {object} p_serial The data to be deserialized
     * @param {data.core.Metadata} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {data.core.Metadata} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {
        if (!p_serial) { throw new Error(`Cannot unpack null data.`); }
        if (!p_data) { throw new Error(`Cannot unpack metadata with a null target`); }
        U.SetOverwrite(p_data._data, p_serial);
        return p_data;
    }

}

module.exports = MetadataJSONSerializer;