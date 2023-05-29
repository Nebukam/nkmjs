'use struct';

const nkm = require(`@nkmjs/core/nkmin`);

const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const IDS = require(`../../ids`);
const DataBlockJSONSerializer = data.s11n.json.DataBlock;

const __id_models = `models`;
const __id_entries = `entries`;

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

        for (let i = 0, n = modelReferenceList.length; i < n; i++) {
            let model = modelReferenceList.At(i),
                library = p_data.entries.GetLibrary(model),
                libraryList = library.entryList,
                librarySize = libraryList.length;

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

        p_serial[__id_models] = modelList;
        p_serial[__id_entries] = entriesList;

    }

    //#endregion

    //#region Deserialization

    static DeserializeContent(p_serial, p_data, p_options = null, p_meta = null) {

        if (!p_options || !p_options.ecosystem) {
            if (p_options) { p_options.ecosystem = p_data; }
            else { p_options = { ecosystem: p_data }; }
        }

        // TODO : Load ecosystem settings
        // - high-level ecosystem settings
        // - then read models
        // - then read entries
        let modelList = p_serial[__id_models],
            entryList = p_serial[__id_entries];

        if (modelList) {
            for (let i = 0, n = modelList.length; i < n; i++) {
                // Model serializer is in charge of ecosystem registration
                this.__master.Deserialize(modelList[i], null, p_options);
            }
        }

        if(entryList){
            for (let i = 0, n = entryList.length; i < n; i++) {
                // Entry serializer is in charge of ecosystem registration
                this.__master.Deserialize(entryList[i], null, p_options);
            }
        }

    }

    //#endregion



}

module.exports = EcosystemBundleJSONSerializer;