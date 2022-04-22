'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const UI = require(`../ui`);

const Folder = require(`./folder`);

const base = Folder;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.Folder
 * @memberof ui.core.tree
 */
class FolderRoot extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    static __defaultDirClass = Folder;
    static __defaultSelectOnActivation = false;

    // ----> Init

    _Init() {;

        super._Init();
        this._selectOnActivation = false;
        this._searchBtn = null;

        this._InitSelectionStack(true, true);

        //this.style.setProperty(`--folder-size`, `var(--size-s)`);
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
                '--folder-size': `${this.constructor.__itemHeight}px`,
                '--folder-indent': `var(--size-s, 16px)`
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

module.exports = FolderRoot;