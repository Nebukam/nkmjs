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
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const helpers = require(`./helpers`);
const ControlView = require("./control-view");

class InspectorView extends ControlView {
    constructor() { super(); }

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

module.exports = InspectorView;
//ui.Register('nkmjs-inspector-view', InspectorView);