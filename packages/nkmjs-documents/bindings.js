'use strict';

const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const CONTEXT = require(`./lib/context`);
const docs = require(`./lib/documents`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: CONTEXT.DOCUMENT,
                kvps: [
                    { key: data.Metadata, binding: docs.unbound.MetaDocument }
                ]
            },
            {
                context: CONTEXT.DOCUMENT_DATA,
                kvps: [
                    { key: docs.unbound.MetaDocument, binding: data.Metadata }
                ]
            });

    }
}

module.exports = Bindings;