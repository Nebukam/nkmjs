'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);
const ui = require("@nkmjs/ui-core");

/**
 * @typedef SignalDataSelected
 * @type com.SIGNAL.ITEM_ADDED
 * @property {*} item The item that just got added to selection
 */

/**
 * @typedef SignalDataUnselected
 * @type com.SIGNAL.ITEM_REMOVED
 * @property {*} item The item that just got removed to selection
 */

/**
 * A DataSelection is an object that wraps the most common control for user-driven data selection.
 * It is designed to work with streamed widgets (i.e widgets that gets released and thus unselected)
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof ui.core.helpers
 * @signal SignalDataSelected Broadcasted right after a data item has been added to the selection
 * @signal SignalDataUnselected Broadcasted right after a data item has been removed from the selection
 */
class InspectionDataList extends com.pool.DisposableObjectEx {
    constructor(p_editor) {
        super();
        this._editor = p_editor;
    }

    // ----> Init

    _Init() {

        super._Init();

        this._stack = new collections.List();
        this._itemObserver = new com.signals.Observer();
        this._itemObserver.Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this);

        this._clearing = false;
        this._dataSet = new Set();

        this._sharedItemTypeNeedRefresh = true;
        this._sharedItemType = null;
        this._lastItemType = null;

        this._delayedUpdate = com.DelayedCall(this._Bind(this.CommitUpdate));

        this._preProcessData = null;

        this._resetAnalyticsFn = null;
        this._itemAnalyticFn = null;
        this._analyticsNeedRecompute = true;
        this._analytics = {};

