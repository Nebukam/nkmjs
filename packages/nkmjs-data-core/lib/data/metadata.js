
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class Metadata extends com.pool.DisposableObjectEx {

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/data-core:metadata`,
        [com.IDS.ICON]: `metadata`
    };

    constructor() {
        super();
        this._owner = null;
        this._data = {};
        this._isDirty = false;
    }

    /**
     * @description TODO
     * @param {data.core.Metadata} p_metadata 
     */
    static Copy(p_metadata) {
        let newMetadata = pool.POOL.Rent(Metadata);
        newMetadata._data = u.tils.Clone(p_metadata._data);
        return newMetadata;
    }

    /**
     * @description TODO
     * @type {data.core.DataBlock}
     */
    get owner() { return this._owner; }
    set owner(p_value) { this._owner = p_value; }

    /**
     * @description True if the DataBlock is dirty, otherwise false
     * @type {boolean}
     * @customtag read-only
     */
    get isDirty() { return this._isDirty; }

    /**
     * @description TODO
     */
    Dirty() {
        if (this._isDirty) { return; }
        this._isDirty = true;
        this.Broadcast(SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty() {
        if (!this._isDirty) { return; }
        this._isDirty = false;
        this.Broadcast(SIGNAL.DIRTY_CLEARED, this);
    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {*} p_value 
     */
    Set(p_path, p_value) {

        let path = null,
            isString = false;

        if (u.isArray(p_path)) { path = p_path; }
        else if (u.isString(p_path)) { path = p_path.split('.'); isString = true; }
        else { throw new Error(`Path ${p_path} is invalid.`); }

        let lastElement = this._data,
            index = 0,
            n = path.length,
            lastIndex = n - 1,
            created = false,
            previousValue = null;

        //TODO : For loop the path to dispatch all level of update afterward
        //so if presentation.color.A is updated
        //we can still listen to update applied to presentation.color 
        //Also, we probably want to stack update and dispatch them on next update to aleviate garbage collection
        //update 0 - 1 - 2 - 3
        //dispatch 3 - 2 - 1 - 0

        while (index < n) {

            let key = path[index];

            if (index === lastIndex) {

                let existingValue = null;

                if (!lastElement.hasOwnProperty(key)) {

                    lastElement[key] = p_value;
                    lastElement = p_value;

                    this.Broadcast(SIGNAL.META_ADDED, this, p_path, lastElement);

                } else {
                    existingValue = lastElement[key];
                    if (existingValue === p_value) { return p_value; }

                    previousValue = existingValue;
                    lastElement[key] = p_value;
                    lastElement = p_value;

                }

            } else {

                if (!lastElement.hasOwnProperty(key)) { lastElement = lastElement[key] = {}; }
                else { lastElement = lastElement[key]; }

            }

            index++;
        }

        n -= 1;
        for (let p = 0; p < n; p++) {
            this.Broadcast(SIGNAL.META_MID_UPDATE, this, u.tils.Join(path, '.', 0, p));
        }

        this.Broadcast(SIGNAL.META_UPDATED, this, p_path, lastElement, previousValue);
        this.Broadcast(com.SIGNAL.UPDATED, this);

        this.Dirty();

        if (isString) { path.length = 0; }

        return lastElement;

    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {*} [p_fallback] 
     */
    Get(p_path, p_fallback = null) {

        let path = null,
            isString = false;

        if (u.isArray(p_path)) { path = p_path; }
        else if (u.isString(p_path)) { path = p_path.split('.'); isString = true; }
        else { throw new Error(`Path ${p_path} is invalid.`); }

        let index = 0,
            n = path.length,
            lastElement = this._data;

        while (index < n) {
            let key = path[index];
            if (!lastElement.hasOwnProperty(key)) { return p_fallback; }
            else { lastElement = lastElement[key]; }
            index++;
        }

        if (isString) { path.length = 0; }

        return lastElement;

    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {*} p_fallback
     */
    GetOrSet(p_path, p_fallback) {

        let path = null,
            isString = false;

        if (u.isArray(p_path)) { path = p_path; }
        else if (u.isString(p_path)) { path = p_path.split('.'); isString = true; }
        else { throw new Error(`Path ${p_path} is invalid.`); }

        let index = 0,
            n = path.length,
            lastElement = this._data;

        while (index < n) {
            let key = path[index];
            if (!lastElement.hasOwnProperty(key)) { return this.Set(path, p_fallback); }
            else { lastElement = lastElement[key]; }
            index++;
        }

        if (isString) { path.length = 0; }

        return lastElement;

    }

    /**
     * 
     * @param {*} p_path 
     * @returns 
     */
    Delete(p_path){
        let path = null,
            isString = false;

        if (u.isArray(p_path)) { path = p_path; }
        else if (u.isString(p_path)) { path = p_path.split('.'); isString = true; }
        else { throw new Error(`Path ${p_path} is invalid.`); }

        let index = 0,
            n = path.length,
            lastElement = this._data,
            lastKey = path[n-1];

        while (index < n-1) {
            let key = path[index];
            if (!lastElement.hasOwnProperty(key)) { return; }
            else { lastElement = lastElement[key]; }
            index++;
        }

        if(lastElement){
            delete lastElement[lastKey];
            this.Broadcast(com.SIGNAL.UPDATED, this);
            this.Dirty();
        }

        if (isString) { path.length = 0; }

    }

    /**
     * Broadcast an update signal and set the object to dirty.
     * This should only be used when doing manual modifications of the
     * inner data holder -- granular updates will be ignored.
     */
    BroadcastUpdate(){
        this.Broadcast(com.SIGNAL.UPDATED, this);
        this.Dirty();
    }

    /**
     * @description TODO
     */
    Clear() {
        this._data = u.tils.DeepClear(this._data, true);
    }

    /**
     * @description TODO
     * @param {data.core.Metadata} p_source 
     * @param {*} [p_silent] 
     */
    Clone(p_source = null, p_silent = true) {
        if (p_source) {
            if (u.isInstanceOf(p_source, Metadata)) {
                this._data = u.tils.Clone(p_source._data);
            } else if (u.isObject(p_source)) {
                this._data = u.tils.Clone(p_source);
            } else {
                return;
            }
            if (!p_silent) { this.Dirty(); }
            else { this.ClearDirty(); }
        } else {
            return Metadata.Copy(this);
        }
    }

    toString() {
        return `{Metadata}`;
    }

}

module.exports = Metadata;