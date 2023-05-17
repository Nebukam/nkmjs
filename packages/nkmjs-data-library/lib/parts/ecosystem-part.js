'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const com = nkm.com;
const data = nkm.data;

/**
 * @class
 * @augments common.Observable
 * @memberof ecosystem.parts
 */
class EcosystemPart extends com.Observable {
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
