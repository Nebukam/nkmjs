'use strict';

const com = require("@nkmjs/common");
const { OVERLAY_CONTEXT } = require(`@nkmjs/ui-core`);
const actions = require("@nkmjs/actions");

const DialogBox = require(`./lib/dialog-box`);
const DialogOverlay = require(`./lib/dialog-overlay`);



class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: OVERLAY_CONTEXT.OVERLAY,
                kvps: [
                    { key: actions.ACTION_REQUEST.DIALOG, binding: DialogOverlay }
                ]
            },
            {
                context: OVERLAY_CONTEXT.CONTENT,
                kvps: [
                    { key: actions.ACTION_REQUEST.DIALOG, binding: DialogBox }
                ]
            });

    }
}

module.exports = Bindings;