'use strict';

const com = require("@nkmjs/common");
const { List } = require(`@nkmjs/collections`);

const UI_SIGNAL = require(`../ui-signal`);
const INPUT = require(`../input`);

/**
 * A WidgetSelection is an object that wraps most common control for user-driven widget selection.
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof ui.core.helpers
 */
class WidgetSelection extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();
        this._stack = new List();
        this._shareSignals = true;
        this._allowMultiple = true;
        this._clearing = false;
        this._sharingEvent = false;
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
        if (!p_value) { this.Clear(); }
    }

    /**
     * @description Adds an item to the selection
     * @param {*} p_item 
     * @returns {boolean} True if the object was added for the first time, otherwise false
     */
    Add(p_item) {

        if (this._stack.Contains(p_item)) {
            if (INPUT.ctrl) { this.Remove(p_item); } //TODO: Need a way to re-map ctrl to something else
            return false;
        }

        // Clear selection multiple selection isn't allowed.
        if (!this._allowMultiple || !INPUT.ctrl) { this.Clear(); }

        this._stack.Add(p_item);

        p_item.Watch(UI_SIGNAL.SELECTION_LOST, this._OnItemSelectionLost, this);
        p_item.Watch(UI_SIGNAL.DRAG_STARTED, this._OnItemDragStarted, this);
        p_item.Watch(UI_SIGNAL.DRAG_ENDED, this._OnItemDragEnded, this);

        p_item.Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        p_item.Select(true);
        this._Broadcast(com.SIGNAL.ITEM_ADDED, p_item);

        return true;

    }

    /**
     * @description Removes an item from the selection.
     * @param {*} p_item 
     */
    Remove(p_item) {
        if (this._stack.Remove(p_item)) {
            p_item.Select(false);

            p_item.Unwatch(UI_SIGNAL.SELECTION_LOST, this._OnItemSelectionLost, this);
            p_item.Unwatch(UI_SIGNAL.DRAG_STARTED, this._OnItemDragStarted, this);
            p_item.Unwatch(UI_SIGNAL.DRAG_ENDED, this._OnItemDragEnded, this);

            p_item.Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

            this._Broadcast(com.SIGNAL.ITEM_REMOVED, p_item);
        }
    }

    _OnItemSelectionLost(p_item) { this.Remove(p_item); }

    _OnItemReleased(p_item) { this.Remove(p_item); }

    _OnItemDragStarted(p_item) { this._SpreadEvent(UI_SIGNAL.DRAG_STARTED, p_item); }

    _OnItemDragEnded(p_item) { this._SpreadEvent(UI_SIGNAL.DRAG_ENDED, p_item); }

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
            if (item != p_emitter) { item._Broadcast(p_signal, item); }
        }

        this._sharingEvent = false;
    }

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        let stack = this._stack;
        while (!stack.isEmpty) { this.Remove(stack.last); }
    }

}

module.exports = WidgetSelection;