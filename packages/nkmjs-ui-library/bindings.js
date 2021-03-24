'use strict';

const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");

const REQUEST = require(`./lib/request`);

const overlays = require(`./lib/overlays`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: ui.overlays.CONTEXT.OVERLAY,
                kvps: [
                    { key: REQUEST.DRAWER, binding: overlays.DrawerOverlay }
                ]
            },
            {
                context: ui.overlays.CONTEXT.CONTENT,
                kvps: [
                    { key: REQUEST.DRAWER, binding: overlays.Drawer }
                ]
            });

    }
}

module.exports = Bindings;