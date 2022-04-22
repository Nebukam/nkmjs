'use strict';

const u = require("@nkmjs/utils");

const items = require(`./items`);
const DataBlockInspector = require("./inspector-data-block");

const base = DataBlockInspector;

class DataBlockExtendableInspector extends base {
    constructor() { super(); }

    static __controls = u.tils.MergeArray([
        { cl:items.DataBase }
    ], DataBlockInspector.__controls);

}

module.exports = DataBlockExtendableInspector;