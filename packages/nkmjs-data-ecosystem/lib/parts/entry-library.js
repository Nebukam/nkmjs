'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const DataEntry = require("../data-entry");

/**
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof ecosystem.parts
 */
class EntryLibrary extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init(){
        super._Init();
        this._factory = new data.DataFactory();
        this._factory.itemClass = DataEntry;
        this._model = null;
    }

    get factory(){ return this._factory; }

    get model(){ return this._model; }
    set model(p_value){
        if(this._model === p_value){ return; }
        let oldModel = this._model;
        this._model = p_value;
    }

    /**
     * 
     * @param {string|data.core.ID} p_id 
     * @param {Function} [p_class] 
     */
    Create(p_id, p_class = null){
        let entry = this._factory.Create(p_id, p_class);
        entry.model = this._model;
    }

}

module.exports = EntryLibrary;
