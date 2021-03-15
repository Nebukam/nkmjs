'use strict';

const nkm = require(`@nkmjs/core`);

class TestWidget extends nkm.ui.Widget{
    constructor(){super();}

    _Style(){
        return {
            ':host':{
                'background-color':'rgb(0,255,0,0.5)',
                'width':'150px', 'height':'150px',
                'margin':'5px'
            }
        };
    }

}

module.exports = TestWidget;
nkm.ui.Register(`nkmjs-test-widget`, TestWidget);