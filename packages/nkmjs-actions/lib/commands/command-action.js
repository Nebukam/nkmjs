'use strict';

const { U } = require(`@nkmjs/utils`);
const { POOL } = require(`@nkmjs/common`);

const COMMAND_SIGNAL = require(`./command-signal`);
const Command = require(`./command`);

// CommandAction requires :
// - an action constructor
// - the 'context' is the action's operation
// - an emitter, used to seek up an editor, if any.

let _COMMAND_ACTION = null;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class CommandAction extends Command {
    constructor() { super(); }

    /**
     * @description TODO
     * @param {*} p_emitter 
     * @param {actions.Action} p_actionClass constructor
     * @param {object} p_operation 
     */
    static Do(p_emitter, p_actionClass, p_operation) {

        let A = this._COMMAND_ACTION;

        if (!A) { A = this._COMMAND_ACTION = new CommandAction(); }

        A.emitter = p_emitter;
        A.actionClass = p_actionClass;
        A.Execute(p_operation);

    }

    // ----> Init

    _Init() {
        super._Init();
        this._actionClass = null;
    }

    /**
     * @description TODO
     * @type {actions.Action}
     */
    get actionClass() { return this._actionClass; }
    set actionClass(p_value) { this._actionClass = p_value; }

    CanExecute(p_context) {
        if (!p_context || !this._actionClass) { return false; }
        return true;
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalExecute() {
        //TODO : Check whether or not there is an ongoing drag'n drop action
        //and concatenate all resulting actions
        let editor = null;
        if (this._emitter) {
            editor = this._emitter.editor;
            if (!editor) {
                //Look in parenting stack in case no editor is found
                //stop at first editor or last ?
                //assume first for now.
                let editorClass = POOL.GetClass(`Editor`),
                    p = this._emitter;
                while (!editor && p) {
                    if (U.isInstanceOf(p, editorClass)) { editor = p; }
                    p = p.parent;
                }
            }
        }

        if (editor) {
            //If editor found, make it do the thing
            editor.Do(this._actionClass, this._context);
        } else {
            //If no editor found, create action, execute it then release it immediately.
            POOL.Rent(this._actionClass)
                .Do(this._context, false)
                .Release();
        }

        this._Success();
    }

    _CleanUp() {
        this._actionClass = null;
        super._CleanUp();
    }

}

module.exports = CommandAction;