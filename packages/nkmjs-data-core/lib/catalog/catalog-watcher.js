'use strict';

const { U } = require(`@nkmjs/utils`);
const { Dictionary } = require(`@nkmjs/collections`);
const { BINDINGS, SIGNAL, Observer, DisposableObjectEx } = require(`@nkmjs/common`);

const CATALOG_SIGNAL = require(`./catalog-signal`);
const Catalog = require(`../catalog/catalog`);
const CatalogItem = require("./catalog-item");

 /**
 * @description A CatalogWatcher observe a catalog's additions and removals.
 * It's an abstract class, look for actual implementations in `CatalogHandler` & `CatalogBuilder`
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof data.core.catalog
 */
class CatalogWatcher extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._owner = null;
        this._catalog = null;
        this._map = new Map();
        this._filters = null;
        this._itemCount = 0;

        this._isEnabled = true;
        this._isDeepWatchEnabled = false;

        this._catalogObserver = new Observer();
        this._catalogObserver.Hook(SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this);
        this._catalogObserver.Hook(SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);
        this._catalogObserver.Hook(CATALOG_SIGNAL.SORTED, this._OnCatalogSorted, this);

        // TODO : Filter integration + 'in-depth' recursive calls on ItemAdded if the watcher is 
        //both filtered AND flagged as 'flatten catalog'

    }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._map.size; }

    /**
     * @description TODO
     * @type {*}
     */
    get owner() { return this._owner; }
    set owner(p_value) { this._owner = p_value; }

    /**
     * @description TODO
     * @type {data.core.catalog.Catalog}
     */
    get catalog() { return this._catalog; }
    set catalog(p_value) {
        if (this._catalog === p_value) { return; }
        let oldValue = this._catalog;
        this._catalog = p_value;
        if(oldValue){ this._catalogObserver.Unobserve(oldValue); }
        if(p_value){ this._catalogObserver.Observe(p_value); }
        this._OnCatalogChanged(oldValue);
    }

    // ----> Availability

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEnabled() { return this._isEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set enabled(p_value) {
        if (p_value) { this.Enable(); }
        else { this.Disable(); }
    }

    /**
     * @description Enable this watcher. If a catalog is set, it will be processed
     * and addition signals will be broadcasted.
     */
    Enable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = true;
        this._catalogObserver.Enable();

        if (this._catalog) { this._AddCatalogContent(this._catalog, this._isDeepWatchEnabled); }

        return true;
    }

    /**
     * @description Disable this watcher. If a catalog is set, it will be processed
     * and removal signals will be broadcasted.
     */
    Disable() {
        if (!this._isEnabled) { return false; }
        this._isEnabled = false;
        this._catalogObserver.Disable();
        if (this._catalog) { this._RemoveCatalogContent(this._catalog, this._isDeepWatchEnabled); }
        return true;
    }

    // ----> Flattening

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isDeepWatchEnabled() { return this._isDeepWatchEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set deepWatch(p_value) {
        if (this._isDeepWatchEnabled === p_value) { return; }
        this._isDeepWatchEnabled = p_value;

        if (this._isDeepWatchEnabled) {

            // Unkook regular signals
            this._catalogObserver.Unhook(SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this);
            this._catalogObserver.Unhook(SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);
            this._catalogObserver.Unhook(CATALOG_SIGNAL.SORTED, this._OnCatalogSorted, this);

            // Hook root signals
            this._catalogObserver.Hook(CATALOG_SIGNAL.ROOT_ITEM_ADDED, this._OnCatalogItemAdded, this);
            this._catalogObserver.Hook(CATALOG_SIGNAL.ROOT_ITEM_REMOVED, this._OnCatalogItemRemoved, this);

            if (this._isEnabled && this._catalog) {
                this._RemoveCatalogContent(this._catalog);
                this._AddCatalogContent(this._catalog, true);
            }

        } else {

            // Unkook root signals
            this._catalogObserver.Unhook(CATALOG_SIGNAL.ROOT_ITEM_ADDED, this._OnCatalogItemAdded, this);
            this._catalogObserver.Unhook(CATALOG_SIGNAL.ROOT_ITEM_REMOVED, this._OnCatalogItemRemoved, this);

            // Hook regular signals
            this._catalogObserver.Hook(SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this);
            this._catalogObserver.Hook(SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);
            this._catalogObserver.Hook(CATALOG_SIGNAL.SORTED, this._OnCatalogSorted, this);

            if (this._isEnabled && this._catalog) {
                this._RemoveCatalogContent(this._catalog, true);
                this._AddCatalogContent(this._catalog);
            }

        }

    }

    // ---->

    /**
     * @access protected
     * @description Goes over the content of a given catalog and calls _OnCatalogItemAdded
     * for each encountered item. 
     * This function is useful when the watcher is enabled with a set catalog to go through.
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {boolean} [p_deep]
     */
    _AddCatalogContent(p_catalog, p_deep = false) {
        let list = p_catalog._items;
        if (p_deep) {
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                if (item.isDir) { this._AddCatalogContent(item, p_deep); }
                else { this._OnCatalogItemAdded(p_catalog, item); }
            }
        } else {
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                this._OnCatalogItemAdded(p_catalog, item);
            }
        }

    }

    /**
     * @access protected
     * @description Goes over the content of a given catalog and calls _OnCatalogItemRemoved
     * for each encountered item. 
     * This function is useful when the watcher is disabled with a set catalog to go through.
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {boolean} [p_deep] 
     */
    _RemoveCatalogContent(p_catalog, p_deep = false) {
        let list = p_catalog._items;
        if (p_deep) {
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                if (item.isDir) { this._RemoveCatalogContent(item, p_deep); }
                else { this._OnCatalogItemRemoved(p_catalog, item); }
            }
        } else {
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                this._OnCatalogItemRemoved(p_catalog, item);
            }
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalog.Catalog} p_oldValue previously assigned catalog, if any
     * @customtag override-me
     */
    _OnCatalogChanged(p_oldValue) {
        if (!this._isEnabled) { return false; }
        if (p_oldValue) { this._RemoveCatalogContent(p_oldValue, this._isDeepWatchEnabled); }
        if (this._catalog) { this._AddCatalogContent(this._catalog, this._isDeepWatchEnabled); }
        return true;
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnCatalogItemAdded(p_catalog, p_item) {

        if (this._isDeepWatchEnabled) {
            if (p_item.isDir || p_item.rootDistance <= this._catalog.rootDistance) {
                return false;
            }
        }

        this._itemCount ++;

        if (this._filters && !this._filters.Check(p_item)) { return false; }

        p_item.Watch(CATALOG_SIGNAL.ITEM_DATA_RELEASED, this._OnItemDataReleased, this);

        return true;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalog.Catalog} p_catalog 
     * @param {data.core.catalog.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnCatalogItemRemoved(p_catalog, p_item) {

        if (this._isDeepWatchEnabled) {
            if (p_item.isDir || p_item.rootDistance <= this._catalog.rootDistance) {
                return false;
            }
        }

        this._itemCount --;

        if (!p_item.isReleasing) {
            p_item.Unwatch(CATALOG_SIGNAL.ITEM_DATA_RELEASED, this._OnItemDataReleased, this);
        }

        let mappedObject = this._map.get(p_item);
        if (mappedObject) { this._map.delete(p_item); }
        return mappedObject;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalog.CatalogItem} p_item 
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataReleased(p_item, p_data) {

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalog.Catalog} p_catalog 
     * @customtag override-me
     */
    _OnCatalogSorted(p_catalog) {
        this._Broadcast(CATALOG_SIGNAL.SORTED, this);
    }

    // ----> Map

    /**
     * @description TODO
     * @param {data.core.catalog.CatalogItem} p_item 
     * @param {*} p_mappedValue 
     * @returns {*} mappedValue
     */
    Set(p_item, p_mappedValue) {
        this._map.set(p_item, p_mappedValue);
        return p_mappedValue;
    }

    /**
     * @description TODO
     * @param {data.core.catalog.CatalogItem} p_item 
     * @returns {*} value mapped to provided item, if any
     */
    Get(p_item) { return this._map.get(p_item); }

    /**
     * @description TODO
     * @param {number} p_index 
     * @returns {*}
     */
    GetAt(p_index) { return this._map.get(this._catalog._items[p_index]); }

    /**
     * @description TODO
     * @param {*} p_value 
     * @returns {array}
     */
    GetValueKeys(p_value) {
        let keys = this._map.keys,
            results = null;
        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i],
                value = this._map.Get(key);
            if (value === p_value) {
                if (!results) { results = new Array(1); }
                results.push(key);
            }
        }
        return results;
    }

    // ---->

    _CleanUp() {

        this.flattened = false;
        this.catalog = null;

        this._owner = null;
        this._isEnabled = true;

        this._itemCount = 0;

        super._CleanUp();

    }



}

module.exports = CatalogWatcher;