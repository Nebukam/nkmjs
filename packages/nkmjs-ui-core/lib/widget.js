'use strict';

const com = require("@nkmjs/common");

const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const INPUT = require(`./input`);
const POINTER = require(`./pointer`);
const DisplayObjectContainer = require(`./display-object-container`);
const WidgetSelection = require(`./helpers/widget-selection`);
const FlagEnum = require(`./helpers/flag-enum`);

const extensions = require(`./extensions`);

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core
 */
class Widget extends DisplayObjectContainer {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    static __fouc_hidden = true;
    static __usePaintCallback = true;

    static __default_iState = FLAGS.IDLE;

    /**
     * @access protected
     * @description TODO
     * @type {string}
     */
    static __default_placement = null;

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

        this._extensions = new extensions.Extension();

        this._pointer = this._extensions.Add(extensions.Pointer);
        this._pointer.focusFn = this._Bind(this.Focus);
        this._pointer.Hook(POINTER.MOUSE_LEFT, POINTER.RELEASE, this._Bind(this.Activate));

        this._focusArea = null;

        this._dataObserver = new com.signals.Observer();
        this._dataObserver.Hook(com.SIGNAL.UPDATED, this._OnDataUpdated, this);

        this._flags.Add(this,
            FLAGS.ACTIVATED,
            FLAGS.SELECTED);

        this._placement = new FlagEnum(FLAGS.placement, true);
        this._placement.Add(this);
        this._placement.onFlagChanged.Add(this._Bind(this._OnPlacementChanged));

        this._istateEnum = new FlagEnum(FLAGS.istates, true);
        this._istateEnum.Add(this);

        this.default_SelectOnActivation = (this.default_SelectOnActivation || false);
        this._selectOnActivation = this.default_SelectOnActivation;

    }

    _PostInit() {
        super._PostInit();
        this._istateEnum.Set(this.constructor.__default_iState);
        this._placement.Set(this.constructor.__default_placement);
    }

    _OnPaintChange() {
        super._OnPaintChange();
        this._extensions.enabled = this._isPainted;
    }

    get extensions() { return this._extensions; }

    get pointer(){ return this._pointer; }

    // ----> Placement & Orientation

    /**
     * @description This property is controlled by the widget's parent and
     * inform the widget on how it is positioned within its container :  
     * TOP means the widget is at the top of its container  
     * BOTTOM means the widget is at the bottom of its container  
     * LEFT means the widget is at the left of its container  
     * RIGHT means the widget is at the right of its container
     * @type {string}
     * @group Placement & Orientation
     */
    get placement() { return this._placement; }
    set placement(p_value) { this._placement.Set(p_value); }

    /**
     * @access protected
     * @description TODO
     * @param {string} p_newValue 
     * @param {string} p_oldValue
     * @customtag override-me
     * @group Placement & Orientation
     */
    _OnPlacementChanged(p_newValue, p_oldValue) { }

    // ----> Selections

    /**
     * @description TODO
     * @type {boolean}
     * @group Selection
     */
    get notifiesSelectionStack() { return this._notifiesSelectionStack; }
    set notifiesSelectionStack(p_value) { this._notifiesSelectionStack = p_value; }

    /**
     * @description TODO
     * @type {string}
     * @group Selection
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
        this._pointer.element = this._focusArea;
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
        sStack
            .Watch(com.SIGNAL.ITEM_ADDED, this._OnSelectionStackAdd, this)
            .Watch(com.SIGNAL.ITEM_REMOVED, this._OnSelectionStackRemove, this);

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
        this._flags.Set(FLAGS.SELECTED, p_toggle);

        let sStack = this._notifiesSelectionStack ? this._parent ? this._parent.selectionStack : null : null;

        if (p_toggle) {
            this._SelectionGain();
            this._Broadcast(SIGNAL.SELECTION_GAIN, this);
            if (sStack) { sStack.Add(this); }
            this._Highlight(true);
        } else {
            this._SelectionLost();
            this._Broadcast(SIGNAL.SELECTION_LOST, this);
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
            this._istateEnum.Set(FLAGS.DISABLED);
            this.style[`pointer-events`] = `none`;
        } else {
            this._istateEnum.Set(FLAGS.IDLE);
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

        if (p_toggle) { this._istateEnum.Set(FLAGS.FOCUSED); }
        else { this._istateEnum.Set(FLAGS.IDLE); }

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
        this._Broadcast(SIGNAL.ACTIVATED, this, p_evt);

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

        this._Broadcast(SIGNAL.DATA_CHANGED, this, p_value, oldValue);

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
        this._placement.Set(this.constructor.__default_placement);

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

        this._extensions.CleanUp();

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
UI.Register(`nkmjs-widget`, Widget);