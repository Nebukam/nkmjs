'use strict';

const { CSS } = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const EditorShelfNav = require(`./editor-shelf-nav`);

class EditorShelf extends ui.views.Shelf {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._navClass = EditorShelfNav;
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

module.exports = EditorShelf;
ui.Register('nkmjs-editor-shelf', EditorShelf);