'use strict';

const { BindingKit } = require(`@nkmjs/common`);
const { OVERLAY_CONTEXT } = require(`@nkmjs/ui-core`);
const { ACTION_REQUEST } = require(`@nkmjs/actions`);

const DialogBox = require(`./lib/dialog-box`);
const DialogOverlay = require(`./lib/dialog-overlay`);



class Bindings extends BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: OVERLAY_CONTEXT.DEFAULT_OVERLAY,
                kvps: [
                    { key: ACTION_REQUEST.DIALOG, binding: DialogOverlay }
                ]
            },
            {
                context: OVERLAY_CONTEXT.DEFAULT_CONTENT,
                kvps: [
                    { key: ACTION_REQUEST.DIALOG, binding: DialogBox }
                ]
            });

    }
}

module.exports = Bindings;