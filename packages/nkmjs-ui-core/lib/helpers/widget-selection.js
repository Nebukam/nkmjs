'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);
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
        this._stack = new collections.List();
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
    get lastData() {
        let lastItem = this._stack.last;
        if(lastItem){ return lastItem.data; }
        else{ return null; }
    }
    /**
     * @description TODO
     * @type {*}
     */
    get firstData() {
        let firstItem = this._stack.first;
        if(firstItem){ return firstItem.data; }
        else{ return null; }
    }
    /**
     * @description TODO
     * @type {array}
     */
    get dataStack(){
        let result = [];
        for(let i = 0, n = this._stack.count; i < n; i++){
            let data = this._stack.At(i).data;
            if(data){ result.push(data); }
        }
        return result;
    }

    /**
     * Adds the selection's data objects to the given array.
     * Does not add duplicates.
     * @param {array} p_array 
     */
    PushData(p_array, p_allowDuplicates = false){
        for(let i = 0, n = this._stack.count; i < n; i++){
            let data = this._stack.At(i).data;
            if(data && (p_allowDuplicates || !p_array.includes(data))){ 
                p_array.push(data); }
        }
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

        p_item
            .Watch(SIGNAL.SELECTION_LOST, this._OnItemSelectionLost, this)
            .Watch(SIGNAL.DRAG_STARTED, this._OnItemDragStarted, this)
            .Watch(SIGNAL.DRAG_ENDED, this._OnItemDragEnded, this)
            .Watch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

        p_item.Select(true);
        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_item);

        return true;

    }

    /**
     * @description Removes an item from the selection.
     * @param {*} p_item 
     */
    Remove(p_item) {
        if (this._stack.Remove(p_item)) {
            p_item.Select(false);

            p_item
                .Unwatch(SIGNAL.SELECTION_LOST, this._OnItemSelectionLost, this)
                .Unwatch(SIGNAL.DRAG_STARTED, this._OnItemDragStarted, this)
                .Unwatch(SIGNAL.DRAG_ENDED, this._OnItemDragEnded, this)
                .Unwatch(com.SIGNAL.RELEASED, this._OnItemReleased, this);

            this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_item);
        }
    }

    _OnItemSelectionLost(p_item) { this.Remove(p_item); }

    _OnItemReleased(p_item) { this.Remove(p_item); }

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

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        let stack = this._stack;
        while (!stack.isEmpty) { this.Remove(stack.last); }
    }

}

module.exports = WidgetSelection;