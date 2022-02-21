const DataBlock = require(`./data-block`);
const SIGNAL = require(`../signal`);

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._values = {};
    }

    Set(p_id, p_value, p_silent = false) {
        let valueObject;
        if (!(p_id in this._values)) { 
            valueObject =  { value: p_value };
            this._values[p_id] = valueObject; 
        }
        else { 
            valueObject = this._values[p_id];
            valueObject.value = p_value; 
            if(valueObject.setter){ this[valueObject.setter] = p_value; }
        }
        this.CommitValueUpdate(p_id, valueObject, p_silent);
        return p_value;
    }

    Get(p_id, p_fallback = null, p_fallbackIfNullValue = false) {
        if (!(p_id in this._values)) {
            return p_fallback;
        }
        let value = this._values[p_id].value;
        if (p_fallbackIfNullValue && value == null) { return p_fallback; }
        return value;
    }

    GetOrSet(p_id, p_fallback = null, p_silent = false) {
        if (!(p_id in this._values)) {
            this.Set(p_id, p_fallback, p_silent);
            return p_fallback;
        }
        return this._values[p_id].value;
    }

    BatchSet(p_values) {
        for (var p in p_values) { this.Set(p, p_values[p], true); }
        this.CommitUpdate();
    }

    CommitValueUpdate(p_id, p_valueObj, p_silent = false){
        this._Broadcast(SIGNAL.VALUE_CHANGED, this, p_id, p_valueObj);
        if(!p_silent){ this.CommitUpdate(); }
    }

    _CleanUp() {
        super._CleanUp();
        this._values = {};
    }

}

module.exports = SimpleDataBlock;