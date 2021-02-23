const JSONSerializer = require(`./serializer-json`);

/*
*   At the moment, the text serializer does a JSON.stringify of the JSONSerializer result, which is bad.
*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.BaseSerializer
 * @memberof data.core.serialization
 */
class TEXTSerializer extends JSONSerializer {
    constructor() { super(); }

    /**
     * @description TODO
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {string} Serialized object
     */
    static Serialize(p_data, p_options = null) {
        return JSON.stringify(JSONSerializer.Serialize(p_data, p_options));
    }

    /**
     * @description TODO
     * @param {*} p_serial The data to be deserialized
     * @param {data.core.DataBlock} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {data.core.DataBlock} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {
        return JSON.parse(JSONSerializer.Deserialize(p_serial, p_data, p_options));
    }

}

module.exports = TEXTSerializer;