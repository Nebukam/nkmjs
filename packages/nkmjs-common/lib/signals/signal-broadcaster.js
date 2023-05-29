'use strict';

const u = require("@nkmjs/utils");
const col = require(`@nkmjs/collections`);
const Disposable = require(`../disposable`);

const BLANK = Symbol(`none`);

/**
 * An single signal broadcast manager.  
 * @class
 * @augments common.Observable
 * @memberof common.signals
 */
class SignalBroadcaster extends Disposable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._broadcasting = false;
        this._removeAll = false;
        this._slots = new col.DictionaryList();
        this._onceSlots = new col.DictionarySet();
        this._deprecated = [];
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEmpty() { return this._slots.length === 0; }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get length() { return this._slots.length; }

    /**
     * @description Register a subscriber.
     * NOTE : If a 'once' subscription exists with the same signature, it will change to be permanent
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Add(p_fn, p_watcher = null) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        p_watcher = p_watcher || BLANK;
        this._slots.Set(p_watcher, p_fn);
        this._onceSlots.Remove(p_watcher, p_fn);
        return this;
    }

    /**
     * @description TODO
     * @param {*} p_fn 
     * @param {*} p_watcher 
     */
    AddOnce(p_fn, p_watcher = null) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        p_watcher = p_watcher || BLANK;
        this._slots.Set(p_watcher, p_fn);
        this._onceSlots.Set(p_watcher, p_fn);
        return this;
    }

    /**
     * @description Unregister a subscriber
     * @param {function} p_fn 
     * @param {*} p_watcher 
     */
    Remove(p_fn, p_watcher = null) {

        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }

        p_watcher = p_watcher || BLANK;

        if (this._broadcasting) {
            this._deprecated.push([p_watcher, p_fn]);
        } else {
            this._slots.Remove(p_watcher, p_fn);
            this._onceSlots.Remove(p_watcher, p_fn);
        }

        return this;

    }

    /**
     * @description Remove all subscribers
     */
    RemoveAll() {

        if (this._broadcasting) {
            this._removeAll = true;
            return;
        }

        this._slots.Clear();
        this._onceSlots.Clear();
        this._deprecated.length = 0;
        this._removeAll = false;

    }

    /**
     * @description Dispatch arguments to subscribers
     * @param  {...any} args
     */
    Dispatch(...args) {

        if (this._broadcasting) {
            console.warn(`Dispatching signal while already dispatching (${this.id.toString()}) -- signal ignored. This is usually caused by this signal a re-dispatching inside the initial dispatch loop.`);
            return;
        }

        this._broadcasting = true;

        let slots = this._slots._map;
        for (const watcher of slots.keys()) {

            //console.log(watcher);
            let onceSet = this._onceSlots.Get(watcher);

            for (const cb of slots.get(watcher)) {
                cb.apply(watcher === BLANK ? null : watcher, args);
                if (onceSet?.has(cb)) { this._deprecated.push([watcher, cb]); }
            }

        };

        this._broadcasting = false;

        this._onceSlots.Clear();

        if (this._removeAll) { this.RemoveAll(); }
        else {
            for (const kvp of this._deprecated) { this._slots.Remove(kvp[0], kvp[1]); kvp.length = 0; }
            this._deprecated.length = 0;
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