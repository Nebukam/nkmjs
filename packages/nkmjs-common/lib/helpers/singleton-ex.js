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
        this._signals = new SignalBox();
    }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param  {...any} args 
     */
    _Broadcast(p_signalId, ...args) {
        this._signals.Broadcast(p_signalId, ...args);
        return this;
    }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static Watch(p_signalId, p_fn, p_listener) { 
        this.instance._signals.Add(p_signalId, p_fn, p_listener); 
        return this; 
    }
    Watch(p_signalId, p_fn, p_listener) { 
        this._signals.Add(p_signalId, p_fn, p_listener); 
        return this;
    }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static WatchOnce(p_signalId, p_fn, p_listener) { 
        this.instance._signals.AddOnce(p_signalId, p_fn, p_listener); 
        return this;
    }
    WatchOnce(p_signalId, p_fn, p_listener) { 
        this._signals.AddOnce(p_signalId, p_fn, p_listener); 
        return this;
    }

    /**
     * @description TODO
     * @param {*} p_signalId 
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    static Unwatch(p_signalId, p_fn, p_listener) { 
        this.instance._signals.Remove(p_signalId, p_fn, p_listener); 
        return this;
    }
    Unwatch(p_signalId, p_fn, p_listener) { 
        this._signals.Remove(p_signalId, p_fn, p_listener); 
        return this;
    }

}

module.exports = SingletonEx;