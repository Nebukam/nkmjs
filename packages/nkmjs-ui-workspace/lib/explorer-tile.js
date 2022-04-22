'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const Explorer = require(`./explorer`);

const base = Explorer;

class TileExplorer extends base {
    constructor() { super(); }

    // ----> Rendering

    static _Style() {

        return style.Extends({
            '.body': {
                display: `flex`,
                'flex-flow': `row wrap`,
                'align-content': `stretch`,
                'align-items': `stretch`,
            },
            '.group': {
                position: `relative`,
                flex: `1 1 auto`,
            },
            'tile-ctnr': {
                position: `relative`,
                flex: `1 1 auto`,
                display: `flex`,
                'flex-flow': `row wrap`,
                'align-content': `flex-start`,
                'align-items': `flex-start`,
            }
        }, base._Style());
    }
}

module.exports = TileExplorer;
ui.Register('nkmjs-tile-explorer', TileExplorer);