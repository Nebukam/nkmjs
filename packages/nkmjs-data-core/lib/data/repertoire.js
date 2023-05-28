'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const { ID, IDDispenser } = require(`../id`);

const SIGNAL = require(`../signal`);
const DataBlock = require(`./data-block`);

/**
 * A Repertoire is used to manage & assign memory-based ids to data
 * instead of string-based ids. (effectively making search & mapping fast, and allows 
 * to rename data without breaking references)
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class Repertoire extends com.Observable {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._idDispenser = new IDDispenser();

        this._itemList = new collections.List(0);
        this._itemMap = new Map(); // <ID, entry>

    }

    /**
     * @description TODO
     * @type {data.core.IDDispenser}
     * @customtag read-only
     */
    get idDispenser() { return this._idDispenser; }

    /**
     * @description TODO
     * @type {collections.List}
     * @customtag read-only
     */
    get itemList() { return this._itemList; }

    /**
     * @description TODO
     * @type {Map}
     * @customtag read-only
     */
    get itemMap() { return this._itemMap; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._itemList.count; }

    /**
     * @description TODO
     * @param {data.core.DataBlock} p_item 
     */
    IndexOf(p_item) { return this._itemList.IndexOf(p_item); }

    /**
     * @description Return whether a given string is available to be used
     * to create a new ID
     * @param {string} p_name 
     * @returns {boolean} True if the ID is available, otherwise false.
     */
    IsNameAvailable(p_name) { return this._idDispenser.IsNameAvailable(p_name); }

    /**
     * @description Return whether or not the repertoire contains the given ID
     * @param {data.core.ID} p_id 
     * @returns {boolean} True if the ID is owned by this repertoire, otherwise false.
     */
    ContainsID(p_id) { return this._idDispenser.ContainsID(p_id); }

    /**
     * @description Return whether or not the repertoire contains the given name
     * @param {string} p_name 
     * @returns {boolean} True if the name is owned by this repertoire, otherwise false.
     */
    ContainsName(p_name) { return this._idDispenser.ContainsName(p_name); }

    /**
     * @description Return the ID associated with a given string, if any
     * @param {string} p_name 
     * @returns {ID} The ID associated to the p_stringID provided, otherwise null.
     */
    GetID(p_name) { return this._idDispenser.Get(p_name); }

    /**
     * @description Create and return new ID with a given string.
     * @param {string} p_name 
     */
    ReserveID(p_name) {

        if (!this._idDispenser.IsNameAvailable(p_name)) {
            throw new Error("Cannot create an ID that already exists.");
        }

        let newID = this._idDispenser.Create(p_name);

        newID
            .Watch(com.SIGNAL.RELEASED, this._OnIDReleased, this)
            .Watch(com.SIGNAL.RENAMED, this._OnIDRenamed, this);

        return newID;

    }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_id 
     * @param {string} p_oldName 
     */
    _OnIDRenamed(p_id, p_oldName) {
        this.Broadcast(com.SIGNAL.RENAMED, p_id, p_oldName);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     */
    _OnIDReleased(p_id) {
        let item = this._itemMap.get(p_id);
        if (item) {
            console.warn(`An ID (${p_id.name}) has been released. Removing existing item from repertoire.`);
            this.Unregister(item);
        }
    }

    /**
     * @description Register an item with a given ID. If no ID is provided, creates and assign
     * a randomly generated one.
     * @param {data.core.DataBlock} p_item 
     * @param {string|data.core.ID} [p_id] 
     */
    Register(p_item, p_id = null) {

        if (this._itemList.Contains(p_item)) { throw new Error(`Cannot re-register an item.`); }
        if (!u.isInstanceOf(p_item, DataBlock)) { throw new Error(`Cannot register a non-DataBlock item.`); }
        if (p_item.id) { throw new Error(`Cannot register an item with an ID already set.`); }

        let itemID = null;

        if (!p_id) {
            //No ID provided. Create a random one.
            itemID = this.ReserveID(u.tils.UUID);
        } else {
            //An ID has been provided.
            if (u.isString(p_id)) {
                let existingId = this._idDispenser.Get(p_id);
                if (existingId) {
                    if (this._itemMap.has(existingId)) { throw new Error(`ID '${p_id}' already in use.`); }
                    itemID = existingId; // Take ownership of the existing ID.
                } else {
                    itemID = this.ReserveID(p_id);
                }
            } else if (u.isInstanceOf(p_id, ID)) {
                if (this._idDispenser.ContainsID(p_id)) {
                    if (this._itemMap.has(p_id)) { throw new Error(`ID '${p_id}' already in use.`); }
                    itemID = p_id; // Take ownership of the existing ID.
                } else {
                    throw new Error(`ID '${p_id.name}' must be provided by local dispenser.`);
                }
            } else {
                throw new Error(`'${p_id}' is neither a string identifier nor an ID instance.`);
            }
        }

        this._itemList.Add(p_item);
        this._itemMap.Set(itemID, p_item);
        p_item.id = itemID;

        //console.log(`Registered : ${p_item.constructor.name} with id '${p_item.id}'`);

        this._OnItemRegistered(p_item);

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataBlock} p_item 
     */
    _OnItemRegistered(p_item) {
        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);
        this.Broadcast(SIGNAL.ITEM_REGISTERED, this, p_item);
    }

    /**
     * @description Unregister an item and releases its ID.
     * @param {data.core.DataBlock} p_item 
     */
    Unregister(p_item) {

        if (u.isVoid(p_item)) { throw new Error(`Cannot unregister a null item.`); }

        let itemID = p_item.id;

        if (u.isVoid(itemID)) { throw new Error(`Cannot unregister a item with no ID.`); }
        if (u.isVoid(this._itemList.Remove(p_item))) { throw new Error(`Cannot unregister an item that is not in the repertoire.`); }

        this._itemMap.delete(itemID);
        this._OnItemUnregistered(p_item);

        //Free ID
        p_item.id = null;
        itemID.Release();

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataBlock} p_item 
     */
    _OnItemUnregistered(p_item) {
        p_item.Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);
        this.Broadcast(SIGNAL.ITEM_UNREGISTERED, this, p_item);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataBlock} p_item 
     */
    _OnItemReleased(p_item) {
        this.Unregister(p_item);
    }

    /**
     * @description TODO
     * @param {data.core.ID} p_id 
     * @returns {data.core.DataBlock} Item mapped to this ID, if any. Otherwise, null.
     */
    Get(p_id) { return this._itemMap.get(p_id); }

    /**
     * @description TODO
     * @param {string} p_name 
     * @returns {data.core.DataBlock} Item mapped to this ID, if any. Otherwise, null.
     */
    GetByName(p_name) {
        let id = this._idDispenser.Get(p_name);
        return id ? this._itemMap.get(id) : null;
    }

    /**
     * @description TODO
     * @param {*} p_index 
     * @returns {data.core.DataBlock}
     */
    At(p_index) { return this._itemList.At(p_index); }

    /**
     * @description TODO
     */
    Clear() {
        while (!this._itemList.isEmpty) {
            this._itemList.last.Release();
        }
    }

    _CleanUp() {
        this.Clear();
        super._CleanUp();
    }


}

module.exports = Repertoire;