const { U } = require(`../../@`);
const { POOL } = require(`../../collections/@`);
const { FieldSettings } = require(`../../data-core/@`);

const DataBlockJSONSerializer = require(`./data-block-json-serializer`);
const { AssocManager } = require(`../../environment/@`);
const { SERIALIZER_JSON } = require(`./../keys`);

class ModelJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * Return the target as a JSON Object
     * @param {*} p_target 
     * @param {*} p_options 
     */
    static Serialize(p_target, p_options = null) {

        let serial = DataBlockJSONSerializer.Serialize(p_target, p_options);

        let definition = serial.definition;
        if (!definition) { definition = {}; serial.definition = definition; }

        //Base Model ID
        if (p_target._base) {
            definition.base = p_target._base.uri;
        }

        //Fields
        let fields = {}; definition.fields = fields;

        let fList = p_target._fieldRep.itemList;
        for (let i = 0, n = fList.length; i < n; i++) {
            let f = fList[i];
            fields[f.id.name] = AssocManager.Get(f.constructor, SERIALIZER_JSON)
                .Serialize(f, p_options);
        }

        return serial;
    }

    /**
     * Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {*} p_serial  
     * @param {*} p_data 
     * @param {*} p_options
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {

        let p_data = DataBlockJSONSerializer.Deserialize(p_serial, p_data, p_options);

        let definition = p_serial.definition;
        if (!definition) { return p_data; }

        let base = definition.base;
        if (base) {
            let baseModel = p_data.ecosystem.Resolve(base);
            if (!baseModel) {
                // Create a watch token in the ecosystem so the base reference
                // will be resolved as soon as it is registered
            } else {
                p_data.base = baseModel;
            }
        }

        let fields = definition.fields;
        if (fields) {

            for (let member in fields) {
                let
                    fieldSerial = fields[member],
                    fieldData = p_data.Get(member);

                if (!fieldData) {
                    fieldData = POOL.Rent(FieldSettings);
                    p_data.Register(fieldData, member);
                }

                AssocManager.Get(FieldSettings, SERIALIZER_JSON)
                    .Deserialize(fieldSerial, fieldData, p_options);
            }

        }

        return p_data;

    }

}

module.exports = ModelJSONSerializer;