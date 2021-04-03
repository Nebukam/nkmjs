const u = require("@nkmjs/utils");
const DataBlockExtendableJSONSerializer = require(`./json-data-block-extendable`);

class FieldModelJSONSerializer extends DataBlockExtendableJSONSerializer {
    constructor() { super(); }

    /**
     * @description Return the data as a JSON Object
     * @param {ecosystem.DataBlockExtendable} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {
        // TODO : Write base, if any.
        return p_data._data;
    }

    /**
     * @description Return an entry object from the provided serial
     * Or override available info in provided data.
     * @param {object} p_serial The data to be deserialized
     * @param {ecosystem.DataBlockExtendable} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {ecosystem.DataBlockExtendable} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {
        // TODO : Do the thing
        // TODO : Need a way to access the ecosystem instance to resolve references
        return p_data;
    }

}

module.exports = FieldModelJSONSerializer;