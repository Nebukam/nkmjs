'use strict';

const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);

const IDS = require(`../ids`);
const DocumentEx = require(`./document-ex`);

/**
 * A MetaDocument is a cross-plateform 'meta' file.
 * If run in a nodejs environment, is it saved on the drive, while in browser it will be stored
 * in either storageArea (extensions) or localStorage (PWA)
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class MetaDocument extends DocumentEx {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        [IDS.TYPE_RSC]: io.resources.JSONResource,
        [IDS.SERIAL_CTX]: data.serialization.CONTEXT.JSON
    }, DocumentEx);

}

module.exports = MetaDocument;