const { U } = require(`../../@`);
const { POOL } = require(`../../collections/@`);

const DataBlockJSONSerializer = require(`./data-block-json-serializer`);
const { AssocManager } = require(`../../environment/@`);
const { SERIALIZER_JSON } = require(`./../keys`);

class FieldSettingsJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * Return the target as a JSON Object
     * @param {*} p_target 
     * @param {*} p_options 
     */
    static Serialize(p_target, p_options = null) {
        let serial = DataBlockJSONSerializer.Serialize(p_target, p_options);
        serial.id = p_target.id.name;
        serial.instanceOf = p_target.fieldClass.name;

        //TODO : Make sure there is no reference that would be serialized as a whole
        serial.settings = U.Clone(p_target.settings);
        return serial;
    }

    /**
     * Return an entry object from the provided serial
     * Or override available info in provided target.
     * @param {*} p_serial 
     * @param {*} p_options 
     * @param {*} p_data 
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {
        let p_data = DataBlockJSONSerializer.Deserialize(p_serial, p_data, p_options),
            fieldClass = POOL.GetClass(p_serial.instanceOf);
            
        p_data.fieldClass = fieldClass;
        p_data.instance = POOL.Rent(fieldClass);
        p_data.settings = p_serial.settings;

        // Nullify serial settings
        // in case the serial gets garbage collected
        p_serial.settings = null;

        return p_data;
    }

}

module.exports = FieldSettingsJSONSerializer;