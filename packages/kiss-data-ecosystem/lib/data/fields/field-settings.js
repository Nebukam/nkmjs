'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const URI = require(`../../uri`);
const FIELD_EVENT = require(`../fields/field-event`);
const DerivableDataBlock = require(`../../data/data-block-derivable`);


//A field descriptor is used for
// - declare a field in a model
// - setup constraints & constructor association, parameters etc for a given field

class FieldSettings extends DerivableDataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._model = null;
        this._fieldClass = null;
        this._fieldInstance = null;
        this._fieldIndex = -1;
        this._settings = {};

        //!!! IMPORTANT
        //When using a base, the field constructor instance is responsible for making sure
        //critical field settings are inherited.
        //i.e an ENUM field should not authorize where it grabs values from.
    }

    _BuildDerivation(p_base) {
        if (this._fieldClass != p_base.fieldClass) {
            this.fieldClass = p_base.fieldClass;
            this.settings = u.tils.Clone(p_base.settings);
        }
    }

    get uri() { return `${this._model.uri}${URI.DELIM_FIELD}${this._id.name}`; }

    get fieldIndex() { return this._fieldIndex; }
    set fieldIndex(p_value) {
        if (this._fieldIndex === p_value) { return; }
        this._fieldIndex = p_value;
        this.Dirty();
    }

    get model() { return this._model; }
    set model(p_value) { this._model = p_value; }

    get fieldClass() { return this._fieldClass; }
    set fieldClass(p_value) {
        if (this._fieldClass === p_value) { return; }
        let oldFieldClass = this._fieldClass;
        this._fieldClass = p_value;

        if (this._fieldInstance) {
            this._fieldInstance.Release();
            this._fieldInstance = null;
        }

        if (p_value) {
            this._fieldInstance = com.Rent(p_value);
            this._fieldInstance.settings = this._settings;
        }

        this.Dirty();
        this.Broadcast(FIELD_EVENT.FIELD_CLASS_CHANGED, this, oldFieldClass);
    }

    get fieldInstance() { return this._fieldInstance; }

    get settings() { return this._settings; }
    set settings(p_value) {
        if (this._settings === p_value) { return; }
        this._settings = p_value;
        if (this._fieldInstance) {
            this._fieldInstance.settings = this._settings;
        }
        this.Dirty();
    }

    _OnBaseUpdated(p_base) {
        super._OnBaseUpdated(p_base);
        //TODO : Make sure to update type & settings if needed.
        this.fieldClass = p_base.fieldClass;
    }

    _CleanUp() {
        this.fieldClass = null;
        this._fieldIndex = -1;
        this._model = null;
        this._settings = u.tils.Clear(this._settings, true);
        super._CleanUp();
    }

    toString() {
        return this.uri;
    }

}

module.exports = FieldSettings;