'use strict';

const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);
const documents = require(`@nkmjs/documents`);

/**
 * An Ecosystem Bundle document store a complete ecosystem, its models, entry etc, in 
 * a single file.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class EcosystemBundleDocument extends documents.Document {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        serializationContext: data.serialization.CONTEXT.JSON
    }, documents.Document.__NFO__);

}

module.exports = EcosystemBundleDocument;