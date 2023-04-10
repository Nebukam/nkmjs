'use strict';


const u = require("@nkmjs/utils");
const collections = require(`@nkmjs/collections`);

const Command = require(`./command`);

/**
 * A CommandBox is meant to be a repo of commands available for a single context.
 * It is also a mean to centralize command instances and have them act as "soft singleton" if needed,
 * especially if a broad context should be able to enable/disable specific commands.
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class CommandBox {
    constructor(p_onRegister = null, p_emitter = null) {

        this._context = null;
        this._emitter = p_emitter;

        this._commandList = new collections.List(0);
        this._commandHooks = new collections.Dictionary();
        this._onRegisterCmd = p_onRegister;

        this._idMap = new Map();

    }

    //#region Properties

    /**
     * @description TODO
     * @type {collections.List}
     * @customtag read-only
     */
    get list() { return this._commandList; }

    /**
     * @description TODO
     * @type {*}
     */
    get context() { return this._context; }
    set context(p_value) {
        if (this._context == p_value) { return; }
        this._context = p_value;
        this._commandList.ForEach((cmd) => { cmd.context = p_value; });
    }

    //#endregion

    RefreshAvailability() {
        this._commandList.ForEach((cmd) => { cmd.enabled = cmd.CanExecute(this._context) });
    }

    //#region Command management

    /**
     * @description TODO
     * @param {function} p_class The constructor of Command to be created
     * @param {string} p_name Name of the Command
     * @param {string} p_icon Icon of the Command
     * @param {array} p_hooks Auto-hook for the Command, in the format { evt:`SIGNAL`, fn:`function`, thisArg:`function's this (optional)` }. 
     * Events are either generic Command events (COMMAND_SIGNAL.xxx) or custom ones, if any.
     * @returns {actions.Command} The newly created Command.
     */
    Create(p_class, p_options = null) {

        if (!p_options) { p_options = u.tils.EMPTY_OBJECT; }

        let cmd = u.isFunc(p_class) ? Command.Rent(p_class, p_options) : p_class;
        this._Register(cmd, p_options.hooks || null);

        cmd.shortcut = p_options.shortcut || null;

        this._idMap.set(p_options.id || cmd.constructor.name, cmd);

        return cmd;

    }

    Add(p_cmd, p_options = null) {

        if (!p_options) { p_options = u.tils.EMPTY_OBJECT; }

        this._Register(p_cmd, p_options.hooks || null);

        p_cmd.shortcut = p_options.shortcut || null;

        this._idMap.set(p_options.id || p_cmd.constructor.name, p_cmd);

        return p_cmd;

    }

    Get(p_key) {
        if (!u.isString(p_key)) { if (u.isFunc(p_key) && u.isInstanceOf(p_key, Command)) { p_key = p_key.name; } }
        return this._idMap.get(p_key);
    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     * @param {array} [p_hooks] {evt:'', fn:'', thisArg:''}
     */
    _Register(p_cmd, p_hooks = null) {
        if (this._commandList.Add(p_cmd)) {
            if (p_hooks) {
                this._commandHooks.Set(p_cmd, p_hooks);
                for (let i = 0, n = p_hooks.length; i < n; i++) {
                    let hook = p_hooks[i];
                    p_cmd.Watch(hook.evt, hook.fn, (hook.thisArg || null));
                }
            }
            p_cmd.emitter = this._emitter;
            this._OnCommandRegistered(p_cmd);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     */
    _OnCommandRegistered(p_cmd) {
        p_cmd.context = this._context;
        if (this._onRegisterCmd) { this._onRegisterCmd.call(null, p_cmd); }
    }

    /**
     * @description Removes a command from the box.
     * @param {actions.Command} p_cmd 
     */
    RemoveCommand(p_cmd) {
        if (this._commandList.Remove(p_cmd)) {
            let hooks = this._commandHooks.Get(p_cmd);
            if (hooks) {
                this._commandHooks.Remove(p_cmd);
                for (let i = 0, n = hooks.length; i < n; i++) {
                    let hook = hooks[i];
                    p_cmd.Unwatch(hook.evt, hook.fn, (hook.thisArg || null));
                }
            }
            //TODO : Retrieve creation options to clear up idMap
            this._OnCommandRemoved(p_cmd);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @param {actions.Command} p_cmd 
     */
    _OnCommandRemoved(p_cmd) {
        p_cmd.context = null;
    }


    //#endregion

}

module.exports = CommandBox;