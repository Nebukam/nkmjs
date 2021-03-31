'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const data = require(`@nkmjs/data-core`);

const M = require(`../meta`);
const EcosystemPart = require(`../ecosystem-part`);
const SystemModel = require(`../data/models/model-system`);
const Model = require(`../data/model`);

const { ModelCreate, ModelCreateChild, ModelEdit, ModelCreateEntry, ModelDuplicate } = require(`./commands/@model`);

class ModelManager extends EcosystemPart {
    constructor() { super(); }

    _Init() {

        super._Init();

        this._factory = new data.DataFactory();
        this._factory.itemClass = Model;

        this._factory
            .Watch(data.SIGNAL.ITEM_REGISTERED, this._OnModelRegistered, this)
            .Watch(data.SIGNAL.ITEM_UNREGISTERED, this._OnModelUnregistered, this);

        this._catMap = new collections.Dictionary();

        this._catalog.name = `Models`;
        this._catalog.icon = `%ICON%/icon_modellist.svg`;

        this._metaTemplate.presentation.catalogPath = ``;

        //Commands

        this._cmdModelCreate = this._commands.Create(
            ModelCreate, null,
            `%ICON%/icon_create.svg`);

        this._cmdModelCreateChild = this._commands.Create(
            ModelCreateChild, null,
            `%ICON%/icon_cmd_createchildmodel.svg`); //icon_cmd_createchildmodel

        this._cmdModelEdit = this._commands.Create(
            ModelEdit, null,
            `%ICON%/icon_cmd_editmodel.svg`);

        this._cmdModelCreateEntry = this._commands.Create(
            ModelCreateEntry, null,
            `%ICON%/icon_plus.svg`);

        this._cmdModelDuplicate = this._commands.Create(
            ModelDuplicate, null,
            `%ICON%/icon_plus.svg`);

        this._catalog.AddCommand(this._cmdModelCreate);

    }

    _OnEcosystemChanged(p_oldValue) {
        super._OnEcosystemChanged(p_oldValue);
    }

    get factory() {
        return this._factory;
    }

    CreateTemp(p_from = null, p_class = null) {
        let model = this._factory.CreateTemp(p_class);
        model.ecosystem = this._ecosystem;
        model.base = p_from;
        this._OnDataCreated(model);
        return model;
    }

    Register(p_model, p_id) {
        return this._factory.Register(p_model, p_id);
    }

    Get(p_id) {
        return this._factory.Get(p_id);
    }

    GetDerivations(p_model, p_result = null) {
        if (!p_result) { p_result = []; }
        let list = this._factory.itemList;
        for (let i = 0, n = list.length; i < n; i++) {
            let m = list[i];
            if (m.Inherits(p_model)) { p_result.push(m); }
        }
        return p_result;
    }

    _OnModelRegistered(p_factory, p_model) {

        this._OnDataRegistered(p_model);

        //Create an entry in the catalog based on model meta
        let itemOptions = {
            [com.IDS.NAME]: p_model.id.name,
            [com.IDS.DATA]: p_model,
            [com.IDS.PATH]: `${p_model.constructor.name}s/${p_model.id.name}/`,
            [com.IDS.ICON]: u.isInstanceOf(p_model, SystemModel) ? `locked` : `data-model`,
            [com.IDS.CMD_SECONDARY]: this._cmdModelEdit,
            [com.IDS.CMD_LIST]: [this._cmdModelCreateChild, this._cmdModelCreateEntry] //this._cmdModelDuplicate
        }

        let modelMeta = M.ETA(p_model);

        if (modelMeta) {
            //console.log(modelMeta);
            itemOptions[com.IDS.PATH] = `${u.tils.Default(modelMeta.catalogPath, itemOptions.path)}/`;
            itemOptions[com.IDS.ICON] = (modelMeta[com.IDS.ICON] || itemOptions[com.IDS.ICON]);
        } else {
            //console.log(`no meta found for ${p_model}`);
        }

        let catEntry = this._catalog.Register(itemOptions);
        catEntry.expanded = true;
        this._catMap.Set(p_model, catEntry);

        // TODO : Listen to model NFO path update

        //console.log(`%c +${p_model}`, 'color: #00d2ff');

        this._Broadcast(data.SIGNAL.ITEM_REGISTERED, p_model);

    }

    _OnModelUnregistered(p_factory, p_model) {
        //Remove catalog's entry for the model that got unregistered
        let catEntry = this._catMap.Get(p_model);
        if (catEntry) {
            catEntry.Release();
        }

        this._Broadcast(data.SIGNAL.ITEM_UNREGISTERED, p_model);
    }

    /**
     * Checks whether using `p_otherModel` inside `p_userModel` would create a circular reference
     * @param {*} p_userModel 
     * @param {*} p_otherModel 
     */
    CheckCircularReference(p_userModel, p_otherModel) {
        let base = p_otherModel;
        while (base != null) {
            if (base === p_userModel) { return true; }
            base = base.base;
        }
        return false;
    }

}

module.exports = ModelManager;
