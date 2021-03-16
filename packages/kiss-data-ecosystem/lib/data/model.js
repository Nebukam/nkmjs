'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const DerivableDataBlock = require(`./data-block-derivable`);

const FIELD_EVENT = require(`./fields/field-event`);
const FieldSettings = require(`./fields/field-settings`);

let uinc = 0;

class Model extends DerivableDataBlock {
    constructor() { super(); }

    static CreateField(p_model, p_fieldClass, p_id, p_options = null) {

        let fieldSettings = com.Rent(u.tils.Get(p_options, `cl`, FieldSettings));
        fieldSettings.fieldClass = p_fieldClass;
        fieldSettings.instance = com.Rent(p_fieldClass);

        let settings = u.tils.Get(p_options, `settings`, null);
        if (settings) { fieldSettings.settings = settings; }
        let metadata = u.tils.Get(p_options, `metadata`, null);
        if (metadata) {
            if (u.tils.isInstanceOf(metadata, data.Metadata)) {
                fieldSettings.metadata.Clone(metadata);
            } else {
                fieldSettings.metadata._data = metadata;
            }
        }

        p_model.Register(fieldSettings, p_id);
        return fieldSettings;

    }

    static get _NFO_() {
        return {
            [com.IDS.ICON]: `%ICON%/icon_model.svg`
        };
    }

    _NFO_() {
        return this._NFO;
    }

    _Init() {
        super._Init();

        this._uinc = uinc++;

        this._NFO = null;
        this._base = null;

        this._editable = true;
        this._entryCreationAllowed = true;

        this._fieldRep = new data.Repertoire();
        this._fieldRep
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnFieldRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnFieldUnregistered, this)
            .Watch(com.SIGNAL.RENAMED, this._OnFieldRenamed, this);

