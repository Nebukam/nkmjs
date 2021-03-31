const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const FieldModel = require(`../field-model`);

/**
 * Although labeled 'Model', each FieldModel is a unique implementation of a serializable
 * and customizable type.
 */
class FieldModelComposite extends FieldModel {
    constructor() { super(); }

    static __requireSanitization = false;

    _Init() {
        super._Init();
        this._composition = [];
    }

    get composition(){ return this._composition; }

    _Add(p_fieldModelClass, p_id){
        let newFieldModel = new p_fieldModelClass();
        newFieldModel.id = p_id;
        this._composition.push(newFieldModel);
        return newFieldModel;
    }

    InitSettings(p_settings){ 
        let settings = p_settings[this._id._name];
        if(!settings){ settings = {}; p_settings[this._id._name] = settings; }
        for(let i = 0, n = this._composition.length; i < n; i++){
            this._composition[i].InitSettings(settings);
        }
        return settings;
    }

    InitValues(p_settings, p_dataObject){ 
        let values = p_dataObject[this._id._name];
        if(!values){ values = {}; p_dataObject[this._id._name] = values; }
        for(let i = 0, n = this._composition.length; i < n; i++){
            this._composition[i].InitValues(p_settings, p_dataObject);
        }
        return values;
    }

}

module.exports = FieldModelComposite;
