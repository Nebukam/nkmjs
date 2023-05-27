'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const dom = require(`../utils-dom`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof ui.core.helpers
 */
class FlagEnum {

    static Attach(p_owner, p_member, p_enum = null, p_prefix = null) {
        let flags = new FlagEnum(p_enum, p_prefix);
        p_owner[`_${p_member}`] = flags;
        flags._id = p_member;
        flags.Add(p_owner);
        Object.defineProperty(
            p_owner,
            p_member,
            {
                get() { return flags.currentFlag; },
                set(p_value) { flags.Set(p_value) },
                enumerable: true,
                configurable: true,
            });
        return flags;
    }

    constructor(p_enum, p_prefix = null) {

        this._elements = [];
        this._managed = [];
        this._prefix = p_prefix;
        this._enum = p_enum;
        this._current = null;
        this._id = null;

        this._onFlagChanged = com.Rent(com.signals.SignalBroadcaster);
    }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get currentFlag() { return this._current; }

    /**
     * @description TODO
     * @type {common.signals.SignalBroadcaster}
     * @customtag read-only
     */
    get onFlagChanged() { return this._onFlagChanged; }

    // ----> Elements

    /**
     * @description Adds an element to a flagEnum
     * @param  {...HTMLElement} values 
     */
    Add(...values) {
        for (const val of values) { if (this._elements.indexOf(val) == -1) { this._elements.push(val); } }
    }

    /**
     * @description Removes an element from the flagEnum
     * @param  {...HTMLElement} values 
     */
    Remove(...values) {
        for (const val of values) {
            let index = this._elements.indexOf(val);
            if (index != -1) { this._elements.slice(index, 1); }
        }
    }

    // ----> Managed

    /**
     * @description Add a set of flagEnum to be managed by the current one.
     * Flag set on the current flagEnum will be set on any managed flagEnums.
     * @param  {...FlagEnum} values 
     */
    AddManaged(...values) {
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
    Apply(p_list) {
        for (const item of p_list) { if (this._id in item) { item[this._id] = this._current; } }
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

        for (const mngd of this._managed) { mngd.Set(p_flag); }
        if (this._current === p_flag) { return; }

        let oldFlag = this._current,
            prefixed_oldFlag = oldFlag ? this._prefix ? `${this._prefix}-${oldFlag}` : oldFlag : null,
            prefixed_flag = p_flag ? this._prefix ? `${this._prefix}-${p_flag}` : p_flag : null;

        this._current = p_flag;

        if (oldFlag) { dom.CSSClass(this._elements, prefixed_oldFlag, false); }
        if (p_flag) { dom.CSSClass(this._elements, prefixed_flag); }

        this._onFlagChanged.Dispatch(p_flag, oldFlag);
        return p_flag;

    }

    /**
     * @description TODO
     */
    Clear() {
        this.Set(null);
        this._elements.length = 0;
    }

}

module.exports = FlagEnum;