'use strict';

const col = require(`@nkmjs/collections`);
const u = require("@nkmjs/utils");

const Disposable = require(`../disposable`);

/**
 * A CallList is a very simple helper class that stores a list of functions
 * that can be called in registration order, with the ability to empty the
 * list after it has been traversed.
 * @class
 * @hideconstructor
 * @memberof common.helpers
 */
class CallList extends Disposable {

    constructor() {
        super();
        this._list = [];
    }

    /**
     * @description The number of functions currently registered in the list
     * @type {number}
     */
    get length() { return this._list.length; }

    Has(p_fn) { return this._list.includes(p_fn); }

    /**
     * @description Add a function to the list.  
     * Note that the CallList use {@link col.Add} internally,
     * and as such **does not accept duplicate entries**.
     * @param {function} p_fn 
     * @returns {common.helpers.CallList} self
     * @example calllist.Add(foo).Add(bar);
     */
    Add(p_fn) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a Function.`); }
        this._list.Add(p_fn);
        return this;
    }

    /**
     * @description Removes a function from the list.
     * @param {function} p_fn 
     * @returns {common.helpers.CallList} self
     * @example calllist.Remove(foo).Remove(bar);
     */
    Remove(p_fn) {
        this._list.Remove(p_fn);
        return this;
    }

    /**
     * @description Call all the functions in the list in order of addition, with
     * the given args.
     * @param  {...any} args 
     * @returns {common.helpers.CallList} self
     */
    Notify(...args) {
        for (const fn of this._list) { fn.apply(null, args); }
        return this;
    }

    /**
     * @description Remove all registered functions from the list.
     * @returns {common.helpers.CallList} self
     * @example //Clear the list after traversing it
     * calllist.Notify().Clear();
     */
    Clear() {
        this._list.length = 0;
        return this;
    }

    _CleanUp() {
        this.Clear();
        super._CleanUp();
    }

}

module.exports = CallList;