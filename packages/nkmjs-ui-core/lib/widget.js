'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const INPUT = require(`./input`);
const POINTER = require(`./pointer`);
const DisplayObjectContainer = require(`./display-object-container`);
const WidgetSelection = require(`./helpers/widget-selection`);
const FlagEnum = require(`./helpers/flag-enum`);
const DataForward = require(`./helpers/data-forward`);

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

    static __usePaintCallback = true;
    static __defaultSelectOnActivation = false;

    static __default_iState = FLAGS.IDLE;


    /**
     * @access protected
     * @description TODO
     * @type {string}
     */
    static __default_placement = null;

    //#region Init

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
        this._dataIndex = -1;

        this._extensions = new extensions.Extension();

        this._pointer = this._extensions.Add(extensions.Pointer);
        this._pointer.focusFn = this._Bind(this.Focus);
        this._pointer.Hook(POINTER.MOUSE_LEFT, POINTER.RELEASE, this._Bind(this.Activate));

        this._focusArea = null;

        this._dataObserver = new com.signals.Observer();
        this._dataObserver.Hook(com.SIGNAL.UPDATED, this._OnDataUpdated, this);

        this._flags.Add(this,
            FLAGS.ACTIVATED,
            FLAGS.SELECTED,
            FLAGS.DISABLED);

        this._placement = new FlagEnum(FLAGS.placement, true);
        this._placement.Add(this);
        this._placement.onFlagChanged.Add(this._Bind(this._OnPlacementChanged));

        this._istateEnum = new FlagEnum(FLAGS.istates, true);
        this._istateEnum.Add(this);

        this._selectOnActivation = this.constructor.__defaultSelectOnActivation;

        this._forwardData = null;
        this._dataPreProcessor = null;

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
    get pointer() { return this._pointer; }

    get dataPreProcessor() { return this._dataPreProcessor; }
    set dataPreProcessor(p_value) { this._dataPreProcessor = p_value; }

    /**
     * A multi-purpose index value.
     * Primarily used by lists, dom-streamer & selection management
     */
    get dataIndex() { return this._dataIndex; }
    set dataIndex(p_value) { this._dataIndex = p_value; }

    //#region Placement & Orientation

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

    /**
     * @description TODO
     * @type {string}
     * @group Selection
     */
    get htitle() { this.getAttribute(`title`); }
    set htitle(p_value) {
        if (!p_value) { this.removeAttribute(`title`); }
        else { this.setAttribute(`title`, p_value); }
    }

    //#endregion



    //#region Interactions

    /**
     * @description TODO
     * @type {Element}
     * @group Interactivity
     */
    get disabled() { return this._flags.IsSet(FLAGS.DISABLED); }
    set disabled(p_value) { this._flags.Set(FLAGS.DISABLED, p_value); }

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

    //#region Selection


    /**
     * @description TODO
     * @type {boolean}
     * @group Selection
     */
    get notifiesSelectionStack() { return this._notifiesSelectionStack; }
    set notifiesSelectionStack(p_value) { this._notifiesSelectionStack = p_value; }

    /**
     * @description TODO
     * @type {boolean}
     * @group Interactivity.Selection
     */
    get selectOnActivation() { return this._selectOnActivation; }
    set selectOnActivation(p_value) { this._selectOnActivation = p_value; }


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
     * @param {boolean} p_toggle 
     * @group Interactivity.Selection
     */
    Select(p_toggle, p_bump = false) {

        if (!this._isSelectable) { return; }
        if (this._isSelected === p_toggle) {
            if (this._isSelected && p_bump) {
                this.Broadcast(SIGNAL.SELECTION_GAIN, this, false);
                let sStack = this._notifiesSelectionStack ? this._parent ? this._parent.selectionStack : null : null;
                if (sStack) { sStack.Bump(this); }
            }
            return;
        }

        this._isSelected = p_toggle;
        this._flags.Set(FLAGS.SELECTED, p_toggle);

        let sStack = this._notifiesSelectionStack ? this._parent ? this._parent.selectionStack : null : null;

        if (p_toggle) {
            this._SelectionGain();
            this.Broadcast(SIGNAL.SELECTION_GAIN, this, true);
            if (sStack) { sStack.Add(this); }
            this._Highlight(true);
        } else {
            this._SelectionLost();
            this.Broadcast(SIGNAL.SELECTION_LOST, this, true);
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

    //#endregion

    //#region Selection stack

    get selectionStackOverride() { return this._selectionStackOverride; }
    set selectionStackOverride(p_value) { this._selectionStackOverride = p_value; }

    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {

        if (this._selectionStackOverride) { return this._selectionStackOverride; }

        if (this._selectionStack) {
            return this._selectionStack;
        } else {
            if (!this._parent) { return null; }
            else { return this._parent.selectionStack; }
        }

    }

    /**
     * @access protected
     * @description TODO
     * @param {boolean} [p_allowMultiple] 
     * @param {boolean} [p_persistentData] 
     * @param {Object} [p_selectionRequestHandler] {add:{fn:}, remove:{fn:}}, callback arguments will be prepended.
     * @group Interactivity.Selection
     */
    _InitSelectionStack(p_allowMultiple = false, p_persistentData = false, p_requestHandlers = null) {

        if (this._selectionStack) {
            this._selectionStack.allowMultiple = p_allowMultiple;
            this._selectionStack.persistentData = p_persistentData;
            return;
        }

        let sStack = new WidgetSelection();

        sStack.allowMultiple = p_allowMultiple;
        sStack.persistentData = p_persistentData;

        this._selectionObserver = new com.signals.Observer();
        this._selectionObserver.ObserveOnly(sStack);

        this._dataSelectionObserver = new com.signals.Observer();
        this._dataSelectionObserver.ObserveOnly(sStack.data);

        if (p_requestHandlers) {

            this.__selRequestHandlers = p_requestHandlers;
            sStack.data
                .Watch(SIGNAL.SELECTION_ADD_REQUEST,
                    (p_dataSelection, p_index) => {
                        if (!this.__selRequestHandlers.add) { return; }
                        u.CallPrepend(this.__selRequestHandlers.add, p_dataSelection, p_index);
                    }, this)
                .Watch(SIGNAL.SELECTION_REMOVE_REQUEST,
                    (p_dataSelection, p_index) => {
                        if (!this.__selRequestHandlers.remove) { return; }
                        u.CallPrepend(this.__selRequestHandlers.remove, p_dataSelection, p_index);
                    }, this)
                .Watch(SIGNAL.SELECTION_TOTAL_COUNT_REQUEST,
                    (p_dataSelection, p_index) => {
                        if (!this.__selRequestHandlers.count) { return; }
                        p_dataSelection._SetAllCount(u.CallPrepend(this.__selRequestHandlers.count, p_dataSelection));
                    }, this);

        }

        this._selectionStack = sStack;
        return sStack;

    }

    //#endregion

    //#region Focus

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

    //#endregion

    //#region Highlight

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

    //#endregion

    //#region Activation

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
        this.Broadcast(SIGNAL.ACTIVATED, this, p_evt);

        if (this._selectOnActivation) {
            if (this._isSelectable) {
                if (INPUT.selectionModifier == INPUT.SELECT_MODIFIER_TOGGLE) {
                    this.Select(!this._isSelected);
                } else {
                    this.Select(true, true);
                }
            }
        }
        return true;
    }

    //#endregion

    //#endregion

    //#region DATA

    get forwardData() {
        if (!this._forwardData) { this._forwardData = new DataForward(this); }
        return this._forwardData;
    }


    /**
     * @description TODO
     * @type {*}
     * @group Data
     */
    get data() { return this._data; }
    set data(p_value) {

        if (this._dataPreProcessor) { p_value = u.Call(this._dataPreProcessor, this, p_value); }

        if (this._data === p_value) { return; }

        let oldValue = this._data;
        this._data = p_value;

        if (oldValue) {
            if (com.signals.isObservable(oldValue)) { this._dataObserver.Unobserve(oldValue); }
        }

        this._OnDataChanged(oldValue);
        this._PostDataChanged(oldValue);

        if (p_value) {
            if (com.signals.isObservable(p_value)) { this._dataObserver.Observe(p_value); }
            this._OnDataUpdated(p_value);
        }

        this.Broadcast(SIGNAL.DATA_CHANGED, this, p_value, oldValue);

    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_oldData 
     * @customtag override-me
     * @group Data
     */
    _OnDataChanged(p_oldData) { if (this._forwardData) { this._forwardData.Set(this._data); } }

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

    //#endregion

    // ----> Pooling

    _CleanUp() {

        this._istateEnum.Set(this.constructor.__default_iState);
        this._placement.Set(this.constructor.__default_placement);

        if (this._selectionStackOverride) { this.selectionStackOverride = null; }
        if (this._selectionStack) { this._selectionStack.Clear(); }

        this.data = null;
        if (this._forwardData) { this._forwardData.Clear(); }

        this._selectOnActivation = this.constructor.__defaultSelectOnActivation;
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

        this._dataIndex = -1;

        super._CleanUp();

    }



    toString() {
        if (!this._data) { return `<${this.constructor.name}|${this.__URID}>`; }
        else { return `<${this.constructor.name}|${this.__URID}:{${this._data}}>`; }
    }

}

module.exports = Widget;
UI.Register(`nkmjs-widget`, Widget);