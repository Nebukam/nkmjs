'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const data = nkm.data;

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.s11n.json.DataBlock;

class EcosystemJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    //#region Deserialization

    static SerializeContent(p_serial, p_data, p_options = null) {
        // TODO : Write ecosystem content
        // - high-level ecosystem settings
    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {
        // TODO : Load ecosystem settings
        // - high-level ecosystem settings
    }

    //#endregion



}

module.exports = EcosystemJSONSerializer;