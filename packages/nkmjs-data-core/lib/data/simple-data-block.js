const DataBlock = require(`./data-block`);

class SimpleDataBlock extends DataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._values = {};
    }

    Set(p_id, p_value, p_silent = false) {
        if (!(p_id in this._values)) { this._values[p_id] = { value: p_value }; }
        else { 
            let valueObject = this._values[p_id];
            valueObject.value = p_value; 
            if(valueObject.setter){ this[valueObject.setter] = p_value; }
        }
        if (!p_silent) { this.CommitUpdate(); }
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

    GetOrSet(p_id, p_fallback = null) {
        if (!(p_id in this._values)) {
            this.Set(p_id, p_fallback);
            return p_fallback;
        }
        return this._values[p_id].value;
    }

    BatchSet(p_values) {
        for (var p in p_values) { this.Set(p, p_values[p], true); }
        this.CommitUpdate();
    }

    _CleanUp() {
        super._CleanUp();
        this._values = {};
    }

}

module.exports = SimpleDataBlock;