'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);
const INPUT = require(`../input`);

/**
 * A DataSelection is an object that wraps the most common control for user-driven data selection.
 * It is designed to work with streamed widgets (i.e widgets that gets released and thus unselected)
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof ui.core.helpers
 */
class DataSelection extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Init

    _Init() {
        super._Init();

        this._stack = new collections.List();
        this._dataSet = new Set();
        this._dataMember = `data`;

        this._itemObserver = new com.signals.Observer();
        this._itemObserver.Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this);

        this._allowMultiple = true;
        this._clearing = false;
    }

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

    /**
     * @description Adds given data to the selection
     * @param {*} p_data 
     * @returns {boolean} True if the data was added for the first time, otherwise false
     */
    Add(p_data, p_additive = false ) {

        if (p_data == null) { return false; }

        if (this._dataSet.has(p_data)) {
            if (p_additive) { this.Remove(p_data); } //TODO: Need a way to re-map ctrl to something else
            return false;
        }

        // Clear selection multiple selection isn't allowed.
        if (!this._allowMultiple || !p_additive ) { this.Clear(); }

        this._stack.Add(p_data);
        this._dataSet.add(p_data);

        this._itemObserver.Observe(p_data);

        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_data);

        return true;

    }

    /**
     * @description Removes given data from the selection.
     * @param {*} p_data 
     * @returns {boolean}
     */
    Remove(p_data) {

        if (!this._dataSet.has(p_data)) { return false; }

        this._stack.Remove(p_data);
        this._dataSet.delete(p_data);

        this._itemObserver.Unobserve(p_data);

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_data);
        return true;

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
    AddFromItem(p_item) {

        let data = this._ExtractData(p_item);
        if (data != null) { return this.Add(data); }
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
        let data = (this._dataMember in p_item) ? p_item[this._dataMember] : null;
        return data == null ? false : this.Has(data);
    }

    /**
     * @description Clear all item in the stack
     */
    Clear() {
        this._clearing = true;
        while (!this._stack.isEmpty) { this.Remove(this._stack.last); }
        this._clearing = false;
    }

}

module.exports = DataSelection;