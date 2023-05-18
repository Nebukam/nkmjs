'use strict';

const items = require(`./items`);
const CTX = require(`./context`);
const InspectorView = require(`../inspector-view`);

const base = InspectorView;

class DataBlockInspector extends InspectorView {
    constructor() { super(); }

    static __controls = [
        { ctx:CTX.INSPECTOR_ITEM, cl:items.Identifier }
    ];

}

module.exports = DataBlockInspector;