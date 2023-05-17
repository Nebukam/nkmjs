'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const DataBlockExtendableJSONSerializer = require(`./json-data-block-extendable`);
const FieldDescriptorJSONSerializer = require("./json-field-descriptor");

class FieldSlotJSONSerializer extends DataBlockExtendableJSONSerializer {
    constructor() { super(); }

    //#region Serialization

    static SerializeContent(p_serial, p_data, p_options = null) {
        
        let descriptor = p_data.descriptor,
        group = p_data.group;

        if (descriptor) {
            p_serial[IDS.DESCRIPTOR] = com.BINDINGS.GetClassKey(descriptor);
            let serializer = this.GetSerializer(descriptor, -1, FieldDescriptorJSONSerializer);
            p_serial[IDS.SETTINGS] = serializer.Serialize(descriptor, p_options);
        }

        if(group){ p_serial[IDS.GROUP] = group._id._name; }

    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {

        let descriptorClassKey = p_serial[IDS.DESCRIPTOR];
        
        if (descriptorClassKey) {
            let descriptorClass = com.BINDINGS.GetClass(descriptorClassKey);
            let descriptor = com.Rent(descriptorClass),
                serializer = this.GetSerializer(descriptor, -1, FieldDescriptorJSONSerializer); //TODO : Get the correct ver

            p_data.settings = serializer.Deserialize(p_serial[IDS.SETTINGS], p_data, p_options, p_meta);
            p_data.descriptor = descriptor;
        }

    }

    //#endregion

}

module.exports = FieldSlotJSONSerializer;