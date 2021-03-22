'use strict';

const nkm = require(`@nkmjs/core`);

class PlaceholderView extends nkm.ui.View{
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

module.exports = PlaceholderView;
nkm.ui.Register(`nkmjs-placeholder-view`, PlaceholderView);