const { U, C, M } = require(`../@.js`);
const { DisposableObjectEx } = require(`../collections/@.js`);
const { TitleBar } = require(`../ui-app/@.js`);
const UI = require(`../ui.js`);
const Control = require(`./control.js`);

class FieldValueOverlay extends Control{
    constructor(){super();}
    
    _Init(){
        super._Init();
    }

    _Style(){
        let m = 15;
        return U.Merge(super._Style(), {
            ':host':{
                position:`absolute`,
                width:`100%`,
                height:`100%`,
                display:`flex`,
                'flex-flow':`row nowrap`,
                'align-items':`stretch`,
                'align-content':`stretch`,
                //border:`1px solid #fff`
            },
            '.body':{
                flex:`1 1 auto`,
                margin:`2px`,
                padding:`5px`,
                'background-color':`rgba(0,0,0,0.2)`,
            }
        });
    }

    // ----> DOM

    _Render(){
        this._wrapper = UDOM.New(`div`, {class:`body`}, this._host);
    }

    _CleanUp(){
        super._CleanUp();
    }

}

module.exports = FieldValueOverlay;
UI.Register(`nkmjs-field-value-overlay`, FieldValueOverlay);