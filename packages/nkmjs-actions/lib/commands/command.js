/**
 * Command can trigger actions.
 * Commands are a receptacle for :
 * - a function to execute
 * - shortcuts that will execute said function
 * - events that will allow UI to feedback the availability of a given command
 */

'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const COMMAND_SIGNAL = require(`./command-signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof actions
 */
class Command extends com.pool.DisposableObjectEx {
    constructor() { super(); }

    // ----> Static members

    /**
     * @description TODO
     * @param {function} p_class 
     * @param {string} [p_name] 
     * @param {string} [p_icon] 
     */
    static Rent(p_class, p_name = null, p_icon = null) {
        let cmd = com.Rent(p_class);
        cmd.name = u.isEmpty(p_name) ? u.tils.CamelSplit(p_class.name) : p_name;
        cmd.icon = u.isEmpty(p_icon) ? `command` : p_icon;
        return cmd;
    }

    // ----> Init

    _Init() {
        super._Init();
        this._icon = ``;
        this._name = u.tils.CamelSplit(this.constructor.name);
        this._isEnabled = true;
        this._context = null;
        this._emitter = null;
        this._order = 0;
        this._running = false;
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

    /**
     * @description Display order of the command
     * @type {boolean}
     */
    get order() { return this._order; }
    set order(p_value) { this._order = p_value; }

    /**
     * @description Icon asset of the command
     * @type {string}
     */
    get icon() { return this._icon; } //TODO : Check if this._icon is set, fallback on __NFO__.icon
    set icon(p_value) { this._icon = p_value; }

    /**
     * @description Display name of the command
     * @type {string}
     */
    get name() { return this._name; }
    set name(p_value) { this._name = p_value; }

    /**
     * @description Current 'originator' of the command, i.e what made the execution request.
     * @type {*}
     */
    get emitter() { return this._emitter; }
    set emitter(p_value) {
        if (this._emitter === p_value) { return; }
        let oldEmitter = this._emitter;
        this._emitter = p_value;
        if (oldEmitter) {
            oldEmitter.Unwatch(com.SIGNAL.RELEASED, this._OnEmitterReleased, this);
        }
        if (p_value) {
            p_value.Watch(com.SIGNAL.RELEASED, this._OnEmitterReleased, this);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_emitter 
     */
    _OnEmitterReleased(p_emitter) {
        this.emitter = null;
    }

    // ----> Availability

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isEnabled() { return this._isEnabled; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set enabled(p_value){
        if (p_value) { this.Enable(); }
        else { this.Disable(); }
    }

    /**
     * @description TODO
     */
    Enable() {
        if (this._isEnabled) { return false; }
        this._isEnabled = true;
        this._Broadcast(com.SIGNAL.UPDATED, this);
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!this._isEnabled) { return false; }
        this._isEnabled = false;
        this._Broadcast(com.SIGNAL.UPDATED, this);
        return true;
    }

    // ----> Execution

    /**
     * @description TODO
     * @type {*}
     */
    get context() { return this._context; }
    set context(p_value) {
        let sanitizedValue = this._SanitizeContext(p_value);
        if (this._context === sanitizedValue) { return; }
        this._context = sanitizedValue;
        this._OnContextChanged();
        this.enabled = this.CanExecute(this._context);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_context 
     * @customtag override-me
     */
    _SanitizeContext(p_context) {
        return p_context;
    }

    /**
     * @access protected
     * @description TODO
     */
    _OnContextChanged() { }

    /**
     * @description Checks whether this command can be executed within a given context
     * @param {*} p_context 
     * @returns {boolean} True if the command can be executed in the given context, otherwise false.
     * @customtag override-me
     */
    CanExecute(p_context) { return true; }

    /**
     * @description Execute the command within a given context
     * @param {*} p_context 
     */
    Execute(p_context) {
        if (this._running) { return; }
        this.context = (p_context || this._context);
        if (!this._isEnabled) { return; }
        this._Start();
        this._InternalExecute();
    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _InternalExecute() {

    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     */
    _InternalCancel() {

    }

    // ----> Default events

    /**
     * @access protected
     * @description TODO
     */
    _Start() {
        if (this._running) { return; }
        this._running = true;
        this._Broadcast(COMMAND_SIGNAL.START, this);
        this._Broadcast(com.SIGNAL.UPDATED, this);
    }

    /**
     * @access protected
     * @description TODO
     */
    _Success() {
        this._Broadcast(COMMAND_SIGNAL.SUCCESS, this);
        this._End();
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_msg 
     */
    _Fail(p_msg) {
        console.error(`${this} failed : ${p_msg}`);
        this._Broadcast(COMMAND_SIGNAL.FAIL, this, p_msg);
        this._End();
    }

    /**
     * @description TODO
     */
    Cancel() {
        if (!this._running) { return; }
        this._Cancel();
    }
    /**
     * @access protected
     * @description TODO
     */
    _Cancel() {
        this._InternalCancel();
        this._Broadcast(COMMAND_SIGNAL.CANCEL, this);
        this._End();
    }

    /**
     * @access protected
     * @description TODO
     */
    _End() {
        this._running = false;
        this._Broadcast(COMMAND_SIGNAL.END, this);
        this._Broadcast(com.SIGNAL.UPDATED, this);
    }

    // ----> Pooling

    _CleanUp() {
        this.Cancel();
        this._icon = ``;
        this._isEnabled = true;
        this.context = null;
        this.emitter = null;
        this.order = 0;
        super._CleanUp();
    }

    toString() {
        return `[>>${this.constructor.name}]`;
    }

}

module.exports = Command;