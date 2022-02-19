'use strict';

const UI = require(`../ui`);
const View = require(`./view`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Layer extends View {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._layerIndex = 0;
        this._layerSiblingsCount = 0;
    }

    get layerSiblingsCount() { return this._layerSiblingsCount; }
    set layerSiblingsCount(p_value) { this._layerSiblingsCount = p_value; }

    get layerIndex() { return this._layerIndex; }
    set layerIndex(p_value) { 
        this._layerIndex = p_value; 
        this.style.setProperty(`--layer-depth`, p_value);
        this._OnLayerIndexUpdated();
    }

    get isBackLayer() { return this._layerIndex == 0; }
    get isFrontLayer() { return this._layerIndex == this._layerSiblingsCount - 1; }

    // ----> DOM

    _Style() {
        return {
            ':host': {
                '@': [`layer`], // absolute, 0,0 100% 100% box-sizing border-box
                'overflow': 'hidden'
            }
        }
    }

    _OnLayerIndexUpdated(){

    }

    // ----> Pooling

    _CleanUp() {
        this.layerIndex = 0;
        this.layerSiblingsCount = 0;
        super._CleanUp();
    }



}

module.exports = Layer;
UI.Register(`nkmjs-layer`, Layer);