
'use strict';

module.exports = {

    CONTEXT: require(`./lib/context`),
    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),

    fields: require(`./lib/fields`),
    parts: require(`./lib/parts`),

    DataBlockExtendable: require(`./lib/data-block-extendable`),
    FieldModel: require(`./lib/field-model`),
    DataEntry: require(`./lib/data-entry`),
    DataModel: require(`./lib/data-model`),
    Ecosystem: require(`./lib/ecosystem`),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));