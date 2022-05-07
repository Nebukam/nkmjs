/**
 * Command can trigger actions.
 * Commands are a receptacle for :
 * - a function to execute
 * - shortcuts that will execute said function
 * - events that will allow UI to feedback the availability of a given command
 */

'use strict';

const com = require("@nkmjs/common");

const COMMAND_SIGNAL = require(`./command-signal`);
const Command = require(`./command`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class CommandChain extends Command {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._nodes = [];
        this._currentIndex = 0;
        this._cmdObserver = new com.signals.Observer();

        this._cmdObserver
            .Hook(COMMAND_SIGNAL.START, this._NodeStart, this)
            .Hook(COMMAND_SIGNAL.END, this._NodeEnd, this)
            .Hook(COMMAND_SIGNAL.SUCCESS, this._NodeSuccess, this)
            .Hook(COMMAND_SIGNAL.FAIL, this._NodeFail, this);

    }

    //#region Execution

    _OnContextChanged() {
        super._OnContextChanged();
        for (let i = 0, n = this._nodes.length; i < n; i++) {
            this._nodes[i].context = this._context;
        }
    }

    /**
     * @description TODO
     * @param {*} p_context 
     */
    CanExecute(p_context) {
        let r = super.CanExecute(p_context);
        if (!r) { return false; }
        for (let i = 0, n = this._nodes.length; i < n; i++) {
            if (!this._nodes[i].CanExecute(p_context)) { return false; }
        }
        return true;
    }

    /**
     * @description TODO
     * @param {*} p_context 
     */
    Execute(p_context = null) {
        if (this._running) { return; }
        this.context = (p_context || this._context);
        if (!this._isEnabled) { return; }
        this._Start();
        this._InternalExecute();
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalExecute() {
        this._currentIndex = -1;
        this._ExecuteNextIndex();
    }

    /**
     * @access protected
     * @description TODO
     */
    _ExecuteNextIndex() {
        this._currentIndex += 1;
        let l = this._nodes.length;

        if (this._currentIndex >= l) {
            this._Success();
            return;
        }

        let cmd = this._nodes[this._currentIndex];
        this._cmdObserver.ObserveOnly(cmd);
        cmd.Execute(this._context);
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalCancel() {

    }

    //#endregion

    //#region Node events

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     */
    _NodeStart(p_cmd) {
    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     */
    _NodeSuccess(p_cmd) {
        this._ExecuteNextIndex();
    }

    /**
     * @access protected
     * @description TODO
     * @param {action.Command} p_cmd 
     * @param {string} p_msg 
     */
    _NodeFail(p_cmd, p_msg) {
        this._Fail(p_msg);
    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     */
    _NodeEnd(p_cmd) {

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
     * @param {*} p_msg 
     * @description TODO
     */
    _Fail(p_msg) {
        this.Broadcast(COMMAND_SIGNAL.FAIL, this, p_msg);
        this._End();
    }

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
    }

    //#endregion

    //#region Pooling

    _CleanUp() {
        super._CleanUp();
    }

    //#endregion

    toString() {
        return `[>>${this.constructor.name}]`;
    }

}

module.exports = CommandChain;