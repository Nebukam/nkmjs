'use strict';
const { U, UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);

const UI = require(`../ui`);
const Overlay = require(`./overlay`);

class DrawerOverlay extends Overlay {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._drawer = null;
    }

    // ----> DOM

    _Style() {
        return CSS.Extends({
            ':host': {
                display: `flex`,
                'flex-flow': `row`,
                'align-content': `center`,
                'align-items': `center`,
                'justify-content': `center`,
            },
            '.bg': {
                'background-color': `rgba(23,23,23,0.3)`,
                'backdrop-filter': `blur(5px)`,
            },
            '.drawer': {
                flex: `1 1 auto`,
                'max-width': `500px`,
            }
        }, super._Style());
    }

    // TODO : Instanciate & place the overlay content...

}

module.exports = DrawerOverlay;
UI.Register('nkmjs-drawer-overlay', DrawerOverlay);