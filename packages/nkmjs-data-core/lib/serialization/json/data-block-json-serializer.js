const { BINDINGS } = require(`@nkmjs/common`);

const DataBlock = require(`../../data/data-block`);
const SERIALIZATION_CONTEXT = require(`../serialization-context`);
const BaseSerializer = require(`../serializer-base`);


/**
 * This is a base implementation. It only add & serialize the known "metadata" property.
 * 
 */

/*
   expected input/ouput :

   {
       ...
       "metadata":{*},
       "data":{*},
       ...
   }
   
*/

const __metaID = `metadata`;
const __dataID = `data`;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.BaseSerializer
 * @memberof data.core.serialization
 */
class DataBlockJSONSerializer extends BaseSerializer {
    constructor() { super(); }

    /**
     * @description Return the target as a JSON Object
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {

        let metadata = p_data[__metaID];

        let serializer = BINDINGS.Get(
            SERIALIZATION_CONTEXT.JSON,
            metadata);

        let serial = p_data.Pack();
        serial[__metaID] = serializer.Serialize(metadata, p_options);

        return serial;

    }

    /**
     * @description Return an entry object from the provided serial
     * Or override available info in provided target
     * @param {object} p_serial The data to be deserialized
     * @param {data.core.DataBlock} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {data.core.DataBlock} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {

        if (!p_serial) { throw new Error(`Cannot unpack null data.`); }
        if (!p_data) { throw new Error(`Cannot unpack to null target.`); }

        let metadata = p_data.metadata,
            serializer = BINDINGS.Get(
                SERIALIZATION_CONTEXT.JSON,
                metadata);

        if (__metaID in p_serial) { serializer.Deserialize(p_serial[__metaID], metadata, p_options); }
        p_data.Unpack(p_serial);

        return p_data;

    }

}

module.exports = DataBlockJSONSerializer;