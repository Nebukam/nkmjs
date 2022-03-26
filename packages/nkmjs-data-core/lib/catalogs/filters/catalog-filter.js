
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require("@nkmjs/collections");

const SIGNAL = require(`../../signal`);
const FILTER_SIGNAL = require(`./catalog-filter-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class CatalogFilter extends com.pool.DisposableObjectEx {

    constructor() {
        super();
       
        this._isEnabled = true;
        
    }

    get enabled(){ return this._isEnabled; }
    set enabled(p_value){
        if(this._isEnabled == p_value){ return; }
        this._isEnabled = p_value;
        if(p_value){
            this.Broadcast(FILTER_SIGNAL.ENABLED, this);
        }else{
            this.Broadcast(FILTER_SIGNAL.DISABLED, this);
        }
    }

    Pass(p_item){ return true; }

    _CleanUp(){
        this._isEnabled = true;
        super._CleanUp();
    }

}

module.exports = CatalogFilter;