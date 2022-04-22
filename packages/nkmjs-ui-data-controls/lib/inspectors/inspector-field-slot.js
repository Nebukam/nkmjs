// Inspector for a single model'use strict';

const u = require("@nkmjs/utils");

const DataBlockExtendableInspector = require("./inspector-data-block-extendable");

const base = DataBlockExtendableInspector;

class FieldSlotInspector extends base {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        
    ], DataBlockExtendableInspector.__controls);

}

module.exports = FieldSlotInspector;