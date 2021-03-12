
'use strict';

module.exports = {

    DATA_SIGNAL: require(`./lib/data-signal`),
    DATA_ID: require(`./lib/data-signal`),

    // hoist lib/data
    DataBlock: require(`./lib/data/data-block`),
    DataFactory: require(`./lib/data/data-factory`),
    Metadata: require(`./lib/data/metadata`),
    Repertoire: require(`./lib/data/repertoire`),

    // namespaces
    actions: require(`./lib/actions`),
    catalog: require(`./lib/catalog`),
    helpers: require(`./lib/helpers`),
    id: require(`./lib/id`),
    serialization: require(`./lib/serialization`),

    ID: require(`./lib/id/id`),
    
    // Catalog

    CATALOG_SIGNAL: require(`./lib/catalog/catalog-signal`),
    CATALOG_SORTING: require(`./lib/catalog/catalog-sorting`),
    CatalogItem: require(`./lib/catalog/catalog-item`),
    Catalog: require(`./lib/catalog/catalog`),
    CatalogSelection: require(`./lib/catalog/catalog-selection`),
    CatalogSearch: require(`./lib/catalog/catalog-search`),

    CatalogWatcher: require(`./lib/catalog/catalog-watcher`),
    CatalogHandler: require(`./lib/catalog/catalog-handler`),

    DataObserver: require(`./lib/helpers/observer-data`),
    MetadataObserver: require(`./lib/helpers/observer-metadata`),

    // Serialization

    BaseSerializer: require(`./lib/serialization/serializer-base`),
    JSONSerializer: require(`./lib/serialization/serializer-json`),
    TEXTSerializer: require(`./lib/serialization/serializer-text`),
    SERIALIZATION_CONTEXT: require(`./lib/serialization/serialization-context`),

    JSONSerializers: require(`./lib/serialization/json`),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));