'use strict';

const com = require("@nkmjs/common");
const { ENV } = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);

const Document = require(`../document`);

/**
 * A MetaDocument is a cross-plateform 'meta' file.
 * If run in a nodejs environment, is it saved on the drive, while in browser it will be stored
 * in either storageArea (extensions) or localStorage (PWA)
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class MetaDocument extends Document{
    constructor(){super();}

    static __NFO__ = com.NFOS.Ext({
        resource: io.resources.JSONResource,
        serializationContext: data.serialization.CONTEXT.JSON
        }, Document.__NFO__);

    _CheckOptions( p_options = null ){
        p_options = p_options ? p_options : {};
        p_options.io = ENV.IF_NODE(io.IO_TYPE.FILE_SYSTEM, io.IO_TYPE.LOCAL_STORAGE);
        return p_options;
    }

    Load(p_options = null){ return super.Load(this._CheckOptions(p_options)); }

    Save(p_options = null){ return super.Save(this._CheckOptions(p_options)); }

    Delete(p_options = null){ return super.Delete(this._CheckOptions(p_options)); }
    
}

module.exports = MetaDocument;