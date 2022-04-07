'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const collections = require("@nkmjs/collections");

const SIGNAL = require(`../signal`);
const dom = require(`../utils-dom`);


/**
 * @description A CatalogBuilder observe a catalog's additions and removals 
 * and keeps a display list up to date.
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogWatcher
 * @memberof ui.core.helpers
 */
class CatalogFolderBuilder extends data.catalogs.CatalogWatcher {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._defaultItemClass = null;
        this._defaultDirClass = null;

        this._insideBatch = false;

        this._host = null;
        this._itemStreamer = null;

        this._itemList = [];

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get host() { return this._host; }
    set host(p_value) { this._host = p_value; }

    /**
     * @description TODO
     * @type {Element}
     */
    get itemStreamer() { return this._itemStreamer; }
    set itemStreamer(p_value) {
        if (this._itemStreamer == p_value) { return; }
        let oldStreamer = this._itemStreamer;
        this._itemStreamer = p_value;
        if (oldStreamer) {
            oldStreamer
                .Unwatch(SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this._OnItemRequestRangeUpdate, this)
                .Unwatch(SIGNAL.ITEM_REQUESTED, this._OnItemRequest, this);
        }
        if (this._itemStreamer) {
            this._itemStreamer
                .Watch(SIGNAL.ITEM_REQUEST_RANGE_UPDATE, this._OnItemRequestRangeUpdate, this)
                .Watch(SIGNAL.ITEM_REQUESTED, this._OnItemRequest, this);
        }
    }

    _AddCatalogContent(p_catalog, p_deep = false) {

        let
            fragment = document.createDocumentFragment(),
            tempHost = this._host;

        this._host = fragment;
        this._insideBatch = true;
        this._itemList.length = 0;

        super._AddCatalogContent(p_catalog, p_deep);

        dom.Attach(fragment, tempHost);

        this._insideBatch = false;
        this._host = tempHost;

        this._itemStreamer.itemCount = this._itemList.length;
        //TODO: Update streamer

    }

    _RemoveCatalogContent(p_catalog) {

        this._insideBatch = true;
        this._itemList.length = 0;

        let list = p_catalog._items;
        for (let i = 0, n = list.length; i < n; i++) { this._OnItemRemoved(p_catalog, list[i], i); }

        this._insideBatch = false;
        this._itemStreamer.itemCount = 0;
        this._itemStreamer._ClearItems();

        if( this._owner){
            let selStack = this._owner.selectionStack;
            if(selStack){ selStack.Clear(); }
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnItemAdded(p_catalog, p_item) {

        if (!super._OnItemAdded(p_catalog, p_item)) { return false; }

        if (p_item.isDir) {

            let
                mappedObject = this._owner.Attach(
                    com.BINDINGS.Get(this._owner, p_item, this._defaultDirClass),
                    `item group`, this._host);

            this._map.set(p_item, mappedObject);
            mappedObject.data = p_item;

            this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, mappedObject);

        } else {
            this._itemList.push(p_item);
            if (!this._insideBatch) {
                this._itemStreamer.itemCount++;
            }
        }

        return true;

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnItemRemoved(p_catalog, p_item, p_index) {

        let selStack = this._owner.selectionStack;
        if(selStack){ selStack.data.Remove(p_item); }

        if (p_item.isDir) {
            let mappedObject = super._OnItemRemoved(p_catalog, p_item, p_index);
            if (mappedObject === false) { return false; }

            this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedObject, p_index);
            if (mappedObject) { mappedObject.Release(); }

            return mappedObject;
        } else {
            if (!this._insideBatch) {
                let index = this._itemList.indexOf(p_item);
                if (index != -1) {
                    this._itemList.splice(index, 1);
                    this._itemStreamer.itemCount--;
                }
            }
            //TODO: Update streamer
            return null;
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {data.core.catalogs.Catalog} p_catalog 
     */
    _OnSorted(p_catalog) {

        let list = this._catalog._items,
            index = 0;

        let newItemList = [];

        for (let i = 0, n = list.length; i < n; i++) {

            let item = list[i];

            if (item.isDir) {
                let mappedObject = this._map.get(item);
                if (!mappedObject) { continue; }
                index++;
            } else if (this._itemList.includes(item)) {
                this._itemList.push(newItemList);
            }
        }

        this._itemList.length = 0;
        this._itemList = newItemList;

        super._OnSorted(p_catalog);

    }

    //#region item streaming

    _OnItemRequestRangeUpdate(p_streamer, p_infos) {

    }

    _OnItemRequest(p_streamer, p_index, p_fragment, p_returnFn) {

        let
            item = this._itemList[p_index],
            mappedObject = this._owner.Attach(
                com.BINDINGS.Get(this._owner, item, this._defaultItemClass),
                `item`, p_fragment);

        mappedObject.Watch(com.SIGNAL.RELEASED, this._OnStreamedItemRelelased, this);
        this._map.set(item, mappedObject);
        mappedObject.data = item;

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, item, mappedObject);


        let selStack = this._owner.selectionStack;
        if(selStack){ selStack.Check(mappedObject); }

        p_returnFn(p_index, mappedObject);

    }

    _OnStreamedItemRelelased(p_mappedItem) {
        //TODO: Streamer got updated!
        let item = p_mappedItem.data;
        this._map.delete(item);
    }

    //#endregion

    _CleanUp() {

        this._defaultItemClass = null;
        this._defaultDirClass = null;

        this._host = null;

        super._CleanUp();

    }



}

module.exports = CatalogFolderBuilder;