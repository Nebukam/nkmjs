'use strict';

const u = require("@nkmjs/utils");
const SIGNAL = require(`../signal`);
const DisposableObjectEx = require(`../pool/disposable-object-ex`);
const SignalBox = require(`../signals/signal-box`);
const StateBase = require(`./state-base`);

/**
 * @description TODO
 * @class
 * @augments common.pool.DisposableObjectEx
 * @memberof common.helpers
 */
class StateMachine extends DisposableObjectEx {
    constructor() {
        super();
        this._currentState = null;
        this._owner = this;
        this._signals = new SignalBox();
    }

    /**
     * State machine owner
     * @type {DisposableObjectEx}
     */
    set owner(p_value) {
        if (u.tils.isVoid(p_value)) { p_value = this; }
        this._owner = p_value;
    }
    get owner() { return this._owner; }

    /**
     * Current state
     * @type {StateBase}
     */
    set currentState(p_value) {

        if (this._currentState === p_value) { return; }
        let oldValue = this._currentState;
        this._currentState = p_value;

        if (oldValue) {

        }
        if (p_value) {

        }

        this._OnCurrentStateChanged(oldValue);
        this._Broadcast(SIGNAL.STATE_CHANGED, this._owner, p_value, oldValue);

        if (this._owner === this) { this._signals.Broadcast(p_value, this._owner); }
        else { this._owner._Broadcast(p_value, this._owner); }

    }
    /**
     * @description Current state
     * @type {StateBase}
     */
    get currentState() { return this._currentState; }

    /**
     * @description TODO
     * @param {*} p_state 
     * @returns {boolean} True if the current state is p_state, otherwise false.
     */
    Is(p_state) { return this._currentState === p_state; }

    /**
     * @description TODO
     * @param  {...any} args a list of states
     * @returns {boolean} True if the current state is any of the provided arguments, otherwise false.
     */
    IsAny(...args) {
        for (let i = 0, n = args.length; i < n; i++) { if (this._currentState === args[i]) { return true; } }
        return false;
    }

    /**
     * @description TODO
     * @param {*} p_state 
     * @returns {boolean} True if the current state is NOT p_state, otherwise false.
     */
    IsNot(p_state) { return this._currentState != p_state; }

    /**
     * @description TODO
     * @param  {...any} args a list of states
     * @returns {boolean} True if the current state is NOT any of the provided arguments, otherwise false.
     */
    IsNotAny(...args) {
        for (let i = 0, n = args.length; i < n; i++) { if (this._currentState === args[i]) { return false; } }
        return true;
    }

    /**
     * @access protected
     * @description TODO
     */
    _OnCurrentStateChanged(p_oldState) {

    }

    _CleanUp() {
        this._currentState = null;
        this._owner = null;
        this._signals.RemoveAll();
        super._CleanUp();
    }

}

module.exports = StateMachine;