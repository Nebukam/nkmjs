'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const helpers = require(`../helpers`);

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
        if (this._shortcutsRequireHover &&
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
        this._shortcutsRequireHover = this.constructor.__default_shortcutRequireFocus;

        this._isDisplayed = false;
        this._flags.Add(this, FLAGS.SHOWN);

        this.forwardData.To(this._commands, { mapping: `context` });

        if (this._shortcutsRequireHover) {
            this.addEventListener('mouseover', () => { this.isViewHover = true; });
            this.addEventListener('mouseout', () => { this.isViewHover = false; });
        }

    }

    CmdGet(p_key) { /* Replaced by this._commands.Get */ }

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

    get displayed() { return this._isDisplayed; }

    set isViewHover(p_toggle) {
        if (this._isViewHover == p_toggle) { return; }
        this._isViewHover = p_toggle;
        if (this._shortcuts && this._shortcutsRequireHover) {
            if (p_toggle) { if (this._isDisplayed) { this._shortcuts.Enable(); } }
            else { this._shortcuts.Disable(); }
        }
    }

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
        if (this._shortcuts) { if (!this._shortcutsRequireHover || this._isViewHover) { this._shortcuts.Enable(); } }
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

    //#region Selection

    get selStackOverride() { return this._selStackOverride; }
    set selStackOverride(p_value) { this._selStackOverride = p_value; }

    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {
        if (this._selStackOverride) { return this._selStackOverride; }
        if (this._selStack) { return this._selStack; }
        else { return super.selectionStack; }
    }

    //#endregion

    _CleanUp() {
        this.DisplayLost();
        if (this._selStackOverride) { this.selStackOverride = null; }
        if (this._selStack) { this._selStack.Clear(); }
        super._CleanUp();
    }

}

module.exports = View;
UI.Register('nkmjs-view', View);