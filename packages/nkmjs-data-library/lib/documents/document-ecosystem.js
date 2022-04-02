'use strict';

const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);
const documents = require(`@nkmjs/documents`);

/**
 * Loading an ecosystem document will not load all of its content, only the 'header/configuration' file.
 * Once this document is loaded & parsed, then only its content can be loaded.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class EcosystemDocument extends documents.Document {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        serializationContext: data.serialization.CONTEXT.JSON
    }, documents.Document);

}

module.exports = EcosystemDocument;