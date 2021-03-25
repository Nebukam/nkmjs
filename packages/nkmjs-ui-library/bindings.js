'use strict';

const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const dialog = require("@nkmjs/dialog");

const REQUEST = require(`./lib/request`);
const overlays = require(`./lib/overlays`);
const dialogs = require(`./lib/dialogs`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        dialog.DialogOverlay.__default_overlayContentClass = dialogs.DialogBox;

        this.Add(

            // Dialogs
            {
                context: ui.overlays.CONTEXT.CONTENT,
                kvps: [
                    { key: dialog.REQUEST.DIALOG, binding: dialogs.DialogBox }
                ]
            },

            // ---
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