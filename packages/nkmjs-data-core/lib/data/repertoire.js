'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const { ID, IDDispenser } = require(`../id`);

const SIGNAL = require(`../signal`);
const DataBlock = require(`./data-block`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class Repertoire extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._idDispenser = new IDDispenser();

        this._itemList = new collections.List(0);
        this._itemMap = new collections.Dictionary(); // <ID, entry>

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
     * @type {collections.Dictionary}
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
     * @param {string} p_stringID 
     * @returns {boolean} True if the ID is available, otherwise false.
     */
    IsIDAvailable(p_stringID) { return this._idDispenser.IsAvailable(p_stringID); }

    /**
     * @description Return whether or not the repertoire contains the given ID
     * @param {string|ID} p_id 
     * @returns {boolean} True if the ID is owned by this repertoire, otherwise false.
     */
    ContainsID(p_id) { return this._idDispenser.ContainsID(p_id); }

    /**
     * @description Return the ID associated with a given string, if any
     * @param {string} p_stringID 
     * @returns {ID} The ID associated to the p_stringID provided, otherwise null.
     */
    GetID(p_stringID) { return this._idDispenser.Get(p_stringID); }

    /**
     * @description Create and return new ID with a given string.
     * @param {string} p_stringID 
     */
    ReserveID(p_stringID) {

        if (!this._idDispenser.IsIDAvailable(p_stringID)) {
            throw new Error("Cannot create an ID that already exists.");
        }

        let newID = this._idDispenser.Create(p_stringID);

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
        this._Broadcast(com.SIGNAL.RENAMED, p_id, p_oldName);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     */
    _OnIDReleased(p_id) {
        let item = this._itemMap.Get(p_id);
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

        if (u.tils.isVoid(p_item)) { throw new Error(`Cannot register a null item.`); }
        if (!u.tils.isInstanceOf(p_item, DataBlock)) { throw new Error(`Cannot register a non-DataBlock item.`); }
        if (!u.tils.isVoid(p_item.id)) { throw new Error(`Cannot register an item with an ID already set.`); }
        if (this._itemList.Contains(p_item)) { throw new Error(`Cannot re-register an item.`); }

        let itemID = null;

        if (u.tils.isVoid(p_id)) {
            //No ID provided. Create a random one.
            itemID = this.ReserveID(u.tils.unsafeUID);
        } else {
            //An ID has been provided.
            let itemID = p_id;
            if (u.tils.isInstanceOf(p_id, ID)) {
                //ID is an object of type ID.
                if (this._idDispenser.GetID(p_id.name) === p_id) {
                    //ID appear to be owned by this repertoire.
                    if (this._itemMap.Contains(p_id)) { throw new Error(`ID(${p_id}) already in use.`); }
                    else { /* ID exists but not in use. */ }
                } else {
                    //ID isn`t owned by this repertoire.
                    throw new Error(`Cannot register an item with an ID(${p_id.name}) that hasn't been provided by this repertoire.`);
                }
                itemID = p_id;
            } else {
                //ID is a string. (Or should be)
                if (!u.tils.isString(p_id)) { throw new Error(`Cannot register an item with an ID that isn't an ID object nor a string.`); }
                if (u.tils.isEmpty(p_id)) { throw new Error(`Cannot use empty string as ID. Use null or undefined instead to generate a random one.`); }
                let existingID = this._idDispenser.Get(p_id);
                if (!u.tils.isVoid(existingID)) {
                    //An ID has already been created with this string
                    if (this._itemMap.Contains(existingID)) {
                        throw new Error(`ID(${p_id}) already in use.`);
                    }
                    itemID = existingID;
                } else {
                    itemID = this.ReserveID(p_id);
                }
            }
        }

        this._itemList.Add(p_item);
        this._itemMap.Set(itemID, p_item);
        p_item.id = itemID;

        //console.log(`Registered : ${p_item} with id ${p_item.id}`);

        this._OnItemRegistered(p_item);

        this._Broadcast(SIGNAL.ITEM_REGISTERED, this, p_item);

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.DataBlock} p_item 
     */
    _OnItemRegistered(p_item) {
        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);
    }

    /**
     * @description Unregister an item and releases its ID.
     * @param {data.core.DataBlock} p_item 
     */
    Unregister(p_item) {

        if (u.tils.isVoid(p_item)) { throw new Error(`Cannot unregister a null item.`); }

        let itemID = p_item.id;

        if (u.tils.isVoid(itemID)) { throw new Error(`Cannot unregister a item with no ID.`); }
        if (u.tils.isVoid(this._itemList.Remove(p_item))) { throw new Error(`Cannot unregister an item that is not in the repertoire.`); }

        this._itemMap.Remove(itemID);
        this._OnItemUnregistered(p_item);
        this._Broadcast(SIGNAL.ITEM_UNREGISTERED, this, p_item);

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
     * @param {string|data.core.ID} p_id 
     * @returns {data.core.DataBlock} Item mapped to this ID, if any. Otherwise, null.
     */
    Get(p_id) {

        if (u.tils.isVoid(p_id)) { throw new Error(`p_id cannot be null or undefined`); }
        if (u.tils.isString(p_id)) {
            let id = this._idDispenser.Get(p_id);
            if (u.tils.isVoid(id)) { return null; }
        }
        else if (u.tils.isInstanceOf(p_id, ID)) { }
        else { throw new Error(`p_id must be either of type string or ID.`); }

        return this._itemMap.Get(p_id);

    }

    /**
     * @description TODO
     * @param {*} p_index 
     * @returns {data.core.DataBlock}
     */
    At(p_index) {
        return this._itemList.At(p_index); F
    }

    /**
     * @description TODO
     */
    Clear() {
        //TODO : Implement clearing the repertoire
    }

    _CleanUp() {
        this.Clear();
        super._CleanUp();
    }


}

module.exports = Repertoire;