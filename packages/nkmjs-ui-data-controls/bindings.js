'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const nkmdocs = require("@nkmjs/documents");

const CTX = require(`./lib/context`);
const fields = require(`./lib/fields`);
const s11n = require(`./lib/s11n`);
const documents = require(`./lib/documents`);

const Ecosystem = require(`./lib/ecosystem`);
const EcosystemBundle = require(`./lib/ecosystem-bundle`);
const FieldSlot = require(`./lib/field-slot`);
const FieldDescriptor = require(`./lib/field-descriptor`);
const DataModel = require(`./lib/data-model`);
const DataEntry = require(`./lib/data-entry`);
const DataBlockExtendable = require(`./lib/data-block-extendable`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        //#region Data

        this.Add({
            ctx: data.s11n.CTX.JSON,
            kvps: [
                { key: DataBlockExtendable, binding: s11n.json.DataBlockExtendable },
                { key: Ecosystem, binding: s11n.json.Ecosystem },
                { key: EcosystemBundle, binding: s11n.json.EcosystemBundle },
                { key: FieldSlot, binding: s11n.json.FieldSlot },
                { key: FieldDescriptor, binding: s11n.json.FieldDescriptor },
                { key: DataModel, binding: s11n.json.DataModel },
                { key: DataEntry, binding: s11n.json.DataEntry }
            ]            
        },
        {
            ctx: nkmdocs.CTX.DOCUMENT_DATA,
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
                ctx: CTX.FIELD_DETAILS,
                kvps: [
                    { key: fields.lists.Array, binding: fields.DetailsArray },
                ]
            });

        //#endregion

    }
}

module.exports = Bindings;