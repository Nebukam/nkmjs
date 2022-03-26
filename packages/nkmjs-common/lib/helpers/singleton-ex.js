'use strict';

const Singleton = require(`./singleton`);
const SignalBox = require(`../signals/signal-box`);

/**
 * @description TODO
 * @class
 * @memberof common.helpers
 * @augments common.helpers.Singleton
 */
class SingletonEx extends Singleton {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._signals = new SignalBox(this);
    }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param  {...any} args 
     */
    Broadcast(p_signalId, ...args) { /* owned by local SignalBox */ }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static Watch(p_signalId, p_fn, p_listener = null) {
        return this.instance.Watch(p_signalId, p_fn, p_listener);
    }
    Watch(p_signalId, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static WatchOnce(p_signalId, p_fn, p_listener = null) {
        return this.instance.WatchOnce(p_signalId, p_fn, p_listener);
    }
    WatchOnce(p_signalId, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static Unwatch(p_signalId, p_fn, p_listener = null) {
        return this.instance.Unwatch(p_signalId, p_fn, p_listener);
    }
    Unwatch(p_signalId, p_fn, p_listener = null) { /* owned by local SignalBox */ }

}

module.exports = SingletonEx;