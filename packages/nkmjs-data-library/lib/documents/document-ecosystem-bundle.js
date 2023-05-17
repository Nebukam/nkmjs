'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const env = nkm.env;
const data = nkm.data;
const io = nkm.io;
const documents = nkm.documents;

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