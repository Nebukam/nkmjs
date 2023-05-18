'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const __Catalog = require(`./catalog`);
const __CatalogItem = require(`./catalog-item`);

module.exports = {
    //#region Builders

    /**
     * @description Parse a string to a catalog-friendly format
     * @param {string} p_path 
     */
    PathInfos: function (p_path) {

        let result = { path: null, isDir: false, name: null, valid: false };

        if (!p_path) { return result; }
        else { result.valid = true; }

        let
            pathSplit = p_path.split(`/`),
            isDir = false,
            name = '';

        if (pathSplit.length === 1) {
            name = pathSplit[0];//Assumed to be a single item
        } else {

            let pathArray = [];

            for (let i = 0, n = pathSplit.length; i < n; i++) {
                let current = pathSplit.shift();
                if (!u.isEmpty(current)) { pathArray.push(current); }
                else if (i === n - 1) { isDir = true; }
            }

            if (isDir) { name = pathArray[pathArray.length - 1]; }
            else { name = pathArray.pop(); }

            result.path = pathArray;

        }

        result.isDir = isDir;
        result.name = name;
        return result;

    },

    /**
     * @description Creates a Catalog from a mockup object.
     * @param {CatalogItemOptions} p_rootOptions
     * @param {array} [p_content] 
     * @param {*} [p_parent] 
     * @returns {data.core.Catalog}
     */
    CreateFrom: function (p_rootOptions, p_content = null, p_parent = null) {
        if (!p_content && !p_rootOptions) { throw new Error(`Cannot create Catalog from null options nor struct.`); }

        let catalog = com.Rent(module.exports.GetItemClass(p_rootOptions, true));
        catalog.options = p_rootOptions;

        if (p_parent) { catalog.parent = p_parent; }

        p_content?.forEach(i => {
            if (u.isArray(i.content)) { module.exports.CreateFrom(i, i.content, catalog); }
            else { catalog.Register(i); }
        });

        return catalog;

    },

    /**
     * @description Find a suitable item class based on provided options
     * @param {object} p_iOpts 
     * @param {boolean} [p_forceCatalog] 
     * @param {data.core.Catalog} [p_catalog] Parent catalog
     * @returns {constructor}
     */
    GetItemClass: function (p_iOpts, p_forceCatalog = false, p_catalog = null) {

        let iClass = null;

        if (u.isObject(p_iOpts)) {

            let data = p_iOpts.data || null;

            if (data) {
                let ctx = p_catalog ? p_catalog : __Catalog;
                if (u.isObject(ctx)) { ctx = ctx.constructor; }
                iClass = com.BINDINGS.Get(ctx, data, null);
            }

            if (!iClass) {
                if (p_forceCatalog || u.isArray(p_iOpts.content)) { iClass = p_catalog?._localCatalogClass || p_iOpts.itemClass || __Catalog; }
                else { iClass = p_iOpts.itemClass || (p_catalog ? p_catalog._localItemClass : null) || __CatalogItem; }
            }
        } else {
            iClass = p_forceCatalog ? __Catalog : (p_catalog ? p_catalog._localItemClass : null) || __CatalogItem;
        }

        return iClass;
    },

    //#endregion

    //#region Helpers

    _Filters: function (p_item, p_filters) {
        for (let i = 0, n = p_filters.length; i < n; i++) { if (!p_filters[i](p_item)) { return false; } }
        return true;
    },

    Find: function (p_catalog, ...p_filters) {
        for (let i = 0, n = p_catalog._items.length; i < n; i++) {
            let item = p_catalog._items[i];
            if (module.exports._Filters(item, p_filters)) { return item; }
            if (u.isInstanceOf(item, __Catalog)) {
                item = module.exports.Find(p_catalog, p_filters);
                if (item) { return item; }
            }
        }
        return null;
    },

    Filter: function (p_catalog, ...p_filters) {

        let results = p_filters.pop();

        if (!u.isArray(results)) {
            p_filters.push(results);
            results = [];
        }

        for (let i = 0, n = p_catalog._items.length; i < n; i++) {
            let item = p_catalog._items[i];
            if (module.exports._Filters(item, p_filters)) { results.push(item); }
            if (u.isInstanceOf(item, __Catalog)) { item = module.exports.Filter(p_catalog, ...p_filters, results); }
        }

        return results;

    },

    StructToString: function (p_catalog, p_string = null, p_depth = null) {

        if (!p_string) { p_string = ''; }
        if (u.isVoid(p_depth)) { p_depth = -1; }
        p_depth++;

        let s = `\t`,
            spaces = ``;

        for (let i = 0; i < p_depth; i++) { spaces += s; }

        p_string += `${spaces}/${p_catalog.name} \n`;

        for (let i = 0, n = p_catalog._items.length; i < n; i++) {
            let item = p_catalog._items[i];
            if (u.isInstanceOf(item, __Catalog)) {
                p_string = item.StructToString(p_string, p_depth);
            } else {
                p_string += `${spaces}${s}· ${item.name}\n`;
            }
        }

        return p_string;
    },

    //#endregion

}

__Catalog.__getItemClass = module.exports.GetItemClass;