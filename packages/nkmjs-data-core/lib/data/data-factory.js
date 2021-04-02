'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);
const DataBlock = require(`./data-block`);
const Repertoire = require(`./repertoire`);

/**
 * A data factory allow for creation of uniquely identified DataBlocks
 * using an internal Repertoire. Data must first be created using 
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class DataFactory extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._id = null;
        this._tempItemList = new collections.List(0);

        this._itemRep = new Repertoire();
        this._itemRep
            .Watch(SIGNAL.ITEM_REGISTERED, this._OnItemRegistered, this)
            .Watch(SIGNAL.ITEM_UNREGISTERED, this._OnItemUnregistered, this);

        this._itemClass = null;

    }

    /**
     * @description TODO
     * @type {data.core.ID}
     */
    set id(p_value) { super._id = p_value; }
    get id() { return this._id; }

    /**
     * @description constructor -- Must inherit {@link data.core.DataBlock}
     * @type {function}
     */
    set itemClass(p_value) {
        if (!u.isInstanceOf(p_value, DataBlock)) { throw new Error(`itemClass must inherit DataBlock`); }
        this._itemClass = p_value;
    }
    get itemClass() { return this._itemClass; }

    /**
     * @description TODO
     * @type {collections.List}
     * @customtag read-only
     */
    get itemList() { return this._itemRep.itemList; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._itemRep.itemList.length; }

    /**
     * @description Return whether an string ID already exists
     * @param {string} p_name 
     * @returns {boolean} True if the ID is available, otherwise false.
     */
    IsNameAvailable(p_name) { return this._itemRep.IsNameAvailable(p_name); }

    /**
     * @description Creates & registers a data item.
     * @param {class} p_class 
     * @param {ID|string} p_class
     * @returns {*} Newly created item.
     */
    Create(p_id = null, p_class = null) {
        return this.Register(this.CreateTemp(p_class), p_id ? p_id : u.tils.UUID);
    }

    /**
     * @description Create a temp data item to be registered afterward.
     * @param {class} p_class 
     * @returns {*} Newly created item.
     */
    CreateTemp(p_class = null) {

        let cl = this._itemClass;

        if (p_class) {
            if (u.isInstanceOf(p_class, cl)) { cl = p_class; }
            else { throw new Error(`custom constructor (${p_class}) does not inherit factory constructor (${this._itemClass.name})`); }
        }

        return RegisterTemp(com.Rent(cl));

    }

    /**
     * Register an item as a temporary instance.
     * While this is primarily used internally, it allows this data factory to
     * take control of data created through other means.
     * @param {*} p_item 
     * @returns 
     */
    RegisterTemp(p_item) {

        if (!this._tempItemList(p_item)) { return; }

        p_item._isTemp = true;
        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        return p_item;

    }

    /**
     * @description Register an item previously created through CreateTemp() with a given ID.
     * @param {*} p_item 
     * @param {string|ID} p_id 
     * @returns {*} The newly registered item.
     */
    Register(p_item, p_id) {

        if (!this._tempItemList.Contains(p_item)) {
            throw new Error(`Cannot register an item that hasn't been created by this factory.`);
        } else {
            this._tempItemList.Remove(p_item);
            p_item._isTemp = false;
        }

        this._itemRep.Register(p_item, p_id);
        return p_item;

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_repertoire 
     * @param {*} p_item 
     */
    _OnItemRegistered(p_repertoire, p_item) {
        this._Broadcast(SIGNAL.ITEM_REGISTERED, this, p_item);
    }

    /**
     * @description Unregister and release an item created by this library
     * @param {*} p_item 
     */
    Unregister(p_item) {
        this._itemRep.Unregister(p_item);
        p_item.Release();
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_repertoire 
     * @param {*} p_item 
     */
    _OnItemUnregistered(p_repertoire, p_item) {
        this._Broadcast(SIGNAL.ITEM_UNREGISTERED, this, p_item);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_item 
     */
    _OnItemReleased(p_item) {
        this._tempItemList.Remove(p_item);
    }

    /**
     * @description Return the item associated with the given ID.
     * Returns null if no ID or item is found.
     * @param {ID} p_id 
     */
    Get(p_id) { return this._itemRep.Get(p_id); }

    /**
     * @description Return the item associated with the given ID.
     * Returns null if no ID or item is found.
     * @param {string} p_name 
     */
    GetByName(p_name) { return this._itemRep.GetByName(p_name); }

    /**
     * Release all instances created by this factory
     */
    Clear() {
        this._itemRep.Clear();
    }

    /**
     * @description TODO
     */
    _CleanUp() {
        throw new Error(`CleanUp Not implemented in ${this.constructor.name}`);
        this._itemClass = null;
        super._CleanUp();
    }

}

module.exports = DataFactory;