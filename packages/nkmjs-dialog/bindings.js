'use strict';

const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);

const REQUEST = require(`./lib/request`);
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
                    { key: REQUEST.DIALOG, binding: DialogOverlay }
                ]
            },
            {
                context: ui.overlays.CONTEXT.CONTENT,
                kvps: [
                    { key: REQUEST.DIALOG, binding: DialogBox }
                ]
            });

    }
}

module.exports = Bindings;