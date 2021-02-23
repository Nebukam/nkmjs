const { U } = require(`../../@`);
const DataBlockJSONSerializer = require(`./data-block-json-serializer`);
const { AssocManager } = require(`../../environment/@`);
const { SERIALIZER_JSON } = require(`./../keys`);

class DataEntryJSONSerializer extends DataBlockJSONSerializer{
    constructor(){super();}

    /**
     * Return the target as a JSON Object
     * @param {*} p_data 
     * @param {*} p_options 
     */
    static Serialize( p_data, p_options = null ){
        let serial = DataBlockJSONSerializer.Serialize(p_data, p_options);



        return serial;
    }

    /**
     * Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {*} p_serial 
     * @param {*} p_data 
     * @param {*} p_options 
     */
    static Deserialize( p_serial, p_data = null, p_options = null ){
        let p_data = DataBlockJSONSerializer.Deserialize(p_serial, p_data, p_options);

        return p_data;
    }

}

module.exports = DataEntryJSONSerializer;