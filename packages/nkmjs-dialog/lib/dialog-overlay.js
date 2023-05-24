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
                ...style.rules.flex.center,
            },
            '.content': {
                ...style.rules.item.shrink,
                'max-width': `100%`,
                'max-height': `100%`,
            }
        }, base._Style());
    }

}

module.exports = DialogOverlay;
ui.Register('nkmjs-dialog-overlay', DialogOverlay);