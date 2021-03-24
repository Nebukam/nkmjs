'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

class DrawerOverlay extends ui.overlays.Overlay {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/drawer-overlay.css`]
    }, ui.overlays.Overlay, ['css']);

    static __default_contentPlacement = ui.FLAGS.BOTTOM_LEFT;

    _Init() {
        super._Init();
        this._drawer = null;
    }

    // ----> DOM

    _Style() {
        return style.Extends({
            ':host': {
                display: `flex`
            },
            // align from the start
            ':host(.content-left), :host(.content-top)':{
                'justify-content': `flex-start`,
                'align-content': `flex-start`,
            },
            // aligne from the end
            ':host(.content-right), :host(.content-bottom)':{
                'justify-content': `flex-end`,
                'align-content': `flex-end`,
            },
            // Vertical ( drawer on the left or right )
            ':host(.vertical)':{
                'flex-flow': `column nowrap`,
            },
            // Horizontal ( drawer on the top or bottom )
            ':host(.horizontal)':{
                'flex-flow': `row nowrap`,
            },
            '.content': {
                flex: `0 1 auto`
            }
        }, super._Style());
    }

    // TODO : Instanciate & place the overlay content...

}

module.exports = DrawerOverlay;
ui.Register('nkmjs-drawer-overlay', DrawerOverlay);