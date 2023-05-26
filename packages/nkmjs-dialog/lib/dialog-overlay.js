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

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                ...style.flex.align.center.all,
            },
            '.content': {
               // See ui.overlays.Overlay
            }
        }, base._Style());
    }

}

module.exports = DialogOverlay;
ui.Register('nkmjs-dialog-overlay', DialogOverlay);