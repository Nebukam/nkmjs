'use strict'

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const ui = require(`@nkmjs/ui-core`);

const base = ui.views.View;

class EditorHistoryView extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _PostInit() {
        super._PostInit();
        //this._icon.Set(null);
        //this._title.Set(`HISTORY`);
        //this._subtitle.Set(`Editor`);
    }

    // ----> DOM

    static _Style() {
        return style.Extends({
            ':host': {
                //'background-color':`#f5f5f5`
            },
            '.facade': {
            },
            '.navigation': {

            }
        }, base._Style());
    }

    _Render() {
        super._Render();
    }


}

module.exports = EditorHistoryView;
ui.Register(`nkmjs-editor-history-view`, EditorHistoryView);