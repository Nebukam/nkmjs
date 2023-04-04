'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`./data-block`);
const SIMPLEX = require(`../simplex`);
const { DataList } = require("../helpers");

const __noResolution = [];

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    static __lockedData = true;

    /**
     * Expected format
     * { id:signal, id:signal }
     */
    static __VALUES_SIGNALS = null;

    /**
     * Expected format
     * { id:'uniqueId', member:'_propertyId', type:Class, ?[IDS.SKIP_SERIALIZATION]:true }
     */
    static __BLOCS = null;

    /**
     * Expected format
     * { id:'uniqueId', member:'_propertyId', ?type:Class, ?[IDS.SKIP_SERIALIZATION]:true }
     */
    static __DATALISTS = null;

    /**
     * Expected format
     * { id:ID, value:value, ?_nullable:true, ?_group:ID, ?[IDS.SKIP_SERIALIZATION]:true }
     */
    static __VALUES = [];

    static ExtSIGNALMAP(p_base, p_list, p_invert = false) { return this.__Ext(p_base.__VALUES_SIGNALS, p_list, p_invert); }
    static ExtBLOCS(p_base, p_list, p_invert = false) { return this.__Ext(p_base.__BLOCS, p_list, p_invert); }
    static ExtDATALISTS(p_base, p_list, p_invert = false) { return this.__Ext(p_base.__DATALISTS, p_list, p_invert); }
    static ExtVALUES(p_base, p_list, p_invert = false) { return this.__Ext(p_base.__VALUES, p_list, p_invert); }

    static __Ext(p_base, p_list, p_invert = false) { return p_base ? p_invert ? [...p_list, ...p_base] : [...p_base, ...p_list] : p_list; }
    static __ExtObj(p_base, p_list) { return p_base ? { ...p_base, ...p_list } : p_list; }

    _Init() {
        super._Init();

        this._Bind(this.CommitUpdate);

        if (this.constructor.__BLOCS) {
            this.constructor.__BLOCS.forEach(blocInfos => {
                this[blocInfos.member] = this._AddBloc(blocInfos);
            });
        }

        if (this.constructor.__DATALISTS) {
            this.constructor.__DATALISTS.forEach(dataList => {
                let newDataList = new (dataList.type ? dataList.type : DataList)();
                newDataList.parent = this;
                this[dataList.member] = newDataList;
            });
        }

        this._parent = null;
        this._values = {};
        this._ResetValues(this._values);
    }

    _PostInit() {
        super._PostInit();
        this._OnReset(false, true);
    }

    //#region Blocs

    get iid() { return this._idd; }
    get parent() { return this._parent; }
    get blocs() { return this._blocs; }

    /**
     * Blocs should be create during intialization, not after.
     * Simplex & Serialization assumed blocs are defined as defining members of a SimpleDataBlock
     * not a dynamic list of content.
     * @param {*} p_conf 
     * @returns 
     */
    _AddBloc(p_conf) {

        if (!this._blocs) {
            this._blocs = [];
            this._blocsIDSet = new Set();
        }

        if (this._blocsIDSet.has(p_conf.id)) {
            throw new Error(`Duplicate child id.`);
        }

        let bloc = new p_conf.type();
        bloc._iid = p_conf.id;
        bloc._parent = this;

        this._blocs.push(bloc);
        this._blocsIDSet.add(p_conf.id);

        if (p_conf.watch) { bloc.Watch(com.SIGNAL.UPDATED, this.CommitUpdate); }

        return bloc;

    }

    //#endregion

    //#region Values

    _ResetValues(p_values) {

        let statics = this.constructor.__VALUES;

        statics.forEach((definition) => {

            let
                id = definition.id,
                valueObj = {};

            if (definition._fn) {
                p_values[id] = definition._fn(id, this);
            } else {
                for (var prop in definition) {
                    if (prop[0] == `_`) { continue; }
                    let value = definition[prop];
                    if (u.isFunc(value)) { value = value(id, this); }
                    valueObj[prop] = value;
                }
            }

            p_values[id] = valueObj;

        });

    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} p_value 
     * @param {*} [p_silent] 
     * @returns 
     */
    Set(p_id, p_value, p_silent = false) {
        let valueObject;
        let oldValue = null;
        this._lastSetEffective = false;
        if (!(p_id in this._values)) {
            if (this.constructor.__lockedData) {
                //console.warn(`Attempting to create value '${p_id}' on locked object.`, this);
                return;
            }
            valueObject = { value: p_value };
            this._values[p_id] = valueObject;
        }
        else {
            valueObject = this._values[p_id];
            oldValue = valueObject.value;
            if (oldValue === p_value) { return p_value; }
            valueObject.value = p_value;
        }
        this._lastSetEffective = true;
        this.CommitValueUpdate(p_id, valueObject, oldValue, p_silent);
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
        let value = this._values[p_id].value;
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
        if (!(p_id in this._values)) {
            return this.Set(p_id, p_fallback, p_silent);
        }
        return this._values[p_id].value;
    }

    /**
     * 
     * @param {*} p_values 
     * @param {*} [p_silent]
     */
    BatchSet(p_values, p_silent = false) {
        let anyChange = false;
        if (u.isInstanceOf(p_values, SimpleDataBlock)) {
            for (var p in p_values._values) {
                this.Set(p, p_values._values[p].value, true);
                if (this._lastSetEffective) { anyChange = true; }
            }
        } else {
            for (var p in p_values) {
                this.Set(p, p_values[p], true);
                if (this._lastSetEffective) { anyChange = true; }
            }
        }
        if (!p_silent && anyChange) { this.CommitUpdate(); }
    }

    /**
     * 
     * @param {*} p_id 
     * @param {*} p_valueObj 
     * @param {*} p_oldValue 
     * @param {*} [p_silent] 
     */
    CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent = false) {
        if (this.constructor.__VALUES_SIGNALS &&
            p_id in this.constructor.__VALUES_SIGNALS) {
            this.Broadcast(this.constructor.__VALUES_SIGNALS[p_id], this, p_valueObj, p_oldValue);
        }
        this.Broadcast(com.SIGNAL.VALUE_CHANGED, this, p_id, p_valueObj, p_oldValue);
        if (!p_silent) { this.CommitUpdate(); }
    }

    /**
     * 
     * @param {*} [p_ids] Array or object of IDs to copy. If left empty, all values are returned. 
     * @param {*} [p_reciptient] object to write the values into
     * @returns 
     */
    Values(p_ids = null, p_reciptient = null) {
        let v = p_reciptient ? p_reciptient : {};
        if (u.isArray(p_ids)) {
            for (let p in this._values) {
                if (!p_ids.includes(p)) { continue; }
                let obj = this._values[p];
                v[p] = obj.value;
            }
        } else if (u.isObject(p_ids)) {
            for (let p in this._values) {
                if (!(p in p_ids)) { continue; }
                let obj = this._values[p];
                v[p] = obj.value;
            }
        } else {
            for (let p in this._values) {
                let obj = this._values[p];
                v[p] = obj.value;
            }
        }
        return v;
    }

    /**
     * 
     * @param {*} [p_individualSet] 
     * @param {*} [p_silent] 
     */
    Reset(p_individualSet = true, p_silent = false) {

        if (this._blocs) {
            this._blocs.forEach(bloc => { bloc.Reset(p_individualSet, p_silent); });
        }

        if (p_individualSet) {
            let copy = { ...this._values };
            this._ResetValues(copy);
            this.BatchSet(copy, p_silent);
            this._OnReset(p_individualSet, p_silent);
        } else {
            this._ResetValues(this._values);
            this._OnReset(p_individualSet, p_silent);
            if (!p_silent) { this.CommitUpdate(); }
        }

    }

    get resolutionFallbacks() { return __noResolution; }

    Resolve(p_id) {
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