'use strict';

const { U } = require(`@nkmjs/utils`);
const { SIGNAL, Observer } = require(`@nkmjs/common`);

const UI = require(`./ui`);
const UI_SIGNAL = require(`./ui-signal`);
const UI_FLAG = require(`./ui-flag`);
const INPUT = require(`./input`);
const MOUSE = require(`./mouse`);
const DisplayObjectContainer = require(`./display-object-container`);
const WidgetSelection = require(`./helpers/widget-selection`);
const FlagEnum = require(`./helpers/flag-enum`);
const ExtMouse = require(`./extensions/ext-mouse`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core
 */
class Widget extends DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/common.css`] }

    static __usePaintCallback = true;

    static __default_iState = UI_FLAG.IDLE;

    // ----> Init

    _Init() {

        super._Init();
        this._data = null;

        this._notifiesSelectionStack = false;
        this._isSelectable = true;
        this._isSelected = false;

        this._isFocusable = true;
        this._isFocused = false;

        this._isHighlighted = false;

        this._isActivable = true;

        this._interactions = new ExtMouse();
        this._interactions.focusFn = this._Bind(this.Focus);
        this._interactions.Hook(MOUSE.BTN_LEFT, MOUSE.RELEASE, this._Bind(this.Activate));

        this._focusArea = null;

        this._dataObserver = new Observer();
        this._dataObserver.Hook(SIGNAL.UPDATED, this._OnDataUpdated, this);

        this._flags.Add(this,
            UI_FLAG.ACTIVATED,
            UI_FLAG.SELECTED);

        this._istateEnum = new FlagEnum(UI_FLAG.istates);
        this._istateEnum.Add(this);

        this.default_SelectOnActivation = (this.default_SelectOnActivation || false);
        this._selectOnActivation = this.default_SelectOnActivation;

    }

    _PostInit() {
        super._PostInit();
        this._istateEnum.Set(this.constructor.__default_iState);
    }

    _OnPaintChange() {
        super._OnPaintChange();
        this._interactions.enabled = this._isPainted;
    }

    /**
     * @description TODO
     * @type {boolean}
     */
    get notifiesSelectionStack() { return this._notifiesSelectionStack; }
    set notifiesSelectionStack(p_value) { this._notifiesSelectionStack = p_value; }

    /**
     * @description TODO
     * @type {string}
     */
    set htitle(p_value) { this.setAttribute(`title`, p_value); }
    get htitle() { this.getAttribute(`title`); }

    // ----> Interactions

    /**
     * @description TODO
     * @type {Element}
     * @group Interactivity
     */
    get focusArea() { return this._focusArea; }
    set focusArea(p_value) {
        if (this._focusArea === p_value) { return; }
        this._focusArea = p_value;
        this._interactions.element = this._focusArea;
    }

    // ----> Selection

    /**
     * @description TODO
     * @type {boolean}
     * @group Interactivity.Selection
     */
    get selectOnActivation() { return this._selectOnActivation; }
    set selectOnActivation(p_value) { this._selectOnActivation = p_value; }

    /**
     * @access protected
     * @description TODO
     * @group Interactivity.Selection
     */
    _InitSelectionStack() {
        if (this._selectionStack) { return; }

        let sStack = new WidgetSelection();
        sStack.Watch(SIGNAL.ITEM_ADDED, this._OnSelectionStackAdd, this);
        sStack.Watch(SIGNAL.ITEM_REMOVED, this._OnSelectionStackRemove, this);

        this._selectionStack = sStack;
    }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.Widget} p_item 
     * @group Interactivity.Selection
     */
    _OnSelectionStackAdd(p_item) { }

    /**
     * @access protected
     * @description TODO
     * @param {ui.core.Widget} p_item 
     * @group Interactivity.Selection
     */
    _OnSelectionStackRemove(p_item) { }

    /**
     * @description TODO
     * @type {boolean}
     * @group Interactivity.Selection
     */
    get isSelectable() { return this._isSelectable; }
    set isSelectable(p_value) {
        if (this._isSelectable === p_value) { return; }
        this._isSelectable = p_value;
        if (!p_value) { this.Select(false); }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     * @group Interactivity.Selection
     */
    get isSelected() { return this._isSelected; }

    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {
        if (this._selectionStack) {
            return this._selectionStack;
        } else {
            if (!this._parent) { return null; }
            else { return this._parent.selectionStack; }
        }
    }

    /**
     * @description TODO
     * @param {boolean} p_toggle 
     * @group Interactivity.Selection
     */
    Select(p_toggle) {

        if (!this._isSelectable) { return; }
        if (this._isSelected === p_toggle) { return; }

        this._isSelected = p_toggle;
        this._flags.Set(UI_FLAG.SELECTED, p_toggle);

        let sStack = this._notifiesSelectionStack ? this._parent ? this._parent.selectionStack : null : null;

        if (p_toggle) {
            this._SelectionGain();
            this._Broadcast(UI_SIGNAL.SELECTION_GAIN, this);
            if (sStack) { sStack.Add(this); }
            this._Highlight(true);
        } else {
            this._SelectionLost();
            this._Broadcast(UI_SIGNAL.SELECTION_LOST, this);
            if (sStack) { sStack.Remove(this); }
            if (!this._isFocused) { this._Highlight(false); }
        }

    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Selection
     */
    _SelectionGain() { }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Selection
     */
    _SelectionLost() { }

    // ----> Focus

    /**
     * @description TODO
     * @type {boolean}
     * @group Interactivity.Focus
     */
    get isFocusable() { return this._isFocusable; }
    set isFocusable(p_value) {
        if (this._isFocusable === p_value) { return; }
        this._isFocusable = p_value;
        if (!p_value) {
            this.Focus(false);
            this._istateEnum.Set(UI_FLAG.DISABLED);
            this.style[`pointer-events`] = `none`;
        } else {
            this._istateEnum.Set(UI_FLAG.IDLE);
            this.style.removeProperty(`pointer-events`);
        }

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     * @group Interactivity.Focus
     */
    get isFocused() { return this._isFocused; }

    /**
     * @description TODO
     * @param {boolean} p_toggle
     * @group Interactivity.Focus 
     */
    Focus(p_toggle) {

        if (!this._isFocusable) { return; }

        if (p_toggle && !this._isFocusable) { p_toggle = false; }
        if (this._isFocused === p_toggle) { return; }

        this._isFocused = p_toggle;

        if (p_toggle) { this._istateEnum.Set(UI_FLAG.FOCUSED); }
        else { this._istateEnum.Set(UI_FLAG.IDLE); }

        if (p_toggle) {
            this._FocusGain();
            this._Highlight(true);
        } else {
            this._FocusLost();
            if (!this._isSelected) { this._Highlight(false); }
        }

    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Focus
     */
    _FocusGain() { }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Focus
     */
    _FocusLost() { }

    // ----> Highlight

    /**
     * @description A widget is highlighted if it is either Focused, Selected, or both.
     * @param {boolean} p_toggle 
     * @group Interactivity.Focus
     */
    _Highlight(p_toggle) {
        if (p_toggle) {
            if (this._isHighlighted) { return; }
            this._isHighlighted = p_toggle;
            this._HighlightGain();
        } else {
            if (!this._isHighlighted) { return; }
            this._isHighlighted = p_toggle;
            this._HighlightLost();
        }
    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Focus
     */
    _HighlightGain() { }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Interactivity.Focus
     */
    _HighlightLost() { }

    // ----> Activation

    /**
     * @description TODO
     * @type {boolean}
     * @group Interactivity.Activation
     */
    get isActivable() { return this._isActivable; }
    set isActivable(p_value) {
        if (this._isActivable === p_value) { return; }
        this._isActivable = p_value;
    }

    /**
     * @description TODO
     * @param {Event} p_evt 
     * @group Interactivity.Activation
     */
    Activate(p_evt) {
        if (!this._isActivable) { return false; }
        this._Broadcast(UI_SIGNAL.ACTIVATED, this, p_evt);

        if (this._selectOnActivation) {
            if (this._isSelectable) { this.Select(INPUT.ctrl ? !this._isSelected : true); }
        }
        return true;
    }

    // ----> DATA

    /**
     * @description TODO
     * @type {*}
     * @group Data
     */
    get data() { return this._data; }
    set data(p_value) {

        if ('_PreprocessData' in this) { p_value = this._PreprocessData(p_value); }

        if (this._data === p_value) { return; }

        let oldValue = this._data;
        this._data = p_value;

        if (oldValue) { this._dataObserver.Unobserve(oldValue); }

        this._OnDataChanged(oldValue);
        this._PostDataChanged(oldValue);

        if (p_value) {
            this._dataObserver.Observe(p_value);
            this._OnDataUpdated(p_value);
        }

        this._Broadcast(UI_SIGNAL.DATA_CHANGED, this, p_value, oldValue);

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_oldData 
     * @customtag override-me
     * @group Data
     */
    _OnDataChanged(p_oldData) { }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_oldData 
     * @customtag override-me
     * @group Data
     */
    _PostDataChanged(p_oldData) { }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_data 
     * @customtag override-me
     * @group Data
     */
    _OnDataUpdated(p_data) { }


    // ----> Pooling

    _CleanUp() {

        this._istateEnum.Set(this.constructor.__default_iState);

        if (this._selectionStack) { this._selectionStack.Clear(); }

        this.data = null;
        this._selectOnActivation = this.default_SelectOnActivation;
        this.removeAttribute(`title`);

        if (this._mouseOver) {
            this._mOut(null);
            if (this._mouseDown) { this._mUp(null); }
        } else if (this._mouseDown) {
            this._mUpOutside(null);
        }

        this.Select(false);
        this.Focus(false);

        super._CleanUp();

    }



    toString() {
        if (!this._data) { return `<${this.constructor.name}|${this._uinc}>`; }
        else { return `<${this.constructor.name}|${this._uinc}:{${this._data}}>`; }
    }

}

module.exports = Widget;