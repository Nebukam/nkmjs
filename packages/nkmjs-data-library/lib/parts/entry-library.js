'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const DataFactoryEx = require(`../data-factory-ex`);
const DataEntry = require("../data-entry");


/**
 * @class
 * @augments common.Observable
 * @memberof ecosystem.parts
 */
class EntryLibrary extends com.Observable {
    constructor() { super(); }

    _Init(){
        super._Init();
        this._ecosystem = null;
        this._factory = new DataFactoryEx();
        this._factory.itemClass = DataEntry;
        this._model = null;
    }

    get ecosystem(){ return this._ecosystem; }
    set ecosystem(p_value){ 
        this._ecosystem = p_value; 
        this._OnEcosystemChanged(this._ecosystem);
    }

    _OnEcosystemChanged(p_ecosystem){
        
    }

    get factory(){ return this._factory; }

    get model(){ return this._model; }
    set model(p_value){
        if(this._model === p_value){ return; }
        let oldModel = this._model;
        this._model = p_value;
    }

    get entryList(){ return this._factory._itemRep._itemList; }

    /**
     * 
     * @param {string|data.core.ID} p_id 
     * @param {Function} [p_class] 
     */
    Create(p_id, p_class = null){
        let entry = this._factory.Create(p_id, p_class);
        entry.ecosystem = this._ecosystem;
        entry.model = this._model;
        return entry;
    }

    Clear(){
        this._factory.Clear();
    }

}

module.exports = EntryLibrary;
