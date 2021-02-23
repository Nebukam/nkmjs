'use strict';

const { U } = require(`@nkmjs/utils`);
const { Dictionary } = require(`@nkmjs/collections`);
const { Observer } = require(`@nkmjs/common`);
const { ID } = require(`@nkmjs/data-core`);

const Model = require(`../model`);
const FieldSettingsProxy = require(`../fields/field-settings-proxy`);

const FIELD_EVENT = require(`../fields/field-event`);

class ModelProxy extends Model {
    constructor() { super(); }

    static PROXY_FIELD_REGISTERED = Symbol(`proxyFieldRegistered`);
    static PROXY_FIELD_UNREGISTERED = Symbol(`proxyFieldUnregistered`);

    _Init() {
        super._Init();
        this._referenceModel = null;
        this._id = new ID();
        this._proxyMap = new Dictionary();

        this._refObserver = new Observer();
        this._refObserver.Hook(FIELD_EVENT.FIELD_ADDED, this._OnRefModelFieldAdded, this);
        this._refObserver.Hook(FIELD_EVENT.FIELD_REMOVED, this._OnRefModelFieldRemoved, this);

    }

    get referenceModel() { return this._referenceModel; }
    set referenceModel(p_value) {
        if (this._referenceModel === p_value) { return; }
        let oldRef = this._referenceModel;
        this._referenceModel = p_value;

        if (oldRef) {
            this._refObserver.Unobserve(oldRef);
            this._ClearProxy();
        }

        if (p_value) {
            this._refObserver.Observe(p_value);
            this._BuildProxy();
        }
    }

    _ClearProxy() {

        this._id.name = `(no_ref)`;
        this.ecosystem = null;
        this.base = null;

        let fieldList = this._fieldRep.itemList;

        while (fieldList.length != 0) {
            let proxyFieldSettings = fieldList[fieldList.length - 1];
            this.Unregister(proxyFieldSettings);
            this._Broadcast(ModelProxy.PROXY_FIELD_UNREGISTERED, this, proxyFieldSettings);
            proxyFieldSettings.Release();
        }

        this._proxyMap.Clear();

    }

    _BuildProxy() {

        let ref = this._referenceModel;

        this._id.name = ref.id.name;
        this.ecosystem = ref.ecosystem;

        this._metadata.Clone(ref.metadata);
        this.base = ref.base;

        let fieldList = ref.localFieldList;

        for (let i = 0, n = fieldList.length; i < n; i++) {
            let proxyFieldSettings = this._RegisterProxyField(fieldList[i]);
            proxyFieldSettings.metadata.ClearDirty();
            proxyFieldSettings.ClearDirty();
        }

    }

    _RegisterProxyField(p_fieldSettings) {

        let proxyFieldSettings = Model.CreateField(
            this,
            p_fieldSettings.fieldClass,
            p_fieldSettings.id.name,
            {
                cl: FieldSettingsProxy,
                settings: U.Clone(p_fieldSettings.settings),
                metadata: p_fieldSettings.metadata
            });

        proxyFieldSettings.referenceField = p_fieldSettings;
        this._proxyMap.Set(p_fieldSettings, proxyFieldSettings);

        this._Broadcast(ModelProxy.PROXY_FIELD_REGISTERED, this, proxyFieldSettings);
        return proxyFieldSettings;

    }

    _OnRefModelFieldAdded() {

    }

    _OnRefModelFieldRemoved() {

    }

    _CleanUp() {
        this.referenceModel = null;
        super._CleanUp();
    }

}

module.exports = ModelProxy;