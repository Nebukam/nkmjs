'use strict';

const com = require("@nkmjs/common");

const UI = require(`../ui`);

const ListList = require(`./list`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.ListList
 * @memberof ui.core.tree
 */
class ListRoot extends ListList {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, ListList, ['css']);

    // ----> Init

    _Init() {
        this.default_SelectOnActivation = false;

        super._Init();
        this._selectOnActivation = false;
        this._searchBtn = null;
        this._InitSelectionStack();

        this.style.setProperty(`--tree_size`, `var(--size-s)`);
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

module.exports = ListRoot;