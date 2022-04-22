// Inspector for a single model'use strict';

const u = require("@nkmjs/utils");
const ui = require("@nkmjs/ui-core");

const DataBlockExtendableInspector = require("./inspector-data-block-extendable");

const base = DataBlockExtendableInspector;

class DataModelInspector extends base {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        
    ], DataBlockExtendableInspector.__controls);

}

module.exports = DataModelInspector;
ui.Register('nkmjs-data-model-inspector', DataModelInspector);