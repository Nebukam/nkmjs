const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.serialization.json.DataBlock;

class EcosystemBundleJSONSerializer extends DataBlockJSONSerializer {
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
        // - high-level ecosystem settings.

        // - write models & entries
        let modelList = [],
            modelReferenceList = p_data.models.modelList,
            entriesList = {};

        for (let i = 0, n = modelReferenceList.count; i < n; i++) {
            let model = modelReferenceList.At(i),
                library = p_data.entries.GetLibrary(model),
                libraryList = library.entryList,
                librarySize = libraryList.count,
                serializer = com.BINDINGS.Get(data.serialization.CONTEXT.JSON, model, null);

            if (!serializer) { throw new Error(`Could not find valid serializer for model : ${model}.`); }
            modelList.push(serializer.Serialize(model, p_options));

            if (librarySize <= 0) { continue; }

            let localEntries = [];
            entriesList[model._id.name] = localEntries;

            // Serialize entries
            for (let e = 0, en = librarySize; e < en; e++) {
                let entry = libraryList.At(e);
                serializer = com.BINDINGS.Get(data.serialization.CONTEXT.JSON, entry, null);

                if (!serializer) { throw new Error(`Could not find valid serializer for entry : ${entry}.`); }
                localEntries.push(serializer.Serialize(entry, p_options));
            }

        }

        p_serial[IDS.MODEL] = modelList;
        p_serial[IDS.ENTRY] = entriesList;

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
        // - then read models
        // - then read entries
    }



}

module.exports = EcosystemBundleJSONSerializer;