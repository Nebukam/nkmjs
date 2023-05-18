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
                ctx: ui.overlays.CTX.OVERLAY,
                kvps: [
                    { key: REQUEST.DIALOG, binding: DialogOverlay }
                ]
            },
            {
                ctx: ui.overlays.CTX.CONTENT,
                kvps: [
                    { key: REQUEST.DIALOG, binding: DialogBox }
                ]
            });

    }
}

module.exports = Bindings;