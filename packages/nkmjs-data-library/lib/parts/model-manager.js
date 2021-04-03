'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const utils = require(`../utils`);

const DataFactoryEx = require(`../data-factory-ex`);
const DataModel = require(`../data-model`);

const EcosystemPart = require(`./ecosystem-part`);

/**
 * @class
 * @augments ecosystem.parts.EcosystemPart
 * @memberof ecosystem.parts
 */
class ModelManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._factory = new DataFactoryEx();
        this.defaultModelClass = DataModel;
    }

    get defaultModelClass() { return this._defaultModelClass; }
    set defaultModelClass(p_value) {
        this._defaultModelClass = p_value;
        this._factory.itemClass = p_value;
    }

    get factory() { return this._factory; }
    get modelList(){ return this._factory._itemRep._itemList; }

    /**
     * @description TODO
     * @param {string} p_name 
     * @param {Function} [p_model] 
     * @param {object} [p_fields] 
     * @returns 
     */
    Create(p_name, p_model = null, p_fields = null) {

        if (!this._factory.IsNameAvailable(p_name)) { throw new Error(`Model ID '${p_name}' is already in use.`); }

        let modelClass = (p_model || this._defaultModelClass),
            model = this._factory.CreateTemp(modelClass);

        model.ecosystem = this._ecosystem;

        if (p_fields) {
            for (var fieldName in p_fields) {
                let fieldInfos = p_fields[fieldName];
                if (u.isFunc(fieldInfos)) { utils.CreateField(model, fieldInfos, fieldName); }
                else if (u.isString(fieldInfos)) { utils.CreateField(model, com.BINDINGS.GetClass(fieldInfos), fieldName); }
                else if (u.isObject(fieldInfos)) { utils.CreateField(model, fieldInfos.cl, fieldName, fieldInfos.settings); }
            }
        }

        return this._factory.Register(model, p_name);

    }

    Clear() {
        super.Clear();
        this._factory.Clear();
    }

}

module.exports = ModelManager;
