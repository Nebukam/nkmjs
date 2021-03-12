'use strict';

const com = require("@nkmjs/common");

const { Metadata, DataBlock } = require(`./lib/data`);
const { TEXTSerializer, JSONSerializer, SERIALIZATION_CONTEXT } = require(`./lib/serialization`);
const { MetadataJSONSerializer, DataBlockJSONSerializer } = require(`./lib/serialization/json`);

class Bindings extends com.helpers.BindingKit{
    constructor(){super();}
    _Init(){ super._Init();

        this.AddClasses(
            Metadata,
            DataBlock
        );

        this.Add(
        {
            context:SERIALIZATION_CONTEXT.SERIALIZER,
            kvps:[
                { key:SERIALIZATION_CONTEXT.JSON, binding:JSONSerializer },
                { key:SERIALIZATION_CONTEXT.TEXT, binding:TEXTSerializer }
            ]
        },
        {
            context:SERIALIZATION_CONTEXT.JSON,
            kvps:[
                { key:Metadata, binding:MetadataJSONSerializer },
                { key:DataBlock, binding:DataBlockJSONSerializer }
            ]
        });

    }
}

module.exports = Bindings;