/**
 * A DataLibrary manages a single data-model and all corresponding entries.
 * In order to use a factory, it must be provided with a valid data-model
 * as well as a valid DataEntry constructor that will be used to store data.
 * 
 * The workflow is as follow :
 * Request a new, empty entry through CreateTemp()
 * then register it using Register( p_entry, p_id ).
 * If the id is already in use, the registration will fail. Make sure
 * the id is not already in use through 
 * 
 */
'use strict';

const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const ECOSYSTEM_CONSTANTS = require(`../ecosystem-constants`);
const DataEntry = require(`./data-entry`);
const FIELD_EVENT = require(`./fields/field-event`);

class DataLibrary extends data.DataFactory {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._model = null;
        this._itemClass = DataEntry;

        this._modelObserver = new com.signals.Observer();
        this._modelObserver
            .Hook(FIELD_EVENT.FIELD_ADDED, this._OnModelFieldAdded, this)
            .Hook(FIELD_EVENT.FIELD_REMOVED, this._OnModelFieldRemoved, this)
            .Hook(FIELD_EVENT.FIELD_UPDATED, this._OnModelFieldUpdated, this)
            .Hook(FIELD_EVENT.FIELD_RENAMED, this._OnModelFieldRenamed, this)
            .Hook(data.SIGNAL.DIRTY, this._OnModelDirty, this);

    }

    get model() {
        return this._model;
    }

    set model(p_value) {

        if (this._model === p_value) { return; }

        let oldValue = this._model;
        this._model = p_value;

        if (oldValue) { this._modelObserver.Unobserve(oldValue); }
        if (p_value) { this._modelObserver.Observe(p_value); }

        this._OnModelChanged(oldValue);

    }

    _OnModelChanged(p_oldModel) {

    }

    _OnModelFieldAdded(p_model, p_fieldSettings) {

        if (p_fieldSettings.model === p_model) {
            // Model emitter is field owner
            let list = this.itemList._array;
            for (let i = 0, n = list.length; i < n; i++) {
                list[i]._FieldAdded(p_fieldSettings.id, ECOSYSTEM_CONSTANTS.DEFAULT);
            }
        } else {
            // Model emitter is not the field owner
            // This is an inherited field
            let list = this.itemList._array;
            for (let i = 0, n = list.length; i < n; i++) {
                list[i]._FieldAdded(p_fieldSettings.id, ECOSYSTEM_CONSTANTS.INHERIT);
            }
        }
    }

    _OnModelFieldRemoved(p_model, p_fieldSettings) {
        let list = this.itemList._array;
        for (let i = 0, n = list.length; i < n; i++) {
            list[i]._FieldRemoved(p_fieldSettings.id);
        }
    }

    _OnModelFieldUpdated(p_model, p_fieldSettings) {
        //Update all entries, if needed
    }

    _OnModelFieldRenamed(p_model, p_id, p_oldName) {
        let list = this.itemList._array,
            id = p_model.id;
        for (let i = 0, n = list.length; i < n; i++) {
            list[i]._FieldRenamed(id, p_oldName);
        }
    }

    _OnModelDirty(p_model) {
        let list = this.itemList._array;
        for (let i = 0, n = list.length; i < n; i++) {
            list[i].Dirty();
        }
    }

    /**
     * Create a temp data entry to be registered afterward.
     */
    CreateTemp(p_from = null, p_class = null) {

        //!!!! Watch out for potential issues with CreateTemp having a different signature from extended DataFactory. 

        if (!this._model) {
            throw new Error("Attempting to create an entry using a factory with no model set.");
        }

        let m = this._model;
        let newEntry = super.CreateTemp(p_class);
        newEntry.model = m;

        //Fill temp model with fields
        let totalCount = m.FieldCount(false);

        if (!p_from) {
            for (let i = 0; i < totalCount; i++) {
                let f = m.GetFieldAt(i, false);
                newEntry._FieldAdded(f.id, ECOSYSTEM_CONSTANTS.DEFAULT);
            }
        } else {
            newEntry.base = p_from;
            for (let i = 0; i < totalCount; i++) {
                let f = m.GetFieldAt(i, false);
                // newEntry._FieldAdded(f.id, ECOSYSTEM_CONSTANTS.INHERIT);
            }
        }

        return newEntry;

    }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = DataLibrary;