'use strict';

const ui = require(`@nkmjs/ui-core`);

class Shell extends ui.views.LayerContainer{
    
    constructor() { super(); }
   
    _Init(){
        super._Init();
    }
    
}

module.exports = Shell;
ui.Register(`nkmjs-shell`, Shell);