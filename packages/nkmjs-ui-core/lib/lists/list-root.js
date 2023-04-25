'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const dom = require(`../utils-dom`);
const helpers = require(`../helpers`);

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
        helpers.HostSelStack(this, true, false);

        dom.CSS(this, `--tree-size`, `var(--size-s)`);
        
        // TODO : If 'flattened', make directories non-expandable items

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

    //#region Selection

    get selStackOverride() { return this._selStackOverride; }
    set selStackOverride(p_value) { this._selStackOverride = p_value; }

    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {
        if (this._selStackOverride) { return this._selStackOverride; }
        if (this._selStack) { return this._selStack; }
        else { return super.selectionStack; }
    }

    //#endregion

    // ----> Pooling

    _CleanUp() {
        if (this._selStackOverride) { this.selStackOverride = null; }
        if (this._selStack) { this._selStack.Clear(); }
        super._CleanUp();
    }


}

module.exports = ListRoot;