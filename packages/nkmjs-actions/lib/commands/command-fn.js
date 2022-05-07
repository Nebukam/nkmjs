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

const Command = require(`./command`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class CommandFn extends Command {
    constructor() { super(); }

    //#region Static members

    /**
     * @description TODO
     * @param {object} p_options 
     */
    static RentFn(p_options) {

        let fn = u.tils.Get(p_options, `fn`, null);
        if (!fn) {
            throw new Error(`Cannot create CommandFn with empty function`);
        }

        let cmd = com.Rent(CommandFn);
        cmd.options = p_options;

        return cmd;
    }

    //#endregion

    _Init() {

        super._Init();

        this._fn = null;
        this._thisArg = null;
        this._options = null;

    }

    //#region Properties

    /**
     * @description TODO
     * @type {*}
     */
    get thisArg() { return this._thisArg; }
    set thisArg(p_value) { this._thisArg = p_value; }

    /**
     * @description TODO
     * @type {function}
     */
    get fn() { return this._fn; }
    set fn(p_value) { this._fn = p_value; }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_value) {

        this._options = p_value;

        this.fn = u.tils.Get(p_value, `fn`, null);
        if (!this._fn) {
            throw new Error(`CommandFn options have no function defined.`);
        }

        this.thisArg = u.tils.Get(p_value, `thisArg`, null);
        this.name = u.tils.Get(p_value, `name`, u.tils.CamelSplit(this._fn.name));
        this.icon = u.tils.Get(p_value, `icon`, `%ICON%/icon_cmd.svg`);
        this.order = u.tils.Get(p_value, `order`, 0);

    }

    //#endregion

    //#region Execution

    /**
     * @access protected
     * @description TODO
     */
    _InternalExecute() {
        try {
            if (this._context) {
                this._fn.call(this._thisArg, this._context);
            } else {
                this._fn.call(this._thisArg);
            }
            this._Success();
        } catch (e) {
            this._Fail(e.message);
        }

    }

    //#endregion

}

module.exports = CommandFn;