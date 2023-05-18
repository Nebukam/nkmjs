'use strict';

const nkm = require(`@nkmjs/core/nkmin`);

const collections = nkm.collections;
const u = nkm.u;
const com = nkm.com;
const data = nkm.data;

const SIGNAL = require(`./signal`);
const IDS = require(`./ids`);
const CTX = require(`./context`);
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

        this._slotRep = new data.Repertoire();
        this._slotRep
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnSlotRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnSlotUnregistered, this)
            .Watch(com.SIGNAL.RENAMED, this._OnSlotRenamed, this);

        this._groupRep = new data.Repertoire();
        this._groupRep
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnSlotGroupRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnSlotGroupUnregistered, this)
            .Watch(com.SIGNAL.RENAMED, this._OnSlotGroupRenamed, this);

        this._defaultGroup = null;

        this._baseObserver
            .Hook(SIGNAL.SLOT_ADDED, this._OnBaseFieldAdded, this)
            .Hook(SIGNAL.SLOT_REMOVED, this._OnBaseFieldRemoved, this)
            .Hook(SIGNAL.SLOT_RENAMED, this._OnBaseFieldRenamed, this);

        this._cachedSlotList = new collections.List();

    }

    get uri() { return `${IDS.MODEL}/${this._id._name}`; }

    _OnBaseChanged(p_oldBase) {

    }

    _OnBaseUpdated(p_data) {

    }

    //#region Local Field management


    /**
     * @description TODO
     * @param {ecosystem.FieldDescriptor} p_slot 
     * @param {data.core.ID} p_id 
     * @returns 
     */
    RegisterSlot(p_slot, p_id) {
        return this._slotRep.Register(p_slot, p_id);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.Repertoire} p_repertoire 
     * @param {ecosystem.FieldDescriptor} p_slot 
     */
    _OnSlotRegistered(p_repertoire, p_slot) {

        p_slot.model = this;
        p_slot.InitSettings();

        p_slot.Watch(data.SIGNAL.DIRTY, this._OnSlotDirty, this);

        //p_field.metadata.Clone(this._ecosystem.fields.metaTemplate);

        let overloadField = this._base ? this._base.GetSlotByName(p_slot._id._name) : null;
        if (overloadField) {
            p_slot.base = overloadField;
            p_slot.fieldIndex = overloadField.fieldIndex;
        } else {
            p_slot.fieldIndex = this._slotRep._itemList.count - 1;
        }

        this.Broadcast(SIGNAL.SLOT_ADDED, this, p_slot);
        this.Dirty();

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.Repertoire} p_repertoire 
     * @param {ecosystem.FieldDescriptor} p_slot 
     */
    _OnSlotUnregistered(p_repertoire, p_slot) {
        this.Broadcast(SIGNAL.SLOT_REMOVED, this, p_slot);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {*} p_oldName 
     */
    _OnSlotRenamed(p_id, p_oldName) {
        this.Broadcast(SIGNAL.SLOT_RENAMED, this, p_id, p_oldName);
    }

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.FieldDescriptor} p_slot 
     */
    _OnSlotDirty(p_slot) {

    }

    /**
     * @description TODO
     * @param {ecosystem.FieldDescriptor} p_slot 
     * @returns 
     */
    Owns(p_slot) { return p_slot.model === this; }

    /**
     * @description TODO
     * @param {number} p_index 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetSlotAt(p_index, p_localOnly = true) {
        if (p_localOnly) { return this._slotRep.At(p_index); }

        let slot = this._slotRep.At(p_index);
        if (slot || p_localOnly || !this._base) { return slot; }
    }

    /**
     * @description TODO
     * @param {data.core.ID} p_id 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetSlot(p_id, p_localOnly = true) {
        let slot = this._slotRep.GetByName(p_id);
        if (slot || p_localOnly || !this._base) { return slot; }
    }

    /**
     * @description TODO
     * @param {string} p_name 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
    GetSlotByName(p_name, p_localOnly = true) {
        let slot = this._slotRep.GetByName(p_name);
        if (slot || p_localOnly || !this._base) { return slot; }
    }


    //#endregion

    //#region Extended fields management

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.DataModel} p_model 
     * @param {ecosystem.FieldDescriptor} p_field 
     */
    _OnBaseFieldAdded(p_model, p_field) {

        let existingField = this._slotRep.Get(p_field.id.name);
        if (existingField) {
            //A field with the same name already exists.
            //Override inherited member.
            existingField.base = p_field;
        } else {
            this.Broadcast(SIGNAL.SLOT_ADDED, this, p_field);
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {ecosystem.DataModel} p_model 
     * @param {ecosystem.FieldDescriptor} p_field 
     */
    _OnBaseFieldRemoved(p_model, p_field) {

        let existingField = this._slotRep.Get(p_field.id.name);
        if (existingField) {
            //A field with the same name already exists.
            existingField.base = null;
        } else {
            this.Broadcast(SIGNAL.SLOT_REMOVED, this, p_field);
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

        let existingFieldOld = this._slotRep.Get(p_oldName),
            existingFieldNew = this._slotRep.Get(p_id.name);

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
            this.Broadcast(SIGNAL.SLOT_RENAMED, this, p_id, p_oldName);
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
            fieldList = this._cachedSlotList._array;
        for (let i = 0, n = fieldList.length; i < n; i++) {
            let fieldDetails = fieldList[i];
            fieldDetails._model.InitValues(fieldDetails, dataObject);
        }

    }

    //#endregion

    //#region Group management

    get defaultGroup() { return this._defaultGroup; }
    set defaultGroup(p_value) { this._defaultGroup = p_value; }

    _OnSlotGroupRegistered(p_repertoire, p_group) {
        if (!this._defaultGroup) { this.defaultGroup = p_group; }
    }

    _OnSlotGroupUnregistered(p_repertoire, p_group) {
        if (this._defaultGroup === p_group) {
            // TODO : Find a fallback default group ?
            // Or this should not happen ?
        }
    }

    _OnSlotGroupRenamed(p_id, p_oldName) {
        // Well ok then
    }

    /**
     * @description TODO
     * @param {string} p_name 
     * @param {boolean} [p_localOnly] 
     * @returns 
     */
     GetSlotGroupByName(p_name) { return this._groupRep.GetByName(p_name); }

    //#endregion

}

module.exports = DataModel;
