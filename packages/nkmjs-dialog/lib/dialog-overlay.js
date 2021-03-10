'use strict';

const { U, UDOM } = require(`@nkmjs/utils`);
const { NFOS } = require(`@nkmjs/common`);
const { CSS } = require(`@nkmjs/style`);
const { UI, Overlay } = require(`@nkmjs/ui-core`);


const DialogBox = require(`./dialog-box.js`);

class DialogOverlay extends Overlay {
    constructor() { super(); }

    static __NFO__ = NFOS.Ext({
        css: [`@/dialogs/dialog-overlay.css`]
    }, Overlay, ['css']);

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
            '.content': {
                flex: `1 1 auto`,
                'max-width': `500px`,
            }
        }, super._Style());
    }

}

module.exports = DialogOverlay;
UI.Register('nkmjs-dialog-overlay', DialogOverlay);