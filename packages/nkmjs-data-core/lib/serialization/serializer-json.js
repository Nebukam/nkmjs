const com = require("@nkmjs/common");
const DataBlock = require(`../data/data-block`);

const BaseSerializer = require(`./serializer-base`);
const CONTEXT = require(`./context`);

/*
    expected input/output :

    {
        "meta":{ 
            "class":"class-string-id",
            ...
        },
        "data":{
            ...
        }
    }

*/

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.BaseSerializer
 * @memberof data.core.serialization
 */
class JSONSerializer extends BaseSerializer {
    constructor() { super(); }

    /**
     * @description TODO
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {

        // Retrieve serializer
        let serializer = com.BINDINGS.Get(
            CONTEXT.JSON,
            p_data.constructor,
            null);

        if (!serializer) { throw new Error(`Could not find suitable serializer for target=${p_data}`); }

        let serial = serializer.Serialize(p_data);

        // Ensure there is a data object

        if (!(CONTEXT.JSON.DATA_KEY in serial)) {
            let wrapper = {};
            wrapper[CONTEXT.JSON.DATA_KEY] = serial;
            serial = wrapper;
        }

        // Ensure there is a meta object

        let metas = null;
        if (!(CONTEXT.JSON.META_KEY in serial)) {
            metas = {};
            serial[CONTEXT.JSON.META_KEY] = metas;
        } else {
            metas = serial[CONTEXT.JSON.META_KEY];
        }

        metas[CONTEXT.JSON.CLASS] = com.BINDINGS.GetClassKey(p_data.constructor);

        return serial;

    }

    /**
     * @description TODO
     * @param {object} p_serial The data to be deserialized
     * @param {data.core.DataBlock} p_data The existing object to deserialize into
     * @param {object} p_options Deserialization options
     * @returns {data.core.DataBlock} Deserialized object (== p_data, if provided)
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {

        let targetClass = null;

        // Retrieve reference constructor
        if (p_data != null) {
            targetClass = p_data.constructor;
        } else {
            let metas = p_serial[CONTEXT.JSON.META_KEY];
            if (!metas) { throw new Error(`Cannot unserialize without nfos`); }

            targetClass = com.BINDINGS.GetClass(metas[CONTEXT.JSON.CLASS]);
            if (!targetClass) { throw new Error(`Could not find constructor ${metas.instanceOf}`); }

            p_data = com.Rent(targetClass);
        }

        let dataWrapper = null;
        if (!(CONTEXT.JSON.DATA_KEY in p_serial)) { return p_data; }
        else { dataWrapper = p_serial[CONTEXT.JSON.DATA_KEY]; }

        // Retrieve serializer
        let serializer = com.BINDINGS.Get(
            CONTEXT.JSON,
            targetClass,
            null);

        if (!serializer) { throw new Error(`Could not find suitable de-serializer for target=${p_data}`); }

        // Deserialize !
        return serializer.Deserialize(dataWrapper, p_data, p_options);

    }

}

module.exports = JSONSerializer;