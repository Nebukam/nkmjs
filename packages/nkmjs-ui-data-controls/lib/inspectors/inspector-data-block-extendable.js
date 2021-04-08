'use strict';

const u = require("@nkmjs/utils");

const DataBlockInspector = require("./inspector-data-block");

class DataBlockExtendableInspector extends DataBlockInspector {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        
    ], DataBlockInspector.__controls);

}

module.exports = DataBlockExtendableInspector;