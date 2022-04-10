'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

const SIGNAL = require(`../signal`);

/**
 * @description A ControlBuilder is a simple helper that streamlines
 * maintenance and updates for a list of ControlWidgets.
 * @class
 * @hideconstructor
 * @memberof ui.datacontrols.helpers
 */
class InspectionDataHandler extends com.pool.DisposableObjectEx {

    constructor(p_owner) {
        super();
        this._owner = p_owner;
        this._cachedSharedType = null;
    }

    _Init() {
        super._Init();

        this._supportMultiSelection = false;
        this._inspectedData = null;

        this._inspectionObserver = new com.signals.Observer();
        this._inspectionObserver
            .Hook(com.SIGNAL.ITEM_ADDED, this._OnItemAdded, this)
            .Hook(com.SIGNAL.ITEM_REMOVED, this._OnItemRemoved, this)
            .Hook(com.SIGNAL.ITEM_BUMPED, this._OnItemBumped, this)
            .Hook(com.SIGNAL.UPDATED, this._OnListUpdated, this);

        this._cachedSharedType = null;
        this._cachedSingleType = null;

        this._sctxs = [];
        this._lctxs = [];
        this._sctxm = new Map();
        this._lctxm = new Map();

        this._

        this._emptyArray = [];

    }

    get supportMultiSelection() { return this._supportMultiSelection; }
    set supportMultiSelection(p_value) { this._supportMultiSelection = p_value; }

    get editor() { return this._editor; }
    set editor(p_value) {
        if (this._editor == p_value) { return; }
        this._editor = p_value;
        this.inspectedData = this._editor ? this._editor.inspectedData : null;
    }

    get inspectedData() { return this._inspectedData; }
    set inspectedData(p_value) {
        if (this._inspectedData == p_value) { return; }
        let oldSelection = this._inspectedData;
        this._inspectedData = p_value;
        this._inspectionObserver.ObserveOnly(this._inspectedData);
        if (p_value) { this._RefreshSharedType(); }
    }

    get lastType() { return this._inspectedData ? this._inspectedData.lastType : null; }
    get sharedType() { return this._inspectedData ? this._inspectedData.sharedType : null; }

    get items() { return this._inspectedData ? this._inspectedData.stack._array : this._emptyArray; }

    get lastItem() { return this._inspectedData ? this._inspectedData.lastItem : null; }

    _OnItemAdded(p_sel, p_item) {
        //this._RefreshLastType(p_sel.lastType);
        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_item);
    }

    _OnItemRemoved(p_sel, p_item) {
        //this._RefreshLastType(p_sel.lastType);
        this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_item);
    }

    _OnItemBumped(p_sel, p_item) {
        //this._RefreshLastType(p_sel.lastType);
        this.Broadcast(com.SIGNAL.ITEM_BUMPED, p_item);
    }

    _OnListUpdated(p_sel) {
        this._RefreshLastType(p_sel.lastType);
        this._RefreshSharedType();
        this.Broadcast(com.SIGNAL.UPDATED, p_sel);
    }

    _RefreshLastType(p_type) {
        if(p_type == Object){ p_type = this._inspectedData.lastItem; }
        if (this._cachedSingleType == p_type) { return; }
        let was = this._cachedSingleType;
        this._cachedSingleType = p_type;
        this._UpdateCtxs(this._sctxs, this._sctxm, p_type);
        this.Broadcast(SIGNAL.SELECTION_LASTTYPE_CHANGED, this, p_type, was);
    }

    _RefreshSharedType() {
        let currentSharedType = this._inspectedData.sharedType;
        if(currentSharedType == Object){ currentSharedType = this._inspectedData.lastItem; }
        if (this._cachedSharedType == currentSharedType) { return; }
        let was = this._cachedSharedType;
        this._cachedSharedType = currentSharedType;
        this._UpdateCtxs(this._lctxs, this._lctxm, currentSharedType);
        this.Broadcast(SIGNAL.SELECTION_SHAREDTYPE_CHANGED, this, currentSharedType, was);
    }

    ////

    AddSingleContexts(...ctxs) {
        return this._AddCtxs(this._sctxs, this._sctxm, ...ctxs);
    }

    AddListContexts(...ctxs) {
        return this._AddCtxs(this._lctxs, this._lctxm, ...ctxs);
    }

    _AddCtxs(p_array, p_map, ...ctxs) {
        for (let i = 0; i < ctxs.length; i++) {
            let ctx = ctxs[i];
            if (!p_array.includes(ctx)) {
                p_array.push(ctx);
                p_map.set(ctx, null);
            }
        }
        return this;
    }

    _UpdateCtxs(p_array, p_map, p_key = null) {
        for (let i = 0; i < p_array.length; i++) {
            let ctx = p_array[i],
                binding = p_key ? com.BINDINGS.Get(ctx, p_key, null) : null;
            p_map.set(ctx, binding);
        }
    }

    _Cl(p_map, p_context) {
        if (p_map.has(p_context)) { return p_map.get(p_context); }
        return null;
    }

    GetSingleCl(p_context) { return this._Cl(this._sctxm, p_context); }
    GetListCl(p_context) { return this._Cl(this._lctxm, p_context); }

}

module.exports = InspectionDataHandler;