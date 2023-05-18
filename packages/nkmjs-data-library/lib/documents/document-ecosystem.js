'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const env = nkm.env;
const data = nkm.data;
const io = nkm.io;
const documents = nkm.documents;

const base = documents.Document;

/**
 * Loading an ecosystem document will not load all of its content, only the 'header/configuration' file.
 * Once this document is loaded & parsed, then only its content can be loaded.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class EcosystemDocument extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        serializationContext: data.s11n.CTX.JSON
    }, base);

}

module.exports = EcosystemDocument;