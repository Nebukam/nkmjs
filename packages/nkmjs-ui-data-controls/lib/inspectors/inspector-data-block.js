'use strict';

const workspace = require("@nkmjs/ui-workspace");
const items = require(`./items`);

class DataBlockInspector extends workspace.inspectors.Inspector {
    constructor() { super(); }

    static __controls = [
        { cl:items.Identifier }
    ];

}

module.exports = DataBlockInspector;