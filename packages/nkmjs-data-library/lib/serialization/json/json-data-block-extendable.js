const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

class DataBlockExtendableJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    //#region Serialization

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {
        // Write base
        if (p_data.base) { p_serial[IDS.BASE] = p_data.base.uri; }
    }


    //#endregion

    //#region Deserialization

    static Deserialize(p_serial, p_data = null, p_options = null, p_metas = null) {

        let ecosystem = u.tils.Get(p_options, `ecosystem`, null);
        if (!ecosystem) { throw new Error(`Cannot resolve reference without an ecosystem set`); }

        let existingData = this.TryGetExisting(ecosystem, p_serial, p_metas);
        if (existingData && u.tils.Get(p_options, `useRegisteredData`)) {

            // Destroy initial object
            if (p_data && existingData != p_data) { p_data.Release(); }

            p_data = existingData;
            p_data = super.Deserialize(p_serial, p_data, p_options, p_metas);
            return p_data;

        } else {
            p_data = super.Deserialize(p_serial, p_data, p_options);
            let registered = this.RegisterToEcosystem(ecosystem, p_data, p_serial, p_metas);
            return p_data;
        }

    }

    static TryGetExisting(p_ecosystem, p_serial, p_metas = null) {
        return null;
    }

    static RegisterToEcosystem(p_ecosystem, p_data, p_serial, p_metas = null) {
        return false;
    }

    static DeserializeContent(p_serial, p_data, p_options = null, p_metas = null) {

        if (IDS.BASE in p_serial) {
            // Retrieve base & assign it
            let baseURI = p_serial[IDS.BASE],
                ecosystem = u.tils.Get(p_options, `ecosystem`, null);

            if (!ecosystem) { throw new Error(`Cannot resolve reference without an ecosystem set`); }

            let baseRef = ecosystem.Resolve(baseURI);
            if (!baseRef) {
                ecosystem.RegisterUnresolvedReference(
                    p_data,
                    {
                        uri: baseURI,
                        set: IDS.BASE
                    });
            } else {
                p_data.base = baseRef;
            }
        }

    }

    //#endregion


}

module.exports = DataBlockExtendableJSONSerializer;