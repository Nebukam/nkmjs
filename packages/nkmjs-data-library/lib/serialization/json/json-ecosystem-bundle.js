const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

class EcosystemBundleJSONSerializer extends DataBlockJSONSerializer {
    constructor() { super(); }

    //#region Serialization

    static SerializeContent(p_serial, p_data, p_options = null) {
        // TODO : Write ecosystem content
        // - high-level ecosystem settings.

        // - write models & entries
        let modelList = [],
            modelReferenceList = p_data.models.modelList,
            entriesList = {};

        for (let i = 0, n = modelReferenceList.count; i < n; i++) {
            let model = modelReferenceList.At(i),
                library = p_data.entries.GetLibrary(model),
                libraryList = library.entryList,
                librarySize = libraryList.count;

            modelList.push(this.__master.Serialize(model, p_options));

            if (librarySize <= 0) { continue; }

            let localEntries = [];
            entriesList[model._id.name] = localEntries;

            // Serialize entries
            for (let e = 0, en = librarySize; e < en; e++) {
                let entry = libraryList.At(e);
                localEntries.push(this.__master.Serialize(entry, p_options));
            }

        }

        p_serial[IDS.MODEL] = modelList;
        p_serial[IDS.ENTRY] = entriesList;

    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_metas = null) {

        if (!p_options || !p_options.ecosystem) {
            if (p_options) { p_options.ecosystem = p_data; }
            else { p_options = { ecosystem: p_data }; }
        }

        // TODO : Load ecosystem settings
        // - high-level ecosystem settings
        // - then read models
        // - then read entries
        let modelList = p_serial[IDS.MODEL],
            entryList = p_serial[IDS.ENTRY];

        if (modelList) {
            for (let i = 0, n = modelList.length; i < n; i++) {
                let modelSerial = modelList[i],
                    model = this.__master.Deserialize(modelSerial, null, p_options);

            }
        }

    }

    //#endregion



}

module.exports = EcosystemBundleJSONSerializer;