'use strict';

const __Catalog = require(`./catalog`);

module.exports = {
    SIGNAL: require(`./catalog-signal`),
    SORTING: require(`./catalog-sorting`),
    
    CatalogItem: require(`./catalog-item`),
    Catalog: __Catalog,
    CatalogSelection: require(`./catalog-selection`),
    CatalogSearch: require(`./catalog-search`),

    CatalogWatcher: require(`./catalog-watcher`),
    CatalogHandler: require(`./catalog-handler`),

    CreateFrom: __Catalog.CreateFrom.bind(__Catalog),

}