'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const Model = require(`../../data/model`);
const DataEntry = require(`../../data/data-entry`);
const FieldSettings = require(`../../data/fields/field-settings`);

const type_entry = `entry`;
const type_model = `model`;
const type_field = `field`;
const type_default = `default`;

/**
 * This is a copy-paste of the @nkmjs-core-data JSONSerializer with small twists to accomodate Models, Fields etc.
 * TODO : When the ecosystem module is 'initialized' (and it must be), replace the existing one.
 */
class EcosystemJSONSerializer extends data.serialization.Serializer {
    constructor() { super(); }

    static Serialize(p_target, p_options = null) {

        //Find suitable JSON Object serializer depending on target type.
        let serializer = com.BINDINGS.Get(
            data.serialization.CONTEXT.JSON,
            p_target.constructor,
            null);

        if (!serializer) {
            throw new Error(`Could not find suitable serializer for target=${p_target}`);
        }

        let serial = serializer.Serialize(p_target);

        let nfos = serial.__nfos__;
        if (!nfos) { nfos = {}; serial.__nfos__ = nfos; }

        let type = nfos.type;

        if (u.tils.isInstanceOf(p_target, Model)) {
            type = type_model;
        } else if (u.tils.isInstanceOf(p_target, DataEntry)) {
            type = type_entry;
        } else if (u.tils.isInstanceOf(p_target, FieldSettings)) {
            type = type_field;
        } else {
            type = type_default;
        }

        nfos.type = type;
        nfos.instanceOf = p_target.constructor.name;

        return serial;

    }

    /**
     * 
     * @param {*} p_serial 
     * @param {*} p_data 
     * @param {*} p_options 
     */
    static Deserialize(p_serial, p_data = null, p_options = null) {

        let cl = null;

        if (p_data != null) {

            cl = p_data.constructor;

        } else {

            let nfos = p_serial.__nfos__;
            if (!nfos) {
                //There is no nfos in the serial.
                throw new Error(`Cannot unserialize without nfos`);
            }

            let type = nfos.type,
                instanceOf = nfos.instanceOf;

            cl = com.pool.POOL.GetClass(instanceOf);

            if (!cl) {
                throw new Error(`No constructor is registered with id = ${cl}`);
            }

            let ecosystem = p_options ? p_options.ecosystem : null,
                id = p_options ? p_options.id : null;

            if (type === type_entry
                || type === type_field
                || type === type_model) {
                if (!ecosystem || !id) {
                    throw new Error(`Missing required infos for deserialization ecosystem=${ecosystem}, id=${id}`);
                }

                switch (type) {
                    case type_entry:
                        p_data = ecosystem.entries.CreateTemp(null, cl);
                        ecosystem.entries.Register(p_data, id);
                        break;
                    case type_model:
                        p_data = ecosystem.models.CreateTemp(null, cl);
                        ecosystem.models.Register(p_data, id);
                        break;
                    case type_field:
                        throw new Error(`not implemented`);
                        break;
                }

            } else {
                p_data = com.Rent(cl);
            }

        }

        let serializer = com.BINDINGS.Get(
            data.serialization.CONTEXT.JSON,
            cl,
            null);

        if (!serializer) {
            throw new Error(`Could not find suitable de-serializer for target=${p_data}`);
        }

        return serializer.Deserialize(p_serial, p_data, p_options);
    }

}

module.exports = EcosystemJSONSerializer;