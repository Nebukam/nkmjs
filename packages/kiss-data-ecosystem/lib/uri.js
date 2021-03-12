'use strict';

const u = require("@nkmjs/utils");

const _delim_model = ':';
const _delim_field = '.';
const _delim_hash = '@';

class URI {

    static get DELIM_MODEL() { return _delim_model; }
    static get DELIM_FIELD() { return _delim_field; }
    static get DELIM_HASH() { return _delim_hash; }

    constructor() { }

    static Resolve(p_uri, p_ecosystem) {
        // URI formats
        // modelId === model
        // .fieldId === fieldDescriptor
        // :entryId === entry
        // modelId.fieldId === fieldSettings
        // modelId:entryId === entry
        // modelId:entryId.fieldId === field value
        // modelId:entryId.fieldId#hash === hash resolved in field value

        let o_uri = p_uri,
            hash = null,
            fieldId = null,
            modelId = null,
            entryId = null;

        // hash is anything after the first DELIM_HASH
        let hashSplit = p_uri.split(URI.DELIM_HASH);
        if (hashSplit.length >= 2) {
            p_uri = hashSplit.shift();
            hash = hashSplit.join(URI.DELIM_HASH);
        } hashSplit.length = 0;

        // fieldId is anything after the first DELIM_FIELD
        let fieldSplit = p_uri.split(URI.DELIM_FIELD);
        if (fieldSplit.length >= 2) {
            p_uri = fieldSplit.shift();
            fieldId = fieldSplit.join(URI.DELIM_FIELD);
        } fieldSplit.length = 0;

        // entryId is anything after the first DELIM_MODEL
        let entrySplit = p_uri.split(URI.DELIM_MODEL);
        if (entrySplit.length >= 2) {
            p_uri = entrySplit.shift();
            entryId = entrySplit.join(URI.DELIM_MODEL);
        } entrySplit.length = 0;

        if (!u.tils.isEmpty(p_uri)) { modelId = p_uri; }

        if (modelId) {
            // modelId
            let model = p_ecosystem.models.Get(modelId);
            if (!model) { throw new Error(`could not find model ${modelId} in ${o_uri}`); }

            let fieldSettings = fieldId ? model.Get(fieldId) : null;

            if (entryId) {
                // modelId:entryId
                let entry = p_ecosystem.entries.Get(model, entryId);
                if (!entry) { throw new Error(`could not find entry ${entryId} in ${o_uri}`); }

                if (fieldId) {
                    // modelId:entryId.fieldId
                    if (!fieldSettings) { throw new Error(`could not find field ${fieldId} in ${o_uri}`); }

                    let fieldData = entry.GetFieldData(fieldSettings.id, true);
                    if (hash) {/* TODO : Resolve hash on fieldData */ }
                    return fieldData;
                }
                return entry;
            } else {
                if (fieldId) {
                    //modelId.fieldId
                    if (!fieldSettings) { throw new Error(`could not find field ${fieldId} in ${o_uri}`); }

                    if (hash) {/* TODO : Resolve hash on fieldSettings */ }
                    return fieldSettings;
                }
                return model;

            }
        } else {
            if (fieldId) {
                let fieldDescriptor = p_ecosystem.fields.Get(fieldId);
                if (!fieldDescriptor) { throw new Error(`could not find field descriptor ${fieldId} in ${o_uri}`); }
                return fieldDescriptor;
            }
        }

        if (entryId) {
            throw new Error(`URI(${o_uri}) is a roaming entry ID.`);
        } else {
            throw new Error(`URI(${o_uri}) could not be resolved.`);
        }

    }

    static GetURI(p_target) {

    }

}

module.exports = URI;