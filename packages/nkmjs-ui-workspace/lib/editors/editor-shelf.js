'use strict';

const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const com = require(`@nkmjs/common`);

const EditorShelfNav = require(`./editor-shelf-nav`);

const base = uilib.views.Shelf;

class EditorShelf extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/editor-shelf.css`]
    }, base, ['css']);

    _Init() {
        super._Init();
        this._navClass = EditorShelfNav;
    }

    _PostInit() {
        super._PostInit();
        //this._controls.order = 2; 
    }

    static _Style() {
        return style.Extends({
            ':host': {
                //width: `354px`,
                ...style.flexItem.fixed,
            },
        }, base._Style());
    }

}

module.exports = EditorShelf;
ui.Register('nkmjs-editor-shelf', EditorShelf);