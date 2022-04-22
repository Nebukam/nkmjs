'use strict';

const actions = require("@nkmjs/actions");
const ui = require(`@nkmjs/ui-core`);
const dialog = require(`@nkmjs/dialog`);
const uilib = require(`@nkmjs/ui-library`);

const base = ui.overlays.OverlayHandler;

class GlobalOverlayHandler extends base {
    constructor() { super(); }

    _Init() {

        super._Init();

        this
            .CaptureLocalRequest(uilib.REQUEST.DRAWER)
            .CaptureLocalRequest(dialog.REQUEST.DIALOG);

        actions.RELAY
            .Watch(ui.REQUEST.OVERLAY, this.HandleOverlayRequest, this)
            .Watch(uilib.REQUEST.DRAWER, this.HandleOverlayRequest, this)
            .Watch(dialog.REQUEST.DIALOG, this.HandleOverlayRequest, this);

    }

}

module.exports = GlobalOverlayHandler;
ui.Register('nkmjs-global-overlay-handler', GlobalOverlayHandler);