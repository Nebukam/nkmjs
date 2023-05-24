'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const ui = require(`@nkmjs/ui-core`);
const uilib = require(`@nkmjs/ui-library`);
const style = require(`@nkmjs/style`);

const WindowStateHandler = require(`./window-state-handler`);

const base = ui.views.Layer;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.views.View
 * @memberof ui.core.views
 */
class SingleViewLayer extends base {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._catalogHandler = new ui.helpers.CatalogViewBuilder();
        this._catalogHandler
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnCatalogItemAdded, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnCatalogItemRemoved, this);

        this._viewId = `v`;
        this._viewHost = null;

    }

    _PostInit() {
        super._PostInit();
        WindowStateHandler.WatchParamChange(this._viewId, this._Bind(this._OnWindowViewChanged));
    }

    // ----> DOM

    static _Style() {

        return style.Extends({
            ':host': {
                ...style.rules.layer,
                'overflow': 'hidden',
            },
            [`.${ui.IDS.VIEW}`]: {
                ...style.rules.layer,
            }
        }, base._Style());
    }

    _Render() {
        super._Render();
    }

    /**
     * @description TODO
     * @type {data.core.Catalog}
     */
    get catalog() { return this._catalogHandler.catalog; }
    set catalog(p_value) {
        this._catalogHandler.catalog = p_value;
        if (p_value) { this._OnWindowViewChanged(); }
    }

    /**
     * @description Create a view & a nav item from a catalogItem
     * @param {CatalogViewBuilder} p_builder 
     * @param {data.core.catalogs.CatalogItem} p_item 
     */
    _OnCatalogItemAdded(p_builder, p_item, p_mappedView) {

        p_mappedView
            .Watch(ui.SIGNAL.DISPLAY_REQUESTED, this._OnViewRequestDisplay, this)
            .Watch(ui.SIGNAL.CLOSE_REQUESTED, this._OnViewRequestClose, this);

        p_mappedView.visible = false;
        ui.dom.CSSClass(p_mappedView, ui.IDS.VIEW);
        (this._viewHost || this).Attach(p_mappedView);

        this.Broadcast(ui.SIGNAL.VIEW_ADDED, this, p_mappedView);

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
        if (p_mappedView === this.currentView) { this.currentView = null; }

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
        let catalogItem = this._catalogHandler.ReverseGet(p_view);
        if (catalogItem) { catalogItem.Release(); }
    }

    //#endregion

    //#region View

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
     * @access protected
     * @description TODO
     * @param {*} p_oldView 
     */
    _OnCurrentViewChanged(p_oldView) {

        if (p_oldView) { p_oldView.DisplayLost(); }
        if (this._currentView) {
            this._currentView.DisplayGranted();

            WindowStateHandler.Push({
                [this._viewId]: this._catalogHandler.ReverseGet(this._currentView).name
            });

        }

        this.Broadcast(uilib.SIGNAL.CURRENT_VIEW_CHANGED, this, this._currentView, p_oldView);

    }

    _OnWindowViewChanged() {
        this.RequestView(WindowStateHandler.Get(
            this._viewId,
            this.catalog.At(0).name
        ));
    }

    //#endregion

    _CleanUp() {
        this.catalog = null;
        super._CleanUp();
    }

}

module.exports = SingleViewLayer;
ui.Register('nkmjs-single-view-layer', SingleViewLayer);
