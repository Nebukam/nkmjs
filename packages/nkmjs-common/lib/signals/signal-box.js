'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const DisposableObject = require(`../pool/disposable-object`);
const POOL = require(`../pool/pool`);
const SignalBroadcaster = require(`./signal-broadcaster`);

/**
 * A boilerplate object to manage signals.
 * Usually a single object has a single signalBox.  
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof common.signals
 */
class SignalBox extends DisposableObject {

    constructor() {
        super();
        this._signals = new collections.Dictionary();
        this._silent = false;
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get silent() { return this._silent; }
    set silent(p_value) {
        this._silent = p_value;
    }

    get hasWatchers(){ return this._signals.count > 0; }

    isEmpty(p_signal) {
        let s = this._signals;
        if (!s.Contains(p_signal)) {
            return true;
        } else {
            return s.Get(p_signal).isEmpty;
        }
    }

    /**
     * @description Broadcast a signal with arguments
     * @param {Symbol} p_signalId 
     * @param {*} args
     */
    Broadcast(p_signalId, ...args) {

        if (this._silent || this._signals.isEmpty ) { return; }

        let signal = this._signals.Get(p_signalId);
        if (u.tils.isVoid(signal)) { return; }

        signal.Broadcast(...args);
    }

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Add(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.tils.isVoid(signal)) {
            signal = POOL.Rent(SignalBroadcaster);
            this._signals.Set(p_signalId, signal);
        }

        signal.Add(p_fn, p_listener);

    }

    /**
     * @description Register a signal subscription that will be removed after it fires once.
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    AddOnce(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.tils.isVoid(signal)) {
            signal = POOL.Rent(SignalBroadcaster);
            this._signals.Set(p_signalId, signal);
        }

        signal.AddOnce(p_fn, p_listener);

    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_signalId 
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Remove(p_signalId, p_fn, p_listener = null) {

        let signal = this._signals.Get(p_signalId);
        if (u.tils.isVoid(signal)) { return; }

        signal.Remove(p_fn, p_listener);

        if (signal.isEmpty) {
            this._signals.Remove(p_signalId);
            signal.Release();
        }

    }

    /**
     * @description Unregister all subscription to a given signal
     * @param {Symbol} p_signalId 
     */
    RemoveAll(p_signalId) {

        let signal = this._signals.Get(p_signalId);
        if (u.tils.isVoid(signal)) { return; }

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