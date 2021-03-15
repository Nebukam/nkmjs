'use strict';

const NKMjs = require(`@nkmjs/core`);

class TestWidget extends NKMjs.ui.Widget{
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
NKMjs.ui.UI.Register(`nkmjs-test-widget`, TestWidget);