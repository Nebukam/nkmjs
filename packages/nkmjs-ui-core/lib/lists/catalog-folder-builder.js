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
        this._defaultGroupClass = null;

        this._folderHost = null;
        this._itemStreamer = null;

        this._itemList = [];

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get folderHost() { return this._folderHost; }
    set folderHost(p_value) { this._folderHost = p_value; }

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
            host = this._folderHost;

        this._folderHost = fragment;

        super._AddCatalogContent(p_catalog, p_deep);

        dom.Attach(fragment, host);

        this._folderHost = host;

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
                ownerCount = this._owner._displayList.count,
                insertIndex = ownerCount > 1 ? ownerCount - 2 : ownerCount - 1,
                mappedObject = this._owner.Add(
                    com.BINDINGS.Get(this._owner, p_item, this._defaultGroupClass),
                    `item group`, this._folderHost, insertIndex);

            this._map.set(p_item, mappedObject);
            mappedObject.data = p_item;

            this._Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, mappedObject);

        } else {
            this._itemList.push(p_item);
            //TODO: Update streamer ?
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

        if (p_item.isDir) {
            let mappedObject = super._OnItemRemoved(p_catalog, p_item, p_index);
            if (mappedObject === false) { return false; }

            this._Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, mappedObject, p_index);
            if (mappedObject) { mappedObject.Release(); }

            return mappedObject;
        } else {
            let index = this._itemList.indexOf(p_item);
            if (index != -1) { this._itemList.splice(index, 1); }
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

            let item = this._items[i];

            if (p_item.isDir) {
                let mappedObject = this._map.get(item);
                if (!mappedObject) { continue; }
                index++;
            } else if (this._itemList.includes(p_item)) {
                this._itemList.push(newItemList);
            }
        }

        this._itemLis.length = 0;
        this._itemList = newItemList;

        super._OnSorted(p_catalog);

    }

    //#region item streaming

    _OnItemRequestRangeUpdate(p_streamer, p_infos) {

    }

    _OnItemRequest(p_streamer, p_index, p_fragment) {

        let
            item = this._itemList[p_index],
            mappedObject = this._owner.Add(
                com.BINDINGS.Get(this._owner, item, this._defaultItemClass),
                `item`, p_fragment);

        mappedObject.Watch(com.SIGNAL.RELEASED, this._OnStreamedItemRelelased, this);
        this._map.set(item, mappedObject);
        mappedObject.data = item;

        this._Broadcast(com.SIGNAL.ITEM_ADDED, this, item, mappedObject);

        p_streamer.ItemRequestAnswer(p_index, mappedObject);

    }

    _OnStreamedItemRelelased(p_mappedItem) {
        //TODO: Streamer got updated!
        let item = p_mappedItem.data;
        this._map.delete(item);
    }

    //#endregion

    _CleanUp() {

        this._defaultItemClass = null;
        this._defaultGroupClass = null;

        this._folderHost = null;

        super._CleanUp();

    }



}

module.exports = CatalogFolderBuilder;