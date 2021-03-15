'use strict';

const u = require("@nkmjs/utils");
const { Dictionary, List } = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const EcosystemPart = require(`../ecosystem-part`);

const DataLibrary = require(`../data/data-library`);
const Model = require(`../data/model`);
const DataEntry = require(`../data/data-entry`);

const { EntryCreateChild, EntryEdit, EntrySave, EntryDelete, EntryDuplicate } = require(`./commands/@entry`);


const _meta_catalogPath = `presentation.catalogPath`;
const _meta_iconPath = `presentation.iconPath`;

class EntryManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._libraries = new List();
        this._librariesMap = new Dictionary();
        this._entryCatalogMap = new Dictionary();

        //Commands

        this._cmdEntryCreateChild = this._commands.Create(
            EntryCreateChild, null,
            `%ICON%/icon_cmd_createchildentry.svg`);

        this._cmdEntryEdit = this._commands.Create(
            EntryEdit, null,
            `%ICON%/icon_cmd_editmodel.svg`);

        this._cmdEntrySave = this._commands.Create(
            EntrySave, null,
            `%ICON%/icon_cmd_save.svg`);

        this._cmdEntryDelete = this._commands.Create(
            EntryDelete, null,
            `%ICON%/icon_delete.svg`);

        this._cmdEntryDuplicate = this._commands.Create(
            EntryDuplicate, null,
            `%ICON%/icon_copy_document.svg`);
    }

    /**
     * Register a model and create a data library based on it.
     * @param {Model} p_model 
     */
    Deploy(p_model) {

        let id = p_model.id;
        if (this._librariesMap.Contains(id)) {
            throw new Error(`A library already exists with that model ID : ${id}`);
        }

        let newLibrary = com.Rent(DataLibrary);
        newLibrary.model = p_model;

        newLibrary.Watch(data.SIGNAL.ITEM_REGISTERED, this._OnEntryRegistered, this);
        newLibrary.Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnEntryUnregistered, this);

        this._libraries.Add(newLibrary);
        this._librariesMap.Set(id, newLibrary);

        return newLibrary;
    }

    /**
     * Unregister a model and release the associated data library.
     * @param {Model} p_model 
     */
    Conceal(p_model) {

        let id = p_model.id;
        if (this._librariesMap.Contains(id)) {
            throw new Error(`No library is associated with the model id : ${id}`);
        }

        let library = this._librariesMap.Get(id);

        newLibrary.Unwatch(data.SIGNAL.ITEM_REGISTERED, this._OnEntryRegistered, this);
        newLibrary.Unwatch(data.SIGNAL.ITEM_UNREGISTERED, this._OnEntryUnregistered, this);

        this._libraries.Remove(library);
        this._librariesMap.Remove(library);

        library.Release();

    }


    /**
     * Return a data library associated with a given key (model or ID)
     * @param {data.ID | Model} p_key 
     */
    GetLibrary(p_key) {

        let id = null;

        if (u.tils.isInstanceOf(p_key, data.ID)) {
            id = p_key;
        } else if (u.tils.isInstanceOf(p_key, Model)) {
            id = p_key.id;
        } else {
            throw new Error(`Argument Error`);
        }

        return this._librariesMap.Get(id);

    }

    GetLibraries(p_models, p_result = null) {
        if (!p_result) { p_result = new Array(0); }
        for (let i = 0, n = p_models.length; i < n; i++) {
            p_result.push(this._librariesMap.Get(p_models[i].id));
        }
        return p_result;
    }

    Get(p_key, p_id) {

        if (!p_key) { throw new Error(`Argument Error : Null model reference`); }

        if (u.tils.isString(p_key)) {
            p_key = this._ecosystem.models.Get(p_key);
        }

        let lib = this.GetLibrary(p_key);

        if (!lib) { throw new Error(`Argument Error : No library for model ${p_key}`); }

        return lib.Get(p_id);

    }

    CreateTemp(p_from, p_class = null) {

        let model = p_from,
            base = null;

        if (u.tils.isInstanceOf(p_from, DataEntry)) {
            model = p_from.model;
            base = p_from;
        }

        if (!model) { throw new Error(`Argument Error : CreateTemp : Null model`); }

        let lib = this.GetLibrary(model);

        if (!lib) {
            console.warn(`Registering model on the fly, this is dangerous : ${model}`);
            lib = this.Deploy(model);
        }

        let p_entry = lib.CreateTemp(base, p_class);
        this._OnDataCreated(p_entry);

        return p_entry;

    }

    Register(p_entry, p_id) {

        if (!p_entry) { throw new Error(`Argument Error : Register : Null entry`); }

        let lib = this.GetLibrary(p_entry.model);

        if (!lib) { throw new Error(`Argument Error : Register : No library found with model ${p_entry.model}`); }

        let result = lib.Register(p_entry, p_id);
        this._OnDataRegistered(p_entry);

        return result;

    }


    _OnEntryRegistered(p_library, p_entry) {

        this._CreateCatalogEntry(p_entry);

        p_entry.ClearDirty();
        p_entry.metadirty = false;

        this._Broadcast(data.SIGNAL.ITEM_REGISTERED, p_entry);

        p_entry.metadata.Watch(data.SIGNAL.META_UPDATED, this._OnEntryMetaUpdated, this);

    }

    _OnEntryMetaUpdated(p_meta, p_path, p_value, p_oldValue) {

        switch (p_path) {
            case _meta_catalogPath:
                this._CreateCatalogEntry(p_meta.owner);
                break;
            case _meta_iconPath:
                this._entryCatalogMap.Get(p_meta.owner).icon = p_value;
                break;
        }
    }

    _OnCatalogEntryRelease(p_cItem) {

        let entry = p_cItem.options.data,
            entryMap = this._entryCatalogMap,
            cItem = entryMap.Get(entry);

        if (!cItem) {
            //No entry associated with data, just ignore. 
            return;
        }

        entryMap.Remove(entry);
        this._DefaultsCatalogPath(entry);

    }

    _CreateCatalogEntry(p_entry, p_options = null) {

        let entryMap = this._entryCatalogMap,
            cItem = entryMap.Get(p_entry);

        if (cItem) {
            if (!p_options) { p_options = cItem.options; }
            entryMap.Remove(cItem.options.data);
            cItem.Unwatch(com.SIGNAL.RELEASED, this._OnCatalogEntryRelease, this);
            cItem.Release();
        }

        let name = p_entry.id.name;

        if (!p_options) {
            p_options = {
                [com.IDS.NAME]: name,
                [com.IDS.DATA]: p_entry,
                [com.IDS.ICON]: p_entry.metadata.Get(_meta_iconPath, `%ICON%/icon_document.svg`),
                [com.IDS.CMD_SECONDARY]: this._cmdEntryEdit,
                [com.IDS.CMD_LIST]: [this._cmdEntryCreateChild, this._cmdEntryDuplicate]
            }
        }

        let path = p_entry.metadata.Get(_meta_catalogPath);
        if (u.tils.isEmpty(path)) { path = this._DefaultsCatalogPath(p_entry); }
        p_options.path = `${path}/${name}`;

        cItem = this._ecosystem._catalog.Register(p_options);
        cItem.Watch(com.SIGNAL.RELEASED, this._OnCatalogEntryRelease, this);

        entryMap.Set(p_entry, cItem);
        return cItem;

    }

    _DefaultsCatalogPath(p_entry) {
        let path = `Data/${p_entry.model.id.name}/`;
        p_entry.metadata.Set(_meta_catalogPath, path);
        return path;
    }

    _OnEntryUnregistered(p_library, p_entry) {

        let entryMap = this._entryCatalogMap,
            cItem = entryMap.Get(p_entry);
            
        if (cItem) {
            entryMap.Remove(p_entry);
            cItem.Release();
        }

        this._Broadcast(data.SIGNAL.ITEM_UNREGISTERED, p_entry);
        this._entryCatalogMap.Remove(p_entry);
    }

    /**
     * Checks whether using `p_otherEntry` inside `p_userEntry` would create a circular reference
     * @param {*} p_userEntry 
     * @param {*} p_otherEntry 
     */
    CheckCircularReference(p_userEntry, p_otherEntry) {
        let base = p_otherEntry;
        while (base != null) {
            if (base === p_userEntry) { return true; }
            base = base.base;
        }
        return false;
    }
}

module.exports = EntryManager;