        this._invalidateAnalyticsOnBump = false;

    }

    get editor() { return this._editor; }

    get stack() { return this._stack; }

    get preProcessData() { return this._preProcessData; }
    set preProcessData(p_value) { this._preProcessData = p_value; }

    get isEmpty() { return this._stack.isEmpty; }
    get lastType() { return this._lastItemType; }

    get isSingle() { return this._stack._array.length == 1; }
    get isList() { return this._stack._array.length > 1; }

    get sharedType() {
        if (this._sharedItemTypeNeedRefresh) { this._FindSharedDataType(); }
        return this._sharedItemType;
    }

    /**
     * @description TODO
     * @type {ui.Widget}
     */
    get lastItem() { return this._stack.last; }
    /**
     * @description TODO
     * @type {ui.Widget}
     */
    get firstItem() { return this._stack.first; }

    /**
     * @description Adds given data to the selection
     * @param {*} p_data 
     * @param {number} [p_dataIndex]
     * @param {ui.core.INPUT.SELECT_MOFIFIER} [p_mode] 0 = none, 1 = single add, 2 = request range
     * @returns {boolean} True if the data was added for the first time, otherwise false
     */
    Add(p_data, p_preProcess = true) {

        if (p_preProcess && this._preProcessData) { p_data = this._preProcessData(p_data); }

        if (this._dataSet.has(p_data)) { return false; }

        this._stack.Add(p_data);
        this._dataSet.add(p_data);
        this._itemObserver.Observe(p_data);

        this._lastItemType = p_data.constructor;

        if (!this._sharedItemType || !u.isInstanceOf(p_data, this._sharedItemType)) {
            this._sharedItemTypeNeedRefresh = true;
        }

        this._analyticsNeedRecompute = true;

        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_data);
        this._delayedUpdate.Schedule();

        return true;

    }

    /**
     * @description Removes given data from the selection.
     * @param {*} p_data 
     * @returns {boolean}
     */
    Remove(p_data, p_preProcess = true) {

        if (p_preProcess && this._preProcessData) { p_data = this._preProcessData(p_data); }

        if (!this._dataSet.has(p_data)) { return false; }

        this._stack.Remove(p_data);
        this._dataSet.delete(p_data);
        this._itemObserver.Unobserve(p_data);

        this._lastItemType = this._stack.isEmpty ? null : this._stack.last.constructor;
        if (!this._sharedItemType || !u.isInstanceOf(p_data, this._sharedItemType)) {
            this._sharedItemTypeNeedRefresh = true;
        }

        this._analyticsNeedRecompute = true;

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_data);
        this._delayedUpdate.Schedule();

        return true;

    }

    /**
     * @description Removes given data from the selection.
     * @param {*} p_data 
     * @returns {boolean}
     */
    Bump(p_data, p_preProcess = true) {

        if (p_preProcess && this._preProcessData) { p_data = this._preProcessData(p_data); }

        if (!this._dataSet.has(p_data)) { return false; }

        if (p_data != this._stack.last) {
            let index = this._stack.IndexOf(p_data);
            this._stack._array.push(this._stack._array.splice(index, 1)[0]);
        }

        if (this._invalidateAnalyticsOnBump) { this._analyticsNeedRecompute = true; }

        this._lastItemType = p_data.constructor;
        this.Broadcast(com.SIGNAL.ITEM_BUMPED, this, p_data);

        return true;

    }

    DelayedUpdate(p_dirtyAnalytics = false) {
        if (p_dirtyAnalytics) { this.DirtyAnalytics(); }
        this._delayedUpdate.Schedule();
    }

    CommitUpdate() {
        if (this._stack.isEmpty) {
            this.Broadcast(com.SIGNAL.UPDATED, this);
            return;
        }
        let data = this._stack.last;
        this._lastItemType = data.constructor;
        this.Broadcast(com.SIGNAL.ITEM_BUMPED, this, data);
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    Set(p_data, p_preProcess = true) {
        if (p_preProcess && this._preProcessData) { p_data = this._preProcessData(p_data); }

        if (!p_data) {
            this.Clear();
            return;
        }

        for (let i = 0; i < this._stack._array.length; i++) {
            let item = this._stack._array[i];
            if (item != p_data) {
                if (this.Remove(item, false)) { i--; }
            }
        }

        if (this._stack.Contains(p_data)) { this.Bump(p_data, false); }
        else { this.Add(p_data, false); }
    }

    SetList(p_dataArray, p_preProcess = true) {
        //This is because data can actually be an array, so using Set would yield the wrong results.
        if (!p_dataArray) {
            this.Clear();
            return;
        }

        if (p_dataArray.length == 1) {
            this.Set(p_dataArray[0], p_preProcess);
            return;
        }

        this.Clear();

        for (let i = 0; i < p_dataArray.length; i++) {
            let data = p_dataArray[i];
            if (p_preProcess && this._preProcessData) { data = this._preProcessData(data); }
            if (!data) { continue; }
            this.Add(data, false);
        }

    }

    _FindSharedDataType() {

        this._sharedItemTypeNeedRefresh = false;

        let count = this._stack.count;

        if (count == 0) {
            this._sharedItemType = null;
            return;
        } else if (count == 1) {
            this._sharedItemType = this._lastItemType;
            return;
        }

        //First pass : find the smallest distance.
        let
            shortestDist = Number.MAX_SAFE_INTEGER,
            shortestType = null;

        for (let i = 0; i < count; i++) {
            let type = this._stack._array[i].constructor,
                dist = com.NFOS.GetDistanceToObject(type);
            if (dist < shortestDist) {
                shortestDist = dist;
                shortestType = type;
            }
        }

        if (!shortestType) {
            this._sharedItemType = null;
            return;
        }

        //Second pass : make sure every other type is an instanceof that smallest type.

        for (let i = 0; i < count; i++) {
            let type = this._stack._array[i].constructor,
                dist = com.NFOS.GetSignedDistance(shortestType);

            if (Number.isNaN(dist)) {
                this._sharedItemType = null;
                return;
            }
        }

        this._sharedItemType = shortestType;

    }

    _OnDataReleased(p_data) { this.Remove(p_data); }

    /**
     * 
     * @param {*} p_data 
     * @returns {boolean} True if the selection contains the given data, otherwise false.
     */
    Contains(p_data, p_preProcess = true) {
        if (p_preProcess && this._preProcessData) { p_data = this._preProcessData(p_data); }
        return this._dataSet.has(p_data);
    }

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        if (this._stack.isEmpty) { return; }
        this._clearing = true;
        while (!this._stack.isEmpty) { this.Remove(this._stack.last, false); }
        this._clearing = false;
        this.Broadcast(ui.SIGNAL.SELECTION_CLEARED, this);
    }

    //#region Analytics

    DirtyAnalytics() {
        this._analyticsNeedRecompute = true;
    }

    SetupAnalytics(p_baseline, p_itemAnalyticFn, p_analyticsResetFn = null) {
        this.itemAnalyticFn = p_itemAnalyticFn;
        this._resetAnalyticsFn = p_analyticsResetFn;
        this._analytics = p_baseline || {};
    }

    set invalidateAnalyticsOnBump(p_value) {
        this._invalidateAnalyticsOnBump = p_value;
    }

    get itemAnalyticFn() { return this._itemAnalyticFn; }
    set itemAnalyticFn(p_value) {
        this._itemAnalyticFn = p_value;
        this._analyticsNeedRecompute = true;
    }

    set analytics(p_value) { this._analytics = p_value || {}; }
    get analytics() {
        if (this._analyticsNeedRecompute) {
            if (this._resetAnalyticsFn) { u.Call(this._resetAnalyticsFn, this._analytics); }
            if (this._itemAnalyticFn) {
                let n = this._stack.count;
                this._analytics.total = n;
                for (let i = 0; i < n; i++) {
                    u.Call(this._itemAnalyticFn, this._stack.At(i), this._analytics, i, n);
                }
            }
            this._analyticsNeedRecompute = false;
        }

        return this._analytics;
    }

    //#endregion

}

module.exports = InspectionDataList;