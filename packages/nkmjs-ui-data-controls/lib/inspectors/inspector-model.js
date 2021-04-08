// Inspector for a single model'use strict';

const u = require("@nkmjs/utils");

const DataBlockExtendableInspector = require("./inspector-data-block-extendable");

class DataModelInspector extends DataBlockExtendableInspector {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        
    ], DataBlockExtendableInspector.__controls);

}

module.exports = DataModelInspector;