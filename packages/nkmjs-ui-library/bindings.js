'use strict';

const com = require("@nkmjs/common");
const ui = require("@nkmjs/ui-core");
const dialog = require("@nkmjs/dialog");
const data = require(`@nkmjs/data-core`);

const REQUEST = require(`./lib/request`);
const overlays = require(`./lib/overlays`);
const dialogs = require(`./lib/dialogs`);
const inputs = require(`./lib/inputs`);
const modals = require(`./lib/modals`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        data.GetDescriptor(data.IDS.SEARCH_ENABLED).inputOptions.size = ui.FLAGS.SIZE_XS;

        dialog.DialogOverlay.__default_overlayContentClass = dialogs.DialogBox;

        ui.commands.Modal.__defaultModalClass = modals.Simple;
        ui.commands.Menu.__defaultModalClass = modals.Simple;

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
                context: ui.CONTEXT.INPUT, // REPLACED 'STANDALONE_INPUT'
                kvps: [

                    { key: ui.inputs.KEYS.STRING, binding: inputs.Text },
                    { key: ui.inputs.KEYS.STRING_TEXT, binding: inputs.Textarea },
                    { key: ui.inputs.KEYS.STRING_TEXT_INLINE, binding: inputs.Text },
                    { key: ui.inputs.KEYS.STRING_TEXT_SEARCH, binding: inputs.Search },
                    { key: ui.inputs.KEYS.STRING_PATH, binding: inputs.File },
                    { key: ui.inputs.KEYS.STRING_PATH_DIR, binding: inputs.Directory },
                    { key: ui.inputs.KEYS.STRING_IDENTIFIER, binding: inputs.Identifier },

                    { key: ui.inputs.KEYS.FS_INPUT, binding: inputs.File },
                    { key: ui.inputs.KEYS.FS_FILE, binding: inputs.File },
                    { key: ui.inputs.KEYS.FS_DIRECTORY, binding: inputs.Directory },

                    { key: ui.inputs.KEYS.NUMBER, binding: inputs.Number },
                    { key: ui.inputs.KEYS.NUMBER_DRAG, binding: inputs.NumberDrag },
                    { key: ui.inputs.KEYS.NUMBER_SLIDER, binding: inputs.Slider },
                    { key: ui.inputs.KEYS.NUMBER_SLIDER_ONLY, binding: inputs.SliderOnly },
                    { key: ui.inputs.KEYS.NUMBER_ANGLE, binding: inputs.Slider },

                    { key: ui.inputs.KEYS.COLOR, binding: inputs.Color },

                    { key: ui.inputs.KEYS.BOOLEAN, binding: inputs.Boolean },
                    { key: ui.inputs.KEYS.BOOLEAN_CHECK, binding: inputs.Checkbox },

                    { key: ui.inputs.KEYS.ENUM, binding: inputs.Select },
                    { key: ui.inputs.KEYS.ENUM_INLINE, binding: inputs.SelectInline },

                    { key: ui.inputs.KEYS.FLAGS, binding: inputs.Select }, // TODO!!
                    { key: ui.inputs.KEYS.FLAGS_INLINE, binding: inputs.SelectInline },// TODO!!

                    { key: inputs.KEYS.CARDINAL_ANCHOR, binding: inputs.Anchor },
                    
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