        this._baseObserver.Hook(FIELD_EVENT.FIELD_ADDED, this._OnBaseFieldAdded, this);
        this._baseObserver.Hook(FIELD_EVENT.FIELD_REMOVED, this._OnBaseFieldRemoved, this);
        this._baseObserver.Hook(FIELD_EVENT.FIELD_RENAMED, this._OnBaseFieldRenamed, this);

    }

    // modelID.fieldID
    get uri() { return `${this._id ? this._id.name : '?'}`; }

    get NFO() { return this._NFO; }
    set NFO(p_value) {
        if (this._NFO) { throw new Error(`Cannot update existing model's META infos.`); }
        this._NFO = p_value;
    }

    get editable() { return this._editable; }
    get entryCreationAllowed() { return this._entryCreationAllowed; }

    get localFieldList() { return this._fieldRep.itemList; }

    FieldCount(p_localOnly = true) {
        return p_localOnly ? this._fieldRep.count : this._fieldRep.count + this._InheritedFieldCount();
    }

    GetFieldAt(p_index, p_localOnly = true) {
        return p_localOnly ? this._fieldRep.At(p_index) : this._InheritedFieldAt(p_index);
    }

    _InheritedFieldAt(p_index) {

        let sum = this.FieldCount(false),
            sumin = sum - this._fieldRep.count,
            index = p_index - sumin;

        if (p_index >= sumin) {
            return this._fieldRep.At(index);
        } else {
            return this._base._InheritedFieldAt(p_index);
        }
    }

    _InheritedFieldCount() {
        if (!this._base) { return 0; }
        return this._base.FieldCount(false);
    }

    _ClearDerivation(p_oldBase) {
        for (let i = 0, n = p_oldBase.FieldCount(false); i < n; i++) {
            let fieldSettings = p_oldBase.GetFieldAt(i, false);
            this._OnBaseFieldRemoved(p_oldBase, fieldSettings);
        }
    }

    _BuildDerivation(p_base) {
        for (let i = 0, n = p_base.FieldCount(false); i < n; i++) {
            let fieldSettings = p_base.GetFieldAt(i, false);
            this._OnBaseFieldAdded(p_base, fieldSettings);
        }
    }

    get root() {
        if (!this._base) {
            return this;
        } else {
            return this._base.root;
        }
    }

    _OnBaseFieldAdded(p_base, p_fieldSettings) {

        let existingField = this._fieldRep.Get(p_fieldSettings.id.name);
        if (existingField) {
            //A field with the same name already exists.
            //Override inherited member.
            existingField.base = p_fieldSettings;
        } else {
            this._Broadcast(FIELD_EVENT.FIELD_ADDED, this, p_fieldSettings);
        }

    }

    _OnBaseFieldRemoved(p_base, p_fieldSettings) {

        let existingField = this._fieldRep.Get(p_fieldSettings.id.name);
        if (existingField) {
            //A field with the same name already exists.
            existingField.base = null;
        } else {
            this._Broadcast(FIELD_EVENT.FIELD_REMOVED, this, p_fieldSettings);
        }

    }

    _OnBaseFieldRenamed(p_base, p_id, p_oldName) {

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
            this._Broadcast(FIELD_EVENT.FIELD_RENAMED, this, p_id, p_oldName);
        }

    }

    Inherits(p_model) {

        if (this._base === p_model) { return true; }
        if (!p_model) { return false; }
        if (this === p_model) { return true; }

        if (!this._base) {
            return false;
        } else {
            return this._base.Inherits(p_model);
        }
    }

    GetInheritanceChain(p_includeSelf = false) {

        let path = new Array(0);
        if (p_includeSelf) { path.push(this); }

        let b = this._base;
        while (b) {
            path.push(b);
            b = b.base;
        }
        return path;

    }

    /**
     * Return whether an string ID is available to be used as a field ID
     * @param {string} p_id 
     */
    IsIDAvailable(p_id) {
        return this._fieldRep.IsIDAvailable(p_id);
    }

    Register(p_fieldSettings, p_id) {
        this._fieldRep.Register(p_fieldSettings, p_id);
    }

    _OnFieldRegistered(p_repertoire, p_fieldSettings) {

        p_fieldSettings.Watch(data.SIGNAL.DIRTY, this._OnFieldDirty, this);
        p_fieldSettings.model = this;
        p_fieldSettings.fieldIndex = this._fieldRep.IndexOf(p_fieldSettings);
        p_fieldSettings.metadata.Clone(this._ecosystem.fields.metaTemplate);

        if (this._base) {
            let existingField = this._base.Get(p_fieldSettings.id.name);
            if (existingField) {
                p_fieldSettings.base = existingField;
            }
        }

        this._Broadcast(FIELD_EVENT.FIELD_ADDED, this, p_fieldSettings);
        this.Dirty();

    }

    Unregister(p_fieldSettings) {
        this._fieldRep.Unregister(p_fieldSettings);
    }

    _OnFieldUnregistered(p_repertoire, p_fieldSettings) {
        p_fieldSettings.Unwatch(data.SIGNAL.DIRTY, this._OnFieldDirty, this);
        this._Broadcast(FIELD_EVENT.FIELD_REMOVED, this, p_fieldSettings);
        if (p_fieldSettings.model === this) {
            p_fieldSettings.model = null;
        }
        this.Dirty();
    }

    _OnFieldRenamed(p_id, p_oldName) {

        if (this._base) {
            let existingField = this._base.Get(p_id.name);
            if (existingField) {
                this.Get(p_id, true).base = existingField;
            }
        }

        this._Broadcast(FIELD_EVENT.FIELD_RENAMED, this, p_id, p_oldName);
    }

    _OnFieldDirty(p_fieldSettings) {
        this.Dirty();
    }

    /**
     * Get this model`s field associated with the given ID.
     * If the field cannot be found, will look in model base, if any, unless
     * p_localOnly is set to true.
     * @param {ID} p_field_id 
     * @param {boolean} p_localOnly 
     */
    Get(p_field_id, p_localOnly = false) {

        let field = this._fieldRep.Get(p_field_id);

        if (!field) {
            if (!this._base || p_localOnly) { return null; }
            return this._base.Get(p_field_id, false);
        } else {
            return field;
        }

    }

    _UpdateLocalFieldIndexes(p_commitUpdate = false) {

        if (p_commitUpdate) {

            let list = this.localFieldList.internalArray,
                updated = false;

            for (let i = 0, n = list.length; i < n; i++) {
                let field = list[i];

                if (field.fieldIndex === i) { continue; }

                updated = true;
                field.fieldIndex = i;
                field.CommitUpdate();
            }
            if (updated) { this.CommitUpdate(); }
        } else {
            let list = this.localFieldList.internalArray;
            for (let i = 0, n = list.length; i < n; i++) {
                list[i].fieldIndex = i;
            }
        }

    }

    Clear() {
        //TODO : Release all local field settings.
    }

    _CleanUp() {
        this._NFO = null;
        this._fieldRep.Clear();
        this._editable = true;
        this._entryCreationAllowed = true;
        this._isTemp = false;
        super._CleanUp();
    }

    toString() {
        if (!this._id) { return `[(${this._uinc})Model::?]`; }
        return this.uri;
    }

}

module.exports = Model;