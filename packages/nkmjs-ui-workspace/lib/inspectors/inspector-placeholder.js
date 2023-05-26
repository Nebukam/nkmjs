'use strict';

const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");
const data = require("@nkmjs/data-core");
const datacontrols = require("@nkmjs/ui-data-controls");
const uilib = require("@nkmjs/ui-library");

const items = require(`./items`);

const base = datacontrols.InspectorView;

class PlaceholderInspector extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    static _Style() {

        return style.Extends({
            ':host': {
                ...style.flex.column,
            },

        }, base._Style());

    }

    _Render() {

        super._Render();


    }

}

module.exports = PlaceholderInspector;