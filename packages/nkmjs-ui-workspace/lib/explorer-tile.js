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
                ...style.flex.rows,
                ...style.flex.stretch,
            },
            '.group': {
                ...style.flexItem.fill,
            },
            'tile-ctnr': {
                ...style.flex.rows,
                'align-content': `flex-start`,
                'align-items': `flex-start`,
                ...style.flexItem.fill,
            }
        }, base._Style());
    }
}

module.exports = TileExplorer;
ui.Register('nkmjs-tile-explorer', TileExplorer);