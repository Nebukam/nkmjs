'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const ECOSYSTEM_EVENT = require(`../../ecosystem-event`);
const FIELD_EVENT = require(`./field-event`);
const FieldSettings = require(`./field-settings`);

class FieldSettingsProxy extends FieldSettings {
    constructor() { super(); }

    static PLANNED_DELETE_CHANGED = Symbol(`plannedDeleteChanged`);

    _Init() {

        super._Init();

        this._isDeletePlanned = false;
        this._referenceField = null;
        this._isFresh = false;

        this._refObserver = new com.signals.Observer();
        this._refObserver
            .Hook(ECOSYSTEM_EVENT.BASE_CHANGED, this._OnRefBaseChanged, this)
            .Hook(FIELD_EVENT.FIELD_CLASS_CHANGED, this._OnRefClassChanged, this);

    }

    get referenceField() { return this._referenceField; }
    set referenceField(p_value) {
        this._referenceField = p_value;
        if (p_value) {
            this.fieldIndex = p_value.fieldIndex;
            if (!u.tils.isSame(this._metadata._data, p_value._metadata._data)) {
                this._metadata.Clone(p_value._metadata);
            }
        }
        this.CommitUpdate();
    }

    get isDeletePlanned() { return this._isDeletePlanned; }
    set isDeletePlanned(p_value) { this.TogglePlannedDelete(p_value); }

    get isFresh() { return this._isFresh; }
    set isFresh(p_value) { this._isFresh = p_value; }

    TogglePlannedDelete(p_toggle = false) {
        if (this._isDeletePlanned === p_toggle) { return; }
        this._isDeletePlanned = p_toggle;
        this.Broadcast(FieldSettingsProxy.PLANNED_DELETE_CHANGED, this, p_toggle);
    }

    _OnRefBaseChanged(p_ref) {
        //TODO : Update this field's base ?
        //this is a tricky case. It means a parent model has been updated while editing this model.
    }

    _OnRefClassChanged(p_ref, p_was) {
        //TODO : force-update constructor only if ref has a base
        if (p_ref.base) { this.fieldClass = p_ref.fieldClass; }
    }

    /**
     * Check wether two fields have equal data.
     * Skips field index check & metadata check as they do not affect data entries.
     * @param {*} p_otherField 
     * @returns {boolean} True if this field is equal to its reference, otherwise false.
     */
    EqualsReference() {
        let ref = this._referenceField;
        if (this._id.name != ref.id.name) { return false; }
        if (this._base != ref.base) { return false; }
        if (this._fieldClass != ref.fieldClass) { return false; }
        if (!u.tils.isSame(this._settings, ref.settings)) { return false; }
        return true;
    }

    _CleanUp() {
        this._referenceField = null;
        this._isDeletePlanned = false;
        this._isFresh = false;
        super._CleanUp();
    }

}

module.exports = FieldSettingsProxy;