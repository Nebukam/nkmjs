'use strict';

const { CSS } = require(`@nkmjs/style`);
const { UI, Widget, ShelfNav } = require(`@nkmjs/ui-core`);

class EditorShelfNav extends ShelfNav {
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
UI.Register('nkmjs-editor-shelf-nav', EditorShelfNav);