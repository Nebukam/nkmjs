'use strict';

const com = require("@nkmjs/common");
const style = require("@nkmjs/style");

const helpers = require(`../helpers`);
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

        helpers.HostSelStack(this, true, true);

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

module.exports = FolderRoot;