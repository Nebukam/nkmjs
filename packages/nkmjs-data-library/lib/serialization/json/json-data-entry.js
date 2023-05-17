'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;

const IDS = require(`../../ids`);
const DataBlockExtendableJSONSerializer = require(`./json-data-block-extendable`);

class DataEntryJSONSerializer extends DataBlockExtendableJSONSerializer {
    constructor() { super(); }

    //#region Serialization

    static SerializeContent(p_serial, p_data, p_options = null) {
        super.SerializeContent(p_serial, p_data, p_options);
        if (p_data.model) { p_serial[IDS.MODEL] = p_data.model.uri; }
    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {
        super.DeserializeContent(p_serial, p_data, p_options, p_meta);
    }

    static TryGetExisting(p_ecosystem, p_serial, p_metas) {

        let modelURI = p_serial[IDS.MODEL],
            entryUID = ((p_metas && p_metas[com.IDS.UID]) || p_serial[com.IDS.UID]);

        if (!modelURI || !entryUID) { return null; }

        let model = p_ecosystem.Resolve(modelURI);

        if (!model) { return null; }

        let library = p_ecosystem.entries.GetLibrary(model);

        if (!library) { return null; }

        return library._factory.GetByName(entryUID);

    }

    static RegisterToEcosystem(p_ecosystem, p_data, p_serial, p_metas) {

        let modelURI = p_serial[IDS.MODEL],
            entryUID = ((p_metas && p_metas[com.IDS.UID]) || p_serial[com.IDS.UID]);

        if (!modelURI || !entryUID) { return false; }

        let model = p_ecosystem.Resolve(modelURI);

        if (!model) { return false; }

        let library = p_ecosystem.entries.GetLibrary(model);

        if (!library) { return false; }

        library._factory.RegisterTemp(p_data);
        return library._factory.Register(p_data, entryUID);

    }

    //#endregion

}

module.exports = DataEntryJSONSerializer;