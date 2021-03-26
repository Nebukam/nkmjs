'use strict';

const com = require("@nkmjs/common");
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);

class WorkspaceCellNav extends uilib.views.ShelfNav {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace-cell-nav.css`]
    }, uilib.views.ShelfNav, ['css']);

    // ----> Init

    _Init() {
        super._Init();
        this._defaultWidgetClass = uilib.lists.Tab;
        this._cellOptionsBtn = null;
    }


    // ----> DOM

    _Render() {
        super._Render();

        this._cellOptionsBtn = this._toolbar.CreateHandle({
            [ui.IDS.ICON]: `%ICON%/icon_more.svg`, text: `More Actions...`,
            trigger: { thisArg: this, fn: this._OpenSettings },
            //request:{}
        });

        /*
        for( let i = 0; i < 3; i++){this._toolbar.CreateHandle({
            text:`Fake ${i}`,
            trigger:{ thisArg:this, fn:this._OpenSettings}});
        }
        */
    }

    _OpenSettings() {

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = WorkspaceCellNav;
ui.Register('nkmjs-workspace-cell-nav', WorkspaceCellNav);