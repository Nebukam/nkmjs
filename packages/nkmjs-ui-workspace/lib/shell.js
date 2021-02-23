'use strict';

const { U } = require(`@nkmjs/utils`);
const { UI, LayerContainer } = require(`@nkmjs/ui-core`);

class Shell extends LayerContainer{
    
    constructor() { super(); }
   
    _Init(){
        super._Init();
    }
    
}

module.exports = Shell;
UI.Register(`nkmjs-shell`, Shell);