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
     * @description TODO
     * @param {ui.core.views.View} p_view 
     * @returns 
     */
    Owns(p_view) {
        if (!p_view) { return false; }
        return this._reverseMap.has(p_view);
    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnItemAdded(p_catalog, p_item) {

        if (!super._OnItemAdded(p_catalog, p_item)) { return false; }

        // Create the view

        let view = p_item.GetOption(IDS.VIEW, null);

        if (!view) {

            let viewClass = p_item.GetOption(IDS.VIEW_CLASS, null);
            if (!viewClass) { console.log(p_item); throw new Error(`Shelf's item has neither a [ui.IDS.VIEW] or [ui.IDS.VIEW_CLASS] property.`); }
            if (!u.isInstanceOf(viewClass, View)) { throw new Error(`[ui.IDS.VIEW_CLASS] (${viewClass.name}) is not of type View`); }

            view = UI.Rent(viewClass);
            p_item.SetOption(IDS.VIEW, view);

        } else {
            if (!u.isInstanceOf(view, View)) { throw new Error(`view is not of type View.`); }
        }

        this._map.set(p_item, view);
        this._reverseMap.set(view, p_item);

        if (p_item.data) { view.data = p_item.data; }
        else { view.data = p_item; }

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, view);
        return true;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnItemRemoved(p_catalog, p_item, p_index) {

        let mappedView = super._OnItemRemoved(p_catalog, p_item, p_index);
        if (mappedView === false) { return false; }

        this._reverseMap.delete(mappedView);
        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedView, p_index);
        mappedView.Release();

        return mappedView;

    }

}

module.exports = CatalogViewBuilder;