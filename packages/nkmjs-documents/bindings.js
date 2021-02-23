'use strict';

const { BindingKit } = require(`@nkmjs/common`);
const { Metadata } = require(`@nkmjs/data-core`);

const DOCUMENT_CONTEXT = require(`./lib/document-context`);
const { MetaDocument } = require(`./lib/documents`);

class Bindings extends BindingKit{
    constructor(){super();}
    _Init(){ super._Init();

        this.Add(
        {
            context:DOCUMENT_CONTEXT.DOCUMENT,
            kvps:[
                { key:Metadata, binding:MetaDocument }
            ]
        });

    }
}

module.exports = Bindings;