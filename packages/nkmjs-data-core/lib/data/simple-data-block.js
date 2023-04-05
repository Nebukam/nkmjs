'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`./data-block`);
const SIMPLEX = require(`../simplex`);
const { DataList } = require("../helpers");

const __noResolution = Object.freeze([]);

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    /**
     * Expected format
     * [ID]{ member:'_propertyId', type:Class, ?[IDS.SKIP_SERIALIZATION]:true, ?watch:true }
     */
    static __BLOCS = null;

    /**
     * Expected format
     * [ID]{ member:'_propertyId', ?type:Class, ?[IDS.SKIP_SERIALIZATION]:true }
     */
    static __DATALISTS = null;

    /**
     * Expected format
     * [ID]:{ value:value, ?nullable:true, ?signal:SIGNAL, ?group:ID, ?_order:0, ?[IDS.SKIP_SERIALIZATION]:true, ?sanitizeFn }
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

        let BLOCS = this.BLOCS;
        if (BLOCS) {
            for (var id in BLOCS) {

                let
                    definition = BLOCS[id],
                    memberId = definition.member || `_${id}`;

                let newBloc = com.Rent(definition.type);
                newBloc._iid = id;
                newBloc._parent = this;

                this[memberId] = newBloc;

                if (definition.watch) { newBloc.Watch(com.SIGNAL.UPDATED, this.CommitUpdate); }

            };
        }

        let DATALISTS = this.DATALISTS;
        if (DATALISTS) {
            for (var id in DATALISTS) {
                let
                    definition = DATALISTS[id],
                    memberId = definition.member || `_${id}`;

                let newDataList = new (definition.type ? definition.type : DataList)();
                newDataList.parent = this;

                if (this[memberId]) { throw new Error(`Datalist member ID "${memberId}" overlaps with existing Bloc ID.`); }
                this[memberId] = newDataList;
            }
        }

        this._parent = null;
        this._values = {};
        this._ResetValues(this._values);
    }

    _PostInit() {
        super._PostInit();
        this._OnReset(false, true);
    }

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
            for (var id in DATALISTS) { this[DATALISTS[id].member || `_${id}`].Clear(); }
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