
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const io = require("@nkmjs/io-core");

const IDS = require(`../ids`);
const DocumentEx = require(`./document-ex`);

const base = DocumentEx;

/**
 * A JSONDocument is a cross-plateform 'json' file.
 * It is DATA BOUND.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class JSONDocument extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        [IDS.TYPE_RSC]: io.resources.JSONResource,
        [IDS.SERIAL_CTX]: data.serialization.CTX.JSON,
    }, base);

}

/**
 * A MetaDocument is a cross-plateform 'meta' file.
 * If run in a nodejs environment, is it saved on the drive, while in browser it will be stored
 * in either storageArea (extensions) or localStorage (PWA)
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class MetaDocument extends JSONDocument {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
    }, JSONDocument);

}

module.exports = {
    JSONDocument: JSONDocument,
    MetaDocument: MetaDocument,
}