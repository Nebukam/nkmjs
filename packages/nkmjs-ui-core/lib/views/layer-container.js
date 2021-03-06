'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const Layer = require(`./layer`);

const __className_topLayer = `layer-top`;
const __className_subLayer = `layer-covered`;

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
        this._updateDepths = new com.time.DelayedCall(this._Bind(this._UpdateLayerDepth));
        this._layerList = new collections.List(0);
    }

    // ----> DOM

    _Style() {

        let s = style.Extends({
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
        let layer = u.tils.isInstanceOf(p_displayObject, Layer) ? p_displayObject : null;
        if (layer) {
            this._layerList.Add(layer);
            layer.classList.add(this._layerClassName);
            layer.Watch(SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
            this._updateDepths.Schedule();
        }
    }

    _OnChildRemoved(p_displayObject, p_index) {
        super._OnChildRemoved(p_displayObject, p_index);
        let layer = u.tils.isInstanceOf(p_displayObject, Layer) ? p_displayObject : null;
        if (layer) {
            this._layerList.Remove(layer);
            layer.classList.remove(this._layerClassName);
            layer.classList.remove(__className_topLayer);
            layer.classList.remove(__className_subLayer);
            layer.Unwatch(SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
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

            if (i == (layerCount - 1)) { // last layer
                layer.classList.remove(__className_subLayer);
                layer.classList.add(__className_topLayer);
                layer.DisplayGranted();
            } else {
                layer.classList.remove(__className_subLayer);
                layer.classList.add(__className_topLayer);
            }
        }

        return lastLayer;

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = LayerContainer;
UI.Register(`nkmjs-layer-container`, LayerContainer);