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
                ...style.rules.flex.row.wrap,
                ...style.rules.flex.stretch,
            },
            '.group': {
                ...style.rules.pos.rel,
                ...style.rules.item.fill,
            },
            'tile-ctnr': {
                ...style.rules.pos.rel,
                ...style.rules.flex.row.wrap,
                'align-content': `flex-start`,
                'align-items': `flex-start`,
                ...style.rules.item.fill,
            }
        }, base._Style());
    }
}

module.exports = TileExplorer;
ui.Register('nkmjs-tile-explorer', TileExplorer);