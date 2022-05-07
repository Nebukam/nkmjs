'use strict';

const com = require("@nkmjs/common");

const SIGNAL = require(`./catalog-signal`);

const CatalogWatcher = require(`./catalog-watcher`);

/**
* @description A CatalogWatcher observe a catalog's additions and removals.
* It's an abstract class, look for actual implementations in `CatalogHandler` & `CatalogBuilder`
* @class
* @hideconstructor
* @augments common.pool.DisposableObjectEx
* @memberof data.core.catalog
*/
class CatalogWatcherEx extends CatalogWatcher {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._isDeepWatchEnabled = false;

        // TODO : Filter integration + 'in-depth' recursive calls on ItemAdded if the watcher is 
        //both filtered AND flagged as 'flatten catalog'

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
            this._catalogObserver
                .Unhook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
                .Unhook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
                .Unhook(SIGNAL.SORTED, this._OnSorted, this);

            // Hook root signals
            this._catalogObserver
                .Hook(SIGNAL.ROOT_ITEM_ADDED, this._OnItemAdded, this)
                .Hook(SIGNAL.ROOT_ITEM_REMOVED, this._OnItemRemoved, this);

            if (this._isEnabled && this._catalog) {
                this._RemoveCatalogContent(this._catalog);
                this._AddCatalogContent(this._catalog);
            }

        } else {

            // Unkook root signals
            this._catalogObserver
                .Unhook(SIGNAL.ROOT_ITEM_ADDED, this._OnItemAdded, this)
                .Unhook(SIGNAL.ROOT_ITEM_REMOVED, this._OnItemRemoved, this);

            // Hook regular signals
            this._catalogObserver
                .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
                .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
                .Hook(SIGNAL.SORTED, this._OnSorted, this);

            if (this._isEnabled && this._catalog) {
                this._RemoveCatalogContent(this._catalog);
                this._AddCatalogContent(this._catalog);
            }

        }

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
        if (this._isDeepWatchEnabled) {
            let list = p_catalog._items;
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                if (item.isDir) { this._AddCatalogContent(item); }
                else { this._OnItemAdded(p_catalog, item); }
            }
        } else {
            super._AddCatalogContent(p_catalog);
        }

    }

    /**
     * @access protected
     * @description Goes over the content of a given catalog and calls _OnItemRemoved
     * for each encountered item. 
     * This function is useful when the watcher is disabled with a set catalog to go through.
     * @param {data.core.catalogs.Catalog} p_catalog 
     */
    _RemoveCatalogContent(p_catalog) {
        if (this._isDeepWatchEnabled) {
            let list = p_catalog._items;
            for (let i = 0, n = list.length; i < n; i++) {
                let item = list[i];
                if (item.isDir) { this._RemoveCatalogContent(item); }
                else { this._OnItemRemoved(p_catalog, item, i); }
            }
        } else {
            super._RemoveCatalogContent(p_catalog);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnItemAdded(p_catalog, p_item) {
        if (this._isDeepWatchEnabled) {
            if (p_item.isDir || p_item.rootDistance <= this._catalog.rootDistance) {
                return false;
            }
        }
        return super._OnItemAdded(p_catalog, p_item);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @customtag override-me
     */
    _OnItemRemoved(p_catalog, p_item, p_index) {
        if (this._isDeepWatchEnabled) {
            if (p_item.isDir || p_item.rootDistance <= this._catalog.rootDistance) {
                return false;
            }
        }
        return super._OnItemRemoved(p_catalog, p_item, p_index);
    }

    // ---->

    _CleanUp() {
        this.flattened = false;
        super._CleanUp();
    }



}

module.exports = CatalogWatcherEx;