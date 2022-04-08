'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);
const INPUT = require(`../input`);

const DataSelection = require(`./data-selection`);

/**
 * @typedef SignalItemSelected
 * @type com.SIGNAL.ITEM_ADDED
 * @property {*} item The item that just got added to selection
 * @property {boolean} firstTimeSelect True if the data associated to the selection has been added to the data selection 
 * for the first time since it was last selected, otherwise false.
 */

/**
 * @typedef SignalItemUnselected
 * @type com.SIGNAL.ITEM_REMOVED
 * @property {*} item The item that just got removed to selection
 * @property {boolean} dataRemoved True if the data associated to the selection has been removed from the data selection 
 * otherwise false.
 */


/**
 * A WidgetSelection is an object that wraps most common control for user-driven widget selection.
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof c
 * @signal SignalItemSelected Broadcasted right after an item has been added to the selection
 * @signal SignalItemUnselected Broadcasted right after an item has been removed from the selection
 */
class WidgetSelection extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._data = new DataSelection();
        this._persistentData = false;

        this._itemObserver = new com.signals.Observer();
        this._itemObserver
            //.Hook(SIGNAL.SELECTION_GAIN, this._OnItemSelectionGain, this)
            .Hook(SIGNAL.SELECTION_LOST, this._OnItemSelectionLost, this)
            .Hook(SIGNAL.DRAG_STARTED, this._OnItemDragStarted, this)
            .Hook(SIGNAL.DRAG_ENDED, this._OnItemDragEnded, this)
            .Hook(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        this._stack = new collections.List();
        this._shareSignals = true;
        this._allowMultiple = true;
        this._clearing = false;
        this._sharingEvent = false;

    }

    get isEmpty() { return this._stack.isEmpty; }

    get data() { return this._data; }

    set persistentData(p_value) {
        if (this._persistentData == p_value) { return; }
        this._persistentData = p_value;
        if (!p_value) {
            this._releasingItems.clear();
            this._releasingItems = null;
            this._itemObserver
                .Unhook(com.SIGNAL.RELEASING, this._OnItemReleasing, this)
                .Unhook(com.SIGNAL.RELEASED, this._OnItemReleased, this);

            this._data.RecomputeSelectionFromItems(this._stack.internalArray);
        } else {
            this._releasingItems = new Set();
            this._itemObserver
                .Hook(com.SIGNAL.RELEASING, this._OnItemReleasing, this)
                .Hook(com.SIGNAL.RELEASED, this._OnItemReleased, this);
        }
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get shareSignals() { return this._shareSignals; }
    set shareSignals(p_value) { this._shareSignals = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     */
    get allowMultiple() { return this._allowMultiple; }
    set allowMultiple(p_value) {
        this._allowMultiple = p_value;
        this._data.allowMultiple = p_value;
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
    /**
     * @description TODO
     * @type {*}
     */

    /**
     * @description Adds an item to the selection
     * @param {*} p_item 
     * @returns {boolean} True if the object was added for the first time, otherwise false
     */
    Add(p_item, p_mode = null) {

        if (p_mode == null) { p_mode = INPUT.selectionModifier; }

        if (this._stack.Contains(p_item)) {
            //if (p_mode == INPUT.SELECT_MODIFIER_TOGGLE) { this.Remove(p_item); } 
            return false;
        }

        // Clear selection multiple selection isn't allowed.
        if (!this._allowMultiple || p_mode == INPUT.SELECT_MODIFIER_NONE) { this.Clear(); }

        let firstTimeSelect = this._data.AddFromItem(p_item, p_mode);
        this._stack.Add(p_item);
        this._itemObserver.Observe(p_item);

        p_item.Select(true);

        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_item, firstTimeSelect);

        return true;

    }

    /**
     * @description Removes an item from the selection.
     * @param {*} p_item 
     */
    Remove(p_item) {
        if (this._stack.Remove(p_item)) {
            p_item.Select(false);
            this._itemObserver.Unobserve(p_item);

            let removeFromData = true;
            if (this._persistentData) {
                removeFromData = !this._releasingItems.has(p_item);
            }

            if (removeFromData) { this._data.RemoveFromItem(p_item); }

            this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_item, removeFromData);
        }
    }

    Bump(p_item) {

        if (!this._stack.Contains(p_item)) { return false; }

        if (p_item != this._stack.last) {
            let index = this._stack.IndexOf(p_item);
            this._stack._array.push(this._stack._array.splice(index, 1)[0]);
        }

        this._data.BumpFromItem(p_item);

        this.Broadcast(com.SIGNAL.ITEM_BUMPED, p_item);

        return true;

    }

    Check(p_item) {
        if (!this._persistentData) { return; }
        if (this._data.ContainsItemData(p_item)) { this.Add(p_item, INPUT.SELECT_MODIFIER_ADD); }
    }

    _OnItemSelectionGain(p_item, p_initialSelection = false) { if (!p_initialSelection) { this.Bump(p_item); } }

    _OnItemSelectionLost(p_item) { this.Remove(p_item); }

    _OnItemDragStarted(p_item) { this._SpreadEvent(SIGNAL.DRAG_STARTED, p_item); }

    _OnItemDragEnded(p_item) { this._SpreadEvent(SIGNAL.DRAG_ENDED, p_item); }

    /**
     * @access protected
     * @description Spreads an event to all items inside the selection
     * @param {*} p_signal 
     * @param {*} p_emitter 
     */
    _SpreadEvent(p_signal, p_emitter) {

        if (!this._shareSignals || this._sharingEvent) { return; }

        this._sharingEvent = true;

        let list = this._stack.internalArray;
        for (let i = 0, n = list.length; i < n; i++) {
            let item = list[i];
            if (item != p_emitter) { item.Broadcast(p_signal, item); }
        }

        this._sharingEvent = false;
    }

    _OnItemReleasing(p_item) {
        this._releasingItems.add(p_item);
    }

    _OnItemReleased(p_item) {
        this.Remove(p_item);
        if (this._releasingItems) { this._releasingItems.delete(p_item); }
    }

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        this._data.Clear();
        while (!this._stack.isEmpty) { this.Remove(this._stack.last); }
    }

}

module.exports = WidgetSelection;