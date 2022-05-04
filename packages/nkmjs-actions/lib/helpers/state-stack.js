'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const SIGNAL = require(`../signal`);

/**
 * A simple FIFO object stack
 * @class
 * @hideconstructor
 * @augments actions.helpers.StateStack
 * @memberof actions
 */
class StateStack extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._restoring = false;
        this._clearing = false;
        this._index = -1;
        this._stack = [];
        this._maxItems = 50;
    }

    /**
     * Important : when flushed all existing properties will be nullified
     * make sure to only use first-level properties to help with GC
     * @param {object} p_state 
     * @param {function} p_state.restore a function called with the state object as argument
     */
    Push(p_state, p_multiHandle = false) {

        if (this._restoring || this._clearing) { return false; }

        if (!p_state.restore) { throw new Error(`state requires a restore callback.`, p_state); }

        let
            lastIndex = this._stack.length - 1;
        if (this._index != lastIndex) {
            for (let i = lastIndex; i > this._index; i--) {
                this._FlushState(this._stack.pop());
            }
        }

        this._stack.push(p_state);
        this._index = this._stack.length-(p_multiHandle ? 0 : 1);

        //console.log(this._stack, this._index);

        if (this._stack.length > this._maxItems) {
            this._index--;
            this._FlushState(this._stack.shift());
        }

    }

    Previous() {

        if (this._clearing) { return false; }

        this._index--;
        if (this._index < 0) {
            this._index = 0;
            return false;
        }

        this._Restore(false);

        return true;

    }

    Next() {

        if (this._clearing) { return false; }

        this._index++;
        let lastIndex = this._stack.length;
        if (this._index >= lastIndex) {
            this._index = lastIndex;
            return false;
        }

        if (this._index <= -1) { return false; }

        this._Restore(true);

        return true;

    }

    _Restore(p_forward) {
        if (this._clearing) { return false; }

        this._restoring = true;
        let state = this._stack[this._index];
        //console.log(`Restore @${this._index}/${this._stack.length}`);
        u.Call(state.restore, state, p_forward);
        this._restoring = false;
    }

    _FlushState(p_state) {
        for (var p in p_state) { p_state[p] = null; }
    }

    Clear() {
        this._clearing = true;
        while (this._stack.length != 0) { this._FlushState(this._stack.pop()); }
        this._clearing = false;
    }

}

module.exports = StateStack;