'use strict';

const u = require("@nkmjs/utils");

const items = require(`./items`);
const DataBlockInspector = require("./inspector-data-block");

class DataBlockExtendableInspector extends DataBlockInspector {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        { cl:items.DataBase }
    ], DataBlockInspector.__controls);

}

module.exports = DataBlockExtendableInspector;