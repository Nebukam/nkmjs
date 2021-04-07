const u = require("@nkmjs/utils");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

class EcosystemJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    //#region Deserialization

    static SerializeContent(p_serial, p_data, p_options = null) {
        // TODO : Write ecosystem content
        // - high-level ecosystem settings
    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_metas = null) {
        // TODO : Load ecosystem settings
        // - high-level ecosystem settings
    }

    //#endregion



}

module.exports = EcosystemJSONSerializer;