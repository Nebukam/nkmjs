'use strict';

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof data.core.serialization
 */
class BaseSerializer {
    constructor() { }

    /**
     * 
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {*} Serialized object
     */
    static Serialize(p_data, p_options = null) {
        throw new Error(`not implemented`);
    }

    /**
     * 
     * @param {*} p_serial The data to be deserialized
     * @param {data.core.DataBlock} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {data.core.DataBlock} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {
        throw new Error(`not implemented`);
    }

}

module.exports = BaseSerializer;