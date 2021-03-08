const { Dictionary } = require("@nkmjs/collections");
const { U } = require(`@nkmjs/utils`);
const { ACTION_REQUEST } = require(`@nkmjs/actions`);

const UI = require(`../ui`);
const LayerContainer = require(`./layer-container`);
const { Overlay } = require(".");


/**
 * @description TODO
 */
class OverlayHandler extends LayerContainer {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._overlayMap = new Dictionary();
        this._RegisterLocalRequestHandler(ACTION_REQUEST.OVERLAY, this.HandleOverlayRequest);
    }

    // ---> DOM

    _Style() {
        return CSS.Extends({
            ':host': { 'pointer-events': 'none' },
            '.layer': { 'pointer-events': 'auto' },
            [this._layerClassName]: { 'pointer-events': 'auto' }
        }, super._Style());
    }

    // ----> Handling

    HandleOverlayRequest(p_request) {

        this.BringToFront();
        this.visible = true;

        let conf = p_request.GetOption(`config`, null);

        if (!conf) {
            throw new Error(`Cannot build overlay without config`);
        }

        let newOverlay = this.Add(conf.cl, Overlay);
        newOverlay.options = conf;
        //newOverlay
        this._layerMap.Set(dialogInfos, newLayer);

        p_request.HandleSuccess(this);

    }

    /**
     * 
     * @param {Overlay|object} p_overlay
     */
    PushOverlay(p_overlay) {
        if (U.isInstanceOf(p_overlay, DisplayObject)) {
            // Add overlay as a fully-fledged display object
        } else {
            // Build overlay from config object
            // Expect an object formatted as

            // {
            //      placement: TOP | BOTTOM | LEFT | RIGHT
            //      cl: overlay class
            //      originRequest: request ?
            // 
            // 
            // 
            // }
        }
    }

}

module.exports = OverlayHandler;
UI.Register('nkmjs-overlay-handler', OverlayHandler);