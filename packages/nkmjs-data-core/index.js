
'use strict';

const __SIMPLEX = require(`./lib/simplex`);

module.exports = {

    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),
    TYPES: require(`./lib/types`),

    // hoist ./lib/data/
    SIMPLEX:__SIMPLEX,
    DataBlock: require(`./lib/data/data-block`),
    SimpleDataBlock: require(`./lib/data/simple-data-block`),
    DataFactory: require(`./lib/data/data-factory`),
    Metadata: require(`./lib/data/metadata`),
    Repertoire: require(`./lib/data/repertoire`),

    // IDs
    ID: require(`./lib/id/id`),
    IDDispenser: require(`./lib/id/id-dispenser`),

    // namespaces
    ops: require(`./lib/operations`),
    catalogs: require(`./lib/catalogs`),
    helpers: require(`./lib/helpers`),
    search: require(`./lib/search`),
    serialization: require(`./lib/serialization`),
    tags: require(`./lib/tags`),

    validate: require(`./lib/validation`),
    sanitize: require(`./lib/sanitization`),

    RegisterDescriptors: __SIMPLEX.RegisterDescriptors.bind(__SIMPLEX),
    RegisterDescriptor: __SIMPLEX.RegisterDescriptor.bind(__SIMPLEX),
    GetDescriptor: __SIMPLEX.GetDescriptor.bind(__SIMPLEX),
    GetValueType: __SIMPLEX.GetValueType.bind(__SIMPLEX),
}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));