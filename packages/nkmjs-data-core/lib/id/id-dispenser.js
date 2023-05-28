'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");

const ID = require(`./id`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class IDDispenser extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._idMap = new Map();
        this._idList = new collections.List();
        // - Repertoire for IDs to avoid duplicate IDs.
        // - factory should check for duplicates through repertoire
    }

    /**
     * @description TODO
     * @type {collections.List}
     * @customtag read-only
     */
    get idList() { return this._idList; }

    /**
     * @description TODO
     * @param {string} p_name 
     * @returns {boolean} True if the string ID is available, other false.
     */
    IsNameAvailable(p_name) {
        return !this._idMap.has(p_name);
    }

    /**
     * @description Return whether or not the repertoire contains an ID associated with
     * a given string
     * @param {string|data.core.ID} p_id 
     * @returns {boolean} True if the Dispenser contains the given ID, otherwise false.
     */
    Contains(p_id) {
        if (u.isString(p_id)) { return this._idMap.has(p_id); }
        else if (u.isInstanceOf(p_id, ID)) { return this._idList.Contains(p_id); }
        throw new Error(`p_id must be either string or ID.`);
    }

    /**
     * @description Return whether or not the repertoire contains an ID associated with
     * a given name
     * @param {string} p_name 
     * @returns {boolean} True if the Dispenser contains the given name, otherwise false.
     */
    ContainsName(p_name) { return this._idMap.has(p_name); }

    /**
     * @description Return whether or not the repertoire contains a given ID
     * @param {data.core.ID} p_id 
     * @returns {boolean} True if the Dispenser contains the given ID, otherwise false.
     */
    ContainsID(p_id) { return this._idList.Contains(p_id); }


    /**
     * @description Return the ID associated with a given string, if any
     * @param {string} p_name 
     * @returns {data.core.ID} The ID, if any. Otherwise, null.
     */
    Get(p_name) {
        return this._idMap.has(p_name);
    }

    /**
     * @description Create and return new ID with a given string.
     * @param {string} p_name 
     * @returns {data.core.ID} The newly created ID
     */
    Create(p_name) {

        if (!this.IsNameAvailable(p_name)) { throw new Error(`ID ${p_name} is not available.`); }

        let newID = com.Rent(ID);
        newID.name = p_name;
        this._idMap.Set(p_name, newID);
        this._idList.Add(newID);

        newID
            .Watch(com.SIGNAL.RENAMING, this._OnIDRenaming, this)
            .Watch(com.SIGNAL.RENAMED, this._OnIDRenamed, this)
            .Watch(com.SIGNAL.RELEASED, this._OnIDReleased, this);

        return newID;

    }

    /**
     * @description Removes & release a given ID.
     * @param {data.core.ID} p_id 
     * @returns {boolean} True if the ID existed and has been released, otherwise false.
     */
    Remove(p_id) {
        if (this._idMap.has(p_id.name)) {
            this._idMap.delete(p_id.name)
            p_id.Release();
            this._idList.Remove(p_id);
            return true;
        }
        return false;
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {string} p_newName 
     */
    _OnIDRenaming(p_id, p_newName) {
        if (this._idMap.has(p_newName)) {
            p_id.PreventRenaming();
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {string} p_newName 
     * @param {string} p_oldName 
     */
    _OnIDRenamed(p_id, p_newName, p_oldName) {
        this._idMap.delete(p_oldName);
        this._idMap.Set(p_newName, p_id);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     */
    _OnIDReleased(p_id) {
        this.Remove(p_id);
    }

    _CleanUp() {
        super._CleanUp();
    }


}

module.exports = IDDispenser;