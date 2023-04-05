'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const POOL = require(`../pool/pool`);
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
            p_owner.Broadcast = this._Bind(this.Broadcast);
            p_owner.Watch = this._Bind(this.Watch);
            p_owner.WatchOnce = this._Bind(this.WatchOnce);
            p_owner.Unwatch = this._Bind(this.Unwatch);
        }

        this._signals = new collections.Dictionary();
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
    set silent(p_value) {
        this._silent = p_value;
    }

    get hasWatchers() { return this._signals.count > 0; }

    isEmpty(p_signal) {

        let s = this._signals;
        if (!s.Contains(p_signal)) {
            return true;
        } else {
            return s.Get(p_signal).isEmpty;
        }
    }

    Get(p_signalId) { return this._signals.Get(p_signalId) }

    /**
     * @description Broadcast a signal with arguments
     * @param {Symbol} p_signalId 
     * @param {*} args
     */
    Broadcast(p_signalId, ...args) {

        if (this._silent || this._signals.isEmpty) { return this; }
        if (!p_signalId) {
            throw new Error(`Signal may not be undefined or null.`);
        }
        let signal = this._signals.Get(p_signalId);
        if (!signal) { return; }
        signal.Dispatch(...args);

        return this;
    }

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Watch(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.isVoid(signal)) {
            signal = POOL.Rent(SignalBroadcaster);
            this._signals.Set(p_signalId, signal);
        }

        signal.Add(p_fn, p_listener);
        return this;
    }

    /**
     * @description Register a signal subscription that will be removed after it fires once.
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    WatchOnce(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.isVoid(signal)) {
            signal = POOL.Rent(SignalBroadcaster);
            this._signals.Set(p_signalId, signal);
        }

        signal.AddOnce(p_fn, p_listener);
        return this;
    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Unwatch(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.isVoid(signal)) { return this; }

        signal.Remove(p_fn, p_listener);

        if (signal.isEmpty) {
            this._signals.Remove(p_signalId);
            signal.Release();
        }

        return this;

    }

    /**
     * @description Unregister all subscription to a given signal
     * @param {Symbol} p_signalId 
     */
    RemoveAll(p_signalId) {

        let signal = this._signals.Get(p_signalId);
        if (u.isVoid(signal)) { return; }

        this._signals.Remove(p_signalId);
        signal.Release();

    }

    /**
     * @description Clears all signals & subscriptions
     */
    Clear() {
        let signals = this._signals,
            keys = signals.keys;

        for (let i = 0, n = keys.length; i < n; i++) {
            signals.Get(keys[i]).Release();
        }

        signals.Clear();
    }

}

module.exports = SignalBox;