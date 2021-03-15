'use strict';

const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const DialogBox = require(`./lib/dialog-box`);
const DialogOverlay = require(`./lib/dialog-overlay`);



class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: ui.overlays.CONTEXT.OVERLAY,
                kvps: [
                    { key: actions.ACTION_REQUEST.DIALOG, binding: DialogOverlay }
                ]
            },
            {
                context: ui.overlays.CONTEXT.CONTENT,
                kvps: [
                    { key: actions.ACTION_REQUEST.DIALOG, binding: DialogBox }
                ]
            });

    }
}

module.exports = Bindings;