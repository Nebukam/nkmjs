const actions = require("@nkmjs/actions");
const { UI, OverlayHandler, UI_REQUEST } = require(`@nkmjs/ui-core`);

class DialogHandler extends OverlayHandler {
    constructor() { super(); }

    _Init() {
        
        super._Init();
        this._RegisterLocalRequestHandler(actions.ACTION_REQUEST.DIALOG, this.HandleOverlayRequest);

        actions.RELAY.Watch(UI_REQUEST.OVERLAY, this.HandleOverlayRequest, this);
        actions.RELAY.Watch(UI_REQUEST.DRAWER, this.HandleOverlayRequest, this);
        actions.RELAY.Watch(actions.ACTION_REQUEST.DIALOG, this.HandleOverlayRequest, this);
        
    }

}

module.exports = DialogHandler;
UI.Register('nkmjs-dialog-handler', DialogHandler);