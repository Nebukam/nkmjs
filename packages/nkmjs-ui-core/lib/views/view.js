'use strict';

const u = require("@nkmjs/utils");
const style = require("@nkmjs/style");
const actions = require("@nkmjs/actions");

const helpers = require(`../helpers`);
const commands = require(`../commands`);

const UI = require(`../ui`);
const SIGNAL = require(`../signal`);
const FLAGS = require(`../flags`);
const ANCHORING = require(`../anchoring`);
const dom = require(`../utils-dom`);

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

        this.forwardData.To(this._commands, { set: `context` });

        this._defaultModalContentOptions = null;
        this._resizable = false;
    }

    CmdGet(p_key) { /* Replaced by this._commands.Get */ }

    static _Style() {
        return style.Extends({
            ':host': {
                '@': [`fade-in`]
            },
            ':host(.resizable)':{
                'flex':'0 0 auto !important'
            },
            ':host(.resize-horizontal)': {
                'resize': 'horizontal',
                'overflow': 'auto'
            },
            ':host(.resize-vertical)': {
                'resize': 'vertical',
                'overflow': 'auto'
            },

        }, base._Style());
    }

    get shortcuts() {
        if (!this._shortcuts) { this._shortcuts = new actions.helpers.Shortcuts(); }
        return this._shortcuts;
    }

    get displayed() { return this._isDisplayed; }

    get resizable() { return this._resizable; }
    set resizable(p_value) { this._ToggleResize(p_value); }

    _ToggleResize(p_value) {
        this._resizable = p_value;

        dom.CSSClass(this, {
            [`resize-${FLAGS.VERTICAL}`]: false,
            [`resize-${FLAGS.HORIZONTAL}`]: false,
        });

        dom.CSSClass(this, `resize-${this._orientation._currentFlag}`, this._resizable);
        dom.CSSClass(this, `resizable`, this._resizable);
    }

    _OnOrientationChanged(p_newValue, p_oldValue) {
        super._OnOrientationChanged(p_newValue, p_oldValue);
        this.resizable = this._resizable;
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

    _FocusGain() {
        super._FocusGain();
        if (this._shortcuts && this._shortcutsRequireHover) { this._shortcuts.Enable(); }
    }

    _FocusLost() {
        super._FocusLost();
        if (this._shortcuts && this._shortcutsRequireHover) { this._shortcuts.Disable(); }
    }

    /**
     * @description Callback when RequestDisplay has been handled.
     */
    DisplayGranted() {
        if (this._isDisplayed) { return false; }
        this._isDisplayed = true;
        this._flags.Set(FLAGS.SHOWN, true);
        if (this._shortcuts) { if (!this._shortcutsRequireHover || this._isFocused) { this._shortcuts.Enable(); } }
        this._OnDisplayGain();
        this.Broadcast(SIGNAL.DISPLAY_GAIN, this);
        this.ForcePaintUpdate();
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

    /**
     * 
     * @param {object} p_commandOptions 
     * @param {*} [p_commandOptions.id]
     * 
     * @param {object} p_modalOptions 
     * @param {class|object} p_modalOptions.content
     * @param {function} [p_modalOptions.contentOptionsGetter]
     * @param {boolean} [p_modalOptions.anchorToEmitter]
     * @param {string} [p_modalOptions.placement]
     * @param {object} [p_modalOptions.margins]
     * 
     * @returns {Command}
     * 
     */
    _CmdModal(p_commandOptions, p_modalOptions) {

        p_commandOptions.id = p_commandOptions.id || p_modalOptions.content || null;

        let cmd = this._commands.Create(commands.Modal, p_commandOptions);

        p_modalOptions.contentOptionsGetter = p_modalOptions.contentOptionsGetter || this._defaultModalContentOptions;
        p_modalOptions.anchorToEmitter = p_modalOptions.anchorToEmitter || true;
        p_modalOptions.placement = p_modalOptions.placement || ANCHORING.BOTTOM_LEFT;

        cmd.options = p_modalOptions;

        return cmd;
    }

    _CmdMenu(p_commandOptions, p_modalOptions) {
        //TODO : same as modal ?
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
        this.resizable = false;
        if (this._selStackOverride) { this.selStackOverride = null; }
        if (this._selStack) { this._selStack.Clear(); }
        super._CleanUp();
    }

}

module.exports = View;
UI.Register('nkmjs-view', View);