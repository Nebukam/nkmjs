const u = require("@nkmjs/utils");
const data = require("@nkmjs/data-core");

const ENV = require(`../../environment`);
const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

const __baseID = `base`;

class DataBlockExtendableJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {
        // Write base
        if (p_data.base) { p_serial[__baseID] = p_data.base.uri; }
    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null) {
        if (__baseID in p_serial) {
            // Retrieve base & assign it
            let baseURI = p_serial[__baseID],
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
            }else{
                p_data.base = baseRef;
            }
        }
    }

    

}

module.exports = DataBlockExtendableJSONSerializer;