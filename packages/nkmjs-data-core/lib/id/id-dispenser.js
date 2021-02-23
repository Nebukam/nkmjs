'use strict';

const { U } = require(`@nkmjs/utils`);
const { Dictionary, List } = require(`@nkmjs/collections`);
const { SIGNAL, POOL, DisposableObjectEx } = require(`@nkmjs/common`);

const ID = require(`./id`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class IDDispenser extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._idMap = new Dictionary();
        this._idList = new List();
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
     * @param {string} p_stringID 
     * @returns {boolean} True if the string ID is available, other false.
     */
    IsAvailable(p_stringID) {
        return !this._idMap.Contains(p_stringID);
    }

    /**
     * @description Return whether or not the repertoire contains an ID associated with
     * a given string
     * @param {string|data.core.ID} p_id 
     * @returns {boolean} True if the Dispenser contains the given ID, otherwise false.
     */
    Contains(p_id) {
        if (U.isString(p_id)) { return this._idMap.Contains(p_id); }
        else if (U.isInstanceOf(p_id, ID)) { return this._idList.Contains(p_id); }
        throw new Error(`p_id must be either string or ID.`);
    }

    /**
     * @description Return the ID associated with a given string, if any
     * @param {string} p_string 
     * @returns {data.core.ID} The ID, if any. Otherwise, null.
     */
    Get(p_string) {
        return this._idMap.Get(p_string);
    }

    /**
     * @description Create and return new ID with a given string.
     * @param {string} p_string 
     * @returns {data.core.ID} The newly created ID
     */
    Create(p_string) {

        if (!this.IsAvailable(p_string)) { throw new Error(`ID ${p_string} is not available.`); }

        let newID = POOL.Rent(ID);
        newID.name = p_string;
        this._idMap.Set(p_string, newID);
        this._idList.Add(newID);

        newID.Watch(SIGNAL.RENAMING, this._OnIDRenaming, this);
        newID.Watch(SIGNAL.RENAMED, this._OnIDRenamed, this);
        newID.Watch(SIGNAL.RELEASED, this._OnIDReleased, this);

        return newID;

    }

    /**
     * @description Removes & release a given ID.
     * @param {data.core.ID} p_id 
     * @returns {boolean} True if the ID existed and has been released, otherwise false.
     */
    Remove(p_id) {
        if (this._idMap.Remove(p_id.name)) {
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
        if (this._idMap.Contains(p_newName)) {
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
        this._idMap.Remove(p_oldName);
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