const collections = require("@nkmjs/collections");
const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);

const UI = require(`../ui`);
const REQUEST = require(`../request`);
const LayerContainer = require(`../views/layer-container`);

const CONTEXT = require("./overlay-context");
const OverlayOptions = require("./overlay-options");
const Overlay = require("./overlay");

/**
 * @description TODO
 */
class OverlayHandler extends LayerContainer {
    constructor() { super(); }

    static __default_overlayClass = Overlay;

    _Init() {
        super._Init();

        this._overlayMap = new collections.Dictionary();
        this._overlayList = new collections.List(0);
        this._Bind(this._OnOverlayOptionsConsumed);

        this.CaptureLocalRequest(REQUEST.OVERLAY);

        this.visible = false;

    }

    // ---> DOM

    _Style() {
        return style.Extends({
            ':host': { 'pointer-events': 'none' },
            '.overlay': { 'pointer-events': 'auto' },
            [this._layerClassName]: { 'pointer-events': 'auto' }
        }, super._Style());
    }

    // ----> Handling

    CaptureLocalRequest(p_requestType) {
        this._RegisterLocalRequestHandler(p_requestType, this.HandleOverlayRequest);
        return this;
    }

    HandleOverlayRequest(p_request) {

        if(p_request.isHandled){ return; }

        let overlayOptions = p_request.options;

        if (!overlayOptions) { throw new Error(`Cannot build overlay without valid options.`); }

        if (!u.isInstanceOf(overlayOptions, OverlayOptions)) {
            overlayOptions = OverlayOptions.Create(overlayOptions);
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

        let fallbackOverlayClass = com.BINDINGS.Get(
            CONTEXT.OVERLAY,
            p_request.requestType,
            this.constructor.__default_overlayClass);

        let overlayClass = u.tils.Get(overlayOptions, `overlayClass`, fallbackOverlayClass),
            newOverlay = this.Add(overlayClass, `overlay`);

        this._overlayMap.Set(overlayOptions, newOverlay);
        overlayOptions.Watch(com.SIGNAL.CONSUMED, this._OnOverlayOptionsConsumed);
        newOverlay.data = overlayOptions;

        p_request.HandleSuccess(this);

    }

    _OnOverlayOptionsConsumed(p_overlayOptions) {

        let overlay = this._overlayMap.Get(p_overlayOptions);
        this._overlayMap.Remove(p_overlayOptions);
        this._overlayList.Remove(overlay);

        overlay.Release();
        p_overlayOptions.Release();

        if (this._overlayMap.count === 0) {
            // Hide overlay handler if empty stack
            this.visible = false;
        }

    }

    // TODO : Handle request in a generic manner, to capture locally all requests that inherit OVERLAY
    // need to re-implement DisplayObject's

    // _HandleLocalRequest
    // _RegisterLocalRequestHandler
    // _UnregisterLocalRequestHandler

    _CleanUp() {
        super._CleanUp();
        this.visible = false;
    }

}

module.exports = OverlayHandler;