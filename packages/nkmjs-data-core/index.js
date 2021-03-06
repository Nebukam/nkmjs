
'use strict';

module.exports = {

    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),

    // hoist ./lib/data/
    DataBlock: require(`./lib/data/data-block`),
    DataFactory: require(`./lib/data/data-factory`),
    Metadata: require(`./lib/data/metadata`),
    Repertoire: require(`./lib/data/repertoire`),

    // IDs
    ID: require(`./lib/id/id`),
    IDDispenser: require(`./lib/id/id-dispenser`),

    // namespaces
    actions: require(`./lib/actions`),
    catalogs: require(`./lib/catalogs`),
    helpers: require(`./lib/helpers`),
    serialization: require(`./lib/serialization`),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));