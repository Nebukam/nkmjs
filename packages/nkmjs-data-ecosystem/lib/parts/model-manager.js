const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const DataModel = require(`../data-model`);

const EcosystemPart = require(`./ecosystem-part`);

class ModelManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._factory = new data.DataFactory();
    }

    get factory() { return this._factory; }

    /**
     * 
     * @param {*} p_name 
     * @param {*} p_model 
     * @param {*} p_fields 
     * @returns 
     */
    Create(p_name, p_model = null, p_fields = null) {
        
        if (!this._factory.IsNameAvailable(p_name)) { throw new Error(`Model ID '${p_name}' is already in use.`); }

        let modelClass = (p_model || DataModel),
            model = this._factory.CreateTemp(modelClass);

        if(p_fields){
            for (var fieldName in p_fields) {
                let fieldInfos = p_fields[fieldName];
                if (u.isFunc(fieldInfos)) { DataModel.CreateField(model, fieldInfos, fieldName); }
                else if (u.isString(fieldInfos)) { DataModel.CreateField(model, com.BINDINGS.GetClass(fieldInfos), fieldName); }
                else if (u.isObject(fieldInfos)) { DataModel.CreateField(model, fieldInfos.cl, fieldName, fieldInfos.settings); }
            }
        }

        return this._factory.Register(model, p_name);

    }

}

module.exports = ModelManager;
