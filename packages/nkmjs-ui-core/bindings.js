'use strict';

const com = require("@nkmjs/common");
const { OVERLAY_CONTEXT, OverlayOptions, Overlay, Drawer, DrawerOverlay } = require(`./lib/overlays`);
const { UI_REQUEST } = require(".");

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: OVERLAY_CONTEXT.OVERLAY,
                kvps: [
                    { key: UI_REQUEST.OVERLAY, binding: Overlay },
                    { key: UI_REQUEST.DRAWER, binding: DrawerOverlay }
                ]
            },
            {
                context: OVERLAY_CONTEXT.CONTENT,
                kvps: [
                    { key: UI_REQUEST.DRAWER, binding: Drawer }
                ]
            });

    }
}

module.exports = Bindings;