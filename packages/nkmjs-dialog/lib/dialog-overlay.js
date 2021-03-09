'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { UI, Overlay } = require(`@nkmjs/ui-core`);

const DialogBox = require(`./dialog-box.js`);

class DialogOverlay extends Overlay {
    constructor() { super(); }

    static __default_overlayContentClass = DialogBox;

    _Init() {
        super._Init();
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
            '.content': {
                flex: `1 1 auto`,
                'max-width': `500px`,
            }
        }, super._Style());
    }

}

module.exports = DialogOverlay;
UI.Register('nkmjs-dialog-overlay', DialogOverlay);