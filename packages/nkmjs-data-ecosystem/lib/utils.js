'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

class UTILS {
    constructor() { }

    static __default_modelClass = null;

    /**
     * @description Create a model from a mockup field object formatted as :
     * 
     * { 
     *      myField:fieldConstructor, 
     *      myField:"fieldConstructorName",
     *      anotherField:{ 
     *          cl:fieldConstructor, 
     *          settings:{ } 
     *      }
     * }
     * 
     * @param {object} p_fields 
     * @param {Function} [p_model] Optional model constructor or instance
     */
    static CreateModel(p_fields, p_model = null) {
        let model = com.Rent(p_model ? u.isFunc(p_model) ? p_model : p_model.constructor : this.__default_modelClass);
        for (var fieldName in p_fields) {
            let fieldInfos = p_fields[fieldName];
            if (u.isFunc(fieldInfos)) { this.CreateField(model, fieldInfos, fieldName); }
            else if (u.isString(fieldInfos)) { this.CreateField(model, com.BINDINGS.GetClass(fieldInfos), fieldName); }
            else if (u.isObject(fieldInfos)) { this.CreateField(model, fieldInfos.cl, fieldName, fieldInfos.settings); }
        }
        return model;
    }

    /**
     * @description Create a field & registers it in a model
     * @param {ecosystem.DataModel} p_model 
     * @param {function} p_fieldClass 
     * @param {string|data.core.ID} p_id 
     * @param {object} [p_settings] 
     * @returns 
     */
    static CreateField(p_model, p_fieldClass, p_id, p_settings = null) {

        let fieldModel = com.Rent(u.isFunc(p_fieldClass) ? p_fieldClass : p_fieldClass.constructor);
        if (p_settings) { 
            if(fieldModel._settings){ u.tils.SetOverwrite(fieldModel._settings, p_settings); }
            else{ fieldModel._settings = p_settings; }
        }
        p_model.Register(fieldModel, p_id);

        return fieldModel;

    }

    /**
     * @description Checks whether an ID name is available within a given model
     * @param {function} p_model 
     * @param {string} p_name 
     * @returns 
     */
    static IsFieldNameAvailable(p_model, p_name) {

        while (p_model != null) {
            if (!p_model._fieldRep.IsNameAvailable(p_name)) { return false; }
            p_model = p_model._base;
        }

        return true;

    }

    /**
     * @description Checks whether using a model as a base for another model
     * would result in a circular reference.
     * @param {ecosystem.FieldModel} p_model 
     * @param {ecosystem.FieldModel} p_baseCandidate 
     */
    static IsCircularReference(p_model, p_baseCandidate){
        if(p_model === p_baseCandidate){ return true; }
        let parent = p_model.base;
        while(parent){
            if(parent === p_baseCandidate){ return true; }
            parent = parent.base;
        }
        return false;
    }

}

module.exports = UTILS;