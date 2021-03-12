'use strict'

const com = require("@nkmjs/common");

const Catalog = require(`./catalog`);

/**
 * @description A Catalog selection is a catalog which item belong to other catalogs.
 * as such it does not own items internally, nor releases them
 * @class
 * @hideconstructor
 * @augments data.core.catalog.Catalog
 * @memberof data.core.catalog
 */
class CatalogSelection extends Catalog {
    constructor() { super(); }


    GetOrCreateCatalog(p_options) { throw new Error(`CatalogSelection does not support item creation.`); }

    Register(p_itemInfos) { throw new Error(`CatalogSelection does not support item creation.`); }

    _OnItemAdded(p_item) {

        //p_item.parent = this;

        this._Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item);
        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        if (this._autoSort) { this._delayedSort.Schedule(); }

    }

    _OnItemRemoved(p_item) {

        this._Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item);
        p_item.Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        //if(p_item.parent === this){
        //    p_item.parent = null;
        //    if(p_item._autoRelease){
        //        p_item.Release();
        //    }
        //}       
    }

    Clear() {

        let list = this._items,
            n = list.length;

        //for(let i = 0, n = list.length; i < n; i++ ){
        //    list[list.length-1].Release();
        //}

        while (n != 0) {
            this.Remove(list[n - 1]);
            n = list.length;
        }

        list.length = 0;
        this._delayedSort.Cancel();

    }

}

module.exports = CatalogSelection;