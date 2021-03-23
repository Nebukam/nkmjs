'use strict';

const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

class EditorShelfNav extends uilib.views.ShelfNav {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _Style() {
        return style.Extends({

        }, super._Style());
    }

    _OpenSettings() {
        console.log(`Open Settings`);
    }

}

module.exports = EditorShelfNav;
ui.Register('nkmjs-editor-shelf-nav', EditorShelfNav);