'use strict';

const com = require("@nkmjs/common");

const { Metadata, DataBlock, SimpleDataBlock } = require(`./lib/data`);
const s11n = require(`./lib/s11n`);
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
                ctx: s11n.CTX.SERIALIZER,
                kvps: [
                    { key: s11n.CTX.JSON, binding: s11n.JSONSerializer },
                    { key: s11n.CTX.TEXT, binding: s11n.TEXTSerializer }
                ]
            },
            {
                ctx: s11n.CTX.JSON,
                kvps: [
                    { key: Metadata, binding: s11n.json.Metadata },
                    { key: DataBlock, binding: s11n.json.DataBlock },
                    { key: SimpleDataBlock, binding: s11n.json.SimpleDataBlock }
                ]
            });

    }
}

module.exports = Bindings;