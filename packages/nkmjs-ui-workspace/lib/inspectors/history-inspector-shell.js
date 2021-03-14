'use strict'

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const { UI } = require(`@nkmjs/ui-core`);

const InspectorShell = require(`./inspector-shell`);

class HistoryInspectorShell extends InspectorShell{
    constructor(){super();}
    
    _Init(){
        super._Init();
    }

    _PostInit(){
        super._PostInit();
        this._icon.Set(null);
        this._title.Set(`HISTORY`);
        this._subtitle.Set(`Editor`);
    }

    // ----> DOM

    _Style(){
        return style.CSS.Extends({
            ':host':{
                //'background-color':`#f5f5f5`
            },
            '.facade':{ 
            },
            '.navigation':{
                
            }
        }, super._Style());
    }

    _Render(){
        super._Render();
    }


}

module.exports = HistoryInspectorShell;
UI.Register(`nkmjs-history-inspector-shell`, HistoryInspectorShell);