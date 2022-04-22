'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);


const DialogBox = require(`./dialog-box.js`);

const base = ui.overlays.Overlay;

class DialogOverlay extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/dialogs/dialog-overlay.css`]
    }, base, ['css']);

    static __default_overlayContentClass = DialogBox;

    _Init() {
        super._Init();
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                display: `flex`,
                'flex-flow': `row`,
                'align-content': `center`,
                'align-items': `center`,
                'justify-content': `center`,
            },
            '.content': {
                flex: `0 1 auto`,
                'max-width': `100%`,
                'max-height': `100%`,
            }
        }, base._Style());
    }

}

module.exports = DialogOverlay;
ui.Register('nkmjs-dialog-overlay', DialogOverlay);