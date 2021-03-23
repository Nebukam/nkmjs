'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require("@nkmjs/ui-core");

const ToolButton = require(`./button-tool`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.buttons.ToolButton
 * @memberof ui.core.buttons
 */
class ButtonDragHandle extends ToolButton {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/buttons/button-drag-handle.css`]
    }, ToolButton, ['css']);

    _Style() {
        return style.Extends({
            ':host': {
                //border:`1px solid #ff0000`
                cursor: `move`, /* fallback if grab cursor is unsupported */
                cursor: `grab`,
            },
            ':host(.focused)': {
                cursor: `move`, /* fallback if grab cursor is unsupported */
                cursor: `grab`,
            }
        }, super._Style());
    }

}

module.exports = ButtonDragHandle;
ui.Register(`nkmjs-button-drag-handle`, ButtonDragHandle);