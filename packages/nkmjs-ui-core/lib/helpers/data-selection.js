'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);
const INPUT = require(`../input`);

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
class DataSelection extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();

        this._lastBump = null;

        this._stack = new collections.List();
        this._indices = new collections.List();
        this._dataSet = new Set();
        this._dataMember = `data`;

        this._itemObserver = new com.signals.Observer();
        this._itemObserver.Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this);

        this._allowMultiple = true;
        this._clearing = false;
        this._isInsideRange = false;
        this._cachedRangeStart = -1;
        this._currentRangeContent = null;

        INPUT.Watch(SIGNAL.SEL_MODIFIER_CHANGED, this._OnSelectionModifierChanged, this);

        this._delayedBump = com.DelayedCall(this._Bind(this._AutoBump));

    }

    get autoBump() { return this._autoBump; }
    set autoBump(p_value) {
        this._autoBump = p_value;
        this._delayedBump.Cancel();
    }

    get stack() { return this._stack; }

    get isEmpty() { return this._stack.isEmpty; }

    get dataMember() { return this._dataMember; }
    set dataMember(p_value) {
        if (this._dataMember == p_value) { return; }
        this._dataMember = p_value;
        this.Clear();
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get allowMultiple() { return this._allowMultiple; }
    set allowMultiple(p_value) {
        this._allowMultiple = p_value;
        if (!p_value) { this.Clear(); }
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

    _OnSelectionModifierChanged(p_mod) {
        this._cachedRangeStart = -1;
        if (p_mod == INPUT.SELECT_MODIFIER_RANGE) {
            if (!this._currentRangeContent) { this._currentRangeContent = []; }
            this._cachedRangeStart = this._indices.last;
        } else {
            if (this._currentRangeContent) { this._currentRangeContent.length = 0; }
            this._currentRangeContent = null;
        }
    }

    /**
     * @description Adds given data to the selection
     * @param {*} p_data 
     * @param {number} [p_dataIndex]
     * @param {ui.core.INPUT.SELECT_MOFIFIER} [p_mode] 0 = none, 1 = single add, 2 = request range
     * @returns {boolean} True if the data was added for the first time, otherwise false
     */
    Add(p_data, p_dataIndex = -1, p_mode = null) {


        if (p_data == null) { return false; }

        if (this._isInsideRange || !p_mode) { p_mode = INPUT.SELECT_MODIFIER_ADD; }

        //if (p_mode == null) { p_mode = INPUT.selectionModifier; }

        if (this._dataSet.has(p_data)) { return false; }

        // Clear selection multiple selection isn't allowed.
        if (!this._allowMultiple || p_mode == INPUT.SELECT_MODIFIER_NONE) { this.Clear(); }


        let pushRange = false;
        if (p_mode == INPUT.SELECT_MODIFIER_RANGE && !this._isInsideRange
            && this._allowMultiple && p_dataIndex >= 0 && this._cachedRangeStart != -1) {
            p_mode = INPUT.SELECT_MODIFIER_ADD;
            pushRange = true;
        }

        if (p_mode == INPUT.SELECT_MODIFIER_ADD && this._currentRangeContent) {
            this._currentRangeContent.push(p_data);
        }

        this._stack.Add(p_data);
        this._indices.Add(p_dataIndex);
        this._dataSet.add(p_data);

        this._itemObserver.Observe(p_data);

        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_data);

        if (pushRange) { this.AddRange(-1, p_dataIndex, false); }
        if (this._autoBump) { this._delayedBump.Schedule(); }

        return true;

    }

    AddRange(p_from = -1, p_to = -1, p_clearFirst = false) {

        if (this._currentRangeContent) {
            // Clear active selection range

            this._isInsideRange = true;
            while (this._currentRangeContent.length != 0) {
                let
                    data = this._currentRangeContent.pop(),
                    index = this._indices.At(this._stack.IndexOf(data));

                this.RequestRemove(index, data);
                this.Remove(data);

            }
            this._isInsideRange = false;
        }

        if (p_to == -1) { return false; }
        if (p_clearFirst) {
            this.Clear();
            if (p_from == -1) {
                // impossible to extrapolate "from" index.
                return false;
            }
        }

        if (p_from == -1) {
            p_from = this._cachedRangeStart;
            if (p_from < 0) { return false; }
        }

        if (p_to < p_from) { let swap = p_to; p_to = p_from; p_from = swap; }

        this._isInsideRange = true;
        for (var i = p_from; i <= p_to; i++) { this.RequestAdd(i); }
        this._isInsideRange = false;
        return true;

    }

    RequestRemove(p_index, p_data) {
        this.Broadcast(SIGNAL.SEL_REQ_REMOVE, this, p_index, p_data);
    }

    RequestAdd(p_index) {
        this.Broadcast(SIGNAL.SEL_REQ_ADD, this, p_index);
    }

    RequestIndex(p_data) {
        let index = null;
        this.Broadcast(SIGNAL.SEL_REQ_INDEX, this, p_data, (p_index) => { index = p_index; });
        return index == null ? -1 : index;
    }

    RequestSelectAll() {
        let count = null;
        this.Broadcast(SIGNAL.SEL_REQ_LENGTH, this, (p_count) => { count = p_count; });
        if (!count) { return; }
        for (var i = 0; i < count; i++) { this.Broadcast(SIGNAL.SEL_REQ_ADD, this, i); }
    }

    /**
     * @description Removes given data from the selection.
     * @param {*} p_data 
     * @returns {boolean}
     */
    Remove(p_data) {

        if (!this._dataSet.has(p_data)) { return false; }

        let index = this._stack.IndexOf(p_data);
        this._stack.RemoveAt(index);
        this._indices.RemoveAt(index);
        this._dataSet.delete(p_data);

        this._itemObserver.Unobserve(p_data);

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_data);
        return true;

    }

    Bump(p_data) {

        if (!this._dataSet.has(p_data)) { return false; }

        let dataIndex = this._indices.At(this._stack.IndexOf(p_data));
        if (INPUT.selectionModifier == INPUT.SELECT_MODIFIER_RANGE && !this._isInsideRange
            && this._allowMultiple && dataIndex >= 0 && this._cachedRangeStart != -1) {
            return this.AddRange(-1, dataIndex, false);
        }

        if (p_data != this._stack.last) {
            let index = this._stack.IndexOf(p_data);
            this._stack._array.push(this._stack._array.splice(index, 1)[0]);
            this._indices._array.push(this._indices._array.splice(index, 1)[0]);
        }

        if(this._lastBump != p_data){
            this._lastBump = p_data;
            this.Broadcast(com.SIGNAL.ITEM_BUMPED, p_data);
        }

        return true;

    }

    _AutoBump() {
        if (this._stack.isEmpty) { return; }
        this.Broadcast(com.SIGNAL.ITEM_BUMPED, this._stack.last);
    }

    _OnDataReleased(p_data) { this.Remove(p_data); }

    /**
     * 
     * @param {*} p_data 
     * @returns {boolean} True if the selection contains the given data, otherwise false.
     */
    Contains(p_data) { return this._dataSet.has(p_data); }

    /**
     * @description Adds the data member from the given item to this selection
     * @param {*} p_item 
     * @returns {boolean}
     */
    AddFromItem(p_item, p_mode = null) {

        let data = this._ExtractData(p_item);
        if (data != null) {
            if (p_mode == null) { p_mode = INPUT.selectionModifier; }
            return this.Add(data, p_item.dataIndex, p_mode);
        }
        else { return false; }

    }

    /**
     * @description Removes the data member from the given item from this selection
     * @param {*} p_item 
     * @returns {boolean} True if the data was there and has been removed, otherwise false.
     */
    RemoveFromItem(p_item) {

        let data = this._ExtractData(p_item);
        if (data != null) { return this.Remove(data); }
        else { return false; }

    }

    BumpFromItem(p_item) {
        let data = this._ExtractData(p_item);
        if (data != null) { return this.Bump(data); }
        else { return false; }
    }

    /**
     * Keeps only the data owned by items in the given list
     * @param {*} p_itemList 
     */
    RecomputeSelectionFromItems(p_itemArray) {

        let map = new Map(),
            add = [];

        for (let a = 0; a < p_itemArray.length; a++) {
            let item = p_itemArray[a], data = this._ExtractData(item);
            if (!data) { continue; }
            map.set(data, item);
            if (!this._dataSet.has(data)) { add.push(data); }
        }

        for (let i = 0; i < this._stack.count; i++) {
            let
                existingData = this._stack.At(i),
                item = map.get(existingData);

            if (!item) {
                this.Remove(existingData);
                i--;
            }
        }

        for (let i = 0; i < add.length; i++) { this.Add(add[i]); }

        map.Clear();
        add.length = 0;

    }

    _ExtractData(p_item) {
        return (this._dataMember in p_item) ? p_item[this._dataMember] : null;
    }

    /**
     * 
     * @param {*} p_item 
     * @returns {boolean} True if the data member of the provided item is currently contained within that data selection, otherwise false
     */
    ContainsItemData(p_item) {
        let data = this._ExtractData(p_item);
        return data == null ? false : this.Contains(data);
    }

    ContainsDataIndex(p_index) {
        return this._indices.Contains(p_index);
    }

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        this._lastBump = null;
        this._cachedRangeStart = -1;
        if (this._stack.isEmpty) { return; }
        this._clearing = true;
        while (!this._stack.isEmpty) { this.Remove(this._stack.last); }
        this._clearing = false;
        this.Broadcast(SIGNAL.SEL_CLEARED, this);
    }

}

module.exports = DataSelection;