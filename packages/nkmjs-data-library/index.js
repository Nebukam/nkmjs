
'use strict';

const __DATA_MODEL = require(`./lib/data-model`);
const __UTILS = require(`./lib/utils`);
__UTILS.__default_modelClass = __DATA_MODEL;

module.exports = {

    CTX: require(`./lib/context`),
    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),

    utils: __UTILS,
    fields: require(`./lib/fields`),
    parts: require(`./lib/parts`),

    DataFactoryEx: require(`./lib/data-factory-ex`),
    DataBlockExtendable: require(`./lib/data-block-extendable`),
    FieldSlot: require(`./lib/field-slot`),
    FieldDescriptor: require(`./lib/field-descriptor`),
    DataEntry: require(`./lib/data-entry`),
    DataModel: __DATA_MODEL,
    Ecosystem: require(`./lib/ecosystem`),
    EcosystemBundle: require(`./lib/ecosystem-bundle`),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));