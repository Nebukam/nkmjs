
'use strict';

const __DATA_MODEL = require(`./lib/data-model`);
const __UTILS = require(`./lib/utils`);
__UTILS.__default_modelClass = __DATA_MODEL;

module.exports = {

    CONTEXT: require(`./lib/context`),
    SIGNAL: require(`./lib/signal`),
    IDS: require(`./lib/ids`),

    utils: __UTILS,
    fields: require(`./lib/fields`),
    parts: require(`./lib/parts`),

    DataBlockExtendable: require(`./lib/data-block-extendable`),
    FieldModel: require(`./lib/field-model`),
    DataEntry: require(`./lib/data-entry`),
    DataModel: __DATA_MODEL,
    Ecosystem: require(`./lib/ecosystem`),

}

require("@nkmjs/common").BINDINGS.Expand(require(`./bindings`));