'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const __Catalog = require(`./catalog`);
const __CatalogItem = require(`./catalog-item`);

const helpers = require(`./helpers`);

module.exports = {

    SIGNAL: require(`./catalog-signal`),

    CatalogItem: __CatalogItem,
    Catalog: __Catalog,

    CatalogWatcher: require(`./catalog-watcher`),
    CatalogHandler: require(`./catalog-handler`),

    //#region Builders

    PathInfos: helpers.PathInfos,
    CreateFrom: helpers.CreateFrom,
    GetItemClass: helpers.GetItemClass,

    //#endregion

    //#region Helpers

    Find: helpers.Find,
    Filter: helpers.Filter,
    StructToString: helpers.StructToString,

    //#endregion

}