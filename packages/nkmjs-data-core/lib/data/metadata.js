
'use strict';

const { U } = require(`@nkmjs/utils`);
const { COM_ID, SIGNAL, POOL, DisposableObjectEx } = require(`@nkmjs/common`);
const DATA_SIGNAL = require(`../data-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core
 */
class Metadata extends DisposableObjectEx {

    static __NFO__ = {
        [COM_ID.ICON]: `%ICON%/icon_data_block.svg`,
        [COM_ID.UID]: `@nkmjs/data-core:metadata`
    };

    constructor() {
        super();
        this._owner = null;
        this._data = {};
        this._dirty = false;
    }

    /**
     * @description TODO
     * @param {data.core.Metadata} p_metadata 
     */
    static Copy(p_metadata) {
        let newMetadata = POOL.Rent(Metadata);
        newMetadata._data = U.Clone(p_metadata._data);
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
    Dirty(){
        if(this._isDirty){return;} this._isDirty = true;
        this._Broadcast(DATA_SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty(){
        if(!this._isDirty){return;} this._isDirty = false;
        this._Broadcast(DATA_SIGNAL.DIRTY_CLEARED, this);
    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {*} p_value 
     */
    Set(p_path, p_value) {

        let path = null;
        if (Array.isArray(p_path)) {
            path = p_path;
        } else if (typeof p_path === 'string') {
            path = p_path.split('.');
        } else { throw new Error(`Path ${p_path} is invalid.`); }

        let element = this._data,
            lastElement = element,
            i = 0,
            n = path.length,
            countMinusOne = n - 1,
            dispatch = false,
            created = false,
            previousValue = null;

        //TODO : For loop the path to dispatch all level of update afterward
        //so if presentation.color.A is updated
        //we can still listen to update applied to presentation.color 
        //Also, we probably want to stack update and dispatch them on next update to aleviate garbage collection
        //update 0 - 1 - 2 - 3
        //dispatch 3 - 2 - 1 - 0

        while (i < n) {
            let id = path[i];

            if (i === countMinusOne) {
                let existingValue = lastElement[id];

                if (U.isVoid(existingValue)) { created = true; }
                if (existingValue === p_value) {
                    return p_value;
                }

                dispatch = true;
                previousValue = existingValue;
                lastElement[id] = p_value;
                lastElement = p_value;
            } else {
                element = lastElement[id];

                if (U.isVoid(element)) {
                    element = {};
                    lastElement[id] = element;
                }

                lastElement = element;
            }

            i++;
        }

        if (dispatch) {

            if (created) { this._Broadcast(DATA_SIGNAL.META_ADDED, this, p_path, lastElement); }

            n -= 1;
            for (let p = 0; p < n; p++) {
                this._Broadcast(DATA_SIGNAL.META_MID_UPDATE, this, U.Join(path, '.', 0, p));
            }

            this._Broadcast(DATA_SIGNAL.META_UPDATED, this, p_path, lastElement, previousValue);
            this._Broadcast(SIGNAL.UPDATED, this);
            this.Dirty();
        }

        return lastElement;

    }

    /**
     * @description TODO
     * @param {string} p_path 
     * @param {*} [p_fallback] 
     */
    Get(p_path, p_fallback = null) {

        let path = null;

        if (Array.isArray(p_path)) {
            path = p_path;
        } else if (U.isString(p_path)) {
            path = p_path.split('.');
        } else { throw new Error(`Path ${p_path} is invalid.`); }

        let element = null;

        if (U.isVoid(p_fallback)) {
            element = this._data;
            while (!U.isVoid(element) && path.length != 0) {
                element = element[path.shift()];
            }
            path.length = 0;
            return element;
        } else {
            element = this._data;
            let lastElement = element;
            while (path.length != 0) {
                element = lastElement[path.shift()];
                if (U.isVoid(element)) {
                    path.length = 0;
                    this._signals.silent = true;
                    element = this.Set(p_path, p_fallback);
                    this._signals.silent = false; // This was causing a lot of signal loops.
                    return element;
                }
                lastElement = element;
            }
            return element;
        }

    }

    /**
     * @description TODO
     */
    Clear() {
        this._data = U.DeepClear(this._data, true);
    }

    /**
     * @description TODO
     * @param {data.core.Metadata} p_source 
     * @param {*} [p_silent] 
     */
    Clone(p_source = null, p_silent = true) {
        if (p_source) {
            if (U.isInstanceOf(p_source, Metadata)) {
                this._data = U.Clone(p_source._data);
            } else if (U.isObject(p_source)) {
                this._data = U.Clone(p_source);
            } else {
                return;
            }
            if(!p_silent){ this.Dirty(); }
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