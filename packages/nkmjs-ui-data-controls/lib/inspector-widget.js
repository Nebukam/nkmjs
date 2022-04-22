'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const ControlWidget = require("./control-widget");

const base = ControlWidget;


/**
 * @description An InspectorWidget is a ControlWidget designed to be used inside an InspectorView or an Editor.
 * 80% of an app UI & editor contents is likely to be InspectorWidgets.
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlWidget
 * @memberof ui.datacontrols
 */
class InspectorWidget extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/inspectors/inspector-widget.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
    }

    static _Style() {
        return style.Extends({
            ':host': {
            },
        }, base._Style());
    }

}

module.exports = InspectorWidget;
//ui.Register('nkmjs-inspector-widget', InspectorWidget);