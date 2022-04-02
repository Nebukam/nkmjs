'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const actions = require("@nkmjs/actions");

const Modal = require(`../helpers/modal`);

/**
 * @description Controls a single instance of a Modal with static parameters.
 * For example, useful to manage a floating tool window opened by a tool button.
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class CommandMenu extends actions.Command {
    constructor() { super(); }

    static Pop(p_emitter, p_menu, p_data = null) {
        let cmd = actions.Command.Rent(CommandMenu);

        cmd.emitter = p_emitter;
        cmd.options = {
            menu: p_menu
        };

        cmd.Execute(p_data || p_emitter);

        let menu = cmd._modal.content;
        cmd.Release();
        return menu;
    }

    static __defaultModalClass = Modal;
    static __defaultMenuClass = null;

    _Init() {
        super._Init();
        this._options = null;
        this._modal = null;
        this._storedContentOptions = null;
        this._storedContentOptionsGetter = null;
        this._Bind(this._FetchContentOptions);
    }

    get options() { return this._options; }
    set options(p_value) { this._options = p_value; }

    CanExecute(p_context) {
        let o = this._options;
        if (o.instanceOf) {
            if (!u.isInstanceOf(p_context, o.instanceOf)) {
                return false;
            }
        }
        return p_context;
    }

    _OnContextChanged() {
        if (u.isObject(this._options.content)) {
            this._options.content.data = this._context;
        } else if (this._modal) {
            this._modal.content.data = this._context;
        }
    }

    /**
     * @access protected
     * @description TODO
     */
    _InternalExecute() {

        if (this._modal) {
            // Update modal content's data with current context ?
            this.Cancel();
            return;
        }

        let o = this._options,
            modalClass = o.modalClass || this.constructor.__defaultModalClass,
            modalOptions = { ...o };

        modalOptions.content = o.content || this.constructor.__defaultMenuClass;

        // Swap content options and set a getter that will 
        // merge input options with menu items
        this._storedContentOptions = modalOptions.contentOptions || null;
        this._storedContentOptionsGetter = modalOptions.contentOptionsGetter || null;

        delete modalOptions.contentOptions;
        modalOptions.contentOptionsGetter = { fn: this._FetchContentOptions };

        if (!modalOptions.items) {
            throw new Error(`Menu requires an item list.`);
        }

        delete modalOptions.items;

        if (o.anchorToEmitter) {
            modalOptions.anchor = this._emitter;
            delete modalOptions.anchorToEmitter;
        }

        delete modalOptions.instanceOf;

        this._modal = modalClass.Pop(modalOptions);

        // store & restore position in preferences ?

        this._modal.Watch(com.SIGNAL.RELEASED, this._OnModalReleased, this);

        this._Success();

    }

    _FetchContentOptions() {
        let obj = this._storedContentOptions || this._storedContentOptionsGetter ? this._storedContentOptionsGetter() : {};
        obj.items = this._options.items;
        return obj;
    }

    _OnModalReleased(p_modal) {
        p_modal.Unwatch(com.SIGNAL.RELEASED, this._OnModalReleased, this);
        this._modal = null;
    }

    _CleanUp() {

        this._options = null;

        this._storedContentOptions = null;
        this._storedContentOptionsGetter = null;

        if (this._modal) { this._OnModalReleased(this._modal); }

        super._CleanUp();

    }

}

module.exports = CommandMenu;