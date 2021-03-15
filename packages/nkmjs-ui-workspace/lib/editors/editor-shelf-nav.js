'use strict';

const { CSS } = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

class EditorShelfNav extends ui.views.ShelfNav {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _Style() {
        return CSS.Extends({

        }, super._Style());
    }

    _OpenSettings() {
        console.log(`Open Settings`);
    }

}

module.exports = EditorShelfNav;
ui.Register('nkmjs-editor-shelf-nav', EditorShelfNav);