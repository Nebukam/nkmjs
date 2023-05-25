'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const base = ui.overlays.Overlay;

class DrawerOverlay extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/drawer-overlay.css`]
    }, base, ['css']);

    static __closeOnBgClick = true;
    static __default_contentPlacement = ui.FLAGS.BOTTOM_LEFT;

    _Init() {
        super._Init();
        this._drawer = null;
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.display.flex,
            },
            // align from the start
            ':host(.content-left), :host(.content-top)': {
                'justify-content': `flex-start`,
                'align-content': `flex-start`,
            },
            // aligne from the end
            ':host(.content-right), :host(.content-bottom)': {
                'justify-content': `flex-end`,
                'align-content': `flex-end`,
            },
            // Vertical ( drawer on the left or right )
            ':host(.vertical)': {
                ...style.rules.flex.column.nowrap,
            },
            // Horizontal ( drawer on the top or bottom )
            ':host(.horizontal)': {
                ...style.rules.flex.row.nowrap,
            },
            '.content': {
                // See ui.overlays.Overlay
            }
        }, base._Style());
    }

    // TODO : Instanciate & place the overlay content...

}

module.exports = DrawerOverlay;
ui.Register('nkmjs-drawer-overlay', DrawerOverlay);