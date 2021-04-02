'use strict';

const com = require(`@nkmjs/common`);
const data = require("@nkmjs/data-core");

/**
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof ecosystem.parts
 */
class EcosystemPart extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._ecosystem = null;
        this._catalog = new data.catalogs.Catalog();
    }

    get ecosystem(){ return this._ecosystem; }
    set ecosystem(p_value){ 
        this._ecosystem = p_value; 
        this._OnEcosystemChanged(this._ecosystem);
    }

    _OnEcosystemChanged(p_ecosystem){
        
    }

    Clear(){
        this._catalog.Clear();
    }

    _CleanUp() {
        super._CleanUp();
        this.Clear();
    }

}

module.exports = EcosystemPart;
