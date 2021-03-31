const collections = require("@nkmjs/collections");
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const SIGNAL = require(`./signal`);
const CONTEXT = require(`./context`);
const DataBlockExtendable = require(`./data-block-extendable`);

/**
 * A model stores Field descriptors data entries are based upon.
 * Each field can be retrieved using its associated ID.
 * Base model contains base fields, which are not replicated in the extending model.
 * Only overwritten fields are.
 * 
 * DATA MODEL
 *  - FIELD ENTRY, model-specifics settings ( as per defined in FIELD MODEL )
 * 
 * @description TODO
 */
class DataModel extends DataBlockExtendable {
    constructor() { super(); }

    //#region Static methods

    /**
     * Create a model from a mockup field object formatted as :
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
     */
    static CreateModel(p_fields, p_model = null) {
        let model = com.Rent(p_model ? p_model : this.constructor);
        for (var fieldName in p_fields) {
            let fieldInfos = p_fields[fieldName];
            if (u.isFunc(fieldInfos)) { this.CreateField(model, fieldInfos, fieldName); }
            else if (u.isString(fieldInfos)) { this.CreateField(model, com.BINDINGS.GetClass(fieldInfos), fieldName); }
            else if (u.isObject(fieldInfos)) { this.CreateField(model, fieldInfos.cl, fieldName, fieldInfos.settings); }
        }
        return model;
    }

    static CreateField(p_model, p_fieldClass, p_id, p_settings = null) {

        let fieldModel = com.Rent(u.isFunc(p_fieldClass) ? p_fieldClass : p_fieldClass.constructor);

        if (p_settings) { u.tils.SetOverwrite(fieldModel._settings, p_settings); }
        p_model.Register(fieldModel, p_id);

        return fieldModel;

    }

    static IsFieldNameAvailable(p_model, p_name) {

        while (p_model != null) {
            if (!p_model._fieldRep.IsNameAvailable(p_name)) { return false; }
            p_model = p_model._base;
        }

        return true;

    }

    static Owns(p_model, p_field) {
        return p_model._fieldRep._itemList.Contains(p_field);
    }

    //#endregion

    _Init() {

        super._Init();

        this._fieldRep = new data.Repertoire();
        this._fieldRep
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnFieldRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnFieldUnregistered, this)
            .Watch(com.SIGNAL.RENAMED, this._OnFieldRenamed, this);

        this._baseObserver
            .Hook(SIGNAL.FIELD_ADDED, this._OnBaseFieldAdded, this)
            .Hook(SIGNAL.FIELD_REMOVED, this._OnBaseFieldRemoved, this)
            .Hook(SIGNAL.FIELD_RENAMED, this._OnBaseFieldRenamed, this);

        this._cachedFieldList = new collections.List();
        this._fieldSettings = {};

    }


    _OnBaseChanged(p_oldBase) {

    }

    _OnBaseUpdated(p_data) {

    }

    //#region Local Field management

    Register(p_field, p_id) {
        return this._fieldRep.Register(p_field, p_id);
    }

    _OnFieldRegistered(p_repertoire, p_field) {

        p_field.model = this;
        p_field.InitSettings(this._fieldSettings);

        p_field.Watch(data.SIGNAL.DIRTY, this._OnFieldDirty, this);

        //p_field.metadata.Clone(this._ecosystem.fields.metaTemplate);

        let overloadField = this._base ? this._base.Get(p_field.id.name) : null;
        if (overloadField) {
            p_field.base = overloadField;
            p_field.fieldIndex = overloadField.fieldIndex;
        } else {
            p_field.fieldIndex = this._fieldRep._itemList.count - 1;
        }

        this._Broadcast(SIGNAL.FIELD_ADDED, this, p_field);
        this.Dirty();

    }

    _OnFieldUnregistered(p_repertoire, p_field) {
        this._Broadcast(SIGNAL.FIELD_REMOVED, this, p_field);
    }

    _OnFieldRenamed(p_id, p_oldName) {
        this._Broadcast(SIGNAL.FIELD_RENAMED, this, p_id, p_oldName);
    }

    _OnFieldDirty(p_field) {

    }

    //#endregion

    GetFieldAt(p_index, p_localOnly = true) {
        if (p_localOnly) { return this._fieldRep.At(p_index); }

        let field = this._fieldRep.At(p_index);
        if (field || p_localOnly || !this._base) { return field; }
    }

    GetField(p_id, p_localOnly = true) {
        let field = this._fieldRep.GetByName(p_id);
        if (field || p_localOnly || !this._base) { return field; }
    }

    GetFieldByName(p_name, p_localOnly = true) {
        let field = this._fieldRep.GetByName(p_name);
        if (field || p_localOnly || !this._base) { return field; }
    }

    //#region Extended fields management

    _OnBaseFieldAdded(p_model, p_item) {

        let existingField = this._fieldRep.Get(p_item.id.name);
        if (existingField) {
            //A field with the same name already exists.
            //Override inherited member.
            existingField.base = p_item;
        } else {
            this._Broadcast(SIGNAL.FIELD_ADDED, this, p_item);
        }

    }

    _OnBaseFieldRemoved(p_model, p_item) {

        let existingField = this._fieldRep.Get(p_item.id.name);
        if (existingField) {
            //A field with the same name already exists.
            existingField.base = null;
        } else {
            this._Broadcast(SIGNAL.FIELD_REMOVED, this, p_item);
        }

    }

    _OnBaseFieldRenamed(p_model, p_id, p_oldName) {

        let existingFieldOld = this._fieldRep.Get(p_oldName),
            existingFieldNew = this._fieldRep.Get(p_id.name);

        if (existingFieldOld) {
            //A field here was using the same name.
            if (!existingFieldNew) {
                //Rename existing field to keep override valid & active
                existingFieldOld.id.name = p_id.name;
            } else {
                //Unlink old and rename new
                existingFieldOld.base = null;
                existingFieldNew.base = p_base.Get(p_id);
            }
        } else if (existingFieldNew) {
            //No link to old name, but link to the new one
            existingFieldNew.base = p_base.Get(p_id);
        } else {
            this._Broadcast(SIGNAL.FIELD_RENAMED, this, p_id, p_oldName);
        }

    }

    //#endregion

    //#region Entry initialization

    InitEntry(p_entry) {
        // TODO : For each field in model, init
        let dataObject = p_entry._fieldValues,
            fieldList = this._cachedFieldList._array;
        for (let i = 0, n = fieldList.length; i < n; i++) {
            let fieldDetails = fieldList[i];
            fieldDetails._model.InitValues(fieldDetails, dataObject);
        }

    }

    //#endregion

}

module.exports = DataModel;
