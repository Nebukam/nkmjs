const col = require("@nkmjs/collections");
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);

const UI = require(`../ui`);
const REQUEST = require(`../request`);
const LayerContainer = require(`../views/layer-container`);

const CTX = require("./overlay-context");
const OverlayOptions = require("./overlay-options");
const Overlay = require("./overlay");

const base = LayerContainer;

/**
 * @description TODO
 */
class OverlayHandler extends base {
    constructor() { super(); }

    static __default_overlayClass = Overlay;

    _Init() {
        super._Init();

        this._overlayMap = new Map();
        this._overlayList = [];
        this._Bind(this._OnOverlayOptionsConsumed);

        this.CaptureLocalRequest(REQUEST.OVERLAY);
        this._delayedHide = com.DelayedCall(this._Bind(this._Hide), 500);

        this.visible = false;

    }

    // ---> DOM

    static _Style() {
        return style.Extends({
            ':host': { 'pointer-events': 'none' },
            '.overlay': { 'pointer-events': 'auto' },
            [this.__layerClassName]: { 'pointer-events': 'auto' }
        }, base._Style());
    }

    // ----> Handling

    CaptureLocalRequest(p_requestType) {
        this._RegisterLocalRequestHandler(p_requestType, this.HandleOverlayRequest);
        return this;
    }

    HandleOverlayRequest(p_request) {

        if (p_request.isHandled) { return; }

        let overlayOptions = p_request.options;

        if (!overlayOptions) { throw new Error(`Cannot build overlay without valid options.`); }

        if (!u.isInstanceOf(overlayOptions, OverlayOptions)) {
            overlayOptions = OverlayOptions.Create(overlayOptions);
        }

        overlayOptions.request = p_request;

        // Check if overlayOptions aren't in use already
        let existingOverlay = this._overlayMap.get(overlayOptions);

        if (existingOverlay) {
            existingOverlay.RequestDisplay();
            return;
        }

        this.BringToFront();
        this._delayedHide.Cancel();
        this.visible = true;

        let overlayClass = overlayOptions.overlayClass ||
            com.GetBinding(CTX.OVERLAY, p_request.requestType, this.constructor.__default_overlayClass),
            newOverlay = this.Attach(overlayClass, `overlay`);

        this._overlayMap.set(overlayOptions, newOverlay);
        overlayOptions.Watch(com.SIGNAL.CONSUMED, this._OnOverlayOptionsConsumed);
        newOverlay.data = overlayOptions;

        newOverlay.RequestDisplay();

        p_request.HandleSuccess(this);

    }

    _OnOverlayOptionsConsumed(p_overlayOptions) {
        
        let overlay = this._overlayMap.get(p_overlayOptions);

        this._overlayMap.delete(p_overlayOptions);
        this._overlayList.Remove(overlay);

        overlay.Release();
        p_overlayOptions.Release();

        if (this._overlayMap.size === 0) {
            // Hide overlay handler if empty stack
            this._delayedHide.Schedule();
        }

    }

    _Hide() {
        this.visible = false;
    }

    // TODO : Handle request in a generic manner, to capture locally all requests that inherit OVERLAY
    // need to re-implement DisplayObject's

    // _HandleLocalRequest
    // _RegisterLocalRequestHandler
    // _UnregisterLocalRequestHandler

    _CleanUp() {
        this._delayedHide.Cancel();
        super._CleanUp();
        this.visible = false;
    }

}

module.exports = OverlayHandler;