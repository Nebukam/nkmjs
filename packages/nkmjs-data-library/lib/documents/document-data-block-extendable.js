'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const env = nkm.env;
const data = nkm.data;
const io = nkm.io;
const documents = nkm.documents;

const base = documents.DocumentEx;

/**
 * A MetaDocument is a cross-plateform 'meta' file.
 * If run in a nodejs environment, is it saved on the drive, while in browser it will be stored
 * in either storageArea (extensions) or localStorage (PWA)
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class DataBlockExtendableDocument extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        [documents.IDS.SERIAL_CTX]: data.s11n.CTX.JSON
    }, base);

    _Init() {
        super._Init();
        this._ecosystem = null;
    }

    get ecosystem() { return this._ecosystem; }
    set ecosystem(p_value) { this._ecosystem = p_value; }

    _CheckOptions(p_options = null) {
        p_options = (p_options || {});
        p_options.ecosystem = (p_options.ecosystem || this._ecosystem);
        return p_options;
    }

}

module.exports = DataBlockExtendableDocument;