'use strict';

const u = require("@nkmjs/utils");

const DataBlockExtendableInspector = require("./inspector-data-block-extendable");

class DataEntryInspector extends DataBlockExtendableInspector {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        
    ], DataBlockExtendableInspector.__controls);

}

module.exports = DataEntryInspector;