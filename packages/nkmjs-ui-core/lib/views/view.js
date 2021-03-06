'use strict';

const actions = require("@nkmjs/actions");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const OrientableWidget = require(`../widget-orientable`);

 /**
 * A View is a simple OrientableWidget that can request focus, and includes
 * an internal CommandBox.
 * @hideconstructor
 * @class
 * @augments ui.core.OrientableWidget
 * @memberof ui.core.views
 */
class View extends OrientableWidget {
    constructor() { super(); }

    static __default_iState = null;

    _Init() {
        super._Init();
        this._commands = new actions.CommandBox(this._Bind(this._OnCmdRegister));
    }

    /**
     * @description TODO
     */
    RequestDisplay() {
        this._Broadcast(SIGNAL.DISPLAY_REQUESTED, this);
        //Handle notifications bubbles & warnings the same way.
    }

    /**
     * @description Callback when RequestDisplay has been handled.
     * @customtag override-me
     */
    DisplayGranted() {

    }

    /**
     * @access protected
     * @param {actions.Command} p_cmd 
     */
    _OnCmdRegister(p_cmd) {

    }

}

module.exports = View;
UI.Register('nkmjs-view', View);