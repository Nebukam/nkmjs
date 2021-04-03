const u = require("@nkmjs/utils");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

class EcosystemJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    /**
     * @description Serialize the data content into the serial object
     * @param {object} p_serial 
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static SerializeContent(p_serial, p_data, p_options = null) {
        // TODO : Write ecosystem content
        // - high-level ecosystem settings
    }

    /**
     * @description Deserialize the data content.
     * @param {data.core.DataBlock} p_data 
     * @param {object} [p_options] 
     * @returns 
     */
    static DeserializeContent(p_serial, p_data, p_options = null) {
        // TODO : Load ecosystem settings
        // - high-level ecosystem settings
    }



}

module.exports = EcosystemJSONSerializer;