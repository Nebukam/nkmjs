'use strict';

const { ui } = require("@nkmjs/core");

class TestWidget extends ui.Widget{
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
ui.UI.Register(`nkmjs-test-widget`, TestWidget);