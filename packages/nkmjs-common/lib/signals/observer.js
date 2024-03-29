'use strict';

const Observable = require(`../observable`);

function isObservable(p_item) {
    if (!p_item) { return false; }
    return (p_item.Watch && p_item.Unwatch && p_item.WatchOnce);
}

/**
 * Allows to 'hook' (listen) to signal broadcasted by an object, without having to 
 * subscribe/unsubscribe each time the object changes. 
 * Especially useful to observe data in UI/MVCs.
 * @class
 * @augments common.Observable
 * @memberof common.signals
 */
class Observer extends Observable {
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
        for (const target of this._targets) { this._WatchAll(target); }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = false;
        for (const target of this._targets) { this._UnwatchAll(target); }
        return true;
    }

    //#endregion

    //#region Hooks

    /**
     * @description Register a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Hook(p_evt, p_fn, p_watcher = null) {
        this._hooks.push({ evt: p_evt, thisArg: p_watcher, fn: p_fn });
        if (!this._isEnabled) { return this; }
        for (const target of this._targets) { target.Watch(p_evt, p_fn, p_watcher); }
        return this;
    }

    /**
     * @description Unregister a signal subscription
     * @param {Symbol} p_evt 
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Unhook(p_evt, p_fn, p_watcher = null) {

        for (let i = 0; i < this._hooks.length; i++) {
            let hook = this._hooks[i];
            if (hook.evt === p_evt && hook.thisArg === p_watcher && hook.fn === p_fn) {
                this._hooks.splice(i, 1);
                i--;
            }
        }

        if (this._isEnabled) {
            for (const target of this._targets) { target.Unwatch(p_evt, p_fn, p_watcher); }
        }

        return this;
    }

    ClearHooks() {
        this.Flush();
        this._hooks.length = 0;
    }

    /**
     * @description TODO
     * @type {Array}
     * @customtag read-only
     */
    get targets() { return this._targets; }
    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get targetCount() { return this._targets.length; }

    /**
     * @description Starts watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Observe(p_target) {
        if (!p_target) { throw new Error(`Target cannot be null.`); }
        if (!isObservable(p_target)) { return p_target; } //console.warn(`Attempting to observe a non-observable target : `, this);
        if (this._targets.AddNew(p_target)) { this._WatchAll(p_target); }
        return p_target;
    }

    /**
     * @description Starts watching for signals of a given target, and removes all other targets
     * @param {*} p_target may be null
     * @returns {*} target
     */
    ObserveOnly(p_target) {
        this.Flush();
        if (!p_target) { return; }
        return this.Observe(p_target);
    }

    /**
     * @description Stop watching for signals of a given target
     * @param {*} p_target 
     * @returns {*} target
     */
    Unobserve(p_target) {
        if (!p_target) { throw new Error(`Target cannot be null.`); }
        if (!isObservable(p_target)) { return p_target; }
        if (this._targets.Remove(p_target)) { this._UnwatchAll(p_target); }
        return p_target;
    }

    /**
     * @access private
     * @param {*} p_target 
     */
    _WatchAll(p_target) {
        if (!this._isEnabled) { return; }
        for (const hook of this._hooks) { p_target.Watch(hook.evt, hook.fn, hook.thisArg); };
    }

    /**
     * @access private
     * @param {*} p_target 
     */
    _UnwatchAll(p_target) {
        if (!this._isEnabled || p_target.isReleasing) { return; }
        for (const hook of this._hooks) { p_target.Unwatch(hook.evt, hook.fn, hook.thisArg); };
    }

    /**
     * Stop watching targets and flushes them
     */
    Flush() {
        if (this._isEnabled) { for (const target of this._targets) { this._UnwatchAll(target) }; }
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