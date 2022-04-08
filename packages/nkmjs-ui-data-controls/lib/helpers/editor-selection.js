'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

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
class EditorSelection extends com.pool.DisposableObjectEx {
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

        this._preProcessData = null;

    }

    get editor() { return this._editor; }

    get preProcessData() { return this._preProcessData; }
    set preProcessData(p_value) { this._preProcessData = p_value; }

    get isEmpty() { return this._stack.isEmpty; }

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

        this.Broadcast(com.SIGNAL.ITEM_ADDED, p_data);

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

        this._stack.RemoveAt(p_data);
        this._dataSet.delete(p_data);
        this._itemObserver.Unobserve(p_data);

        this.Broadcast(com.SIGNAL.ITEM_REMOVED, p_data);

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

        this.Broadcast(com.SIGNAL.ITEM_BUMPED, p_data);

        return true;

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
        this._clearing = true;
        while (!this._stack.isEmpty) { this.Remove(this._stack.last, false); }
        this._clearing = false;
    }

}

module.exports = EditorSelection;