'use strict';

const { U } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { UI, Widget, DrawerNav } = require(`@nkmjs/ui-core`);

class EditorDrawerNav extends DrawerNav {
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

module.exports = EditorDrawerNav;
UI.Register('nkmjs-editor-drawer-nav', EditorDrawerNav);