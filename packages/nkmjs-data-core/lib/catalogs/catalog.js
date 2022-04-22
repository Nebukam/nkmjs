'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const SIGNAL = require(`./catalog-signal`);
const SORTING = require(`./catalog-sorting`);
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

    static __default_catalogClass = Catalog;
    static __default_itemClass = CatalogItem;

    //#region Static methods

    /**
     * @description Parse a string to a catalog-friendly format
     * @param {string} p_path 
     */
    static PathInfos(p_path) {

        let result = {
            path: null,
            isDir: false,
            name: null,
            valid: false
        };

        if (!p_path) {
            return result;
        } else {
            result.valid = true;
        }

        let pathSplit = p_path.split(`/`),
            isDir = false,
            name = '';

        if (pathSplit.length === 1) {
            //Assumed to be a single item
            name = pathSplit[0];
        } else {

            let pathArray = [];

            for (let i = 0, n = pathSplit.length; i < n; i++) {
                let current = pathSplit.shift();
                if (!u.isEmpty(current)) {
                    pathArray.push(current);
                } else if (i === n - 1) {
                    isDir = true;
                }
            }

            if (isDir) {
                name = pathArray[pathArray.length - 1];
            } else {
                name = pathArray.pop();
            }

            result.path = pathArray;

        }

        result.isDir = isDir;
        result.name = name;
        return result;

    }

    /**
     * @description Creates a Catalog from a mockup object.
     * @param {CatalogItemOptions} p_rootOptions
     * @param {array} [p_content] 
     * @param {*} [p_parent] 
     * @returns {data.core.Catalog}
     */
    static CreateFrom(p_rootOptions, p_content = null, p_parent = null) {
        if (!p_content && !p_rootOptions) { throw new Error(`Cannot create Catalog from null options nor struct.`); }

        let catalog = com.Rent(this.GetItemClass(p_rootOptions, true));
        catalog.options = p_rootOptions;

        if (p_parent) { catalog.parent = p_parent; }

        if (p_content) {

            for (let i = 0, n = p_content.length; i < n; i++) {
                let item_options = p_content[i];
                if (item_options.hasOwnProperty(`content`)) {
                    Catalog.CreateFrom(item_options, item_options.content, catalog);
                } else {
                    catalog.Register(item_options);
                }
            }

        }

        return catalog;

    }

    /**
     * @description Find a suitable item class based on provided options
     * @param {object} p_itemOptions 
     * @param {boolean} [p_forceCatalog] 
     * @param {data.core.Catalog} [p_catalog] Parent catalog
     * @returns {constructor}
     */
    static GetItemClass(p_itemOptions, p_forceCatalog = false, p_catalog = null) {

        let itemClass = null;

        if (u.isObject(p_itemOptions)) {

            let data = u.tils.Get(p_itemOptions, `data`, null);

            if (data) {
                let context = p_catalog ? p_catalog : Catalog;
                if (u.isObject(context)) { context = context.constructor; }
                itemClass = com.BINDINGS.Get(context, data, null);
            }

            if (!itemClass) {
                if (p_forceCatalog || u.isArray(u.tils.Get(p_itemOptions, `content`, null))) { itemClass = (p_catalog ? p_catalog._localCatalogClass : p_itemOptions.itemClass) || this.__default_catalogClass; }
                else { itemClass = p_itemOptions.itemClass || (p_catalog ? p_catalog._localItemClass : null) || this.__default_itemClass; }
            }
        } else {
            itemClass = p_forceCatalog ? this.__default_catalogClass : (p_catalog ? p_catalog._localItemClass : null) || this.__default_itemClass;
        }

        return itemClass;
    }

    //#endregion

    static __distribute = base.__distribute.Ext({ beginFn: `_OnOptionsWillUpdate` })
        .To(`autoSort`)
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
        this._delayedSort = new com.time.DelayedCall(this._Bind(this.Sort));

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
    get count() { return this._items.length; }

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
        this.autoSort = u.tils.Get(p_options, `autoSort`, this._parent ? this._parent.autoSort : this._autoSort);
    }

    /**
     * @description TODOReturns the item at the specified position in this catalog.
     * @param {number} p_index the item's index.
     * @returns {data.core.catalogs.CatalogItem|data.core.catalogs.Catalog} The item present at the given index. Otherwise throws an out-of-bound error.
     */
    At(p_index) {
        if (this._items.length <= p_index) { throw new Error(`Argument error : Catalog index outside boundaries.`); }
        return this._items[p_index];
    }

    /**
     * @description Loops through all items in Catalog. Callback should match the signature :
     * (item, index)
     * @param {function} p_fn
     * @param {object} [p_thisArg]
     * @param {boolean} [p_reverse]
     */
    ForEach(p_fn, p_thisArg = null, p_reverse = false) {

        let n = this._items.length;

        if (p_thisArg) {
            if (p_reverse) {
                for (let i = n - 1; i >= 0; i--) {
                    p_fn.call(p_thisArg, this._items[i], i);
                }
            }
            else {
                for (let i = 0; i < n; i++) {
                    p_fn.call(p_thisArg, this._items[i], i);
                }
            }
        }
        else {
            if (p_reverse) {
                for (let i = n - 1; i >= 0; i--) {
                    p_fn.call(null, this._items[i], i);
                }
            }
            else {
                for (let i = 0; i < n; i++) {
                    p_fn.call(null, this._items[i], i);
                }
            }
        }
    }

    //#region Child management

    /**
     * @description Gets or create a catalog inside this one using the specified options
     * @param {CatalogItemOptions} p_options
     * @returns {data.core.catalogs.Catalog} Either a new catalog with the provided options, otherwise an existing one that matches them.
     */
    GetOrCreateCatalog(p_options) {

        let catalogName = u.isString(p_options) ? p_options : p_options[com.IDS.NAME];

        let list = this._items,
            catalog = null;

        for (let i = 0, n = list.length; i < n; i++) {
            catalog = list[i];
            if (u.isInstanceOf(catalog, Catalog) && catalog.name === catalogName) { return catalog; }
        }

        catalog = com.Rent(Catalog.GetItemClass(p_options, true, this));
        catalog.options = u.tils.Ensure(u.isObject(p_options) ? p_options : {}, {
            [com.IDS.NAME]: catalogName,
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

        let pathInfos = Catalog.PathInfos(p_itemInfos.path);

        //If no valid path is provided, simply create and return a new CatalogItem
        if (!pathInfos.valid || !pathInfos.path) {
            let item = com.Rent(Catalog.GetItemClass(p_itemInfos, false, this));
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
            let item = com.Rent(Catalog.GetItemClass(p_itemInfos, false, catalog));
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

        if (this._items.includes(p_item)) { return null; }

        this._items.push(p_item);
        this._OnItemAdded(p_item);

        return p_item;

    }

    /**
     * @access protected
     * @description Callback when an item has been added to the catalog
     * @param {data.core.CatalogItem|data.core.Catalog} p_item 
     */
    _OnItemAdded(p_item) {


        p_item.parent = this;
        p_item.rootCatalog = this._rootCatalog;
        p_item.rootDistance = this._rootDistance + 1;

        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        if (this._rootCatalog) {
            this._rootCatalog.Broadcast(SIGNAL.ROOT_ITEM_ADDED, this._rootCatalog, p_item);
        }

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item);

        if (this._autoSort) { this._delayedSort.Schedule(); }

    }

    /**
     * @access protected
     * @description Callback when an item has been released
     * @param {data.core.CatalogItem|data.core.Catalog} p_item 
     */
    _OnItemReleased(p_item) {
        this.Remove(p_item);
    }

    /**
     * @description Removes the specified item from this catalog
     * @param {data.core.CatalogItem} p_item 
     */
    Remove(p_item) {
        if (!u.isInstanceOf(p_item, CatalogItem)) { return; }

        let index = this._items.indexOf(p_item);
        if (index === -1) { return; }

        this._items.splice(index, 1);
        this._OnItemRemoved(p_item, index);
    }

    /**
     * @access protected
     * @description Callback when an item is removed from this catalog
     * @param {data.core.CatalogItem} p_item 
     */
    _OnItemRemoved(p_item, p_index) {
        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, p_index);

        if (this._rootCatalog) {
            this._rootCatalog.Broadcast(SIGNAL.ROOT_ITEM_REMOVED, this._rootCatalog, p_item, p_index);
        }

        p_item.Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        if (p_item.parent === this) {
            p_item.parent = null;
            if (p_item.autoRelease) {
                p_item.Release();
            }
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

    //#region Search

    /**
     * @description TODO // Replace with Filter
     * @param {*} p_data 
     * @param {array} [p_results]
     * @group Searching
     */
    FindDataHolders(p_data, p_results = null) {

        if (!p_results) { p_results = []; }

        for (let i = 0, n = this._items.length; i < n; i++) {
            let item = this._items[i];
            if (item.data === p_data) {
                if (!p_results.includes(item)) {
                    p_results.push(item);
                }
            }
            if (u.isInstanceOf(item, Catalog)) {
                item.FindDataHolders(p_data, p_results);
            }
        }

        return p_results;

    }

    /**
     * @description TODO // Replace with Filter
     * @param {*} p_data 
     * @group Searching
     */
    FindFirstDataHolder(p_data, p_recursive = false) {

        for (let i = 0, n = this._items.length; i < n; i++) {
            let item = this._items[i];
            if (item.data === p_data) { return item; }
            if (p_recursive) {
                if (u.isInstanceOf(item, Catalog)) {
                    item = item.FindDataHolders(p_data);
                    if (item) { return item; }
                }
            }
        }

        return null;

    }

    /**
     * @description TODO // Replace with Filter
     * @param {string} p_stringID 
     * @group Searching
     */
    FindFirstDataByStringID(p_stringID, p_recursive = false) {

        for (let i = 0, n = this._items.length; i < n; i++) {
            let item = this._items[i],
                idata = item.data;
            if (idata && idata.id && idata.id.name === p_stringID) {
                return item;
            }
        }

        return null;

    }

    /**
     * @description TODO // Replace with Filter
     * @param {string} p_key 
     * @param {*} p_value 
     * @param {number} p_recursive
     * @group Searching
     */
    FindFirstByOptionValue(p_key, p_value, p_recursive = false) {

        for (let i = 0, n = this._items.length; i < n; i++) {

            let item = this._items[i],
                opt = item._options[p_key];

            if (opt === p_value) { return item; }
            if (p_recursive) {
                if (u.isInstanceOf(item, Catalog)) {
                    let result = item.FindFirstByOptionValue(p_key, p_value, true);
                    if (result) { return result; }
                }
            }

        }

        return null;
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
                SORTING.SortByOption(this, p_options.id, p_options.fn);
                sorted = true;
            } else if (p_options.fn) {
                this._items.sort(p_options.fn);
                sorted = true;
            }
        }

        if (sorted) { this.Broadcast(SIGNAL.SORTED, this); }

    }

    //#endregion

    /**
     * @description Clears the catalog and releases all items
     */
    Clear() {
        while (this._items != 0) { this._items.pop().Release(); }
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

    /**
     * @description TODO
     * @param {string} [p_string]
     * @param {number} [p_depth]
     * @customtag debug
     */
    StructToString(p_string = null, p_depth = null) {

        if (!p_string) { p_string = ''; }
        if (u.isVoid(p_depth)) { p_depth = -1; }
        p_depth++;

        let s = `\t`,
            spaces = ``;

        for (let i = 0; i < p_depth; i++) { spaces += s; }

        p_string += `${spaces}/${this._name} \n`;

        for (let i = 0, n = this._items.length; i < n; i++) {
            let item = this._items[i];
            if (u.isInstanceOf(item, Catalog)) {
                p_string = item.StructToString(p_string, p_depth);
            } else {
                p_string += `${spaces}${s}· ${item.name}\n`;
            }
        }

        return p_string;
    }

    toString() {
        //starts with `!` to ensure this gets sorted first in arrays
        return `!${this._name} (${this._items.length})`;
    }

}

module.exports = Catalog;