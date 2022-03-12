'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const WidgetOrientable = require(`../widget-orientable`);

/**
* A View is a simple WidgetOrientable that can request focus, and includes
* an internal CommandBox.
* @hideconstructor
* @class
* @augments ui.core.WidgetOrientable
* @memberof ui.core.views
*/
class View extends WidgetOrientable {
    constructor() { super(); }

    static __useResizeCallback = true;    
    static __default_iState = null;

    _Init() {
        super._Init();

        this._commands = new actions.CommandBox(this._Bind(this._OnCmdRegister));

        this._isDisplayed = false;
        this._flags.Add(this, FLAGS.SHOWN);

        this.forwardData.To(this._commands, { mapping: `context` });
    }

    _Style() {
        return style.Extends({
            ':host': {
                '@':[`fade-in`]
            }
        }, super._Style());
    }

    get displayed() { return this._isDisplayed; }

    /**
     * @description TODO
     */
    RequestDisplay() {
        this._Broadcast(SIGNAL.DISPLAY_REQUESTED, this);
        //Handle notifications bubbles & warnings the same way.
    }

    /**
     * @description TODO
     */
    RequestClose() {
        this._Broadcast(SIGNAL.CLOSE_REQUESTED, this);
    }

    /**
     * @description Callback when RequestDisplay has been handled.
     */
    DisplayGranted() {
        if (this._isDisplayed) { return false; }
        this._isDisplayed = true;
        this._flags.Set(FLAGS.SHOWN, true);
        this._OnDisplayGain();
        this._Broadcast(SIGNAL.DISPLAY_GAIN, this);
        return true;
    }

    /**
     * @description Callback when the view handler granted display to another view.
     * @customtag override-me
     */
    _OnDisplayGain() { }

    /**
     * @description Called when the view handler granted display to another view.
     */
    DisplayLost() {
        if (!this._isDisplayed) { return false; }
        this._isDisplayed = false;
        this._flags.Set(FLAGS.SHOWN, false);
        this._OnDisplayLost();
        this._Broadcast(SIGNAL.DISPLAY_LOST, this);
        return true;
    }

    /**
     * @description Callback when the view handler granted display to another view.
     * @customtag override-me
     */
    _OnDisplayLost() { }

    /**
     * @access protected
     * @param {actions.Command} p_cmd 
     */
    _OnCmdRegister(p_cmd) {

    }

    _CleanUp() {
        this.DisplayLost();
        super._CleanUp();
    }

}

module.exports = View;
UI.Register('nkmjs-view', View);