/**
 * Inspector role is :
 * - list the content of a data-block
 * - provide a single controls for each exposed data-block element
 * - provide a context for registering specific sub-inspectors
 * It's very basic implementation of a controller
 * It's supposed to offer editing capability for an active selection inside an editor.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const ControlWidget = require("./control-widget");

class InspectorWidget extends ControlWidget {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/inspector-widget.css`]
    }, ControlWidget, ['css']);

    _Init() {
        super._Init();
    }

    _Style() {
        return style.Extends({
            ':host': {
            },
        }, super._Style());
    }

}

module.exports = InspectorWidget;
//ui.Register('nkmjs-inspector-widget', InspectorWidget);