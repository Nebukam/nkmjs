'use strict';

const com = require("@nkmjs/common");

const UI = require(`../ui`);

const Folder = require(`./folder`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.Folder
 * @memberof ui.core.tree
 */
class FolderRoot extends Folder {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, Folder, ['css']);

    // ----> Init

    _Init() {
        this.default_SelectOnActivation = false;

        super._Init();
        this._selectOnActivation = false;
        this._searchBtn = null;
        this._InitSelectionStack();

        this.style.setProperty(`--folder-size`, `var(--size-s)`);
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

    _OpenFind() {

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = FolderRoot;