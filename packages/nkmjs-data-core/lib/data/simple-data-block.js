const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`./data-block`);
const SIGNAL = require(`../signal`);

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    static __signalValueMap = {};
    static __lockedData = true;

    _Init() {
        super._Init();
        this._values = {};
        this._ResetValues(this._values);
    }

    _ResetValues(p_values){

    }

    Set(p_id, p_value, p_silent = false) {
        let valueObject;
        let oldValue = null;
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
        this.CommitValueUpdate(p_id, valueObject, oldValue, p_silent);
        return p_value;
    }

    Get(p_id, p_fallback = null, p_fallbackIfNullValue = false) {
        if (!(p_id in this._values)) { return p_fallback; }
        let value = this._values[p_id].value;
        if (p_fallbackIfNullValue && value == null) { return p_fallback; }
        return value;
    }

    GetOrSet(p_id, p_fallback = null, p_silent = false) {
        if (!(p_id in this._values)) {
            return this.Set(p_id, p_fallback, p_silent);
        }
        return this._values[p_id].value;
    }

    BatchSet(p_values, p_silent = false) {
        if (u.isInstanceOf(p_values, SimpleDataBlock)) { for (var p in p_values._values) { this.Set(p, p_values._values[p].value, true); } }
        else { for (var p in p_values) { this.Set(p, p_values[p], true); } }
        if (!p_silent) { this.CommitUpdate(); }
    }

    CommitValueUpdate(p_id, p_valueObj, p_oldValue, p_silent = false) {
        if (p_id in this.constructor.__signalValueMap) {
            this.Broadcast(this.constructor.__signalValueMap[p_id], this, p_valueObj, p_oldValue);
        }
        this.Broadcast(com.SIGNAL.VALUE_CHANGED, this, p_id, p_valueObj, p_oldValue);
        if (!p_silent) { this.CommitUpdate(); }
    }

    Values(p_ids) {
        let v = {};
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

    _CleanUp() {
        super._CleanUp();
        this._ResetValues(this._values);
    }

}

module.exports = SimpleDataBlock;