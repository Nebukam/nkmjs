'use strict';
const nkm = require(`@nkmjs/core/nkmin`);
const u = nkm.u;
const com = nkm.com;

const FieldSlot = require(`./field-slot`);

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
            if (u.isFunc(fieldInfos)) { this.CreateSlot(model, fieldName, fieldInfos); }
            else if (u.isString(fieldInfos)) { this.CreateSlot(model, fieldName, com.BINDINGS.GetClass(fieldInfos)); }
            else if (u.isObject(fieldInfos)) { this.CreateSlot(model, fieldName, fieldInfos.cl, fieldInfos.settings); }
        }
        return model;
    }

    /**
     * @description Create a field & registers it in a model
     * @param {ecosystem.DataModel} p_model 
     * @param {function} p_descriptorClass 
     * @param {string|data.core.ID} p_id 
     * @param {object} [p_settings] 
     * @returns 
     */
    static CreateSlot(p_model, p_id, p_descriptorClass = null, p_settings = null) {

        let fieldSlot = com.Rent(FieldSlot);

        if (p_settings) {
            if (fieldSlot._settings) { u.tils.SetOverwrite(fieldSlot._settings, p_settings); }
            else { fieldSlot._settings = p_settings; }
        }

        if (p_descriptorClass) { fieldSlot.descriptor = com.Rent(p_descriptorClass); }

        p_model.RegisterSlot(fieldSlot, p_id);

        return fieldSlot;

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
     * @param {ecosystem.FieldDescriptor} p_model 
     * @param {ecosystem.FieldDescriptor} p_baseCandidate 
     */
    static IsCircularReference(p_model, p_baseCandidate) {
        if (p_model === p_baseCandidate) { return true; }
        let parent = p_model.base;
        while (parent) {
            if (parent === p_baseCandidate) { return true; }
            parent = parent.base;
        }
        return false;
    }

}

module.exports = UTILS;