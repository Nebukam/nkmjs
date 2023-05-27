'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const style = require(`@nkmjs/style`);
const ui = require(`@nkmjs/ui-core`);

const SIGNAL = require(`../signal`);

const ShelfNav = require(`./shelf-nav`);

const base = ui.views.View;

const NAV_END = Object.freeze(`nav-end`);
const NAV_START = Object.freeze(`nav-start`);
const NAV = Object.freeze(`navigation`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class Shelf extends base {
    constructor() { super(); }

    static __NFO__ = com.NFOS.Ext({
        css: [`@/views/shelf.css`]
    }, base, ['css']);

    // ----> Init

    static __default_placeholderViewClass = null;
    static __defaultOrientation = ui.FLAGS.VERTICAL;
    static __default_fixedSizeAxis = ui.FLAGS.HORIZONTAL;
    static __default_fixedSize = `350px`;
    static __default_navPlacement = ui.FLAGS.TOP;
    static __default_collapsable = true;

    _Init() {

        super._Init();

        this._isEmpty = true;

        this._placholderViewClass = null;
        this._placeholderView = null;

        this._catalogHandler = new ui.helpers.CatalogViewBuilder();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);

        this._navClass = ShelfNav;
        this._nav = null;

        this._currentHandle = null;

        this._flags.Add(this, ui.FLAGS.FIXED_SIZE, ui.FLAGS.COLLAPSED, ui.FLAGS.EMPTY);

        ui.helpers.FlagEnum.Attach(this, `navPlacement`, ui.FLAGS.placement)
            .onFlagChanged.Add(this._Bind(this._OnNavPlacementChanged));

        this._isCollapsable = false;
        this._fixedSizeAxis = this.constructor.__default_fixedSizeAxis;
        this._fixedSize = this.constructor.__default_fixedSize;



    }

    _PostInit() {

        super._PostInit();
        this.navPlacement = this.constructor.__default_navPlacement;
        this._nav.Watch(ShelfNav.HANDLE_ACTIVATED, this._OnNavItemActivated, this);

        let placholderViewClass = (this._placholderViewClass || this.constructor.__default_placeholderViewClass);
        if (placholderViewClass) {
            this._placeholderView = this.Attach(placholderViewClass, `view`);
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
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get fixedSize() { return this._fixedSize; }
    set fixedSize(p_value) {
        this._fixedSize = p_value ? true : false;
        if (this._fixedSize) { this.resizable = false; }
        this._flags.Set(ui.FLAGS.FIXED_SIZE, this._fixedSize);
        ui.dom.CSS(this, '--fixed-size', this._fixedSize ? `${p_value}` : null);
    }

    get resizable() { return this._resizable; }
    set resizable(p_value) {
        this._ToggleResize(p_value);
        if (p_value) { this.fixedSize = null; }
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
                ui.dom.CSSClass(this, {
                    [`fixed-${ui.FLAGS.VERTICAL}`]: true,
                    [`fixed-${ui.FLAGS.HORIZONTAL}`]: false,
                });
                break;
            case ui.FLAGS.HORIZONTAL:
                this._fixedSizeAxis = ui.FLAGS.HORIZONTAL;
                ui.dom.CSSClass(this, {
                    [`fixed-${ui.FLAGS.VERTICAL}`]: false,
                    [`fixed-${ui.FLAGS.HORIZONTAL}`]: true,
                });
                break;
            default:
                this._fixedSizeAxis = null;
                ui.dom.CSSClass(this, {
                    [`fixed-${ui.FLAGS.VERTICAL}`]: false,
                    [`fixed-${ui.FLAGS.HORIZONTAL}`]: false,
                });
                break;
        }
    }

    get isEmpty() { return this._isEmpty; }

    // ----> Orientation

    _OnOrientationChanged(p_newValue, p_oldValue) {
        super._OnOrientationChanged(p_newValue, p_oldValue);
        let np = this.navPlacement;
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
        if (this.orientation === ui.FLAGS.VERTICAL) {
            // Vertical shelf ( nav on the left or right )
            // Only support top or bottom nav placement
            switch (this.navPlacement) {
                case ui.FLAGS.RIGHT:
                case ui.FLAGS.TOP_RIGHT:
                case ui.FLAGS.BOTTOM_RIGHT:
                case ui.FLAGS.BOTTOM:
                    ui.dom.CSSClass(this, {
                        [NAV_START]: false,
                        [NAV_END]: true,
                    });
                    this._nav.placement = ui.FLAGS.RIGHT;
                    break;
                default:
                case ui.FLAGS.LEFT:
                case ui.FLAGS.TOP_LEFT:
                case ui.FLAGS.BOTTOM_LEFT:
                case ui.FLAGS.TOP:
                    ui.dom.CSSClass(this, {
                        [NAV_START]: true,
                        [NAV_END]: false,
                    });
                    this._nav.placement = ui.FLAGS.LEFT;
                    break;
            }
        } else {
            // Horizontal shelf ( nav on top or bottom )
            // Only support left or right nav placement
            switch (this.navPlacement) {
                case ui.FLAGS.BOTTOM:
                case ui.FLAGS.BOTTOM_LEFT:
                case ui.FLAGS.BOTTOM_RIGHT:
                case ui.FLAGS.RIGHT:
                    ui.dom.CSSClass(this, {
                        [NAV_START]: false,
                        [NAV_END]: true,
                    });
                    this._nav.placement = ui.FLAGS.BOTTOM;
                    break;
                default:
                case ui.FLAGS.TOP:
                case ui.FLAGS.TOP_LEFT:
                case ui.FLAGS.TOP_RIGHT:
                case ui.FLAGS.LEFT:
                    ui.dom.CSSClass(this, {
                        [NAV_START]: true,
                        [NAV_END]: false,
                    });
                    this._nav.placement = ui.FLAGS.TOP;
                    break;
            }
        }
    }

    // ----> DOM

    static _Style() {

        return {
            ':host': {
                'display': `grid`,
                'justify-content': `stretch`,
            },

            [`:host(.empty) .${NAV}`]: {
                'display': 'none'
            },
            [`.${NAV}`]: {
                ...style.flexItem.fixed,
            },
            [`.${ui.IDS.VIEW}`]: {
                ...style.flexItem.fill,
            },

            // Vertical ( nav on the left or right )
            ':host(.vertical)': {
                ...style.flex.row,
            },
            [`:host(.vertical), :host(.vertical.${NAV_START})`]: {
                'grid-template-columns': 'max-content auto'
            },
            [`:host(.vertical.${NAV_END})`]: {
                'grid-template-columns': 'auto max-content'
            },
            [`:host(.vertical) .${ui.IDS.VIEW}`]: {

                'overflow-x': `auto`,
                'overflow-y': `auto`,

                'height': '100%',
                ...style.rules.zeroMin.width,
            },
            [`:host(.vertical) .${NAV}, :host(.vertical) .${ui.IDS.VIEW}`]: { 'grid-row': '1' },
            [`:host(.vertical) .${NAV}, :host(.vertical.${NAV_START}) .${NAV}`]: { 'grid-column': '1' },
            [`:host(.vertical) .${ui.IDS.VIEW}, :host(.vertical.${NAV_START}) .${ui.IDS.VIEW}`]: { 'grid-column': '2' },
            [`:host(.vertical.${NAV_END}) .${NAV}`]: { 'grid-column': '2', },
            [`:host(.vertical.${NAV_END}) .${ui.IDS.VIEW}`]: { 'grid-column': '1' },

            // Horizontal ( nav on top or bottom )
            [`:host(.horizontal), :host(.horizontal.${NAV_START})`]: {
                'grid-template-rows': 'max-content auto'
            },
            [`:host(.horizontal.${NAV_END})`]: {
                'grid-template-rows': 'auto max-content'
            },
            [`:host(.horizontal) .${ui.IDS.VIEW}`]: {
                'overflow-x': `auto`,
                'overflow-y': `auto`,

                'width': '100%',
                ...style.rules.zeroMin.height,
            },
            [`:host(.horizontal) .${NAV}, :host(.horizontal) .${ui.IDS.VIEW}`]: { 'grid-column': '1' },
            [`:host(.horizontal) .${NAV}, :host(.horizontal.${NAV_START}) .${NAV}`]: { 'grid-row': '1' },
            [`:host(.horizontal) .${ui.IDS.VIEW}, :host(.horizontal.${NAV_START}) .${ui.IDS.VIEW}`]: { 'grid-row': '2' },
            [`:host(.horizontal.${NAV_END}) .${NAV}`]: { 'grid-row': '2' },
            [`:host(.horizontal.${NAV_END}) .${ui.IDS.VIEW}`]: { 'grid-row': '1' },


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
        this._nav = this.Attach(this._navClass, NAV);

        this._orientation.AddManaged(this._nav._orientation);
        this._nav.orientation = this.constructor.__defaultOrientation;
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
    get catalog() { return this._catalogHandler.catalog; }
    set catalog(p_value) { this._catalogHandler.catalog = p_value; }

    /**
     * @description Create a view & a nav item from a catalogItem
     * @param {CatalogViewBuilder} p_builder 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_builder, p_item, p_mappedView) {


        let handle = this._nav.CreateNavItem(p_item);
        handle.Watch(ui.SIGNAL.CLOSE_REQUESTED, this._OnHandleCloseRequest, this);

        p_mappedView
            .Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnViewRequestDisplay, this)
            .Watch(ui.SIGNAL.CLOSE_REQUESTED, this._OnViewRequestClose, this);

        p_mappedView.visible = false;
        ui.dom.CSSClass(p_mappedView, ui.IDS.VIEW);
        this.Attach(p_mappedView);

        this.Broadcast(ui.SIGNAL.VIEW_ADDED, this, p_mappedView, handle);

        if (this._isEmpty) {
            this._OnShelfNonEmpty();
            //this._OnViewRequestDisplay(p_mappedView);
        }

        return p_mappedView;

    }

    /**
     * @access protected
     * @description Detach the view & handle associated with the removed catalogItem
     * @param {ui.core.helpers.CatalogViewBuilder} p_builder 
     * @param {data.core.catalogs.CatalogItem} p_item 
     * @param {ui.core.View} p_mappedView 
     */
    _OnCatalogItemRemoved(p_builder, p_item, p_mappedView, p_index) {

        let handle = this._nav.RemoveNavItem(p_item);
        if (this.currentHandle === handle) { this.currentHandle = null; }

        if (p_mappedView === this.currentView) {
            this.currentView = null;
            if (this._nav._handles.length === 0) { this._OnShelfEmpty(); }
            // TODO : Customize which view is set as default
            else {
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
    _OnNavItemActivated(p_nav, p_handle) {
        let view = this._catalogHandler.Get(p_handle.data);
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

    Collapse() {
        this.currentView = null;
        this._flags.Set(ui.FLAGS.COLLAPSED, true);
    }

    Expand() {
        this._flags.Set(ui.FLAGS.COLLAPSED, false);
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
        let view = this._catalogHandler.Get(p_handle.data);

        console.log(`_OnHandleCloseRequest`, view);
        if (view) {
            // If a view exists, give it control over its release.
            view.RequestClose();
        } else {
            // Otherwise force release the item.
            p_handle.data.Release();
        }

    }

    //#endregion

    //#region Views Management

    RequestView(p_identifier) {

        let view = null;

        if (u.isInstanceOf(p_identifier, ui.views.View)
            && this._catalogHandler.Owns(p_identifier)) { view = p_identifier; }
        else { view = this._catalogHandler.TryGet(p_identifier); }

        if (view && this._currentView != view) { view.RequestDisplay(); }

    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.View} p_view 
     */
    _OnViewRequestDisplay(p_view) { this.currentView = p_view; }

    _OnViewRequestClose(p_view) {
        this._catalogHandler.ReverseGet(p_view)?.Release();
    }

    /**
     * @access protected
     * @description TODO
     */
    _OnShelfEmpty() {
        this._isEmpty = true;
        this._flags.Set(ui.FLAGS.EMPTY, true);
        this.Broadcast(ui.SIGNAL.EMPTY, this);
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
        this.Broadcast(ui.SIGNAL.NON_EMPTY, this);
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
            view = this._catalogHandler.Get(catalogItem);

        if (!view) {
            this.Broadcast(SIGNAL.CURRENT_HANDLE_CHANGED, this, catalogItem, p_oldHandle ? p_oldHandle.data : null);
            return;
        }

        this.Broadcast(SIGNAL.CURRENT_HANDLE_CHANGED, this, catalogItem, p_oldHandle ? p_oldHandle.data : null);
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

            if (this._catalogHandler.Owns(oldValue)) {
                oldValue.visible = false;
            } else {
                ui.dom.CSSClass(oldValue, ui.IDS.VIEW, false);
                this.Detach(oldValue);
            }

        }

        if (this._currentView) {

            if (this._catalogHandler.Owns(this._currentView)) {
                this._currentView.visible = true;
            } else {
                ui.dom.CSSClass(this._currentView, ui.IDS.VIEW);
                this.Attach(this._currentView);
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
            this.Broadcast(SIGNAL.CURRENT_VIEW_CHANGED, this, this._currentView, p_oldView);
            return;
        }

        // Retrieve the corresponding handle
        let item = this._catalogHandler.ReverseGet(this._currentView);
        if (item) { this.currentHandle = this._nav.GetNavItem(item); }
        else { this.currentHandle = null; }

        this._currentView.DisplayGranted();
        this.Broadcast(SIGNAL.CURRENT_VIEW_CHANGED, this, this._currentView, p_oldView);

    }

    //#endregion

    //#region Pooling

    _CleanUp() {
        // Move the nav back in if it has been taken out
        if (this._nav.parentElement != this._host) { ui.dom.AttachFirst(this._nav, this._host, false); }
        this._catalogHandler.catalog = null;
        ui.dom.CSSClass(this, {
            [NAV_END]: false,
            [NAV_START]: false
        });
        super._CleanUp();
    }

    //#endregion



}

module.exports = Shelf;
ui.Register('nkmjs-shelf', Shelf);
