// Extendable Data block BASE editor

const MetaPropertyInspectorItem = require(`./item-meta-property`);

const base = MetaPropertyInspectorItem;

class MetaInputInspectorItem extends base {
    constructor() { super(); }

    static __inputClass = null;

    _Init(){
        super._Init();
        this._input = null;
    }

    _Render(){
        super._Render();
        this._input = this.Attach(this.constructor.__inputClass, `input`);
    }

     _OnPropertyUpdated(p_meta, p_path, p_value, p_oldValue) {
        if(!super._OnPropertyUpdated(p_meta, p_path, p_value, p_oldValue)){ return false; }
        this._input.currentValue = this.dataValue;
        return true;
    }

}

module.exports = MetaInputInspectorItem;