'use strict';

const DisposableObjectEx = require(`../pool/disposable-object-ex`);

function isObservable(p_item){
    if (p_item === null || p_item === undefined) { return false; }
    return (`Watch` in p_item && `Unwatch` in p_item && `WatchOnce` in p_item);
}

/**
 * Allows to 'hook' (listen) to signal broadcasted by an object, without having to 
 * subscribe/unsubscribe each time the object changes. 
 * Especially useful to observe data in UI/MVCs.
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof common.signals
 */
class Observer extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._hooks = [];
        this._targets = [];
        this._isEnabled = true;
    }

    //#region Availability

    /**
     * @description TODO
     * @type {boolean}
     */
    get isEnabled() { return this._isEnabled; }
    set enabled(p_value) {
        if (p_value) { this.Enable(); }
        else { this.Disable(); }
    }

    /**
     * @description TODO
     */
    Enable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = true;
        for (let i = 0, n = this._targets.length; i < n; i++) {
            this._WatchAll(this._targets[i]);
        }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = false;
        for (let i = 0, n = this._targets.length; i < n; i++) {
            this._UnwatchAll(this._targets[i]);
        }
        return true;
    }

    //#endregion

    //#region Hooks

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */
    Hook(p_evt, p_fn, p_subscriber = null) {
        this._hooks.push({ evt: p_evt, thisArg: p_subscriber, fn: p_fn });
        if (this._isEnabled) {
            for (let i = 0, n = this._targets.length; i < n; i++) {
                this._targets[i].Watch(p_evt, p_fn, p_subscriber);
            }
        }
        return this;
    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_subscriber 
     */
    Unhook(p_evt, p_fn, p_subscriber = null) {
        for (let i = 0, n = this._hooks.length; i < n; i++) {
            let hook = this._hooks[i];
            if (hook.evt === p_evt
                && hook.thisArg === p_subscriber
                && hook.fn === p_fn) {
                this._hooks.splice(i, 1);
                i--; n--;
                if (this._isEnabled) {
                    for (let i = 0, n = this._targets.length; i < n; i++) {
                        this._targets[i].Unwatch(p_evt, p_fn, p_subscriber);
                    }
                }
            }
        }
        return this;
    }

    /**
     * @description TODO
     * @type {array}
     * @customtag read-only
     */
    get targets() { return this._targets; }
    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get targetCount(){ return this._targets.length; }

    /**
     * @description Starts watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Observe(p_target) {
        if(!p_target){ throw new Error(`Target cannot be null.`); }
        if(!isObservable(p_target)){return p_target;}
        if (this._targets.includes(p_target)) { return p_target; }
        this._targets.push(p_target);
        if (this._isEnabled) { this._WatchAll(p_target); }
        return p_target;
    }

    /**
     * @description Starts watching for signals of a given target, and removes all other targets
     * @param {*} p_target may be null
     * @returns {*} target
     */
    ObserveOnly(p_target) {
        this.Flush();
        return this.Observe(p_target);
    }

    /**
     * @description Stop watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Unobserve(p_target) {
        if(!p_target){ throw new Error(`Target cannot be null.`); }
        if(!isObservable(p_target)){return p_target;}
        let index = this._targets.indexOf(p_target);
        if (index === -1) { return p_target; }
        this._targets.splice(index, 1);
        if (this._isEnabled) { this._UnwatchAll(p_target); }
        return p_target;
    }

    /**
     * @access private
     * @param {*} p_target 
     */
    _WatchAll(p_target) {
        for (let i = 0, n = this._hooks.length; i < n; i++) {
            let hook = this._hooks[i];
            p_target.Watch(hook.evt, hook.fn, hook.thisArg);
        }
    }

    /**
     * @access private
     * @param {*} p_target 
     */
    _UnwatchAll(p_target) {
        if (p_target.isReleasing) { return; }
        for (let i = 0, n = this._hooks.length; i < n; i++) {
            let hook = this._hooks[i];
            p_target.Unwatch(hook.evt, hook.fn, hook.thisArg);
        }
    }

    /**
     * Stop watching targets and flushes them
     */
    Flush(){
        if (this._isEnabled) {
            for (let i = 0, n = this._targets.length; i < n; i++) {
                this._UnwatchAll(this._targets[i]);
            }
        }

        this._targets.length = 0;
    }

    //#endregion

    /**
     * @access protected
     */
    _CleanUp() {
        this.Flush();
        this._hooks.length = 0;
        this._isEnabled = true;
        super._CleanUp();
    }

}

module.exports = Observer;