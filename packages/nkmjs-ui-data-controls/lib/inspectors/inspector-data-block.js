'use strict';

const items = require(`./items`);
const CONTEXT = require(`./context`);
const InspectorView = require(`../inspector-view`);

const base = InspectorView;

class DataBlockInspector extends InspectorView {
    constructor() { super(); }

    static __controls = [
        { context:CONTEXT.INSPECTOR_ITEM, cl:items.Identifier }
    ];

}

module.exports = DataBlockInspector;