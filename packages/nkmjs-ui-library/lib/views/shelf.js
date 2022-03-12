'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);

const ShelfNav = require(`./shelf-nav`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Shelf extends ui.views.View {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/shelf.css`]
    }, ui.views.View, ['css']);

    // ----> Init

    static __default_placeholderViewClass = null;
    static __default_orientation = ui.FLAGS.VERTICAL;
    static __default_fixedSizeAxis = ui.FLAGS.HORIZONTAL;
    static __default_fixedSize = `350px`;
    static __default_navPlacement = ui.FLAGS.TOP;
    static __default_collapsable = true;

    _Init() {

        super._Init();

        this._isEmpty = true;

        this._placholderViewClass = null;
        this._placeholderView = null;

        this._catalogViewBuilder = new ui.helpers.CatalogViewBuilder();
        this._catalogViewBuilder
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);

        this._navClass = ShelfNav;
        this._nav = null;

        this._currentHandle = null;

        this._flags.Add(this, ui.FLAGS.FIXED_SIZE, ui.FLAGS.COLLAPSED, ui.FLAGS.EMPTY);

        this._navPlacement = new ui.helpers.FlagEnum(ui.FLAGS.placement, true);
        this._navPlacement.Add(this);
        this._navPlacement.onFlagChanged.Add(this._Bind(this._OnNavPlacementChanged));

        this._isCollapsable = false;
        this._fixedSizeAxis = this.constructor.__default_fixedSizeAxis;
        this._fixedSize = this.constructor.__default_fixedSize;



    }

    _PostInit() {

        super._PostInit();
        this._navPlacement.Set(this.constructor.__default_navPlacement);
        this._nav.Watch(ShelfNav.HANDLE_ACTIVATED, this._OnHandleActivated, this);

        let placholderViewClass = (this._placholderViewClass || this.constructor.__default_placeholderViewClass);
        if (placholderViewClass) {
            this._placeholderView = this.Add(placholderViewClass, `view`);
            this.currentView = this._placeholderView;
        }

        this.fixedSizeAxis = this._fixedSizeAxis;
        this.fixedSize = this._fixedSize;
        this.isCollapsable = this.constructor.__default_collapsable;

        this._OnShelfEmpty();

    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get isCollapsable() { return this._isCollapsable; }
    set isCollapsable(p_value) {
        if (this._isCollapsable == p_value) { return; }
        this._isCollapsable = p_value;
        //if (p_value) { this.classList.add(`collapsable`); }
        //else { this.classList.remove(`collapsable`); }
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get fixedSize() { return this._fixedSize; }
    set fixedSize(p_value) {
        if (p_value) {
            this._fixedSize = p_value;
            this._flags.Set(ui.FLAGS.FIXED_SIZE, true);
            this.style.setProperty(`--fixed-size`, `${p_value}`);
        } else {
            this._fixedSize = false;
            this._flags.Set(ui.FLAGS.FIXED_SIZE, false);
            this.style.removeProperty(`--fixed-size`);
        }
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get fixedSizeAxis() { return this._fixedSizeAxis; }
    set fixedSizeAxis(p_value) {
        switch (p_value) {
            case ui.FLAGS.VERTICAL:
                this._fixedSizeAxis = ui.FLAGS.VERTICAL;
                this.classList.add(`fixed-${ui.FLAGS.VERTICAL}`);
                this.classList.remove(`fixed-${ui.FLAGS.HORIZONTAL}`);
                break;
            case ui.FLAGS.HORIZONTAL:
                this._fixedSizeAxis = ui.FLAGS.HORIZONTAL;
                this.classList.remove(`fixed-${ui.FLAGS.VERTICAL}`);
                this.classList.add(`fixed-${ui.FLAGS.HORIZONTAL}`);
                break;
            default:
                this._fixedSizeAxis = null;
                this.classList.remove(
                    `fixed-${ui.FLAGS.VERTICAL}`,
                    `fixed-${ui.FLAGS.HORIZONTAL}`);
                break;
        }
    }

    get isEmpty() { return this._isEmpty; }

    // ----> Orientation

    /**
     * @description TODO
     * @type {string}
     * @group Placement & Orientation
     */
    get navPlacement() { return this._navPlacement; }
    set navPlacement(p_value) { this._navPlacement.Set(p_value); }

    _OnOrientationChanged(p_newValue, p_oldValue) {
        super._OnOrientationChanged(p_newValue, p_oldValue);
        let np = this._navPlacement.currentFlag;
        this._OnNavPlacementChanged(np, np);
        this._nav.orientation = p_newValue;
    }

    // ----> Nav placement

    /**
     * @access protected
     * @description TODO
     * @param {string} p_newValue 
     * @param {string} p_oldValue
     * @customtag override-me
     * @group Placement & Orientation
     */
    _OnNavPlacementChanged(p_newValue, p_oldValue) {
        // We need the info to properly setup the shelf's CSS Grid
        if (this._orientation.currentFlag === ui.FLAGS.VERTICAL) {
            // Vertical shelf ( nav on the left or right )
            // Only support top or bottom nav placement
            switch (this._navPlacement.currentFlag) {
                case ui.FLAGS.RIGHT:
                case ui.FLAGS.TOP_RIGHT:
                case ui.FLAGS.BOTTOM_RIGHT:
                case ui.FLAGS.BOTTOM:
                    this.classList.add(`nav-end`);
                    this.classList.remove(`nav-start`);
                    this._nav.placement = ui.FLAGS.RIGHT;
                    break;
                default:
                case ui.FLAGS.LEFT:
                case ui.FLAGS.TOP_LEFT:
                case ui.FLAGS.BOTTOM_LEFT:
                case ui.FLAGS.TOP:
                    this.classList.add(`nav-start`);
                    this.classList.remove(`nav-end`);
                    this._nav.placement = ui.FLAGS.LEFT;
                    break;
            }
        } else {
            // Horizontal shelf ( nav on top or bottom )
            // Only support left or right nav placement
            switch (this._navPlacement.currentFlag) {
                case ui.FLAGS.BOTTOM:
                case ui.FLAGS.BOTTOM_LEFT:
                case ui.FLAGS.BOTTOM_RIGHT:
                case ui.FLAGS.RIGHT:
                    this.classList.add(`nav-end`);
                    this.classList.remove(`nav-start`);
                    this._nav.placement = ui.FLAGS.BOTTOM;
                    break;
                default:
                case ui.FLAGS.TOP:
                case ui.FLAGS.TOP_LEFT:
                case ui.FLAGS.TOP_RIGHT:
                case ui.FLAGS.LEFT:
                    this.classList.add(`nav-start`);
                    this.classList.remove(`nav-end`);
                    this._nav.placement = ui.FLAGS.TOP;
                    break;
            }
        }
    }

    // ----> DOM

    _Style() {

        return {
            ':host': {
                'display': `grid`,
                'justify-content': `stretch`,
            },

            ':host(.empty) .navigation': {
                'display': 'none'
            },
            '.navigation': {
                'flex': `0 0 auto` // was commented out but can't remember why
            },
            '.view': {
                'flex': `1 1 auto`, // was commented out but can't remember why
            },


            // Vertical ( nav on the left or right )
            ':host(.vertical)': {
                'flex-flow': `row nowrap`,
            },
            ':host(.vertical), :host(.vertical.nav-start)': {
                'grid-template-columns': 'max-content auto'
            },
            ':host(.vertical.nav-end)': {
                'grid-template-columns': 'auto max-content'
            },
            ':host(.vertical) .view': {
                //'flex-flow': `column nowrap`,//should be managed by the view

                'overflow-x': `auto`,
                'overflow-y': `auto`,

                'height': '100%',
                'min-width': '0',
            },
            ':host(.vertical) .navigation, :host(.vertical) .view': { 'grid-row': '1' },
            ':host(.vertical) .navigation, :host(.vertical.nav-start) .navigation': { 'grid-column': '1' },
            ':host(.vertical) .view, :host(.vertical.nav-start) .view': { 'grid-column': '2' },
            ':host(.vertical.nav-end) .navigation': { 'grid-column': '2', },
            ':host(.vertical.nav-end) .view': { 'grid-column': '1' },

            // Horizontal ( nav on top or bottom )
            ':host(.horizontal), :host(.horizontal.nav-start)': {
                'grid-template-rows': 'max-content auto'
            },
            ':host(.horizontal.nav-end)': {
                'grid-template-rows': 'auto max-content'
            },
            ':host(.horizontal) .view': {
                //'flex-flow': `row nowrap`,//should be managed by the view

                'overflow-x': `auto`,
                'overflow-y': `auto`,

                'width': '100%',
                'min-height': '0',
            },
            ':host(.horizontal) .navigation, :host(.horizontal) .view': { 'grid-column': '1' },
            ':host(.horizontal) .navigation, :host(.horizontal.nav-start) .navigation': { 'grid-row': '1' },
            ':host(.horizontal) .view, :host(.horizontal.nav-start) .view': { 'grid-row': '2' },
            ':host(.horizontal.nav-end) .navigation': { 'grid-row': '2' },
            ':host(.horizontal.nav-end) .view': { 'grid-row': '1' },


            ':host(.fixed-horizontal.fixed-size:not(.collapsed))': {
                'width': 'var(--fixed-size)',
                'min-width': 'var(--fixed-size)',
                'max-width': 'var(--fixed-size)',
            },

            ':host(.fixed-vertical.fixed-size:not(.collapsed))': {
                'height': 'var(--fixed-size)',
                'min-height': 'var(--fixed-size)',
                'max-height': 'var(--fixed-size)',
            },
        };
    }

    _Render() {
        super._Render();
        this._nav = this.Add(this._navClass, `navigation`);

        this._orientation.AddManaged(this._nav._orientation);
        this._nav.orientation = this.constructor.__default_orientation;
    }

    /**
     * @description TODO
     * @type {ui.core.views.ShelfNav}
     * @group Components
     */
    get nav() { return this._nav; }

    //#region Catalog Management

    /**
     * @description TODO
     * @type {data.core.Catalog}
     */
    get catalog() { return this._catalogViewBuilder.catalog; }
    set catalog(p_value) { this._catalogViewBuilder.catalog = p_value; }

    /**
     * @description Create a view & a nav item from a catalogItem
     * @param {CatalogViewBuilder} p_builder 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_builder, p_item, p_mappedView) {

        let handle = this._nav.CreateHandle(p_item);
        handle.Watch(ui.SIGNAL.CLOSE_REQUESTED, this._OnHandleCloseRequest, this);

        p_mappedView.Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnViewRequestDisplay, this);
        p_mappedView.Watch(ui.SIGNAL.CLOSE_REQUESTED, this._OnViewRequestClose, this);
        p_mappedView.visible = false;
        p_mappedView.classList.add(ui.IDS.VIEW);
        this.Add(p_mappedView);

        this._Broadcast(ui.SIGNAL.VIEW_ADDED, this, p_mappedView, handle);

        if (this._isEmpty) {
            this._OnShelfNonEmpty();
            //this._OnViewRequestDisplay(p_mappedView);
        }

        return p_mappedView;

    }

    /**
     * @access protected
     * @description Remove the view & handle associated with the removed catalogItem
     * @param {ui.core.helpers.CatalogViewBuilder} p_builder 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @param {ui.core.View} p_mappedView 
     */
    _OnCatalogItemRemoved(p_builder, p_item, p_mappedView, p_index) {

        let handle = this._nav.Remove(p_item);
        if (this.currentHandle === handle) { this.currentHandle = null; }

        if (p_mappedView === this.currentView) {
            this.currentView = null;
            if (this._nav._handles.length === 0) { this._OnShelfEmpty(); }
            // TODO : Customize which view is set as default
            else {
                console.log(p_index);
                let handles = this._nav._handles;
                if (p_index >= handles.length) { p_index = handles.length - 1; }
                this.currentHandle = handles[p_index];
            }
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.views.ShelfNav} p_nav 
     * @param {ui.core.Widget} p_handle 
     */
    _OnHandleActivated(p_nav, p_handle) {
        let view = this._catalogViewBuilder.Get(p_handle.data);
        if (!u.isInstanceOf(view, ui.views.View)) { return; }

        if (this._isCollapsable) {
            if (this._currentView === view) {
                this.currentView = null;
                this._flags.Set(ui.FLAGS.COLLAPSED, true);
                return;
            } else {
                this._flags.Set(ui.FLAGS.COLLAPSED, false);
            }
        }

        view.RequestDisplay();
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.Widget} p_handle 
     */
    _OnHandleCloseRequest(p_handle) {
        // Find related view and call CloseRequest on that view.
        // this way we ensure the view is notified the user wants to close it, and can react to it.
        // we only close a view from the signal broadcasted by the view itself, not the handle.
        let catalogItem = p_handle.data,
            p_view = this._catalogViewBuilder.Get(catalogItem);
        if (p_view) {
            // If a view exists, give it control over its release.
            p_view.RequestClose();
        } else {
            // Otherwise force release the item.
            catalogItem.Release();
        }

    }

    //#endregion

    //#region Views Management

    RequestView(p_identifier) {
        if (u.isNumber(p_identifier)) {
            // by index
            let list = this._nav._handles;
            if (p_identifier < 0 || p_identifier > list.length - 1) { return; }
            this.currentHandle = list[p_identifier];
        } else if (u.isString(p_identifier)) {
            // by data id name
            // TODO
        } else if (u.isInstanceOf(data.catalogs.CatalogItem)) {
            // by catalog item reference
            // TODO
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.View} p_view 
     */
    _OnViewRequestDisplay(p_view) {
        this.currentView = p_view;
    }

    _OnViewRequestClose(p_view) {
        let catalogItem = this._catalogViewBuilder._reverseMap.get(p_view);
        if (catalogItem) { catalogItem.Release(); }
    }

    /**
     * @access protected
     * @description TODO
     */
    _OnShelfEmpty() {
        this._isEmpty = true;
        this._flags.Set(ui.FLAGS.EMPTY, true);
        this._Broadcast(ui.SIGNAL.EMPTY, this);
        this.RequestPlaceholderView(true);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_view 
     */
    _OnShelfNonEmpty(p_view) {
        this._isEmpty = false;
        this._flags.Set(ui.FLAGS.EMPTY, false);
        this._Broadcast(ui.SIGNAL.NON_EMPTY, this);
    }

    //#endregion

    //#region Shelf

    /**
     * @description TODO
     * @type {ui.core.Widget}
     */
    get currentHandle() { return this._currentHandle; }
    set currentHandle(p_value) {

        if (this._currentHandle === p_value) { return; }

        let oldValue = this._currentHandle;
        this._currentHandle = p_value;

        if (oldValue) {
            oldValue.Select(false);
            oldValue._flags.Set(ui.FLAGS.TOGGLED, false);
        }
        if (this._currentHandle) {
            this._currentHandle.Select(true);
            this._currentHandle._flags.Set(ui.FLAGS.TOGGLED, true);
        }

        this._OnCurrentHandleChanged(oldValue);

    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.Widget} p_oldHandle 
     */
    _OnCurrentHandleChanged(p_oldHandle) {

        let catalogItem = this._currentHandle ? this._currentHandle.data : null,
            view = this._catalogViewBuilder.Get(catalogItem);

        if (!view) { return; }

        if (this.currentView != view) { view.RequestDisplay(); }

    }

    /**
     * @description TODO
     * @type {ui.core.View}
     */
    get currentView() { return this._currentView; }
    set currentView(p_value) {

        if (this._currentView === p_value) { return; }

        let oldValue = this._currentView;
        this._currentView = p_value;

        if (oldValue) {

            if (this._catalogViewBuilder.Owns(oldValue)) {
                oldValue.visible = false;
            } else {
                oldValue.classList.remove(ui.IDS.VIEW);
                this.Remove(oldValue);
            }

        }

        if (this._currentView) {

            if (this._catalogViewBuilder.Owns(this._currentView)) {
                this._currentView.visible = true;
            } else {
                this._currentView.classList.add(ui.IDS.VIEW);
                this.Add(this._currentView);
            }
        }

        this._OnCurrentViewChanged(oldValue);

    }

    /**
     * @description Helper method to set this.currentView.
     * @param {ui.core.View} p_view 
     */
    SetCurrentView(p_view = null) { this.currentView = p_view; }

    RequestPlaceholderView(p_force = false) {
        if (p_force) { this.currentView = this._placeholderView; }
        else if (this._placeholderView) { this.currentView = this._placeholderView; }
        return this._placeholderView ? true : false;
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_oldView 
     */
    _OnCurrentViewChanged(p_oldView) {

        if (p_oldView) {
            p_oldView.DisplayLost();
        }

        if (!this._currentView) {
            this.currentHandle = null;
            return;
        }

        // Retrieve the corresponding handle
        let item = this._catalogViewBuilder._reverseMap.get(this._currentView);
        if (item) { this.currentHandle = this._nav.Get(item); }
        else { this.currentHandle = null; }

        this._currentView.DisplayGranted();

    }

    //#endregion

    //#region Pooling

    _CleanUp() {
        // Move the nav back in if it has been taken out
        if (this._nav.parentElement != this._host) { ui.dom.AttachFirst(this._nav, this._host, false); }
        this._catalogViewBuilder.catalog = null;
        this.classList.remove(`nav-end`);
        this.classList.remove(`nav-start`);
        super._CleanUp();
    }

    //#endregion



}

module.exports = Shelf;
ui.Register('nkmjs-shelf', Shelf);
