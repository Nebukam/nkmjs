'use strict';

const DisposableObject = require(`./disposable-object`);
const SignalBox = require(`../signals/signal-box`);

const SIGNAL = require(`../signal`);

/**
 * Add broadcasting capabilities to `{@link common.pool.DisposableObject}`.
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof common.pool
 * 
 */
class DisposableObjectEx extends DisposableObject {
    constructor() { super(); }

    // ----> Init

    _Init() {
        this._releasePrevented = false;
        this._signals = new SignalBox();
    }

    // ----> Signals

    /**
     * @access protected
     * @param {*} p_signal 
     * @param {...any} args 
     * @group Broadcasting
     * @groupdescription This section list the main methods used to watch/unwatch signals on this object.
     * For more info on signals, see {@tutorial signals}
     */
    _Broadcast(p_signal, ...args) { 
        this._signals.Broadcast(p_signal, ...args); 
        return this;
    }

    /**
     * @description Watch a signal broadcasted by this object.  
     * Note that while you can provide an anonymous function, you won't be able to Unwatch it.
     * @param {*} p_signal The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.pool.DisposableObjectEx}
     * @group Broadcasting
     * @example let foo = someFunction;
     * object.Watch(SIGNAL.RELEASED, foo);
     * @example object.Watch(SIGNAL.RELEASED, foo, this);
     * @example object.Watch(SIGNAL.RELEASED, (obj)=>{ ... }));
     */
    Watch(p_signal, p_fn, p_listener = null) {
        this._signals.Add(p_signal, p_fn, p_listener);
        return this;
    }

    /**
     * @description Watch a signal broadcasted by this object, once only; meaning if the signal the listener gets automatically 
     * removed right after the next signal broadcast.
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.pool.DisposableObjectEx}
     * @group Broadcasting
     */
    WatchOnce(p_signalId, p_fn, p_listener = null) {
        this._signals.AddOnce(p_signalId, p_fn, p_listener);
        return this;
    }

    /**
     * @description Unwatch a signal broadcasted by this object
     * @param {*} p_signal The signal that was being watched
     * @param {function} p_fn The callback to be removed
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {common.pool.DisposableObjectEx}
     * @group Broadcasting
     */
    Unwatch(p_signal, p_fn, p_listener = null) {
        this._signals.Remove(p_signal, p_fn, p_listener);
        return this;
    }

    // ----> Pooling

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

    Release() {

        if (this._isReleasing) { return; }

        this._signals.silent = false;
        this._isReleasing = true;
        this._releasePrevented = false;

        this._Broadcast(SIGNAL.RELEASING, this);

        if (this._releasePrevented) {
            this._isReleasing = false;
            this._releasePrevented = false;
            return;
        }

        this._Broadcast(SIGNAL.RELEASED, this);
        this._CleanUp();

        if (this._returnFn != undefined) { this._returnFn(this); }
        this._isReleasing = false;

    }

    _CleanUp() {
        super._CleanUp();
        this._releasePrevented = false;
        this._signals.Clear();
    }



}

module.exports = DisposableObjectEx;