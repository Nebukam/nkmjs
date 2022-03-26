
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require("@nkmjs/collections");

const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof data.core
 */
class TagBox extends com.pool.DisposableObject {

    constructor() {
        super();
        this._owner = null;
        this._tags = new collections.Dictionary();
    }

    get owner() { return this._owner; }
    set owner(p_value) { this._owner = p_value; }

    get isEmpty() { return this._tags.count == 0; }

    /**
     * 
     * @param {*} p_tag 
     * @returns true if the tag has been added, false if it was already present
     */
    Add(p_tag) {
        if (this._tags.Contains(p_tag)) { return false; }
        this._tags.Set(p_tag, true);
        p_tag.AddUser();
        this._owner.Broadcast(SIGNAL.TAG_ADDED, this._owner, p_tag);
        return true;
    }

    /**
     * 
     * @param {*} p_tag 
     * @returns true if the tag has been remove, false if it wasn't there
     */
    Remove(p_tag) {
        if (!this._tags.Remove(p_tag)) { return false; }
        p_tag.RemoveUser();
        this._owner.Broadcast(SIGNAL.TAG_REMOVED, this._owner, p_tag);
        return true;
    }


    Has(p_tag) {
        return this._tags.Contains(p_tag);
    }

    HasAny(...p_tags) {
        for (let i = 0; i < p_tags.length; i++) {
            if (this._tags.Contains(p_tags[i])) { return true; }
        }
        return false;
    }

    HasAll(...p_tags) {
        for (let i = 0; i < p_tags.length; i++) {
            if (!this._tags.Contains(p_tags[i])) { return false; }
        }
        return true;
    }


    /**
     * @description TODO
     */
    Clear() {
        this._tags.ForEach((p_key, p_value) => { p_value.RemoveUser(); }, this);
        this._owner.Broadcast(SIGNAL.TAGS_CLEARED, this._owner);
    }

    _CleanUp() {
        this.Clear();
        super._CleanUp();
    }

    toString() {
        return `{tags:${this._name}}`;
    }

}

module.exports = TagBox;