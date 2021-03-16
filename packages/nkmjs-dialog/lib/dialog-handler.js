const actions = require("@nkmjs/actions");
const ui = require(`@nkmjs/ui-core`);

class DialogHandler extends ui.overlays.OverlayHandler {
    constructor() { super(); }

    _Init() {

        super._Init();
        this._RegisterLocalRequestHandler(actions.ACTION_REQUEST.DIALOG, this.HandleOverlayRequest);

        actions.RELAY
            .Watch(ui.REQUEST.OVERLAY, this.HandleOverlayRequest, this)
            .Watch(ui.REQUEST.DRAWER, this.HandleOverlayRequest, this)
            .Watch(actions.ACTION_REQUEST.DIALOG, this.HandleOverlayRequest, this);

    }

}

module.exports = DialogHandler;
ui.Register('nkmjs-dialog-handler', DialogHandler);