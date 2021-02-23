'use strict';

const { U } = require(`@nkmjs/utils`);
const { CSS } = require(`@nkmjs/style`);
const { UI, Widget, Drawer } = require(`@nkmjs/ui-core`);

const EditorDrawerNav = require(`./editor-drawer-nav`);

class EditorDrawer extends Drawer {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._navClass = EditorDrawerNav;
    }

    _PostInit() {
        super._PostInit();
        //this._controls.order = 2; 
    }

    _Style() {
        return CSS.Extends({
            ':host': {
                width: `354px`,
                flex: `0 0 auto`,
                'background-color': `rgba(127,127,127,0.1)`,
                //'border-left':`1px dashed rgba(127,127,127,0.2)`
            },
            '.controls': {
                'background-color': `rgba(127,127,127,0.0)`,
            }
        }, super._Style());
    }

}

module.exports = EditorDrawer;
UI.Register('nkmjs-editor-drawer', EditorDrawer);