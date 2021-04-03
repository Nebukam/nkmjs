'use strict';

const collections = require("@nkmjs/collections");
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const SIGNAL = require(`./signal`);
const IDS = require(`./ids`);
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
 * @class
 * @augments ecosystem.DataBlocExtendable
 * @memberof ecosystem
 */
class DataModel extends DataBlockExtendable {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:data-model`,
        [com.IDS.ICON]: `data-model`
    };

    //#region Static methods



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

    }

    get uri(){ return `${IDS.MODEL}/${this._id._name}`; }

    _OnBaseChanged(p_oldBase) {

    }

    _OnBaseUpdated(p_data) {

    }

    //#region Local Field management

    /**
     * @description TODO
     * @param {ecosystem.FieldModel} p_field 
     * @param {data.core.ID} p_id 
     * @returns 
     */
    Register(p_field, p_id) {
        return this._fieldRep.Register(p_field, p_id);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.Repertoire} p_repertoire 
     * @param {ecosystem.FieldModel} p_field 
     */
    _OnFieldRegistered(p_repertoire, p_field) {

        p_field.model = this;
        p_field.InitSettings();

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

    /**
     * @access protected
     * @description TODO
     * @param {data.core.Repertoire} p_repertoire 
     * @param {ecosystem.FieldModel} p_field 
     */
    _OnFieldUnregistered(p_repertoire, p_field) {
        this._Broadcast(SIGNAL.FIELD_REMOVED, this, p_field);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {*} p_oldName 
     */
    _OnFieldRenamed(p_id, p_oldName) {
        this._Broadcast(SIGNAL.FIELD_RENAMED, this, p_id, p_oldName);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.FieldModel} p_field 
     */
    _OnFieldDirty(p_field) {

    }

    /**
     * @description TODO
     * @param {ecosystem.FieldModel} p_field 
     * @returns 
     */
    Owns(p_field) { return p_field.model === this; }

    /**
     * @description TODO
     * @param {number} p_index 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetFieldAt(p_index, p_localOnly = true) {
        if (p_localOnly) { return this._fieldRep.At(p_index); }

        let field = this._fieldRep.At(p_index);
        if (field || p_localOnly || !this._base) { return field; }
    }

    /**
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetField(p_id, p_localOnly = true) {
        let field = this._fieldRep.GetByName(p_id);
        if (field || p_localOnly || !this._base) { return field; }
    }

    /**
     * @description TODO
     * @param {string} p_name 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetFieldByName(p_name, p_localOnly = true) {
        let field = this._fieldRep.GetByName(p_name);
        if (field || p_localOnly || !this._base) { return field; }
    }


    //#endregion

    //#region Extended fields management

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.DataModel} p_model 
     * @param {ecosystem.FieldModel} p_field 
     */
    _OnBaseFieldAdded(p_model, p_field) {

        let existingField = this._fieldRep.Get(p_field.id.name);
        if (existingField) {
            //A field with the same name already exists.
            //Override inherited member.
            existingField.base = p_field;
        } else {
            this._Broadcast(SIGNAL.FIELD_ADDED, this, p_field);
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.DataModel} p_model 
     * @param {ecosystem.FieldModel} p_field 
     */
    _OnBaseFieldRemoved(p_model, p_field) {

        let existingField = this._fieldRep.Get(p_field.id.name);
        if (existingField) {
            //A field with the same name already exists.
            existingField.base = null;
        } else {
            this._Broadcast(SIGNAL.FIELD_REMOVED, this, p_field);
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.DataModel} p_model 
     * @param {data.core.ID} p_id 
     * @param {string} p_oldName 
     */
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

    /**
     * @description TODO
     * @param {ecosystem.DataEntry} p_entry 
     */
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
