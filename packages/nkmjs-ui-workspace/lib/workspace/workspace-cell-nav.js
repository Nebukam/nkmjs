'use strict';

const com = require("@nkmjs/common");
const { UI_ID, UI, ShelfNav } = require(`@nkmjs/ui-core`);

const Tab = require(`../items/tab`);

class WorkspaceCellNav extends ShelfNav {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/workspace-cell-nav.css`]
    }, ShelfNav, ['css']);

    // ----> Init

    _Init() {
        super._Init();
        this._defaultButtonClass = Tab;
        this._cellOptionsBtn = null;
    }


    // ----> DOM

    _Render() {
        super._Render();

        this._cellOptionsBtn = this._toolbar.CreateHandle({
            [UI_ID.ICON]: `%ICON%/icon_more.svg`, text: `More Actions...`,
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
UI.Register('nkmjs-workspace-cell-nav', WorkspaceCellNav);