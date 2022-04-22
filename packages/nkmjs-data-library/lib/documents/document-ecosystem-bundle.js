'use strict';

const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);
const documents = require(`@nkmjs/documents`);

const base = documents.Document;

/**
 * An Ecosystem Bundle document store a complete ecosystem, its models, entry etc, in 
 * a single file.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class EcosystemBundleDocument extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        serializationContext: data.serialization.CONTEXT.JSON
    }, base);

}

module.exports = EcosystemBundleDocument;