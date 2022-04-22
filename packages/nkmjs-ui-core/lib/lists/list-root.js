'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const UI = require(`../ui`);
const List = require(`./list`);

const base = List;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.List
 * @memberof ui.core.tree
 */
class ListRoot extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    static __defaultDirClass = List;
    static __defaultSelectOnActivation = false;

    // ----> Init

    

    _Init() {

        super._Init();
        this._selectOnActivation = false;
        this._searchBtn = null;
        this._InitSelectionStack(true, false);

        this.style.setProperty(`--tree-size`, `var(--size-s)`);
        // TODO : If 'flattened', make directories non-expandable items

    }

    _PostInit() {
        super._PostInit();

        // TODO : Find an elegant way to make the toolbar static
        /*
                this._searchBtn = this._toolbar.CreateHandle({
                    [IDS.ICON]:`%ICON%/icon_search.svg`, text:`Find...`,
                    trigger:{ thisArg:this, fn:this._OpenFind},
                    //request:{}
                });
                this._searchBtn.order = 99;
        */
    }

    static _Style() {
        return style.Extends({
            ':host': {
                '--tree-size': `var(--size-s, 16px)`,
                '--tree-indent': `var(--size-s, 16px)`
            }
        }, base._Style());
    }

    _OpenFind() {

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = ListRoot;