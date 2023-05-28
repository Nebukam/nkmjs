'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const POOL = require(`../pool`);
const SignalBroadcaster = require(`./signal-broadcaster`);

/**
 * A boilerplate object to manage signals.
 * Usually a single object has a single signalBox.  
 * @class
 * @memberof common.signals
 */
class SignalBox {

    constructor(p_owner = null) {

        if (p_owner) {
            this._owner = p_owner;
            p_owner.Broadcast = this._Bind(this.Broadcast);
            p_owner.Watch = this._Bind(this.Watch);
            p_owner.WatchOnce = this._Bind(this.WatchOnce);
            p_owner.Unwatch = this._Bind(this.Unwatch);
        } else {
            this._owner = null;
        }

        this._signals = new Map();
        this._silent = false;
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
     * @description TODO
     * @type {boolean}
     */
    get silent() { return this._silent; }
    set silent(p_value) { this._silent = p_value; }

    get hasWatchers() { return this._signals.size > 0; }

    isEmpty(p_signal) { return this._signals.get(p_signal)?.isEmpty === false ? false : true; }

    Get(p_id) { return this._signals.get(p_id) }

    _GetOrMake(p_id) {
        let signal = this._signals.get(p_id);
        if (!signal) {
            signal = POOL.Rent(SignalBroadcaster);
            signal.id = p_id;
            this._signals.set(p_id, signal);
        }
        return signal;
    }

    /**
     * @description Broadcast a signal with arguments
     * @param {Symbol} p_id 
     * @param {*} args
     */
    Broadcast(p_id, ...args) {
        if (this._silent) { return this._owner || this; }
        this._signals.get(p_id)?.Dispatch(...args);
        return this._owner || this;
    }

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_id 
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Watch(p_id, p_fn, p_watcher = null) {
        this._GetOrMake(p_id).Add(p_fn, p_watcher);
        return this._owner || this;
    }

    /**
     * @description Register a signal subscription that will be removed after it fires once.
     * @param {Symbol} p_id 
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    WatchOnce(p_id, p_fn, p_watcher = null) {
        this._GetOrMake(p_id).AddOnce(p_fn, p_watcher);
        return this._owner || this;
    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_id 
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Unwatch(p_id, p_fn, p_watcher = null) {

        let signal = this._signals.get(p_id);
        if (!signal) { return this._owner || this; }

        signal.Remove(p_fn, p_watcher);

        if (signal.isEmpty) {
            this._signals.delete(p_id);
            signal.Release();
        }

        return this._owner || this;

    }

    /**
     * @description Unregister all subscription to a given signal
     * @param {Symbol} p_id 
     */
    RemoveAll(p_id) {
        this._signals.get(p_id)?.Release();
        this._signals.delete(p_id);
    }

    /**
     * @description Clears all signals & subscriptions
     */
    Clear() {
        for (const k of this._signals.keys()) { this._signals.get(k).Release(); }
        this._signals.clear();
    }

}

module.exports = SignalBox;