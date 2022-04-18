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
const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helper.InfosObjectEx
 * @memberof actions
 */
class Command extends com.helpers.InfosObjectEx {
    constructor() { super(); }

    //#region Static members

    static __displayIcon = `command`;

    /**
     * @description TODO
     * @param {function} p_class 
     * @param {string} [p_name] 
     * @param {string} [p_icon] 
     */
    static Rent(p_class, p_options) {
        let cmd = com.Rent(p_class);
        cmd.displayInfos = p_options;
        return cmd;
    }

    //#endregion

    _Init() {
        super._Init();

        this._Bind(this.Execute);

        this._isEnabled = true;
        this._context = null;
        this._emitter = null;
        this._running = false;
        this._shortcut = null;
        this._shortcutActivated = false;
        this._releaseOnEnd = false;
        this._emitterBound = false;
    }

    //#region Properties

    get releaseOnEnd() { return this._releaseOnEnd; } //TODO : Check if this._icon is set, fallback on __NFO__.icon
    set releaseOnEnd(p_value) { this._releaseOnEnd = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

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

    get shortcut() { return this._shortcut; }
    set shortcut(p_value) {
        if (this._shortcut == p_value) { return; }
        if (this._shortcut) { this._shortcut.Unwatch(SIGNAL.ACTIVATED, this._OnShortcutActivated, this); }
        this._shortcut = p_value;
        if (this._shortcut) { this._shortcut.Watch(SIGNAL.ACTIVATED, this._OnShortcutActivated, this); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_emitter 
     */
    _OnEmitterReleased(p_emitter) {
        if (!this._emitterBound) { return; }
        this.emitter = null;
    }

    //#endregion

    //#region Availability

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
        this.Broadcast(com.SIGNAL.UPDATED, this);
        this.Broadcast(SIGNAL.ENABLED, this);
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!this._isEnabled) { return false; }
        this._isEnabled = false;
        this.Broadcast(com.SIGNAL.UPDATED, this);
        this.Broadcast(SIGNAL.DISABLED, this);
        return true;
    }

    //#endregion

    //#region Execution

    /**
     * @description TODO
     * @type {*}
     */
    get context() { return this._context; }
    set context(p_value) {
        if (this._context === p_value) { return; }
        let sanitizedValue = this._SanitizeContext(p_value);
        if (this._context === sanitizedValue) { return; }
        this._context = sanitizedValue;
        if (this._running) { this._contextBefore = sanitizedValue; }
        this._OnContextChanged();
        this.enabled = this.CanExecute(this._context);
    }

    _FetchContext() { return null; }

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
    Execute(p_context = null) {

        if (this._running || !this._isEnabled) { return false; }

        this._contextBefore = this._context;

        if (p_context != null) {

            p_context = this._SanitizeContext(p_context);

        } else {

            if (!p_context) { p_context = this._FetchContext(); } // Try to dynamically fetch context value if provided value is empty
            if (!p_context) { p_context = this._context; } // Try to fallback to an existing value

        }

        if (!this.CanExecute(p_context)) { return false; }

        this._context = p_context;

        this._Start();
        this._InternalExecute();

        return true;
    }

    ExecuteWith(p_context = null) {

        if (this._running) { return false; }

        p_context = this._SanitizeContext(p_context);

        if (!this.CanExecute(p_context)) { return false; }

        this._contextBefore = this._context;
        this._context = p_context;

        this._Start();
        this._InternalExecute();

        return true;

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

    //#endregion

    //#region Default events

    /**
     * @access protected
     * @description TODO
     */
    _Start() {
        if (this._running) { return; }
        this._running = true;
        this.Broadcast(COMMAND_SIGNAL.START, this);
        this.Broadcast(com.SIGNAL.UPDATED, this);
    }

    /**
     * @access protected
     * @description TODO
     */
    _Success() {
        this.Broadcast(COMMAND_SIGNAL.SUCCESS, this);
        this._End();
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_msg 
     */
    _Fail(p_msg) {
        this.Broadcast(COMMAND_SIGNAL.FAIL, this, p_msg);
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
        this.Broadcast(COMMAND_SIGNAL.CANCEL, this);
        this._End();
    }

    /**
     * @access protected
     * @description TODO
     */
    _End() {

        this._running = false;
        this.Broadcast(COMMAND_SIGNAL.END, this);
        this.Broadcast(com.SIGNAL.UPDATED, this);

        this._context = this._contextBefore;

        if (this._releaseOnEnd) { this.Release(); }

    }

    _OnShortcutActivated(p_shortcut) {
        if (!this._isEnabled) { return; }
        p_shortcut.Consume();
        this._shortcutActivated = true;
        this.Execute();
        this._shortcutActivated = false;
    }

    //#endregion

    //#region Pooling

    _CleanUp() {
        this.Cancel();
        this._icon = ``;
        this._isEnabled = true;
        this.context = null;
        this._contextBefore = null;
        this.emitter = null;
        this.shortcut = null;
        this._releaseOnEnd = false;
        super._CleanUp();
    }

    //#endregion

    toString() {
        return `[>>${this.constructor.name}]`;
    }

}

module.exports = Command;