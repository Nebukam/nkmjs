'use strict';

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");

const URI = require(`../uri`);
const ECOSYSTEM_EVENT = require(`../ecosystem-event`);
const ECOSYSTEM_CONSTANTS = require(`../ecosystem-constants`);
const FIELD_EVENT = require(`./fields/field-event`);
const DataBlockEx = require(`./data-block-ex`);

class DataEntry extends DataBlockEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._model = null;
        this._base = null;

        this._fieldMap = new collections.Dictionary();
        this._fieldData = {};
        this._roamingFieldData = {};
    }

    get fieldMap() { return this._fieldMap; }

    set model(p_value) {
        if (this._model === p_value) { return; }
        let oldValue = this._model;
        this._model = p_value;
        this._OnModelChanged(oldValue);
    }
    get model() { return this._model; }

    // modelID:entryID
    get uri() { return `${this._model.uri}${URI.DELIM_MODEL}${this._id ? this._id.name : '?'}`; }

    _OnModelChanged(p_oldValue) {

    }

    set base(p_value) {

        if (this._base === p_value) { return; }
        let oldValue = this._base;
        this._base = p_value;

        if (oldValue) {

        }
        if (p_value) {

        }

        this._OnBaseChanged(oldValue);
        this.Broadcast(ECOSYSTEM_EVENT.BASE_CHANGED, this);

    }

    get base() {
        return this._base;
    }

    _OnBaseChanged(p_oldValue) {

    }

    Inherits(p_entry) {

        if (!this._base || !p_entry) { return false; }
        if (this._base === p_entry) {
            return true;
        }

        return this._base.Inherits(p_entry);

    }

    SetFieldData(p_id, p_data) {
        this._fieldMap.Set(p_id, p_data);
        this._fieldData[p_id.name] = p_data;
    }

    GetFieldData(p_id, p_localOnly = true) {

        let data = this._fieldMap.Get(p_id);

        if (!p_localOnly || !this._base) {
            return data;
        }

        if (!data) {
            data = this._base.GetFieldData(p_id, false);
        }

        return data;

    }

    GetBaseFieldData(p_id) {
        if (!this._base) { return null; }
        return this._base.GetFieldData(p_id, false);
    }

    _FieldRenamed(p_id, p_oldName) {
        this._fieldData[p_id.name] = this._fieldData[p_oldName];
        delete this._fieldData[p_oldName];
        this.Dirty();
        this.Broadcast(FIELD_EVENT.FIELD_RENAMED, this, p_id, p_oldName);
    }

    _FieldRemoved(p_id) {
        this._fieldMap.Remove(p_id);

        let stringID = p_id.name,
            data = this._fieldData[stringID];

        this._roamingFieldData[stringID] = data;
        delete this._fieldData[stringID];
        this.Broadcast(FIELD_EVENT.FIELD_REMOVED, this, p_id);
    }

    _FieldAdded(p_id, p_data = null) {

        let stringID = p_id.name,
            roaming = this._roamingFieldData[stringID];

        if (p_data === ECOSYSTEM_CONSTANTS.DEFAULT || p_data === ECOSYSTEM_CONSTANTS.INHERIT) {
            if (roaming) {
                p_data = roaming;
                delete this._roamingFieldData[stringID];
            }
        }

        this._fieldMap.Set(p_id, p_data);
        this._fieldData[stringID] = p_data;
        this.Broadcast(FIELD_EVENT.FIELD_ADDED, this, p_id);
    }

    _CleanUp() {

        this._model = null;
        this._base = null;

        this._fieldMap.Clear();

        this._fieldData = u.tils.Clear(this._fieldData, true);
        this._roamingFieldData = u.tils.Clear(this._roamingFieldData, true);
        this._metadata = u.tils.Clear(this._metadata, true);

        super._CleanUp();
    }

    toString() {

        let sID = this._id ? this._id.name : '';
        let mID = this._model ? this._model.id ? this._model.id.name : '?' : '';

        return this.uri;

    }

}

module.exports = DataEntry;