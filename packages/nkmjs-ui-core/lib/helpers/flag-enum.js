'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class FlagEnum {
    constructor(p_enum = null, p_staticEnum = false) {
        this._elements = new Array(0);
        this._managed = new Array(0);
        this._isStaticEnum = p_staticEnum;
        this._enum = p_enum ? p_enum :new Array(0);
        this._currentFlag = null;

        this._onFlagChanged = com.Rent(com.signals.SignalBroadcaster);
    }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get currentFlag() { return this._currentFlag; }

    /**
     * @description TODO
     * @type {common.signals.SignalBroadcaster}
     * @customtag read-only
     */
    get onFlagChanged() { return this._onFlagChanged; }

    // ----> Enum

    /**
     * @description Adds a set of possible values to this object
     * @param  {...string} values 
     */
    AddEnum(...values) {
        if(this._isStaticEnum){ throw new Error(`FlagEnum is using a static enum.`); }
        if (values.length === 1 && u.tils.isArray(values[0])) { values = values[0]; }
        for (let i = 0, n = values.length; i < n; i++) {
            if (!this._enum.includes(values[i])) { this._enum.push(values[i]); }
        }
    }

    /**
     * @description Removes a set of possible values from this object
     * @param  {...string} values 
     */
    RemoveEnum(...values) {
        if(this._isStaticEnum){ throw new Error(`FlagEnum is using a static enum.`); }
        if (values.length === 1 && u.tils.isArray(values[0])) { values = values[0]; }
        let index;
        for (let i = 0, n = values.length; i < n; i++) {
            index = this._enum.indexOf(values[i]);
            if (index != -1) { this._enum.slice(index, 1); }
        }
    }

    // ----> Elements

    /**
     * @description Adds an element to a flagEnum
     * @param  {...HTMLElement} values 
     */
    Add(...values) {
        for (let i = 0, n = values.length; i < n; i++) {
            if (!this._elements.includes(values[i])) { this._elements.push(values[i]); }
        }
    }

    /**
     * @description Removes an element from the flagEnum
     * @param  {...HTMLElement} values 
     */
    Remove(...values) {
        for (let i = 0, n = values.length; i < n; i++) {
            let index = this._elements.indexOf(values[i]);
            if (index != -1) { this._elements.slice(index, 1); }
        }
    }

    // ----> Managed

    /**
     * @description Add a set of flagEnum to be managed by the current one.
     * Flag set on the current flagEnum will be set on any managed flagEnums.
     * @param  {...FlagEnum} values 
     */
    AddManaged(...values){
        for (let i = 0, n = values.length; i < n; i++) {
            if (!this._managed.includes(values[i])) { this._managed.push(values[i]); }
        }
    }

    /**
     * @description Removes a set of managed flagEnums
     * @param  {...FlagEnum} values 
     */
    RemoveManaged(...values) {
        for (let i = 0, n = values.length; i < n; i++) {
            let index = this._managed.indexOf(values[i]);
            if (index != -1) { this._managed.slice(index, 1); }
        }
    }

    // ----> Apply & Set

    /**
     * @description Goes through a list of object and set a given property name to this flagEnum's current flag.
     * @param {string} p_key 
     * @param {array} p_list 
     */
    Apply(p_key, p_list){
        for (let i = 0, n = p_list.length; i < n; i++) {
            let item = p_list[i];
            if(p_key in item){ item[p_key] = this._currentFlag; }
        }
    }

    /**
     * @description Set the flagEnum current value.
     * Each element in this flagEnum list will have the previous enum value removed from its
     * classList, and the current one (if not null) will be added instead.
     * Managed flagEnum will be updated accordingly.
     * @param {string} p_flag 
     */
    Set(p_flag) {

        if (p_flag && !this._enum.includes(p_flag)) {
            throw new Error(`flag '${p_flag}' not part of enum ${this._enum}`);
        }

        for (let i = 0, n = this._managed.length; i < n; i++) {
            this._managed[i].Set(p_flag);
        }

        if (this._currentFlag === p_flag) { return; }

        let oldFlag = this._currentFlag, el;
        this._currentFlag = p_flag;

        if (!oldFlag && p_flag) {
            for (let i = 0, n = this._elements.length; i < n; i++) {
                this._elements[i].classList.add(p_flag);
            }
        } else if (oldFlag && !p_flag) {
            for (let i = 0, n = this._elements.length; i < n; i++) {
                this._elements[i].classList.remove(oldFlag);
            }
        } else {
            for (let i = 0, n = this._elements.length; i < n; i++) {
                el = this._elements[i];
                el.classList.add(p_flag);
                el.classList.remove(oldFlag);
            }
        }

        this._onFlagChanged.Broadcast(p_flag, oldFlag);

    }

    //

    /**
     * @description Bumps the current value to the provided flag if its index is higher than the current one.
     * @param {string} p_flag 
     */
    Bump(p_flag) {
        let currentIndex = this._enum.indexOf(this._currentFlag),
            bumpIndex = this._enum.indexOf(p_flag);

        if(bumpIndex > currentIndex){ this.Set(p_flag); }
    }

    /**
     * @description TODO
     */
    Clear() {
        this.Set(null);
        this._flags.Clear();
        this._elements.length = 0;
        this._enum.length = 0;
    }

}

module.exports = FlagEnum;