'use strict';

const com = require("@nkmjs/common");

const CONTEXT = require(`./lib/context`);
const fields = require(`./lib/fields`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

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

    }
}

module.exports = Bindings;