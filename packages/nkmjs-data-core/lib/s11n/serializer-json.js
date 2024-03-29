const com = require("@nkmjs/common");

const BaseSerializer = require(`./serializer-base`);
const CTX = require(`./context`);

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
 * @augments data.core.s11n.BaseSerializer
 * @memberof data.core.s11n
 */
class JSONSerializer extends BaseSerializer {
    constructor() { super(); }

    static __context = CTX.JSON;
    static __master = JSONSerializer;

    /**
     * @description TODO
     * @param {data.core.DataBlock} p_data The object to serialize
     * @param {object} p_options Serialization options
     * @returns {object} Serialized object
     */
    static Serialize(p_data, p_options = null) {

        p_data._OnSerializationBegins?.();

        // Retrieve serializer
        let serializer = this.GetSerializer(p_data.constructor, -1, null);

        if (!serializer) { throw new Error(`Could not find suitable serializer for target=${p_data}`); }

        let serial = serializer.Serialize(p_data, p_options);

        // Ensure there is a data object

        if (!(CTX.JSON.DATA_KEY in serial)) {
            let wrapper = {};
            wrapper[CTX.JSON.DATA_KEY] = serial;
            serial = wrapper;
        }

        // Ensure there is a meta object

        let metas = null;
        if (!(CTX.JSON.META_KEY in serial)) {
            metas = {};
            serial[CTX.JSON.META_KEY] = metas;
        } else {
            metas = serial[CTX.JSON.META_KEY];
        }

        metas[CTX.JSON.CONSTRUCTOR] = com.BINDINGS.GetConstructorKey(p_data.constructor);
        metas[com.IDS.VER] = com.BINDINGS.GetSerializerVersion(serializer);

        let uid = p_data.id;
        if (uid) { metas[com.IDS.UID] = uid.toString(); }

        p_data._OnSerializationComplete?.();

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



        let targetClass = null,
            version = -1,
            metas = p_serial[CTX.JSON.META_KEY];

        // Retrieve reference constructor
        if (p_data != null) {
            targetClass = p_data.constructor;
            version = metas[com.IDS.VER] || -1;
            p_data._OnDeserializationBegins?.();
        } else {
            if (!metas) { throw new Error(`Cannot unserialize without nfos`); }

            targetClass = com.BINDINGS.GetClass(metas[CTX.JSON.CONSTRUCTOR]);
            version = metas[com.IDS.VER] || -1;

            if (!targetClass) { throw new Error(`Could not find constructor ${metas[CTX.JSON.CONSTRUCTOR]}`); }

            p_data = com.Rent(targetClass);
            p_data._OnDeserializationBegins?.();
        }

        let dataWrapper = null;
        if (!(CTX.JSON.DATA_KEY in p_serial)) { return p_data; }
        else { dataWrapper = p_serial[CTX.JSON.DATA_KEY]; }

        // Retrieve serializer
        let serializer = this.GetSerializer(targetClass, version, null);

        if (!serializer) { throw new Error(`Could not find suitable de-serializer for target=${targetClass ? targetClass.name : null}`); }

        // Deserialize !
        let result = serializer.Deserialize(dataWrapper, p_data, p_options, metas);

        p_data._OnDeserializationComplete?.();

        return result;

    }

}

module.exports = JSONSerializer;