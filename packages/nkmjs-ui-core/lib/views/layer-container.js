'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const Layer = require(`./layer`);

const __className_topLayer = `layer-top`;
const __className_subLayer = `layer-covered`;

const base = Layer;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.Layer
 * @memberof ui.core.views
 */
class LayerContainer extends base {
    constructor() { super(); }

    // ----> Init

    static __layerClassName = `layer`;

    _Init() {
        super._Init();
        this._updateDepths = com.DelayedCall(this._Bind(this._UpdateLayerDepth));
        this._layerList = new collections.List(0);
    }

    // ----> DOM

    static _Style() {

        let s = style.Extends({
            ':host': {
                //position:`relative`,
            }
        }, base._Style());

        s[`.${this.__layerClassName}`] = {
            '@': [`layer`]
        }

        return s;
    }

    _OnChildAttached(p_displayObject, p_index) {
        super._OnChildAttached(p_displayObject, p_index);
        let layer = u.isInstanceOf(p_displayObject, Layer) ? p_displayObject : null;
        if (layer) {
            this._layerList.Add(layer);
            dom.CSSClass(layer, this.constructor.__layerClassName);
            layer.Watch(SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
            this._updateDepths.Schedule();
        }
    }

    _OnChildDetached(p_displayObject, p_index) {
        super._OnChildDetached(p_displayObject, p_index);
        let layer = u.isInstanceOf(p_displayObject, Layer) ? p_displayObject : null;
        if (layer) {
            this._layerList.Remove(layer);
            dom.CSSClass(layer, {
                [`${this.constructor.__layerClassName}`]: false,
                [`${__className_topLayer}`]: false,
                [`${__className_subLayer}`]: false
            });
            layer.Unwatch(SIGNAL.DISPLAY_REQUESTED, this._OnLayerDisplayRequested, this);
            this._updateDepths.Schedule();
        }
    }

    _OnLayerDisplayRequested(p_layer) {
        if (!u.isInstanceOf(p_layer, Layer)) {
            throw new Error(`WTF`);
        }
        p_layer.BringToFront();
        this._updateDepths.Schedule();
    }

    _UpdateLayerDepth() {

        let index = 0,
            layerCount = this._layerList.count,
            lastLayer = null;

        this._layerList

        for (let i = 0; i < layerCount; i++) {
            let
                layer = this._layerList.At(i),
                isTopLayer = false;
            lastLayer = layer;
            layer.layerSiblingsCount = layerCount;
            layer.layerIndex = index++;


            if (i == (layerCount - 1)) { // last layer
                isTopLayer = true;
                layer.DisplayGranted();
            }

            dom.CSSClass(layer, __className_subLayer, !isTopLayer);
            dom.CSSClass(layer, __className_topLayer, isTopLayer);
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