'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

/**
 * @description An InspectorWidget is a ControlWidget designed to be used inside an InspectorView or an Editor.
 * 80% of an app UI & editor contents is likely to be InspectorWidgets.
 * @class
 * @hideconstructor
 * @augments ui.datacontrols.ControlWidget
 * @memberof ui.datacontrols
 */
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