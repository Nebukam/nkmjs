'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const style = require("@nkmjs/style");
const data = require("@nkmjs/data-core");

const WidgetButton = require("../widget-button");

const base = WidgetButton;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetItem
 * @memberof ui.core.tree
 */
class MenuItem extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({}, base, ['css']);

    static __distribute = base.__distribute.Ext({ wrapUpFn: `_OnOptionsUpdateComplete` });

    // ----> Init

    _Init() {
        super._Init();
        this._isCatalogItemHandler = false;
        this._isDir = false;
        this._rootMenu = null;
        this._delayedUnselect = com.DelayedCall(this._Bind(this._Unselect));
        // Mostly a regular button
        // Unless it has a "list" property OR data is a Catalog

    }

    get isDir() { return this._isDir; }

    get rootMenu() { return this._rootMenu; }
    set rootMenu(p_value) { this._rootMenu = p_value; }

    // ----> DOM
    static _Style() {
        return style.Extends({
            ':host': {
                ...style.rules.zeroMin.width,
                ...style.rules.fadeIn,
            },
            '.toolbar': {
                ...style.flexItem.fixed,
            }
        }, base._Style());
    }


    _OnOptionsUpdateComplete(p_options, p_altOptions, p_defaults) {
        if (this._isCatalogItemHandler) {

        } else {
            if (p_options.menu) {
                this._isDir = true;
                // Is a SubMenu spawner
            }
        }

    }

    _OnDataChanged(p_oldData) {
        super._OnDataChanged(p_oldData);

        this._isCatalogItemHandler = false;
        this._isDir = false;

        if (this._data) {
            if (u.isInstanceOf(this._data, data.catalogs.CatalogItem)) {
                this._isCatalogItemHandler = true;
                this.options = this._data._options;
                if (this._data.isDir) {
                    this._isDir = true;
                    // Is a SubMenu spawner.
                }
            }
        }
    }


    /**
         * @access protected
         * @description TODO
         * @customtag override-me
         * @group Interactivity.Focus
         */
    _FocusGain() {
        if (this._isDir) {
            // Spawn Modal.
            // if there already an open child modal, kill it first
            this.Select(true); // Select self. Let root manage sub menus.
        }
    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Focus
     */
    _FocusLost() {
        if (this._isDir) {
            // TODO : Check if the spawned modal has focus.
            // we need to wait a few millis to resolve the check, as focusLost is triggered BEFORE focusGain
            this._delayedUnselect.Schedule();
        }
    }

    _Unselect() {
        // Will have been unselected by the root object if another item has been focused
        this.Select(false);
    }

    _OnChildMenuReleased() {
        // if was in focus
    }

    //TODO: On hover, spawn subMenu. Notify root that it has a child.
    //or use Modal system?


    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = MenuItem;