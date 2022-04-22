'use strict';

const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

const base = uilib.views.ShelfNav;

class EditorShelfNav extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    static _Style() {
        return style.Extends({

        }, base._Style());
    }

    _OpenSettings() {
        console.log(`Open Settings`);
    }

}

module.exports = EditorShelfNav;
ui.Register('nkmjs-editor-shelf-nav', EditorShelfNav);