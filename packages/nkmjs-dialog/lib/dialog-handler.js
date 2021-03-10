const { RELAY, ACTION_REQUEST } = require("@nkmjs/actions");
const { UI, OverlayHandler, UI_REQUEST } = require(`@nkmjs/ui-core`);

class DialogHandler extends OverlayHandler {
    constructor() { super(); }

    _Init() {
        
        super._Init();
        this._RegisterLocalRequestHandler(ACTION_REQUEST.DIALOG, this.HandleOverlayRequest);

        RELAY.Watch(UI_REQUEST.OVERLAY, this.HandleOverlayRequest, this);
        RELAY.Watch(UI_REQUEST.DRAWER, this.HandleOverlayRequest, this);
        RELAY.Watch(ACTION_REQUEST.DIALOG, this.HandleOverlayRequest, this);
        
    }

}

module.exports = DialogHandler;
UI.Register('nkmjs-dialog-handler', DialogHandler);