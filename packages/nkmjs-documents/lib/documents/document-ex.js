'use strict';

const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const data = require(`@nkmjs/data-core`);
const io = require(`@nkmjs/io-core`);

const Document = require(`../document`);

/**
 * A DocumentEx adds an option check/validation step to Load, Save & Delete.
 * @class
 * @hideconstructor
 * @augments documents.Document
 * @memberof documents
 */
class DocumentEx extends Document{
    constructor(){super();}

    _CheckOptions( p_options = null ){ return p_options; }

    Load(p_options = null){ return super.Load(this._CheckOptions(p_options)); }

    Save(p_options = null){ return super.Save(this._CheckOptions(p_options)); }

    Delete(p_options = null){ return super.Delete(this._CheckOptions(p_options)); }
    
}

module.exports = DocumentEx;