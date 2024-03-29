'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const dom = require(`./utils-dom`);
const UI = require(`./ui`);
const SIGNAL = require(`./signal`);
const FLAGS = require(`./flags`);
const INPUT = require(`./input`);
const POINTER = require(`./pointer`);
const DisplayObjectContainer = require(`./display-object-container`);
const FlagEnum = require(`./helpers/flag-enum`);

const extensions = require(`./extensions`);

const base = DisplayObjectContainer;

/**
 * @description TODO
 * @hideconstructor
 * @class
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core
 */
class Widget extends base {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    static __usePaintCallback = true;
    static __defaultSelectOnActivation = false;

    static __notifyDataChange = false;

    static __default_iState = FLAGS.IDLE;
    static __defaultInstanceOf = null;

    static __updateDataOnSameSet = false;


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

        this._extensions = new extensions.Extension(this);

        this._pointer = this._extensions.Add(extensions.Pointer);
        this._pointer.focusFn = this._Bind(this.Focus);
        this._pointer.Hook(POINTER.KEYS.MOUSE_LEFT, POINTER.KEYS.RELEASE, this._Bind(this.Activate));

        this._focusArea = null;

        this._dataObserver = new com.signals.Observer();
        this._dataObserver
            .Hook(com.SIGNAL.UPDATED, this._OnDataUpdated, this)
            .Hook(com.SIGNAL.RELEASED, this._OnDataReleased, this);

        this._flags.Add(this,
            FLAGS.ACTIVATED,
            FLAGS.SELECTED,
            FLAGS.DISABLED);

        FlagEnum.Attach(this, `istate`, FLAGS.istates);
        FlagEnum.Attach(this, `placement`, FLAGS.placement)
            .onFlagChanged.Add(this._Bind(this._OnPlacementChanged));

        this._selectOnActivation = this.constructor.__defaultSelectOnActivation;

        this._forwardData = null;
        this._dataPreProcessor = null;

    }

    _PostInit() {
        super._PostInit();
        this.istate = this.constructor.__default_iState;
        this.placement = this.constructor.__default_placement;
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
     * @group Alt
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
    Select(p_toggle, p_bump = false, p_mode = null) {

        if (!this._isSelectable) { return; }
        if (this._isSelected === p_toggle) {
            if (this._isSelected && p_bump) {
                this.Broadcast(SIGNAL.SEL_GAIN, this, false);
                let sStack = this._notifiesSelectionStack ? this.selectionStack : null;
                if (sStack) { sStack.Bump(this); }
            }
            return;
        }

        this._isSelected = p_toggle;
        this._flags.Set(FLAGS.SELECTED, p_toggle);

        let sStack = this._notifiesSelectionStack ? this.selectionStack : null;

        if (p_toggle) {
            this._SelectionGain();
            this.Broadcast(SIGNAL.SEL_GAIN, this, true);
            if (sStack) { sStack.Add(this, p_mode); }
            this._Highlight(true);
        } else {
            this._SelectionLost();
            this.Broadcast(SIGNAL.SEL_LOST, this, true);
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



    /**
     * @description TODO
     * @type {ui.core.helpers.WidgetSelection}
     * @group Interactivity.Selection
     */
    get selectionStack() {
        if (!this._parent) { return null; }
        else { return this._parent.selectionStack; }
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
            this.istate = FLAGS.DISABLED;
            this.style[`pointer-events`] = `none`;
        } else {
            this.istate = FLAGS.IDLE;
            dom.CSS(this, 'pointer-events');
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

        if (p_toggle) { this.istate = FLAGS.FOCUSED; }
        else { this.istate = FLAGS.IDLE; }

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
                if (INPUT.selectionModifier == INPUT.MODIFIERS.TOGGLE) {
                    this.Select(!this._isSelected, false, INPUT.selectionModifier);
                } else {
                    this.Select(true, true, INPUT.selectionModifier);
                }
            }
        }
        return true;
    }

    //#endregion

    //#endregion

    //#region DATA

    /**
     * @type {com.helpers.Setter}
     */
    get forwardData() {
        if (!this._forwardData) { this._forwardData = new com.helpers.Setter(this, com.IDS.DATA); }
        return this._forwardData;
    }

    /**
     * @description TODO
     * @type {*}
     * @group Data
     */
    get data() { return this._data; }
    set data(p_value) {

        if (p_value) {
            if (this._dataPreProcessor || this.constructor.__dataPreProcessor) {
                p_value = u.Call((this._dataPreProcessor || this.constructor.__dataPreProcessor), this, p_value);
            }
        }

        if (this.constructor.__defaultInstanceOf) {
            if (!u.isInstanceOf(p_value, this.constructor.__defaultInstanceOf)) { p_value = null; }
        }

        if (this._data === p_value) {
            if (this._data && this.constructor.__updateDataOnSameSet) {
                this._OnDataUpdated(this._data);
            }
            return;
        }

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
    _OnDataChanged(p_oldData) {
        if (this._forwardData) { this._forwardData.Set(this._data, !this._releasing); }
    }

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

    _OnDataReleased(p_data) { this.data = null; }

    //#endregion

    // ----> Pooling

    _CleanUp() {

        this.istate = this.constructor.__default_iState;
        this.placement = this.constructor.__default_placement;

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
        this.disabled = false;

        super._CleanUp();

    }



    toString() {
        if (!this._data) { return `<${this.constructor.name}|${this.__URID}>`; }
        else { return `<${this.constructor.name}|${this.__URID}:{${this._data}}>`; }
    }

}

module.exports = Widget;
UI.Register(`nkmjs-widget`, Widget);