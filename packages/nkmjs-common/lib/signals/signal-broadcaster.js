'use strict';

const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);
const DisposableObject = require(`../pool/disposable-object`);

/**
 * An single signal broadcast manager.  
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof common.signals
 */
class SignalBroadcaster extends DisposableObject {
    constructor() { super(); }

    static BLANK = Symbol(`none`);

    _Init() {
        super._Init();
        this._broadcasting = false;
        this._removeAll = false;
        this._slots = new collections.DictionaryList();
        this._onceSlots = new collections.DictionaryList();
        this._deprecatedKVP = [];
        this._queuedBroadcasts = [];
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty() { return this._slots.count === 0; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get count() { return this._slots.count; }

    /**
     * @description Register a subscriber.
     * NOTE : If a 'once' subscription exists with the same signature, it will change to be permanent
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Add(p_fn, p_listener = null) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        if (u.isVoid(p_listener)) { p_listener = SignalBroadcaster.BLANK; }
        this._slots.Set(p_listener, p_fn);
        this._onceSlots.Remove(p_listener, p_fn);
    }

    /**
     * @description TODO
     * @param {*} p_fn 
     * @param {*} p_listener 
     */
    AddOnce(p_fn, p_listener = null) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        if (u.isVoid(p_listener)) { p_listener = SignalBroadcaster.BLANK; }
        this._slots.Set(p_listener, p_fn);
        this._onceSlots.Set(p_listener, p_fn);
    }

    /**
     * @description Unregister a subscriber
     * @param {function} p_fn 
     * @param {*} p_listener 
     */
    Remove(p_fn, p_listener = null) {

        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        if (u.isVoid(p_listener)) { p_listener = SignalBroadcaster.BLANK; }

        if (this._slots.Contains(p_listener)) {
            if (this._broadcasting) { this._deprecatedKVP.push([p_listener, p_fn]); }
            else { this._slots.Remove(p_listener, p_fn); }
        }

        if (this._onceSlots.Contains(p_listener)) {
            if (this._broadcasting) { this._deprecatedKVP.push([p_listener, p_fn]); }
            else { this._onceSlots.Remove(p_listener, p_fn); }
        }

    }

    /**
     * @description Remove all subscribers
     */
    RemoveAll() {
        
        if (this._broadcasting) {
            this._removeAll = true;
            return;
        }

        this._queuedBroadcasts.length = 0;
        this._slots.Clear();
        this._onceSlots.Clear();
        this._deprecatedKVP.length = 0;
        this._removeAll = false;

    }

    /**
     * @description Broadcast arguments to subscribers
     * @param  {...any} args
     */
    Broadcast(...args) {

        if (this._broadcasting) {
            //May cause chaos.
            this._queuedBroadcasts.push(args);
            console.warn(`Dispatching signal while already dispatching. Queueing.`);
            return;
        }

        this._broadcasting = true;

        let slots = this._slots._map,
            keys = slots.keys();

        if (args === null || args === undefined) {

            // Broadcast without args
            // this._slots.internalMap.forEach(this.__BroadcastWithoutArgs, this);

            for (let si = 0, sn = slots.size; si < sn; si++) {

                let watcher = keys.next().value,
                    callbacks = slots.get(watcher),
                    n = callbacks.length,
                    onceList = this._onceSlots.Get(watcher);

                if (watcher === SignalBroadcaster.BLANK) {
                    if (onceList) {
                        for (let i = 0; i < n; i++) {
                            let fn = callbacks[i];
                            fn.apply(null);
                            if (onceList.includes(fn)) { this._deprecatedKVP.push([watcher, fn]); }
                        }
                    } else {
                        for (let i = 0; i < n; i++) {
                            callbacks[i].apply(null);
                        }
                    }
                } else {
                    if (onceList) {
                        for (let i = 0; i < n; i++) {
                            let fn = callbacks[i];
                            fn.apply(watcher);
                            if (onceList.includes(fn)) { this._deprecatedKVP.push([watcher, fn]); }
                        }
                    } else {
                        for (let i = 0; i < n; i++) {
                            callbacks[i].apply(watcher);
                        }
                    }
                }
            }

        } else {

            // Broadcast with args
            // this._slots.internalMap.forEach(this.__BroadcastWithArgs, this);

            for (let si = 0, sn = slots.size; si < sn; si++) {

                let watcher = keys.next().value,
                    callbacks = slots.get(watcher),
                    n = callbacks.length,
                    onceList = this._onceSlots.Get(watcher);

                if (watcher === SignalBroadcaster.BLANK) {
                    if (onceList) {
                        for (let i = 0; i < n; i++) {
                            let fn = callbacks[i];
                            fn.apply(null, args);
                            if (onceList.includes(fn)) { this._deprecatedKVP.push([watcher, fn]); }
                        }
                    } else {
                        for (let i = 0; i < n; i++) { callbacks[i].apply(null, args); }
                    }

                } else {
                    if (onceList) {
                        for (let i = 0; i < n; i++) {
                            let fn = callbacks[i];
                            fn.apply(watcher, args);
                            if (onceList.includes(fn)) { this._deprecatedKVP.push([watcher, fn]); }
                        }
                    } else {
                        for (let i = 0; i < n; i++) { callbacks[i].apply(watcher, args); }
                    }
                }
            }

        }

        this._PostDispatch();

    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    _PostDispatch() {

        this._broadcasting = false;
        this._onceSlots.Clear();

        if (this._removeAll) {
            this.RemoveAll();
        } else {
            for (let i = 0, n = this._deprecatedKVP.length; i < n; i++) {
                let kvp = this._deprecatedKVP[i];
                this._slots.Remove(kvp[0], kvp[1]);
            }
        }

        this._deprecatedKVP.length = 0;

        if (this._queuedBroadcasts.length != 0) {
            this.Broadcast.apply(this, this._queuedBroadcasts.shift());
        }

    }

    /**
     * Note : this has been inlined in _Broadcast.
     * @access private
     * @param {array} p_callbacks 
     * @param {*} p_listener 
     * @param {Map} p_map 
     */
    __BroadcastWithoutArgs(p_callbacks, p_listener, p_map) {

        let onceList = this._onceSlots.Get(p_listener);

        if (p_listener === SignalBroadcaster.BLANK) {
            if (onceList) {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    let fn = p_callbacks[i];
                    fn.apply(null);
                    if (onceList.includes(fn)) { this._deprecatedKVP.push([p_listener, fn]); }
                }
            } else {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    p_callbacks[i].apply(null);
                }
            }
        } else {
            if (onceList) {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    let fn = p_callbacks[i];
                    fn.apply(p_listener);
                    if (onceList.includes(fn)) { this._deprecatedKVP.push([p_listener, fn]); }
                }
            } else {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    p_callbacks[i].apply(p_listener);
                }
            }
        }
    }

    /**
     * Note : this has been inlined in _Broadcast
     * @access private
     * @param {array} p_callbacks 
     * @param {*} p_listener 
     * @param {Map} p_map 
     */
    __BroadcastWithArgs(p_callbacks, p_listener, p_map) {

        let onceList = this._onceSlots.Get(p_listener);
        if (p_listener === SignalBroadcaster.BLANK) {
            if (onceList) {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    let fn = p_callbacks[i];
                    fn.apply(null, this._args);
                    if (onceList.includes(fn)) { this._deprecatedKVP.push([p_listener, fn]); }
                }
            } else {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    p_callbacks[i].apply(null, this._args);
                }
            }

        } else {
            if (onceList) {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    let fn = p_callbacks[i];
                    fn.apply(p_listener, this._args);
                    if (onceList.includes(fn)) { this._deprecatedKVP.push([p_listener, fn]); }
                }
            } else {
                for (let i = 0, n = p_callbacks.length; i < n; i++) {
                    p_callbacks[i].apply(p_listener, this._args);
                }
            }
        }
    }

    /**
     * @description list all functions watching this signal
     * @customtag debug
     */
    ListCallbacks(p_indent = 1) {
        let keys = this._slots.keys,
            indent = ``,
            report = ``;

        for (let i = 0; i < p_indent; i++) { indent += `    `; }

        for (let i = 0, n = keys.length; i < n; i++) {
            let key = keys[i],
                list = this._slots.Get(key),
                ctr = null;

            try { ctr = key.constructor; } catch (e) { }

            for (let j = 0; j < list.length; j++) {
                report += `${indent}(${ctr ? ctr.name : key}) => ${list[j].name}\n`;
            }
        }

        console.log(report);
    }

    _CleanUp() {
        this.RemoveAll();
        super._CleanUp();
    }


}

module.exports = SignalBroadcaster;