'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { UI, View } = require(`@nkmjs/ui-core`);

class Explorer extends View{
    constructor(){super();}

    _Init(){
        super._Init();     
    }

    get header(){return this._header;}

    get body(){ return this._body; }
    
    get footer(){return this._footer;}

    // ----> DOM

    _Style(){

        let shadowSize = 5;
        let shadowColor = `rgba(0,0,0,0.5)`;
        return {
            ':host':{
                position:`relative`,
                flex:`1 1 auto`,
                'min-width': 0,
                
                display:`flex`,
                'flex-flow':`column nowrap`,
                'align-content':`stretch`,
                'align-items':`stretch`,
                'background-color':`rgba(1,1,1,0.1)`,
            },
            '.group':{
                position:`relative`,
                flex:`1 0 auto`,
            },
            '.header':{
                flex:`0 0 auto`,
            },
            '.footer':{
                flex:`0 0 auto`,
            },

            '.highlight':{
                'background-color':`#ff0000`
            },
            '.body':{
                'overflow-y':`overlay`,
                'min-width': 0,
                flex:`1 1 1px`,
                'box-shadow':`inset 0px 11px ${shadowSize}px -10px ${shadowColor}, inset 0px -11px ${shadowSize}px -10px ${shadowColor}`,
            },
            '.body::-webkit-scrollbar-track':{
                'background-color':`rgba(127,127,127,0.05)`,
            },
            '.body::-webkit-scrollbar':{
                width: `2px`,
                height: `2px`,
                'background-color': `rgba(127,127,127,0.05)`
            },
            '.body::-webkit-scrollbar-thumb':{
                'background-color': 'rgba(255,255,255,0.05)',
            },
            '.body:hover::-webkit-scrollbar':{
                width: `4px`,
                height: `4px`,
            },
            '.body:hover::-webkit-scrollbar-thumb':{
                'background-color': 'rgba(255,255,255,0.15)',
            }
        };
    }

    _Render(){
        this._header = UDOM.New(`div`, {class:`header group`}, this._host);
        this._body = UDOM.New(`div`, {class:`body group`}, this._host);
        this._footer = UDOM.New(`div`, {class:`footer group`}, this._host);
        this._wrapper = this._body;
    }

}

module.exports = Explorer;
UI.Register('nkmjs-explorer', Explorer);