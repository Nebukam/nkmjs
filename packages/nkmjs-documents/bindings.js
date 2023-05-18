'use strict';

const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const CTX = require(`./lib/context`);
const docs = require(`./lib/documents`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                ctx: CTX.DOCUMENT,
                kvps: [
                    { key: data.Metadata, binding: docs.unbound.MetaDocument }
                ]
            },
            {
                ctx: CTX.DOCUMENT_DATA,
                kvps: [
                    { key: docs.unbound.MetaDocument, binding: data.Metadata }
                ]
            });

    }
}

module.exports = Bindings;