'use strict';

const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const dialog = require("@nkmjs/dialog");

const REQUEST = require(`./lib/request`);
const overlays = require(`./lib/overlays`);
const dialogs = require(`./lib/dialogs`);
const inputs = require(`./lib/inputs`);

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

            // Inputs
            {
                context: ui.CONTEXT.STANDALONE_INPUT,
                kvps: [
                    { key: ui.inputs.KEYS.STRING, binding: inputs.InputText },
                    { key: ui.inputs.KEYS.STRING_TEXT, binding: inputs.InputTextarea },
                    { key: ui.inputs.KEYS.STRING_PATH, binding: inputs.InputPath },
                    { key: ui.inputs.KEYS.STRING_PATH_DIR, binding: inputs.InputDirectory },
                    { key: ui.inputs.KEYS.STRING_IDENTIFIER, binding: inputs.InputIdentifier },

                    { key: ui.inputs.KEYS.FILE, binding: inputs.InputFile },
                    { key: ui.inputs.KEYS.DIRECTORY, binding: inputs.InputDirectory },

                    { key: ui.inputs.KEYS.NUMBER, binding: inputs.InputNumber },
                    { key: ui.inputs.KEYS.NUMBER_SLIDER, binding: inputs.InputNumber },
                    { key: ui.inputs.KEYS.NUMBER_ANGLE, binding: inputs.InputNumber },

                    { key: ui.inputs.KEYS.COLOR, binding: inputs.InputColor },

                    { key: ui.inputs.KEYS.BOOLEAN, binding: inputs.InputBoolean },
                    { key: ui.inputs.KEYS.BOOLEAN_CHECK, binding: inputs.InputBoolean },
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