// Represent a list of single-typed data, that can act as an array
// But also can be easily used alongside dom-streamer etc
// Can be sorted and searched through.

'use strict';

const com = require("@nkmjs/common");
const collections = require(`@nkmjs/collections`);

const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof data.core
 */
class DataList extends collections.List {

    static FLUSH_DEFAULT = Symbol(`default`);
    static FLUSH_DIRECT_RELEASE = Symbol(`directRelease`);
    static FLUSH_RELEASE_POST = Symbol(`releasePost`);

    constructor() {
        super();
        this._isReleasing = false;
        this._Init();
        this._PostInit();
        this._itemObserver = null;
        //TODO: Implement sorting events

    }

    /**
     * @access protected
     * @description Called only once in the `constructor` of the object, _Init, well, _initialize_ the object.  
     * Use it for initlizing variables, members, bind functions etc, so they can be used safely in _PostInit.  
     * Note : There is no need to call super() on this member when immediately extending Disposable, the function is a stub.
     * @customtag override-me
     * @group Initialization
     */
    _Init() {
        this._signals = new com.signals.SignalBox(this);
        this._parent = null;
        this._defaultSortFunc = com.SORTING.NAME_ASC;
        this._autoSort = false;
        this._skipSorting = false;
        this._flushing = false;
    }

    get parent() { return this._parent; }
    set parent(p_value) { this._parent = p_value; }

    get defaultSortFunc() { return this._defaultSortFunc; }
    set defaultSortFunc(p_value) { this._defaultSortFunc = p_value || com.SORTING.NAME_ASC; }

    get autoSort() { return this._autoSort; }
    set autoSort(p_value) {
        if (this._autoSort == p_value) { return; }
        this._autoSort = p_value;
        if (this._autoSort) {
            if (!this._delayedSort) { this._delayedSort = com.DelayedCall(this._Bind(this._AutoSort)); }
            this._delayedSort.Schedule();
        } else if (this._delayedSort) {
            this._delayedSort.Cancel();
        }
    }

