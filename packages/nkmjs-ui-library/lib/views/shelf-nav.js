'use strict';

const com = require("@nkmjs/common");
const style = require(`@nkmjs/style`);
const collections = require("@nkmjs/collections");
const ui = require("@nkmjs/ui-core");

const dom = require(`../dom`);

const buttons = require("../buttons");

/**
 * ShelfNav is a glorified toolbar designed to work with a Shelf, 
 * handleling which view should be displayed.
 * @hideconstructor
 * @class
 * @augments ui.core.WidgetBar
 * @memberof ui.core.views
 */
class ShelfNav extends ui.WidgetBar {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/shelf-nav.css`]
    }, ui.WidgetBar, ['css']);

    static HANDLE_ACTIVATED = Symbol(`handleActivated`);

    // ----> Init

    static __default_orientation = ui.FLAGS.VERTICAL;

    _Init() {

        super._Init();

        this._defaultWidgetClass = buttons.Tool;

        this._isHorizontalScrollEnabled = true;

        this._handlesMap = new collections.Dictionary();
        this._currentHandle = null;

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
    get currentHandle() { return this._currentHandle; }

    /**
     * @description TODO
     * @type {ui.core.WidgetBar}
     * @customtag read-only
     */
    get toolbar() { return this._toolbar; }

    // ----> DOM

    _Style() {

        return style.Extends({
            ':host': {
                //'align-content': `flex-start`,
                'display': 'grid',
                //'display': 'flex',
                //'justify-content': `flex-start`,
                'justify-content': `stretch`,
                'align-items': `stretch`,
            },

            '.body': {
                'flex': '1 1 auto',

                'display': 'flex',
                'justify-content': `flex-start`,
                'align-items': `stretch`,
            },
            '.header, .footer': {
                flex: `0 0 auto`,
            },

            //Vertical
            ':host(.vertical)': { 'grid-template-rows': 'max-content auto max-content' },
            ':host(.vertical) .header': { 'grid-row': '1' },
            ':host(.vertical) .footer': { 'grid-row': '3' },
            ':host(.vertical) .body': {
                'grid-row': '2',
                'flex-flow': `column nowrap`,

                'overflow-x': `hidden`,
                'overflow-y': `auto`,

                'width': '100%',
                'min-height': '0',
            },

            //Horizontal
            ':host(.horizontal)': { 'grid-template-columns': 'max-content auto max-content' },
            ':host(.horizontal) .header': { 'grid-column': '1' },
            ':host(.horizontal) .footer': { 'grid-column': '3' },
            ':host(.horizontal) .body': {
                'grid-column': '2',
                'flex-flow': `row nowrap`,

                'overflow-x': `auto`,
                'overflow-y': `hidden`,

                'height': '100%',
                'min-width': '0',
            }

        }, super._Style());

    }

    _Render() {
        ui.DOMTemplate.Render(dom.HeaderBodyFooter, this, { [ui.IDS.OWNER]: this });
        this._toolbar = this.Add(ui.WidgetBar, `toolbar`, this._footer);
        this._toolbar._defaultWidgetClass = buttons.Tool;

        this._orientation.AddManaged(this._toolbar._orientation);
        this._toolbar.orientation = this.constructor.__default_orientation;

        this._sizeEnum.AddManaged(this._toolbar._sizeEnum);
        this._toolbar.size = this.constructor.__default_size;

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
    Get(p_item) {
        return this._handlesMap.Get(p_item);
    }

    /**
     * @description Requests a handle from the shelf. Creates one if none already exists for the item
     * provided
     * @param {*} p_item item -- typically a CatalogItem, in the context of a Shelf.
     * @param {*} p_index index at which the handle should be created. Not that if the handle already exists, it will not be moved.
     * @returns {*} The handle associated to the item
     */
    CreateHandle(p_item, p_index = -1) {

        let handle = this._handlesMap.Get(p_item);

        if (handle) { return handle; }

        if (!p_item.options.flagOn) {
            p_item.options.flagOn = [ui.FLAGS.TOGGLABLE];
        } else if (!p_item.options.flagOn.includes(ui.FLAGS.TOGGLABLE)) {
            p_item.options.flagOn.push(ui.FLAGS.TOGGLABLE);
        }


        handle = super.CreateHandle(p_item.options);
        this._handlesMap.Set(p_item, handle);

        handle.data = p_item;

        handle.Watch(ui.SIGNAL.ACTIVATED, this._OnHandleActivated, this);

        if (`orientation` in handle) { handle.orientation = this._orientation.currentFlag; }

        return handle;

    }

    /**
     * @description Removes the handle associated to the item
     * @param {*} p_item 
     * @returns {*} the handle associated to the item after it has been released (so references to it can be cleared)
     */
    Remove(p_item) {

        let handle = this._handlesMap.Get(p_item);

        if (!handle) { return null; }

        handle.Release();

        return handle;

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_handle 
     */
    _OnHandleActivated(p_handle) {
        this._Broadcast(ShelfNav.HANDLE_ACTIVATED, this, p_handle, this._optionsMap.Get(p_handle));
    }

    // ----> Pooling

    _CleanUp() {
        //TODO : Remove existing handles
        this._handlesMap.Clear();
        super._CleanUp();
    }

}

module.exports = ShelfNav;
ui.Register('nkmjs-shelf-nav', ShelfNav);
