'use strict';

const { BindingKit } = require(`@nkmjs/common`);
const { OVERLAY_CONTEXT, OverlayOptions, Overlay } = require(`./lib/overlays`);
const { UI_REQUEST } = require(".");
const { Drawer, DrawerOverlay } = require("./lib/drawers");

class Bindings extends BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: OVERLAY_CONTEXT.DEFAULT_OVERLAY,
                kvps: [
                    { key: UI_REQUEST.OVERLAY, binding: Overlay },
                    { key: UI_REQUEST.DRAWER, binding: DrawerOverlay }
                ]
            },
            {
                context: OVERLAY_CONTEXT.DEFAULT_CONTENT,
                kvps: [
                    { key: UI_REQUEST.DRAWER, binding: Drawer }
                ]
            });

    }
}

module.exports = Bindings;