    get itemObserver() {
        if (!this._itemObserver) { this._itemObserver = new com.signals.Observer(); }
        return this._itemObserver;
    }

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */
    Hook(p_evt, p_fn, p_subscriber = null) {
        this.itemObserver.Hook(p_evt, p_fn, p_subscriber);
        return this;
    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */
    Unhook(p_evt, p_fn, p_subscriber = null) {
        this.itemObserver.Unhook(p_evt, p_fn, p_subscriber);
        return this;
    }

    /**
     * @access protected
     * @description Bind the given function to this object and returns it.
     * Note that it replaces the function reference, hence referencing function before they are being bound in `_Init`,
     * ( i.e in the constructor ) will target an obsolete function.
     * @param {*} p_func 
     * @group Utils
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    /**
     * @access protected
     * @description Called only once in the `constructor` of the object, right after `_Init`. This allows
     * your constructor to perform operations on members etc, **knowing they have been properly initilized** with their default
     * or intended values.  
     * Note : There is no need to call super() on this member when immediately extending Disposable, the function is a stub.
     * @customtag override-me
     * @group Initialization
     */
    _PostInit() { }

    /**
     * @access protected
     * @description Bind the given function to this object and returns it.
     * Note that it replaces the function reference, hence referencing function before they are being bound in `_Init`,
     * ( i.e in the constructor ) will target an obsolete function.
     * @param {*} p_func 
     * @group Utils
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    //#region Pooling

    /**
     * Whether the object is currently in the process of being released or not.
     * @customtag read-only
     * @type {boolean}
     * @group Pooling
     */
    get isReleasing() { return this._isReleasing; }


    //#region Signals

    /**
     * @access protected
     * @param {*} p_signal 
     * @param {...any} args 
     * @group Broadcasting
     * @groupdescription This section list the main methods used to watch/unwatch signals on this object.
     * For more info on signals, see {@tutorial signals}
     */
    Broadcast(p_signal, ...args) { /* owned by local SignalBox */ }

    /**
     * @description Watch a signal broadcasted by this object.  
     * Note that while you can provide an anonymous function, you won't be able to Unwatch it.
     * @param {*} p_signal The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.Observable}
     * @group Broadcasting
     * @example let foo = someFunction;
     * object.Watch(SIGNAL.RELEASED, foo);
     * @example object.Watch(SIGNAL.RELEASED, foo, this);
     * @example object.Watch(SIGNAL.RELEASED, (obj)=>{ ... }));
     */
    Watch(p_signal, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description Watch a signal broadcasted by this object, once only; meaning if the signal the listener gets automatically 
     * removed right after the next signal broadcast.
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.Observable}
     * @group Broadcasting
     */
    WatchOnce(p_signalId, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description Unwatch a signal broadcasted by this object
     * @param {*} p_signal The signal that was being watched
     * @param {function} p_fn The callback to be removed
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.Observable}
     * @group Broadcasting
     */
    Unwatch(p_signal, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    //#endregion


    /**
     * @description TODO
     */
    Dirty() {
        if (this._isDirty) { return; }
        this._isDirty = true;
        this.Broadcast(SIGNAL.DIRTY, this);
    }

    /**
     * @description TODO
     */
    ClearDirty() {
        if (!this._isDirty) { return; } this._isDirty = false;
        this.Broadcast(SIGNAL.DIRTY_CLEARED, this);
    }

    /**
     * @description Make this DataBlock dirty and broadcast an 'UPDATED' signal.
     */
    CommitUpdate() {
        this.Dirty();
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    //#region List methods

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {boolean} True if the item has been added to the list, otherwise false.
    */
    Add(p_item, p_silent = true) {
        return super.Add(p_item) ?
            this._OnItemAdded(p_item, this._array.length - 1, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {boolean} True if the item has been added to the list, otherwise false.
    */
    Unshift(p_item, p_silent = true) {
        return super.Unshift(p_item) ?
            this._OnItemAdded(p_item, 0, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @param {*} p_index 
     * @returns {*} 
     */
    RemoveAt(p_index, p_silent = true) {
        let item = super.RemoveAt(p_index);
        return item ?
            this._OnItemRemoved(item, p_index, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @param {*} p_index 
     * @returns {*} 
     */
    Insert(p_item, p_index, p_silent = true) {
        return super.Insert(p_item, p_index) ?
            this._OnItemAdded(p_index, p_index, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @param {*} p_index 
     * @returns {*} 
     */
    Move(p_item, p_index, p_silent = true) {
        return super.Move(p_item, p_index) ?
            this._OnItemMoved(p_item, p_index, p_silent) :
            false;
    }

    MoveBefore(p_item, p_beforeItem, p_silent = true) {
        return super.MoveBefore(p_item, p_beforeItem) ?
            this._OnItemMoved(p_item, -1, p_silent) ://TODO: compute index
            false;
    }

    MoveAfter(p_item, p_afterItem, p_silent = true) {
        return super.MoveAfter(p_item, p_beforeItem) ?
            this._OnItemMoved(p_item, -1, p_silent) ://TODO: compute index
            false;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*}
     */
    ToStart(p_item, p_silent = true) {
        return super.ToStart(p_item) ?
            this._OnItemMoved(p_item, 0, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @param {*} p_item 
     * @returns {*}
     */
    ToEnd(p_item, p_silent = true) {
        return super.ToEnd(p_item) ?
            this._OnItemMoved(p_item, this._array.length - 1, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @returns {*} 
     */
    Pop(p_silent = true) {
        let item = super.Pop();
        return item ?
            this._OnItemRemoved(item, this._array.length, p_silent) :
            false;
    }

    /**
     * @description TODO
     * @returns {*} 
     */
    Shift(p_silent = true) {
        let item = super.Shift();
        return item ?
            this._OnItemRemoved(item, 0, p_silent) :
            false;
    }

    /**
     * @description Clears the List
     */
    Clear(p_silent = true) {
        if (this._itemObserver) { this._itemObserver.Flush(); }
        super.Clear();
        if (!p_silent) { this.CommitUpdate(); }
    }

    /**
     * Clears the list by removing each item individually,
     * thus triggering add/remove events.
     * @param {*} p_behavior 
     */
    Flush(p_behavior = null, p_silent = true) {

        this._skipSorting = true;
        this._flushing = true;

        switch (p_behavior) {
            case this.constructor.FLUSH_DIRECT_RELEASE:
                while (!this.isEmpty) { this.Pop(true).Release(); }
                break;
            case this.constructor.FLUSH_RELEASE_POST:
                let rStack = [];
                while (!this.isEmpty) { rStack.push(this.Pop(true)); }
                for (item of rStack) { item.Release(); };
                rStack.length = 0;
                break;
            case this.constructor.FLUSH_DEFAULT:
            default:
                while (!this.isEmpty) { this.Pop(true); }
                break;
        }

        if (this._itemObserver) { this._itemObserver.Flush(); }

        this._skipSorting = false;
        this._flushing = false;
        if (!p_silent) { this.CommitUpdate(); }

    }

    //#endregion

    //#region Events

    _OnItemAdded(p_item, p_index, p_silent) {
        if (this._itemObserver) { this._itemObserver.Observe(p_item); }
        if (this._autoSort) { this._delayedSort.Schedule(); }
        this.Broadcast(com.SIGNAL.ITEM_ADDED, this, p_item, p_index);
        if (!p_silent) { this.CommitUpdate(); }
        return p_item;
    }

    _OnItemRemoved(p_item, p_index, p_silent) {
        if (this._itemObserver) { this._itemObserver.Unobserve(p_item); }
        if (this._autoSort) { this._delayedSort.Schedule(); }
        this.Broadcast(com.SIGNAL.ITEM_REMOVED, this, p_item, p_index);
        if (!p_silent) { this.CommitUpdate(); }
        return p_item;
    }

    _OnItemMoved(p_item, p_index, p_silent) {
        this.Broadcast(com.SIGNAL.ITEM_MOVED, this, p_item, p_index);
        if (!p_silent) { this.CommitUpdate(); }
        return p_item;
    }


    //#endregion

    //#region Sorting

    /**
     * @description Sort this Catalog based on sorting options. Format :
     * { id:'id to look for and test (optional)', fn:'sorting function' }.
     * Triggers a 'SORTED' signal if the Catalog has been effectively sorted.
     * @param {object} p_options Optional sorting options
     * @param {function} p_options.fn sorting function
     * @param {string} p_options.id option id to check
     * @group Sorting
     */
    Sort(p_method = null) {
        if (!p_method || this._skipSorting) { return; }
        this._array.sort(p_method);
        this.Broadcast(com.SIGNAL.SORTED, this, p_method);

    }

    AutoSort(p_sorting = null) {

        if (!p_sorting) {
            this.autoSort = false;
            this._autoSortingFn = null;
            return;
        }

        this._autoSortingFn = p_sorting;
        this.autoSort = true;

    }

    _AutoSort() {
        if (!this._autoSortingFn) { return; }
        this.Sort(this._autoSortingFn);
    }

    RefreshSorting() {

        if (!this._autoSortingFn) { return; }

        let snapshot = [...this._array];
        this._array.sort(this._autoSortingFn);

        let reordered = false;

        for (let i = 0, n = snapshot.length; i < n; i++) {
            if (snapshot[i] != this._array[i]) {
                reordered = true;
                break;
            }
        }

        snapshot.length = 0;

        if (reordered) {
            this.Broadcast(com.SIGNAL.SORTED, this, this._autoSortingFn);
        }

    }

    //#endregion

    /**
     * @description Interrupts the releasing process and prevents this object from being released : `_CleanUp` won't be called,
     * and the object won't release
     * Needs to be called right after SIGNAL.RELEASING has been broadcasted, otherwise has no effect.
     * @example 
     * 
     * myDisposableObject.Watch(
     *     SIGNAL.RELEASED,
     *     (obj)=>{ alert('Released !'); }
     * );
     * 
     * myDisposableObject.Watch(
     *     SIGNAL.RELEASING,
     *     (obj)=>{ 
     *         obj.PreventRelease();
     *         alert('Release prevented !'); 
     *     }
     * );
     * 
     * myDisposableObject.Release(); // alert : 'Release prevented !'
     * 
     * 
     */
    PreventRelease() {
        this._releasePrevented = true;
    }

    /**
     * @description Releases the object and returns it back to the pool.  
     * If you want to do operations when the object is released, do so by overriding the `_CleanUp` method.
     * @broadcasts common.SIGNAL.RELEASING
     * @broadcasts common.SIGNAL.RELEASED
     * @group Pooling
     * @groupdescription Group of methods related to the NKMjs pooling system.
     */
    Release() {

        if (this._isReleasing) { return; }

        this._signals.silent = false;
        this._isReleasing = true;
        this._releasePrevented = false;

        this.Broadcast(com.SIGNAL.RELEASING, this);

        if (this._releasePrevented) {
            this._isReleasing = false;
            delete this._releasePrevented;
            return;
        }

        this.Broadcast(com.SIGNAL.RELEASED, this);
        this._CleanUp();

        if (this._returnFn != undefined) { this._returnFn(this); }
        this._isReleasing = false;

    }


    /**
     * @access protected
     * @description Called when the object is released. Resets most properties to their initial values.  
     * Override this method in your own implementations to 'reset' the object to the state you want it to be
     * when it gets rented again through `{@link common.POOL.Rent}`
     * @customtag override-me
     * @example MyClass extends Disposable{
     * 
     *     _Init(){
     *         this._arr = []; // Create member during _Init
     *     }
     * 
     *     _CleanUp(){ 
     *         this._arr.length = 0; // Reset member during _CleanUp
     *     }
     * 
     * }
     * @group Pooling 
     */
    _CleanUp() {
        if (this._itemObserver) { this._itemObserver.ClearHooks(); }
        this.AutoSort(null);
        this._skipSorting = false;
        this._signals.Clear();
        this._parent = null;
        this.Clear();
    }

}

module.exports = DataList;