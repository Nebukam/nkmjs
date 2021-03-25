'use strict';

const com = require("@nkmjs/common");

const CatalogWatcher = require(`./catalog-watcher`);

 /**
 * @description A CatalogHandler is a basic implementation of the CatalogWatcher.
 * It simply dispatches an addition event as well as releases any mapped object on deletion.
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogWatcher
 * @memberof data.core.catalog
 */
class CatalogHandler extends CatalogWatcher {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();
        // TODO : Proper CatalogWatcher integration

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_catalog, p_item) {

        if (!super._OnCatalogItemAdded(p_catalog, p_item)) { return false; }

        this._Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, null);

        return true;
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemRemoved(p_catalog, p_item, p_index) {

        let mappedObject = super._OnCatalogItemRemoved(p_catalog, p_item, p_index);
        if (mappedObject === false) { return false; }

        this._Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedObject);
        return mappedObject;
        
    }

}

module.exports = CatalogHandler;