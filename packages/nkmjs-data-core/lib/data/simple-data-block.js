'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`./data-block`);
const SIMPLEX = require(`../simplex`);
const DataList = require("../helpers/data-list");

const __noResolution = Object.freeze([]);

/**
 * @typedef BlocDefinition
 * @property {String} member Name of the member inside the parent data
 * @property {Class} type Bloc' instance class
 * @property {Boolean} [IDS.SKIP_SERIALIZATION] Whether serialization should be skipped
 * @property {Array} [watch] Hooks to be added to the the bloc. Format is { signal:, fn:String|Func, ?thisArg: }
 */

/**
 * @typedef DataListDefinition
 * @property {String} member Layer class constructor
 * @property {Class} type Bloc' instance class
 * @property {Boolean} [IDS.SKIP_SERIALIZATION] Whether serialization should be skipped
 * @property {Array} [watch] Hooks to be added to the the datalist. Format is { signal:, fn:String|Func, ?thisArg: }
 * @property {Array} [hooks] Hooks to be added to the item observer of the datalist. Format is { signal:, fn:String|Func, ?thisArg: }
 * @property {Function} [autoSort] Function used to autoSort the values inserted into the list.
 * @property {DataList.FLUSH_MODE} [flush] Flush behavior on release
 */

/**
 * @typedef ValueDefinition
 * @property {*} value Layer class constructor
 * @property {Boolean} [nullable] Whether this value is nullable or not (primarily used by UI)
 * @property {*} [signal] Signal dispatched when this value is changed
 * @property {String} [group] Group ID (primarily used by UI)
 * @property {Number} [order] Order of value (primarily used by UI)
 * @property {Boolean} [IDS.SKIP_SERIALIZATION] Whether serialization should be skipped
 * @property {Function} [sanitizeFn] Function used to sanitize the value before it is set.
 */

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    /**
     * Expected format
     * { [ID]:BlocDefinition }
     */
    static __BLOCS = null;


    /**
     * Expected format
     * { [ID]:DataListDefinition }
     */
    static __DATALISTS = null;

    /**
     * Expected format
     * { [ID]:ValueDefinition }
     */
    static __VALUES = {};

    static Ext(p_base, p_list) {
        for (var id in p_base) {
            if (!(id in p_list)) {
                p_list[id] = p_base[id];
                //TODO: Copy instead of reference and check if properties have different values
            }
        } return p_list;
    }

    get DEFINITIONS() { return this.constructor.__VALUES; }
    get BLOCS() { return this.constructor.__BLOCS; }
    get DATALISTS() { return this.constructor.__DATALISTS; }

    _Init() {
        super._Init();

        this._Bind(this.CommitUpdate);

        this._parent = null;
        this._values = {};
        this._ResetValues(this._values);

        SIMPLEX.InitSimpleDataBlock(this);

    }

    _PostInit() {
        super._PostInit();
        this._OnReset(false, true);
    }

    _InitBloc(p_bloc, p_definition) { }
    _InitDatalist(p_dataList, p_definition) { }

    get iid() { return this._idd; }
    get parent() { return this._parent; }

    //#region Values

    _ResetValues(p_values) {
        let statics = this.DEFINITIONS;
        for (var id in statics) {
            let def = statics[id];
            p_values[id] = def.getter ? u.Call(def.getter, this) : def.value;
        }
    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} p_value 
     * @param {*} [p_silent] 
     * @returns 
     */
    Set(p_id, p_value, p_silent = false) {

        this._lastSetEffective = false;

        let definition = this.DEFINITIONS[p_id];
        if (!definition) { return null; }

        if (definition.sanitizeFn) { p_value = definition.sanitizeFn(p_value); }

        let oldValue = this._values[p_id];
        if (oldValue == p_value) { return p_value; }

        this._values[p_id] = p_value;

        this._lastSetEffective = true;
        this.CommitValueUpdate(p_id, p_value, oldValue, p_silent);

        return p_value;
    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} [p_fallback] 
     * @param {*} [p_fallbackIfNullValue] 
     * @returns 
     */
    Get(p_id, p_fallback = null, p_fallbackIfNullValue = false) {
        if (!(p_id in this._values)) { return p_fallback; }
        let value = this._values[p_id];
        if (p_fallbackIfNullValue && value == null) { return p_fallback; }
        return value;
    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} [p_fallback] 
     * @param {*} [p_silent] 
     * @returns 
     */
    GetOrSet(p_id, p_fallback = null, p_silent = false) {
        if (!(p_id in this._values)) { return null; }
        let value = this._values[p_id];
        if (value == null) { return this.Set(p_id, p_fallback, p_silent); }
        else { return value; }
    }

    /**
     * 
     * @param {*} p_values 
     * @param {*} [p_silent]
     */
    BatchSet(p_values, p_silent = false) {

        let
            anyChange = false,
            defs = this.DEFINITIONS;

        if (u.isInstanceOf(p_values, SimpleDataBlock)) { p_values = p_values._values; }

        for (var id in p_values) {
            if (!(id in defs)) { continue; }
            this.Set(id, p_values[id], true);
            if (this._lastSetEffective) { anyChange = true; }
        }

        if (!p_silent && anyChange) { this.CommitUpdate(); }

    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} p_newValue 
     * @param {*} p_oldValue 
     * @param {*} [p_silent] 
     */
    CommitValueUpdate(p_id, p_newValue, p_oldValue, p_silent = false) {
        let definition = this.DEFINITIONS[p_id];
        if (definition.signal) { this.Broadcast(definition.signal, this, p_newValue, p_oldValue); }
        this.Broadcast(com.SIGNAL.VALUE_CHANGED, this, p_id, p_newValue, p_oldValue);
        if (!p_silent) { this.CommitUpdate(); }
    }

    /**
     * 
     * @param {*} [p_ids] Array or object of IDs to copy. If left empty, all values are returned. 
     * @param {*} [p_recipient] object to write the values into
     * @returns 
     */
    Values(p_ids = null, p_recipient = null) {
        let v = p_recipient ? p_recipient : {};
        if (u.isArray(p_ids)) {
            p_ids.forEach(id => { if (id in this._values) { v[id] = this._values[id]; } });
        } else if (u.isObject(p_ids)) {
            for (let id in p_ids) { if (id in this._values) { v[id] = this._values[id]; } }
        } else {
            for (let id in this._values) { v[id] = this._values[id]; }
        }
        return v;
    }

    /**
     * 
     * @param {*} [p_individualSet] 
     * @param {*} [p_silent] 
     */
    Reset(p_individualSet = true, p_silent = false) {

        let BLOCS = this.BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) { this[BLOCS[id].member || `_${id}`].Reset(p_individualSet, p_silent); };
        }

        let DATALISTS = this.DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                let def = DATALISTS[id];
                if (def.flush && def.flush == DataList.FLUSH_DEFAULT) {
                    console.warn(`Flushing ${this} DataList[${id}] is not releasing its items.`);
                }
                this[def.member || `_${id}`].Flush(def.flush || DataList.FLUSH_DIRECT_RELEASE);
            }
        }

        if (p_individualSet) {
            let defs = definitions;
            for (let id in defs) {
                let def = defs[id];
                this.Set(id, def.getter ? u.Call(def.getter, this) : def.value, p_silent);
            }
            this._OnReset(p_individualSet, p_silent);
        } else {
            this._ResetValues(this._values);
            this._OnReset(p_individualSet, p_silent);
            if (!p_silent) { this.CommitUpdate(); }
        }

    }

    get resolutionFallbacks() { return __noResolution; }

    Resolve(p_id) {
        if (this.resolutionFallbacks == __noResolution) { return this.Get(p_id); }
        return SIMPLEX.Resolve(p_id, this, ...this.resolutionFallbacks);
    }

    _OnReset(p_individualSet, p_silent) { }

    //#endregion

    _CleanUp() {
        super._CleanUp();
        this.Reset(false, true);
    }

}

module.exports = SimpleDataBlock;