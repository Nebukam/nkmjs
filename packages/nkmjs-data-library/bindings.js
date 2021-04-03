'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const nkmdocs = require("@nkmjs/documents");

const CONTEXT = require(`./lib/context`);
const fields = require(`./lib/fields`);
const serialization = require(`./lib/serialization`);
const documents = require(`./lib/documents`);

const Ecosystem = require(`./lib/ecosystem`);
const EcosystemBundle = require(`./lib/ecosystem-bundle`);
const FieldModel = require(`./lib/field-model`);
const DataModel = require(`./lib/data-model`);
const DataEntry = require(`./lib/data-entry`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        //#region Data

        this.Add({
            context: data.serialization.CONTEXT.JSON,
            kvps: [
                { key: Ecosystem, binding: serialization.json.Ecosystem },
                { key: EcosystemBundle, binding: serialization.json.EcosystemBundle },
                { key: FieldModel, binding: serialization.json.FieldModel },
                { key: DataModel, binding: serialization.json.DataModel },
                { key: DataEntry, binding: serialization.json.DataEntry }
            ]            
        },
        {
            context: nkmdocs.CONTEXT.DOCUMENT_DEFAULT_DATA,
            kvps:[
                { key: documents.Ecosystem, binding: Ecosystem },
                { key: documents.EcosystemBundle, binding: EcosystemBundle }
            ]
        });

        //#endregion

        //#region Fields

        this.AddClasses(

            fields.Boolean,

            fields.lists.List,
            fields.lists.Map,

            fields.numbers.Number,
            fields.numbers.NumberClamped,
            fields.numbers.Byte,
            fields.numbers.Float,
            fields.numbers.Float2,
            fields.numbers.Float3,
            fields.numbers.Float4,
            fields.numbers.Int,
            fields.numbers.Int2,
            fields.numbers.Int3,
            fields.numbers.Int4,
            fields.numbers.UInt,

            fields.strings.String,
            fields.strings.LocalizedString,

            fields.types.Type,
            fields.types.KVP,

        )

        this.Add(
            {
                context: CONTEXT.FIELD_DETAILS,
                kvps: [
                    { key: fields.lists.Array, binding: fields.DetailsArray },
                ]
            });

        //#endregion

    }
}

module.exports = Bindings;