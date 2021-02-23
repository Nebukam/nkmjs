'use strict';

const { U } = require(`@nkmjs/utils`);
const { CSS } = require("@nkmjs/style");

const UI = require(`../ui`);
const Layer = require(`./layer`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.Layer
 * @memberof ui.core.views
 */
class LayerContainer extends Layer {
    constructor() {super();}

    // ----> Init

    _Init()
    {
        this._layerClassName = `layer`;
        super._Init();
    }    
    
    // ----> DOM

    _Style(){

        let s = CSS.Extends({
            ':host':{
                //position:`relative`,
            }
        }, super._Style());

        s[`.${this._layerClassName}`] = {
            '@':[`layer`]
        }

        return s;
    }

    _OnChildAdded(p_displayObject, p_index){
        super._OnChildAdded(p_displayObject, p_index);
        p_displayObject.classList.add(this._layerClassName);
    }

    _OnChildRemoved(p_displayObject, p_index){
        super._OnChildRemoved(p_displayObject, p_index);
        p_displayObject.classList.remove(this._layerClassName);
    }

    
    // ----> Pooling

    _CleanUp()
    {
        super._CleanUp();
    }

    

}

module.exports = LayerContainer;
UI.Register(`nkmjs-layer-container`, LayerContainer);