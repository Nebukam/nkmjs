'use strict';

const com = require("@nkmjs/common");

const { Metadata, DataBlock, SimpleDataBlock } = require(`./lib/data`);
const serialization = require(`./lib/serialization`);
const IDS = require(`./lib/ids`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.AddClasses(
            Metadata,
            DataBlock
        );

        this.Add(
            {
                context: serialization.CONTEXT.SERIALIZER,
                kvps: [
                    { key: serialization.CONTEXT.JSON, binding: serialization.JSONSerializer },
                    { key: serialization.CONTEXT.TEXT, binding: serialization.TEXTSerializer }
                ]
            },
            {
                context: serialization.CONTEXT.JSON,
                kvps: [
                    { key: Metadata, binding: serialization.json.Metadata },
                    { key: DataBlock, binding: serialization.json.DataBlock },
                    { key: SimpleDataBlock, binding: serialization.json.SimpleDataBlock }
                ]
            });

    }
}

module.exports = Bindings;