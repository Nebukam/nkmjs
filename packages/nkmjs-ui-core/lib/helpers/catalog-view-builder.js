'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

const UI = require(`../ui`);
const IDS = require(`../ids`);
const View = require(`../views/view`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogWatcher
 * @memberof ui.core.helpers
 */
class CatalogViewBuilder extends data.catalogs.CatalogWatcher {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._reverseMap = new Map();
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_catalog, p_item) {

        if (!super._OnCatalogItemAdded(p_catalog, p_item)) { return false; }

        // Create the view

        let view = p_item.GetOption(`view`, null);

        if (!view) {

            let viewType = p_item.GetOption(`viewType`, null);
            if (!viewType) { throw new Error(`Shelf's item has neither a view or a viewType set.`); }
            if (!u.isInstanceOf(viewType, View)) { throw new Error(`viewType (${viewType.name}) is not of type View`); }

            view = UI.Rent(viewType);
            p_item.SetOption(IDS.VIEW, view);

        } else {
            if (!u.isInstanceOf(view, View)) { throw new Error(`view is not of type View.`); }
        }

        this._map.set(p_item, view);
        this._reverseMap.set(view, p_item);

        if (p_item.data) { view.data = p_item.data; }
        else { view.data = p_item; }

        this._Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, view);
        return true;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemRemoved(p_catalog, p_item) {

        let mappedView = super._OnCatalogItemRemoved(p_catalog, p_item);
        if (mappedView === false) { return false; }

        this._reverseMap.delete(mappedView);
        this._Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedView);
        mappedView.Release();

        return mappedView;

    }

}

module.exports = CatalogViewBuilder;