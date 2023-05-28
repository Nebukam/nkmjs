'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const collections = nkm.collections;
const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const DataModel = require(`../data-model`);

const EntryLibrary = require(`./entry-library`);
const EcosystemPart = require(`./ecosystem-part`);

/**
 * @class
 * @augments ecosystem.parts.EcosystemPart
 * @memberof ecosystem.parts
 */
class EntryManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._models = null;
        this._libraryList = new collections.List();
        this._libraryMap = new Map();
    }

    get models() { return this._models; }
    set models(p_value) {

        if (this._models === p_value) { return; }

        let oldModels = this._models;
        this._models = p_value;

        if (oldModels) {
            // Unwatch signals
            this._models._factory
                .Unwatch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
                .Unwatch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);
        }

        if (this._models) {
            // watch signals
            this._models._factory
                .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
                .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataFactory} p_factory 
     * @param {ecosystem.DataModel} p_model 
     */
    _OnModelRegistered(p_factory, p_model) {

        let library = com.Rent(EntryLibrary);
        library.ecosystem = this._ecosystem;
        library.model = p_model;

        this._libraryList.Add(library);
        this._libraryMap.set(p_model, library);

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataFactory} p_factory 
     * @param {ecosystem.DataModel} p_model 
     */
    _OnModelUnregistered(p_factory, p_model) {

        let library = this._libraryMap.get(p_model);

        this._libraryList.Remove(library);
        this._libraryMap.delete(p_model);

        library.Release();

    }

    GetLibrary(p_model) { return this._libraryMap.get(p_model); }

    /**
     * @description TODO
     * @param {string|core.data.ID} p_id 
     * @param {ecosystem.DataModel} p_model 
     * @param {Function} p_class 
     * @returns 
     */
    Create(p_id, p_model, p_class = null) {

        let lookup = null;

        if (u.isInstanceOf(p_model, DataModel)) { lookup = p_model; }
        else if (u.isString(p_model)) { library = lookup = this._models._factory.GetByName(p_model); }
        else if (u.isInstanceOf(p_model, data.ID)) { lookup = this._models._factory.Get(p_model); }

        let library = this._libraryMap.get(lookup);

        if (!library) { throw new Error(`Could not find a valid library to create entry`); }

        let item = library.Create(p_id, p_class);
        return item;

    }

    Clear() {
        super.Clear();

        this._libraryList.ForEach((lib) => { lib.Release(); });
        this._libraryList.Clear();
        this._libraryMap.Clear();
    }


}

module.exports = EntryManager;
