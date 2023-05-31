'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const SIGNAL = require(`./catalog-signal`);
const SORTING = com.SORTING;
const CatalogItem = require(`./catalog-item`);

/**
 * @typedef CatalogItemOptions
 * @description TODO
 * @param {data.core.DataBlock} data  
 * @param {string} path 
 * @param {string} name 
 * @param {string} icon
 * @param {actions.Command} primaryCommand
 * @param {actions.Command} secondaryCommand
 * @param {actions.Command} commandList  
 * @param {boolean} autoSort  
 */

const base = CatalogItem;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.catalogs.CatalogItem
 * @memberof data.core.catalog
 */
class Catalog extends base {
    constructor(p_autoSort = true) { super(); this.autoSort = p_autoSort; }

    static __getItemClass = null;

    static __distribute = base.__distribute.Ext({ beginFn: `_OnOptionsWillUpdate` })
        .To(`autoSort`)
        .To(`defaultSortFunc`)
        .To(`localItemClass`, `_localItemClass`, null)
        .To(`localCatalogClass`, `_localCatalogClass`, null)
        .To(`expanded`);

    _Init() {

        super._Init();

        this._expanded = false;

        this._items = [];
        this._rootCatalog = this;

        this._sortPending = false;
        this._autoSort = true;
        this._defaultSortFunc = null;
        this._delayedSort = com.DelayedCall(this._Bind(this.Sort));

        this._localItemClass = null;
        this._localCatalogClass = null;

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isDir() { return true; }

    /**
     * @description TODO
     * @type {boolean}
     */
    get expanded() { return this._expanded; }
    set expanded(p_value) { this._expanded = p_value; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get length() { return this._items.length; }

    /**
     * @access protected
     * @description TODO
     * @type {data.core.Catalog}
     * @customtag write-only
     */
    set rootCatalog(p_value) {
        if (this._rootCatalog === p_value) { return; }
        this._rootCatalog = p_value;
        let distancePlusOne = this._rootDistance + 1;
        for (let i = 0, n = this._items.length; i < n; i++) {
            let item = this._items[i];
            item.rootCatalog = this._rootCatalog;
            item.rootDistance = distancePlusOne;

        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_options 
     */
    _OnOptionsWillUpdate(p_options) {
        this.autoSort = p_options.autoSort || this._parent?.autoSort || this._autoSort;
    }

    /**
     * @description TODOReturns the item at the specified position in this catalog.
     * @param {number} p_index the item's index.
     * @returns {data.core.catalogs.CatalogItem|data.core.catalogs.Catalog} The item present at the given index. Otherwise throws an out-of-bound error.
     */
    At(p_index) { return this._items[p_index]; }

    /**
     * @description Loops through all items in Catalog. Callback should match the signature :
     * (item, index)
     * @param {function} p_fn
     * @param {object} [p_thisArg]
     * @param {boolean} [p_reverse]
     */
    ForEach(p_fn, p_thisArg = null) {
        let i = 0;
        for (const item of this._items) { p_fn.call(p_thisArg, item, i++); }
    }

    //#region Child management

    /**
     * @description Gets or create a catalog inside this one using the specified options
     * @param {CatalogItemOptions} p_options
     * @returns {data.core.catalogs.Catalog} Either a new catalog with the provided options, otherwise an existing one that matches them.
     */
    GetOrCreateCatalog(p_options) {

        let cName = u.isString(p_options) ? p_options : p_options[com.IDS.NAME];

        let list = this._items,
            catalog = this._items.find(item => { return u.isInstanceOf(item, Catalog) && item.name === cName; });

        if (catalog) { return catalog; }

        catalog = com.Rent(Catalog.__getItemClass(p_options, true, this));
        catalog.options = u.tils.Ensure(u.isObject(p_options) ? p_options : {}, {
            [com.IDS.NAME]: cName,
            [com.IDS.ICON]: `directory`
        });

        return this.Add(catalog);

    }

    /**
     * @description Create a catalog item given the specified item infos.
     * @param {CatalogItemOptions} p_itemInfos 
     * @returns {data.core.catalogs.CatalogItem|data.core.catalogs.Catalog} A new catalog or item, based on the provided itemInfos
     */
    Register(p_itemInfos) {

        if (!p_itemInfos) { throw new Error(`Cannot register item with null infos`); }

        let pathInfos = Catalog.__getItemClass(p_itemInfos.path);

        //If no valid path is provided, simply create and return a new CatalogItem
        if (!pathInfos.valid || !pathInfos.path) {
            let item = com.Rent(Catalog.__getItemClass(p_itemInfos, false, this));
            item.options = u.tils.EnsureMultiple(p_itemInfos, {
                [com.IDS.NAME]: pathInfos.name,
                [com.IDS.ICON]: `document`
            });
            return this.Add(item);
        }

        //Given a path we reach for the root to handle registration
        if (this._rootCatalog != this) { return this._rootCatalog.Register(p_itemInfos); }

        //As the root, resolve or create the provided path
        let path = pathInfos.path,
            catalog = null;

        for (let i = 0, n = path.length; i < n; i++) {
            catalog = (i === 0 ? this : catalog).GetOrCreateCatalog(path[i]);
        }

        if (pathInfos.isDir) {
            catalog.options = u.tils.EnsureMultiple(p_itemInfos, {
                [com.IDS.NAME]: pathInfos.name,
                [com.IDS.ICON]: `directory`
            });
            return catalog;
        } else {
            let item = com.Rent(Catalog.__getItemClass(p_itemInfos, false, catalog));
            item.options = u.tils.EnsureMultiple(p_itemInfos, {
                [com.IDS.NAME]: pathInfos.name,
                [com.IDS.ICON]: `document`
            });
            return catalog.Add(item);
        }

    }

    /**
     * @description Add the specified item to this catalog
     * @param {data.core.CatalogItem|data.core.Catalog} p_item 
     * @returns {data.core.CatalogItem|data.core.Catalog} If it is newly added, returns the item. Otherwise, returns null.
     */
    Add(p_item) {

        if (!u.isInstanceOf(p_item, CatalogItem)) { throw new Error(`Cannot Add a non-CatalogItem (${p_item}) to Catalog.`); }

        if (!this._items.AddNew(p_item)) { return null; }

        p_item.parent = this;
        p_item.rootCatalog = this._rootCatalog;
        p_item.rootDistance = this._rootDistance + 1;

        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        if (this._rootCatalog) {
            this._rootCatalog.Broadcast(SIGNAL.ROOT_ITEM_ADDED, this._rootCatalog, p_item);
        }

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item);
        if (this._autoSort) { this._delayedSort.Schedule(); }

        return p_item;

    }

    /**
     * @access protected
     * @description Callback when an item has been released
     * @param {data.core.CatalogItem|data.core.Catalog} p_item 
     */
    _OnItemReleased(p_item) { this.Remove(p_item); }

    /**
     * @description Removes the specified item from this catalog
     * @param {data.core.CatalogItem} p_item 
     */
    Remove(p_item) {

        if (!u.isInstanceOf(p_item, CatalogItem) ||
            !this._items.Remove(p_item)) { return; }

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, p_index);

        if (this._rootCatalog) {
            this._rootCatalog.Broadcast(SIGNAL.ROOT_ITEM_REMOVED, this._rootCatalog, p_item, p_index);
        }

        p_item.Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        if (p_item.parent === this) {
            p_item.parent = null;
            if (p_item.autoRelease) { p_item.Release(); }
        }

    }

    /**
     * @description Resolve the specified path and return the item if it exists.
     * @param {string|array} p_path
     * @param {number} [p_from]
     */
    Resolve(p_path, p_from = 0) {
        //TODO:Resolve path or id, based on whether it`s an array or a string
    }

    //#endregion

    //#region Sorting

    /**
     * @description TODO
     * @type {boolean}
     * @group Sorting
     */
    get autoSort() { return this._autoSort; }
    set autoSort(p_value) {
        if (this._autoSort === p_value) { return; }
        this._autoSort = p_value;
        if (p_value) { this._delayedSort.Schedule(); }
        else { this._delayedSort.Cancel(); }
    }

    /**
     * @description TODO
     * @type {function}
     * @group Sorting
     */
    get defaultSortFunc() { return this._defaultSortFunc; }
    set defaultSortFunc(p_value) { this._defaultSortFunc = p_value; }

    /**
     * @description Sort this Catalog based on sorting options. Format :
     * { id:'id to look for and test (optional)', fn:'sorting function' }.
     * Triggers a 'SORTED' signal if the Catalog has been effectively sorted.
     * @param {object} p_options Optional sorting options
     * @param {function} p_options.fn sorting function
     * @param {string} p_options.id option id to check
     * @group Sorting
     */
    Sort(p_options = null) {

        let sorted = false;
        if (!p_options) {
            this._items.sort(this._defaultSortFunc ? this._defaultSortFunc : SORTING.NAME_ASC);
            sorted = true;
        } else {
            if (p_options.id) {
                SORTING.SortByMember(this, p_options.id, p_options.fn);
                sorted = true;
            } else if (p_options.fn) {
                this._items.sort(p_options.fn);
                sorted = true;
            }
        }

        if (sorted) { this.Broadcast(com.SIGNAL.SORTED, this); }

    }

    //#endregion

    /**
     * @description Clears the catalog and releases all items
     */
    Clear() {
        while (this._items.length) { this._items.pop().Release(); }
        this._delayedSort.Cancel();
    }

    _CleanUp() {
        this.Clear();
        this._autoSort = true;
        this._defaultSortFunc = null;
        super._CleanUp();
        this._rootCatalog = this;
        this._rootDistance = -1;
        this._localItemClass = null;
        this._localCatalogClass = null;
    }

    toString() {
        //starts with `!` to ensure this gets sorted first in arrays
        return `!${this._name} (${this._items.length})`;
    }

}

module.exports = Catalog;