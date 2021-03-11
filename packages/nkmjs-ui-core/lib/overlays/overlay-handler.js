const { Dictionary, List } = require("@nkmjs/collections");
const { U } = require(`@nkmjs/utils`);
const { ACTION_REQUEST } = require(`@nkmjs/actions`);
const { BINDINGS, SIGNAL } = require(`@nkmjs/common`);
const { CSS } = require(`@nkmjs/style`);

const UI = require(`../ui`);
const UI_REQUEST = require(`../ui-request`);
const LayerContainer = require(`../views/layer-container`);

const OVERLAY_CONTEXT = require("./overlay-context");
const OverlayOptions = require("./overlay-options");
const Overlay = require("./overlay");
const { POOL } = require("@nkmjs/common/lib/pool");


/**
 * @description TODO
 */
class OverlayHandler extends LayerContainer {
    constructor() { super(); }

    static __default_overlayClass = Overlay;

    _Init() {
        super._Init();

        this._overlayMap = new Dictionary();
        this._overlayList = new List(0);
        this._Bind(this._OnOverlayOptionsConsumed);

        this._RegisterLocalRequestHandler(UI_REQUEST.OVERLAY, this.HandleOverlayRequest);
        this._RegisterLocalRequestHandler(UI_REQUEST.DRAWER, this.HandleOverlayRequest);

        this.visible = false;

    }

    // ---> DOM

    _Style() {
        return CSS.Extends({
            ':host': { 'pointer-events': 'none' },
            '.overlay': { 'pointer-events': 'auto' },
            [this._layerClassName]: { 'pointer-events': 'auto' }
        }, super._Style());
    }

    // ----> Handling

    HandleOverlayRequest(p_request) {

        let overlayOptions = p_request.options;

        if (!overlayOptions) { throw new Error(`Cannot build overlay without valid options.`); }

        if (!U.isInstanceOf(overlayOptions, OverlayOptions)) {
            let oOptions = POOL.Rent(OverlayOptions);
            oOptions.options = overlayOptions;
            overlayOptions = oOptions;
        }

        overlayOptions.request = p_request;

        // Check if overlayOptions aren't in use already
        let existingOverlay = this._overlayMap.Get(overlayOptions);
        if (existingOverlay) {
            existingOverlay.RequestDisplay();
            return;
        }

        this.BringToFront();
        this.visible = true;

        let fallbackOverlayClass = BINDINGS.Get(
            OVERLAY_CONTEXT.OVERLAY,
            p_request.requestType,
            this.constructor.__default_overlayClass);

        let overlayClass = U.Get(overlayOptions, `overlayClass`, fallbackOverlayClass),
            newOverlay = this.Add(overlayClass, `overlay`);

        this._overlayMap.Set(overlayOptions, newOverlay);
        overlayOptions.Watch(SIGNAL.CONSUMED, this._OnOverlayOptionsConsumed);
        newOverlay.data = overlayOptions;

        p_request.HandleSuccess(this);

    }

    _OnOverlayOptionsConsumed(p_overlayOptions) {

        let overlay = this._overlayMap.Get(p_overlayOptions);
        this._overlayMap.Remove(p_overlayOptions);
        this._overlayList.Remove(overlay);

        overlay.Release();

        if (this._overlayMap.count === 0) {
            // Hide overlay handler if empty stack
            this.visible = false;
        }

    }

    _CleanUp() {
        super._CleanUp();
        this.visible = false;
    }

}

module.exports = OverlayHandler;
UI.Register('nkmjs-overlay-handler', OverlayHandler);