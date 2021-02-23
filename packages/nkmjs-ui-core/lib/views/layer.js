'use strict';

const { U } = require(`@nkmjs/utils`);

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
    constructor() {super();}

    // ----> Init

    _Init()
    {
        super._Init();
    }
    
    // ----> DOM

    _Style(){
        return{
            ':host':{
                '@':[`layer`], // absolute, 0,0 100% 100% box-sizing border-box
                'overflow':'hidden'
            }
        }
    }    

    // ----> Pooling

    _CleanUp()
    {
        super._CleanUp();
    }

    

}

module.exports = Layer;
UI.Register(`nkmjs-layer`, Layer);