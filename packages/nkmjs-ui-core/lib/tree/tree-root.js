'use strict';

const com = require("@nkmjs/common");

const UI = require(`../ui`);

const TreeItemGroup = require(`./tree-item-group`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.tree.TreeItemGroup
 * @memberof ui.core.tree
 */
class TreeRoot extends TreeItemGroup {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/tree/tree-root.css`]
    }, TreeItemGroup, ['css']);

    // ----> Init

    _Init() {
        this.default_SelectOnActivation = false;

        super._Init();
        this._selectOnActivation = false;
        this._searchBtn = null;
        this._InitSelectionStack();

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

    _Render() {
        super._Render();
        this.style.setProperty(`--tree_size`, `var(--size_s)`);
    }

    _OpenFind() {

    }

    // ----> Pooling

    _CleanUp() {
        super._CleanUp();
    }



}

module.exports = TreeRoot;
UI.Register(`nkmjs-tree-root`, TreeRoot);