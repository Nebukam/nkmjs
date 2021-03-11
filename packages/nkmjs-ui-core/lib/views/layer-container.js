'use strict';

const { U } = require(`@nkmjs/utils`);
const { CSS } = require("@nkmjs/style");
const { List } = require("@nkmjs/collections");
const { DelayedCall } = require("@nkmjs/common");

const UI = require(`../ui`);
const UI_SIGNAL = require(`../ui-signal`);
const Layer = require(`./layer`);


/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.Layer
 * @memberof ui.core.views
 */
class LayerContainer extends Layer {
    constructor() { super(); }

    // ----> Init

    _Init() {
        this._layerClassName = `layer`;
        super._Init();
        this._updateDepths = new DelayedCall(this._Bind(this._UpdateLayerDepth));
        this._layerList = new List(0);
    }

    // ----> DOM

    _Style() {

        let s = CSS.Extends({
            ':host': {
                //position:`relative`,
            }
        }, super._Style());

        s[`.${this._layerClassName}`] = {
            '@': [`layer`]
        }

        return s;
    }

    _OnChildAdded(p_displayObject, p_index) {
        super._OnChildAdded(p_displayObject, p_index);
        if (U.isInstanceOf(p_displayObject, Layer)) {
            this._layerList.Add(p_displayObject);
            p_displayObject.classList.add(this._layerClassName);
            p_displayObject.Watch(UI_SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
            this._updateDepths.Schedule();
        }
    }

    _OnChildRemoved(p_displayObject, p_index) {
        super._OnChildRemoved(p_displayObject, p_index);
        if (U.isInstanceOf(p_displayObject, Layer)) {
            this._layerList.Remove(p_displayObject);
            p_displayObject.classList.remove(this._layerClassName);
            p_displayObject.Unwatch(UI_SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
            this._updateDepths.Schedule();
        }
    }

    _OnLayerDisplayRequested(p_layer) {
        p_layer.BringToFront();
        this._updateDepths.Schedule();
    }

    _UpdateLayerDepth() {

        let index = 0,
            layerCount = this._layerList.count,
            lastLayer = null;

        this._layerList

        for (let i = 0; i < layerCount; i++) {
            let layer = this._layerList.At(i);
            lastLayer = layer;
            layer.layerSiblingsCount = layerCount;
            layer.layerIndex = index++;
        }

        if (lastLayer) { lastLayer.DisplayGranted(); }

        return lastLayer;

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = LayerContainer;
UI.Register(`nkmjs-layer-container`, LayerContainer);