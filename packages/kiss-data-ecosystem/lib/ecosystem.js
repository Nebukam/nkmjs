/**
 * The goal of an ecosystem is to isolate and encapsulate
 * all data-related functionalities in a closed ecosystem such as :
 * - a field manager
 * - a model manager
 * - entries etc
 * These parts are usually singletons but it lack flexbility down the line.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");
const actions = require("@nkmjs/actions");

const URI = require(`./uri`);
const { FieldManager, ModelManager, EntryManager } = require(`./parts`);
const EcosystemCommand = require(`./data/commands/command-ecosystem`);
const EcosystemCleanCatalog = require(`./commands/ecosystem-clean-catalog`);

class Ecosystem extends data.DataBlock {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._commands = new actions.CommandBox(this._Bind(this._OnCmdRegister));
        this._dependencies = {}; //Kits are registered here

        let fields = com.Rent(FieldManager);
        fields.ecosystem = this;
        fields
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnFieldRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnFieldUnregistered, this);
        this._fields = fields;

        let models = com.Rent(ModelManager);
        models.ecosystem = this;
        models
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);
        this._models = models;

        let entries = com.Rent(EntryManager);
        entries.ecosystem = this;
        entries
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnEntryRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnEntryUnregistered, this);
        this._entries = entries;

        this._catalog = new data.catalogs.Catalog();
        this._catalog.expanded = true;
        this._catalog.name = `Ecosystem`;

        this._cmdCleanCatalog = this._commands.Create(
            EcosystemCleanCatalog, null,
            `%ICON%/icon_clean.svg`);

        this._catalog.AddCommand(this._cmdCleanCatalog);

    }

    get fields() { return this._fields; }
    get models() { return this._models; }
    get entries() { return this._entries; }

    get catalog() { return this._catalog; }

    Resolve(p_uri) { return URI.Resolve(p_uri, this); }

    _OnFieldRegistered(p_field) {

    }

    _OnFieldUnregistered(p_field) {

    }


    _OnModelRegistered(p_model) {
        this._entries.Deploy(p_model);
        //Check for reference token to this model.
        this._OnEntityRegistered(p_model);
    }

    _OnModelUnregistered(p_model) {
        this._entries.Conceal(p_model);
        this._OnEntityUnregistered(p_model);
    }


    _OnEntryRegistered(p_entry) {
        this._OnEntityRegistered(p_entry);
    }

    _OnEntryUnregistered(p_entry) {
        this._OnEntityUnregistered(p_entry);
    }

    // ---->

    _OnEntityRegistered(p_entity) {
        p_entity
            .Watch(data.SIGNAL.DIRTY, this._OnEntityDirty, this)
            .Watch(data.SIGNAL.DIRTY_CLEARED, this._OnEntityCleaned, this);

        if (p_entity.isDirty) {
            this._OnEntityDirty(p_entity);
        }
    }

    _OnEntityUnregistered(p_entity) {
        p_entity
            .Unwatch(data.SIGNAL.DIRTY, this._OnEntityDirty, this)
            .Unwatch(data.SIGNAL.DIRTY_CLEARED, this._OnEntityCleaned, this);
    }

    _OnEntityDirty(p_entity) {

    }

    _OnEntityCleaned(p_entity) {

    }

    // ---->

    _OnCmdRegister(p_cmd) {
        if (u.isInstanceOf(p_cmd, EcosystemCommand)) { p_cmd.ecosystem = this; }
    }

    // ---->

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = Ecosystem;