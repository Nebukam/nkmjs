'use strict';

const AbstractJSONSerializer = require(`./json-abstract-serializer`);


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
 * @augments data.core.serialization.AbstractJSONSerializer
 * @memberof data.core.serialization
 */
class DataBlockJSONSerializer extends AbstractJSONSerializer {
    constructor() { super(); }

    /**
     * @description Return the target as a JSON Object
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} [p_options] Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {

        let metadata = p_data[__metaID];

        let serializer = this.GetSerializer(metadata);

        let serial = {};
        serial[__metaID] = serializer.Serialize(metadata, p_options);

        this.SerializeContent(serial, p_data, p_options);

        return serial;

    }

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {
        // Need specific implementation.
    }

    /**
     * @description Return an entry object from the provided serial
     * Or override available info in provided target
     * @param {object} p_serial The data to be deserialized
     * @param {data.core.DataBlock} p_data The existing object to deserialize into
     * @param {object} [p_options] Deserialization options
     * @returns {data.core.DataBlock} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data, p_options = null, p_meta = null) {

        if (!p_serial) { throw new Error(`Cannot unpack null data.`); }
        if (!p_data) { throw new Error(`Cannot unpack to null target.`); }

        let metadata = p_data.metadata,
            serializer = this.GetSerializer(metadata); //TODO : Get the correct ver

        if (__metaID in p_serial) { serializer.Deserialize(p_serial[__metaID], metadata, p_options, p_meta); }
        this.DeserializeContent(p_serial, p_data, p_options, p_meta);

        return p_data;

    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {
        // Need specific implementation.
    }

}

module.exports = DataBlockJSONSerializer;