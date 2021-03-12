'use strict';

const u = require("@nkmjs/utils");
const { UI } = require(`@nkmjs/ui-core`);

const Explorer = require(`./explorer`);

class TileExplorer extends Explorer{
    constructor(){super();}

    // ----> Rendering

    _Style(){

        return u.tils.Merge(super._Style(),{
            '.body':{
                display:`flex`,
                'flex-flow':`row wrap`,
                'align-content':`stretch`,
                'align-items':`stretch`,
            },
            '.group':{
                position:`relative`,
                flex:`1 1 auto`,
            },
            'tile-ctnr':{
                position:`relative`,
                flex:`1 1 auto`,
                display:`flex`,
                'flex-flow':`row wrap`,
                'align-content':`flex-start`,
                'align-items':`flex-start`,
            }
        });
    }
}

module.exports = TileExplorer;
UI.Register('nkmjs-tile-explorer', TileExplorer);