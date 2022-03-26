'use strict';

const com = require("@nkmjs/common");

const SIGNAL = require(`./catalog-signal`);

const filters = require(`./filters`);

/**
* @description A CatalogWatcher observe a catalog's additions and removals.
* It's an abstract class, look for actual implementations in `CatalogHandler` & `CatalogBuilder`
* @class
* @hideconstructor
* @augments common.pool.DisposableObjectEx
* @memberof data.core.catalog
*/
class CatalogWatcher extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._owner = null;
        this._catalog = null;
        this._map = new Map();

        this._filtersHandler = new filters.CatalogFilterListHandler();
        this._filtersHandler
            .Watch(filters.SIGNAL.PASSED, this._OnFilterPassedItem, this)
            .Watch(filters.SIGNAL.REJECTED, this._OnFiltersRejectedItem, this);

        this._itemCount = 0;

        this._isEnabled = true;
        this._ignoreFilters = false;

        this._catalogObserver = new com.signals.Observer();
        this._catalogObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(SIGNAL.SORTED, this._OnSorted, this);

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

    // ---->

    set filters(p_value) {
        if (this._filtersHandler._filters == p_value) { return; }

        this._filtersHandler.filters = p_value;

        if (!this._catalog) { return; }

        // This is the most expensive way to handle the situation
        let c = this._catalog;
        this.catalog = null;
        this.catalog = c;

    }
    get filters() { return this._filtersHandler._filters; }


    _OnFilterPassedItem(p_handler, p_item) {
        // Callback when a previously invalidated item is now valid
        this._ignoreFilters = true;
        this._OnItemAdded(p_item.parent, p_item);
        this._ignoreFilters = false;
    }

    _OnFiltersRejectedItem(p_handler, p_item) {
        // Callback when a previously valid item is now invalid
        this._ignoreFilters = true;
        this._OnItemRemoved(p_item.parent, p_item);
        this._ignoreFilters = false;
    }

    // ---->

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

        if (!this._ignoreFilters) {
            if (this._filtersHandler._filters
                && !this._filtersHandler.Pass(p_item)) {
                return false;
            }
        }

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

        if (!this._ignoreFilters) {
            if (this._filtersHandler._filters
                && !this._filtersHandler.Clear(p_item)) {
                return false;
            }
        }

        this._itemCount--;

        if (!p_item.isReleasing) {
            p_item.Unwatch(SIGNAL.ITEM_DATA_RELEASED, this._OnItemDataReleased, this);
        }

        let mappedObject = this._map.get(p_item);
        if (mappedObject) { this._map.delete(p_item); }
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
        this.Broadcast(SIGNAL.SORTED, this);
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
        return p_mappedValue;
    }

    /**
     * @description TODO
     * @param {data.core.catalogs.CatalogItem} p_item 
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
                if (!results) { results = []; }
                results.push(key);
            }
        }
        return results;
    }

    // ---->

    _CleanUp() {

        this.catalog = null;
        this.filters = null;

        this._owner = null;
        this._isEnabled = true;

        this._itemCount = 0;

        super._CleanUp();

    }



}

module.exports = CatalogWatcher;