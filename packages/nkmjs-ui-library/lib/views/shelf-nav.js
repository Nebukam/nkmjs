'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const collections = require("@nkmjs/collections");
const ui = require("@nkmjs/ui-core");

const dom = require(`../dom`);

const buttons = require("../buttons");

const base = ui.WidgetBar;

/**
 * ShelfNav is a glorified toolbar designed to work with a Shelf, 
 * handleling which view should be displayed.
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetBar
 * @memberof ui.core.views
 */
class ShelfNav extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/shelf-nav.css`]
    }, base, ['css']);

    static HANDLE_ACTIVATED = Symbol(`handleActivated`);

    // ----> Init

    static __defaultOrientation = ui.FLAGS.VERTICAL;

    _Init() {

        super._Init();

        this._defaultWidgetClass = buttons.Tool;

        this._isHorizontalScrollEnabled = true;

        this._navItemsMap = new Map();
        this._currentNavItem = null;

        this._header = null;
        this._body = null;
        this._footer = null;
        this._toolbar = null;

    }

    /**
     * @description TODO
     * @type {ui.core.Widget}
     * @customtag read-only
     */
    get currentNavItem() { return this._currentNavItem; }

    /**
     * @description TODO
     * @type {ui.core.WidgetBar}
     * @customtag read-only
     */
    get toolbar() { return this._toolbar; }

    // ----> DOM

    static _Style() {

        return style.Extends({
            ':host': {
                //'align-content': `flex-start`,
                ...style.grid.stretch,
            },

            '.body': {
                ...style.rules.display.flex,
                'justify-content': `flex-start`,
                'align-items': `stretch`,
                ...style.flexItem.fill,
            },
            '.header, .footer': {
                ...style.flexItem.fixed,
            },

            //Vertical
            ':host(.vertical)': { 'grid-template-rows': 'max-content auto max-content' },
            ':host(.vertical) .header': { 'grid-row': '1' },
            ':host(.vertical) .footer': { 'grid-row': '3' },
            ':host(.vertical) .body': {
                'grid-row': '2',
                ...style.flex.column,

                'overflow-x': `hidden`,
                'overflow-y': `auto`,

                'width': '100%',
                ...style.rules.zeroMin.height,
            },

            //Horizontal
            ':host(.horizontal)': { 'grid-template-columns': 'max-content auto max-content' },
            ':host(.horizontal) .header': { 'grid-column': '1' },
            ':host(.horizontal) .footer': { 'grid-column': '3' },
            ':host(.horizontal) .body': {
                'grid-column': '2',
                ...style.flex.row,

                'overflow-x': `auto`,
                'overflow-y': `hidden`,

                'height': '100%',
                ...style.rules.zeroMin.width,
            }

        }, base._Style());

    }

    _Render() {
        ui.DOMTemplate.Render(dom.HeaderBodyFooter, this, { [ui.IDS.OWNER]: this });
        this._toolbar = this.Attach(ui.WidgetBar, `toolbar`, this._footer);
        this._toolbar._defaultWidgetClass = buttons.Tool;

        this._orientation.AddManaged(this._toolbar._orientation);
        this._toolbar.orientation = this.constructor.__defaultOrientation;

        this._sizeEnum.AddManaged(this._toolbar._sizeEnum);
        this._toolbar.size = this.constructor.__defaultSize;

        this._wrapper = this._body;

        this.focusArea = this;
    }

    _OnSizeChanged(p_newValue, p_oldValue) {
        super._OnSizeChanged(p_newValue, p_oldValue);
        this._toolbar.size = p_newValue;
    }

    _OnOrientationChanged(p_newValue, p_oldValue) {
        super._OnOrientationChanged(p_newValue, p_oldValue);
        this._orientation.Apply(`orientation`, this._handles);
    }

    _OnPlacementChanged(p_newValue, p_oldValue) {
        super._OnPlacementChanged(p_newValue, p_oldValue);
        // Update items placement based on this nav placement
        this._toolbar.placement = p_newValue;
    }

    // ----> Catalog Items handling

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*} the handle associated to the item, otherwise null.
     */
    GetNavItem(p_item) {
        return this._navItemsMap.get(p_item);
    }

    /**
     * @description Requests a handle from the shelf. Creates one if none already exists for the item
     * provided
     * @param {*} p_item item -- typically a CatalogItem, in the context of a Shelf.
     * @param {number} p_index index at which the handle should be created. Not that if the handle already exists, it will not be moved.
     * @returns {*} The handle associated to the item
     */
    CreateNavItem(p_item, p_index = -1) {

        let navItem = this._navItemsMap.get(p_item);

        if (navItem) { return navItem; }

        if (!p_item.options.flagOn) {
            p_item.options.flagOn = [ui.FLAGS.TOGGLABLE];
        } else if (!p_item.options.flagOn.includes(ui.FLAGS.TOGGLABLE)) {
            p_item.options.flagOn.push(ui.FLAGS.TOGGLABLE);
        }

        navItem = this.CreateHandle(p_item.options);
        this._navItemsMap.set(p_item, navItem);

        navItem.data = p_item;

        navItem.Watch(ui.SIGNAL.ACTIVATED, this._OnNavItemActivated, this);

        if (navItem.orientation) { navItem.orientation = this._orientation.currentFlag; }

        return navItem;
    }

    /**
     * @description Removes the handle associated to the item
     * @param {*} p_item 
     * @returns {*} the handle associated to the item after it has been released (so references to it can be cleared)
     */
    RemoveNavItem(p_item) {

        let navItem = this._navItemsMap.get(p_item);
        if (!navItem) { return null; }

        this._navItemsMap.delete(p_item);
        navItem.Release();

        return navItem;

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_navItem 
     */
    _OnNavItemActivated(p_navItem) {
        this.Broadcast(ShelfNav.HANDLE_ACTIVATED, this, p_navItem, this._optionsMap.get(p_navItem));
    }

    // ----> Pooling

    _CleanUp() {
        //TODO : Pre-process nav item data
        this._navItemsMap.clear();
        super._CleanUp();
    }

}

module.exports = ShelfNav;
ui.Register('nkmjs-shelf-nav', ShelfNav);
