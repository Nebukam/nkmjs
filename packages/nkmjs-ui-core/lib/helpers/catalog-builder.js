'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);

/**
 * @description A CatalogBuilder observe a catalog's additions and removals 
 * and keeps a display list up to date.
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogWatcher
 * @memberof ui.core.helpers
 */
class CatalogBuilder extends data.catalogs.CatalogWatcher {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._defaultItemClass = null;
        this._defaultGroupClass = null;

        this._host = null;

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get host() { return this._host; }
    set host(p_value) { this._host = p_value; }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_catalog, p_item) {

        if (!super._OnCatalogItemAdded(p_catalog, p_item)) { return false; }

        let mappedObject = null;

        //console.log(`${this._defaultItemClass.name} || ${this._defaultGroupClass.name}`);

        if (u.isInstanceOf(p_item, data.catalogs.Catalog)) {
            mappedObject = this._owner.Add(
                com.BINDINGS.Get(this._owner, p_item, this._defaultGroupClass),
                `item group`, this._host);
        } else {
            mappedObject = this._owner.Add(
                com.BINDINGS.Get(this._owner, p_item, this._defaultItemClass),
                `item`, this._host);
        }


        this._map.set(p_item, mappedObject);
        mappedObject.data = p_item;

        this._Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, mappedObject);

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

        this._Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedObject, p_index);
        if (mappedObject) { mappedObject.Release(); }

        return mappedObject;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     */
    _OnCatalogSorted(p_catalog) {

        let list = this._catalog._items,
            index = 0;

        for (let i = 0, n = list.length; i < n; i++) {

            let item = this._items[i],
                mappedObject = this._map.get(item);

            if (!mappedObject) { continue; }

            if (item.isDir) { mappedObject.order = index; }
            else { mappedObject.order = this._itemCount + index; }

            index++;

        }

        super._OnCatalogSorted(p_catalog);

    }

    _CleanUp() {

        this._defaultItemClass = null;
        this._defaultGroupClass = null;

        this._host = null;

        super._CleanUp();

    }



}

module.exports = CatalogBuilder;