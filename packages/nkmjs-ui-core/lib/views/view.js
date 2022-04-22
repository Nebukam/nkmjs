'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const WidgetOrientable = require(`../widget-orientable`);

const base = WidgetOrientable;

/**
* A View is a simple WidgetOrientable that can request focus, and includes
* an internal CommandBox.
* @hideconstructor
* @class
* @augments ui.core.WidgetOrientable
* @memberof ui.core.views
*/
class View extends base {
    constructor() {
        super();
        // Auto assign focusArea if required & not set.
        if (this._shortcutsRequireFocus &&
            this._shortcuts &&
            !this._focusArea) {
            this.focusArea = this;
        }
    }

    static __useResizeCallback = true;
    static __default_iState = null;
    static __default_shortcutRequireFocus = false;

    _Init() {
        
        super._Init();

        this._commands = new actions.CommandBox(this._Bind(this._OnCmdRegister), this);
        this.CmdGet = this._commands.Get.bind(this._commands);

        this._shortcuts = null;
        this._shortcutsRequireFocus = this.constructor.__default_shortcutRequireFocus;

        this._isDisplayed = false;
        this._flags.Add(this, FLAGS.SHOWN);

        this.forwardData.To(this._commands, { mapping: `context` });

    }

    CmdGet(p_key){ /* Replaced by this._commands.Get */}

    static _Style() {
        return style.Extends({
            ':host': {
                '@': [`fade-in`]
            }
        }, base._Style());
    }

    get shortcuts() {
        if (!this._shortcuts) { this._shortcuts = new actions.helpers.Shortcuts(); }
        return this._shortcuts;
    }

    _FocusGain() {
        super._FocusGain();
        if (!this._shortcuts) { return; }
        if (this._shortcutsRequireFocus && this._isDisplayed) { this._shortcuts.Enable(); }
    }

    _FocusLost() {
        super._FocusLost();
        if (!this._shortcuts) { return; }
        if (this._shortcutsRequireFocus) { this._shortcuts.Disable(); }
    }

    get displayed() { return this._isDisplayed; }

    /**
     * @description TODO
     */
    RequestDisplay() {
        this.Broadcast(SIGNAL.DISPLAY_REQUESTED, this);
        //Handle notifications bubbles & warnings the same way.
    }

    /**
     * @description TODO
     */
    RequestClose() {
        this.Broadcast(SIGNAL.CLOSE_REQUESTED, this);
    }

    /**
     * @description Callback when RequestDisplay has been handled.
     */
    DisplayGranted() {
        if (this._isDisplayed) { return false; }
        this._isDisplayed = true;
        this._flags.Set(FLAGS.SHOWN, true);
        if (this._shortcuts) { if (!this._shortcutsRequireFocus || this._isFocused) { this._shortcuts.Enable(); } }
        this._OnDisplayGain();
        this.Broadcast(SIGNAL.DISPLAY_GAIN, this);
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
        if (this._shortcuts) { this._shortcuts.Disable(); }
        this._OnDisplayLost();
        this.Broadcast(SIGNAL.DISPLAY_LOST, this);
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