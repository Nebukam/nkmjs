'use strict';

const com = require("@nkmjs/common");
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`./catalog-signal`);
const CatalogItem = require(`./catalog-item`);
const helpers = require(`./helpers`);

/**
* @description A CatalogWatcher observe a catalog's additions and removals.
* It's an abstract class, look for actual implementations in `CatalogHandler` & `CatalogBuilder`
* @class
* @hideconstructor
* @augments common.Observable
* @memberof data.core.catalog
*/
class CatalogWatcher extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._owner = null;
        this._catalog = null;
        this._map = new Map();
        this._reverseMap = new Map();

        this._itemCount = 0;

        this._isEnabled = true;

        this._catalogObserver = new com.signals.Observer();
        this._catalogObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(com.SIGNAL.SORTED, this._OnSorted, this);

    }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get length() { return this._map.size; }

    /**
     * @description TODO
     * @type {*}
     */
    get owner() { return this._owner; }
    set owner(p_value) { this._owner = p_value; }

    /**
     * @description TODO
     * @type {data.core.catalogs.Catalog}
     */
    get catalog() { return this._catalog; }
    set catalog(p_value) {
        if (this._catalog === p_value) { return; }
        let oldValue = this._catalog;
        this._catalog = p_value;
        if (oldValue) { this._catalogObserver.Unobserve(oldValue); }
        if (p_value) { this._catalogObserver.Observe(p_value); }
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

        if (this._catalog) { this._AddCatalogContent(this._catalog); }

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
        if (this._catalog) { this._RemoveCatalogContent(this._catalog); }
        return true;
    }

    // ----> Flattening

    /**
     * @access protected
     * @description Goes over the content of a given catalog and calls _OnItemAdded
     * for each encountered item. 
     * This function is useful when the watcher is enabled with a set catalog to go through.
     * @param {data.core.catalogs.Catalog} p_catalog 
     */
    _AddCatalogContent(p_catalog) {
        let list = p_catalog._items;
        for (let i = 0, n = list.length; i < n; i++) { this._OnItemAdded(p_catalog, list[i]); }
    }

    /**
     * @access protected
     * @description Goes over the content of a given catalog and calls _OnItemRemoved
     * for each encountered item. 
     * This function is useful when the watcher is disabled with a set catalog to go through.
     * @param {data.core.catalogs.Catalog} p_catalog 
     */
    _RemoveCatalogContent(p_catalog) {
        let list = p_catalog._items;
        for (let i = 0, n = list.length; i < n; i++) { this._OnItemRemoved(p_catalog, list[i], i); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_oldValue previously assigned catalog, if any
     * @customtag override-me
     */
    _OnCatalogChanged(p_oldValue) {
        if (!this._isEnabled) { return false; }
        if (p_oldValue) { this._RemoveCatalogContent(p_oldValue); }
        if (this._catalog) { this._AddCatalogContent(this._catalog); }
        return true;
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnItemAdded(p_catalog, p_item) {
        this._itemCount++;
        p_item.Watch(SIGNAL.ITEM_DATA_RELEASED, this._OnItemDataReleased, this);
        return true;
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnItemRemoved(p_catalog, p_item, p_index) {

        this._itemCount--;

        if (!p_item.isReleasing) {
            p_item.Unwatch(SIGNAL.ITEM_DATA_RELEASED, this._OnItemDataReleased, this);
        }

        let mappedObject = this._map.get(p_item);
        if (mappedObject) {
            this._map.delete(p_item);
            this._reverseMap.delete(mappedObject);
        }
        return mappedObject;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @param {*} p_data 
     * @customtag override-me
     */
    _OnItemDataReleased(p_item, p_data) {

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @customtag override-me
     */
    _OnSorted(p_catalog) {
        this.Broadcast(com.SIGNAL.SORTED, this);
    }

    // ----> Map

    /**
     * @description TODO
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @param {*} p_mappedValue 
     * @returns {*} mappedValue
     */
    Set(p_item, p_mappedValue) {
        this._map.set(p_item, p_mappedValue);
        this._reverseMap.set(p_mappedValue, p_item);
        return p_mappedValue;
    }

    /**
     * @description TODO
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @returns {*} value mapped to provided item, if any
     */
    Get(p_item) { return this._map.get(p_item); }
    ReverseGet(p_mappedValue) { return this._reverseMap.get(p_mappedValue); }

    /**
     * @description TODO
     * @param {number} p_index 
     * @returns {*}
     */
    GetAt(p_index) { return this._map.get(this._catalog._items[p_index]); }

    /**
     * @description TODO
     * @param {*} p_value 
     * @returns {Array}
     */
    GetValueKeys(p_value) {
        let keys = this._map.keys,
            results = null;
        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i],
                value = this._map.get(key);
            if (value === p_value) {
                if (!results) { results = []; }
                results.push(key);
            }
        }
        return results;
    }


    TryGet(p_identifier) {

        let mappedValue = null;

        if (u.isNumber(p_identifier)) {
            // by index
            mappedValue = this.Get(this._catalog.At(p_identifier));
        } else if (u.isString(p_identifier)) {
            // by data id name
            let item = helpers.Find(this._catalog, (i) => { return i.name == p_identifier; });
            if (item) { mappedValue = this.Get(item); }
        } else if (u.isInstanceOf(p_identifier, CatalogItem)) {
            // by catalog item reference
            mappedValue = this.Get(p_identifier);
        }

        return mappedValue;

    }

    // ---->

    _CleanUp() {

        this.catalog = null;

        this._owner = null;
        this._isEnabled = true;

        this._itemCount = 0;

        super._CleanUp();

    }



}

module.exports = CatalogWatcher;