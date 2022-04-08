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

const helpers = require(`./helpers`);
const ControlView = require("./control-view");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlView
 * @memberof ui.datacontrols
 */
class InspectorView extends ControlView {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/inspector-view.css`]
    }, ControlView, ['css']);

    _Init() {
        super._Init();
        this.forwardContext = new ui.helpers.DataForward(this);
    }

    _OnContextChanged(p_oldValue) {
        this.forwardContext._BatchSet(`context`, this._context);
    }

    _Style() {
        return style.Extends({
            ':host': {
                'box-sizing': 'border-box',
            },
        }, super._Style());
    }

}

module.exports = InspectorView;
//ui.Register('nkmjs-inspector-view', InspectorView);