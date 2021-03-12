'use strict';


const u = require("@nkmjs/utils");
const { List, Dictionary } = require(`@nkmjs/collections`);

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
    constructor(p_onRegister = null) {

        this._context = null;

        this._commandList = new List(0);
        this._commandHooks = new Dictionary();
        this._onRegisterCmd = p_onRegister;

    }

    // ----> Init

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
        this._context = p_value;
        let cmdList = this._commandList;
        for (let i = 0, n = cmdList.count; i < n; i++) {
            cmdList.At(i).context = p_value;
        }
    }

    // ----> Command registration

    /**
     * @description TODO
     * @param {function} p_class The constructor of Command to be created
     * @param {string} p_name Name of the Command
     * @param {string} p_icon Icon of the Command
     * @param {array} p_hooks Auto-hook for the Command, in the format { evt:`SIGNAL`, fn:`function`, thisArg:`function's this (optional)` }. 
     * Events are either generic Command events (COMMAND_SIGNAL.xxx) or custom ones, if any.
     * @returns {actions.Command} The newly created Command.
     */
    Create(p_class, p_name = null, p_icon = null, p_hooks = null) {
        let cmd = Command.Rent(p_class, p_name, p_icon);
        this._Register(cmd, p_hooks);
        return cmd;
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
                for (let i = 0, n = p_hooks.length; i < n; i++) {
                    let hook = p_hooks[i];
                    p_cmd.Unwatch(hook.evt, hook.fn, (hook.thisArg || null));
                }
            }
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

}

module.exports = CommandBox;