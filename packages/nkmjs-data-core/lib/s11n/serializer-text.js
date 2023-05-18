const JSONSerializer = require(`./serializer-json`);
const CTX = require(`./context`);

/*
*   At the moment, the text serializer does a JSON.stringify of the JSONSerializer result, which is bad.
*/

const S11N_BEGIN = `_OnSerializationBegins`;
const S11N_COMPLETE = `_OnSerializationComplete`;
const D13N_BEGINS = `_OnDeserializationBegins`;
const D13N_COMPLETE = `_OnDeserializationComplete`;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.s11n.BaseSerializer
 * @memberof data.core.s11n
 */
class TEXTSerializer extends JSONSerializer {
    constructor() { super(); }

    static __context = CTX.TEXT;
    static __master = TEXTSerializer;

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