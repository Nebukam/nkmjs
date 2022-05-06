'use strict';

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");
const env = require("@nkmjs/environment");

const dom = require(`../utils-dom`);
const UI = require(`../ui`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);
const POINTER = require("../pointer");
const ANCHORING = require(`../anchoring`);
const extensions = require(`../extensions`);

const DisplayObjectContainer = require(`../display-object-container`);
const Widget = require(`../widget`);

const FlagEnum = require(`./flag-enum`);
const RectTracker = require(`./rect-tracker`);

const base = DisplayObjectContainer;
const __defaultBody = Symbol(`defaultBody`);
const __isReady = `isready`;
/**
 * A Modal is a lightweight container with absolute positioning added to an object.
 * It is attached to a specific position in parent screen-space, and can follow an object if attached to one.
 * Use cases :
 * - input field feedback
 * - overlay search box (closable)
 * - informational modals
 * - contextual menu
 * 
 * If used at document level, the Modal will attempt to find the best possible placement to stay visible (moving left/right/up/down)
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core.helpers
 */
class Modal extends base {
    constructor() { super(); }

    static __NFO__ = { css: [`@/global-host.css`] }

    static modalStack = new collections.List();

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_ANCHOR = `mode-anchor`; // Anchored to something (possibly) moving on screen

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_FLOAT_INSIDE = `mode-float-inside`; // Float at a given place in a container

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Mode
     */
    static MODE_FLOAT_OUTSIDE = `mode-float-outside`; // Float at a given place outside a container

    static modes = [
        this.MODE_ANCHOR,
        this.MODE_FLOAT_INSIDE,
        this.MODE_FLOAT_OUTSIDE
    ];

    /**
     * @description TODO
     * @param {object} p_options
     * @param {Element} p_options.context
     * @param {function|ui.core.DisplayObject} p_options.content
     * @param {Element} p_options.anchor
     * 
     */
    static Pop(p_options) {
        let cl = p_options.modalClass;
        if (!u.isInstanceOf(cl, Modal)) { cl = this; }
        let modal = UI.Rent(cl);
        modal.options = p_options;
        return modal;
    }

    /**
     * @description TODO
     * @param {*} p_options 
     * @param {Element} p_options.context
     * @param {function|ui.core.DisplayObject} p_options.content
     * @param {Element} p_options.anchor
     * @param {*} [p_parent] 
     */
    static PopChild(p_options, p_parent = null) {
        if (!p_parent) { p_parent = this.modalStack.last; }
        if (!p_parent) { return this.Pop(p_options); }
        p_options.parent = p_parent;
        return this.Pop(p_options);
    }

    static __distribute = com.helpers.OptionsDistribute.Ext(null,
        { beginFn: `_OnOptionsWillUpdate`, wrapUpFn: `_OnOptionsUpdated` })
        .To(`mode`)
        .To(`context`, null, __defaultBody)
        .To(`anchor`)
        .To(`margins`)
        .To(`keepWithinScreen`, null, true)
        .To(`static`, null, false)
        .To(`placement`, null, ANCHORING.BOTTOM_LEFT)
        .To(`origin`, null, ANCHORING.TOP_LEFT);

    _Init() {

        super._Init();

        this._Bind(this._mUp);
        this._Bind(this._mDown);
        this._Bind(this.Close);
        this._Bind(this._UpdateAnchoredPosition);

        this._content = null;
        this._options = null;
        this._placement = null;
        this._origin = null;
        this._keepWithinScreen = true;
        this._margins = { x: 0, y: 0 };

        this._rectTracker = new RectTracker(this._UpdateAnchoredPosition, this);

        this._isReady = false;
        this._delayedReady = com.DelayedCall(this._Bind(this._Ready), 100);


        this._modeEnum = new FlagEnum(this.constructor.modes, true);
        this._modeEnum.Add(this);

        this._pointer = new extensions.PointerStatic(this);

        this._ownsContent = false;

        this._parentModal = null;
        this._subModals = new collections.List();

    }

    _Wake() {
        super._Wake();
        POINTER.Watch(POINTER.MOUSE_DOWN, this._mDown);
        this._pointer.Enable();
        this.constructor.modalStack.Add(this);
    }

    /**
     * @description TODO
     * @type {ui.core.helpers.Modal}
     */
    get parentModal() { return this._parentModal; }
    set parentModal(p_value) {
        if (this._parentModal == p_value) { return; }
        let oldParentModal = this._parentModal;
        this._parentModal = p_value;
        if (oldParentModal) { oldParentModal._subModals.Remove(this); }
        if (this._parentModal) { this._parentModal._subModals.Add(this); }
    }

    get contentOptionsGetter() { return this._contentOptionsGetter; }
    set contentOptionsGetter(p_value) { this._contentOptionsGetter = p_value; }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.content = p_options.content;
        if (this._content) {
            this.constructor.__distribute.Update(this, this._options);
            if (`options` in this._content) {
                let o = null;

                if (`contentOptions` in p_options) {
                    o = p_options.contentOptions;
                } else if (`contentOptionsGetter` in p_options) {
                    o = u.Call(p_options.contentOptionsGetter);
                } else if (this._contentOptionsGetter) {
                    o = u.Call(this._contentOptionsGetter);
                }

                if (o) { this._content.options = o; }
            }

        } else { throw new Error(`Modal options has no content set.`); }
    }

    /**
     * @description Whether the modal must be kept within screen
     * @type {object}
     * @group Placement
     */
    get keepWithinScreen() { return this._keepWithinScreen; }
    set keepWithinScreen(p_value) { this._keepWithinScreen = p_value; }

    /**
     * @description TODO
     * @type {string}
     * @group Mode
     */
    get mode() { return this._modeEnum.currentFlag; }
    set mode(p_value) { this._modeEnum.Set(p_value); }

    /**
     * @description Point around the anchor where the origin point will be pinned
     * @type {object}
     * @group Placement
     */
    get placement() { return this._placement; }
    set placement(p_value) { this._placement = p_value; }

    /**
     * @description Point around the anchor where the origin point will be pinned
     * @type {object}
     * @group Placement
     */
    get margins() { return this._margins; }
    set margins(p_value) { this._margins = p_value; }

    /**
     * @description Point inside the pop-in to pin at position
     * @type {object}
     * @group Placement
     */
    get origin() { return this._origin; }
    set origin(p_value) {
        let o = { x: (p_value.x || 0) + 0.5, y: (p_value.y || 0) + 0.5 };
        this._origin = o;
    }

    get static() { return this._static; }
    set static(p_value) {
        if (this._static === p_value) { return; }
        this._static = p_value;
    }

    /**
     * @description TODO
     * @type {function|ui.core.DisplayObject}
     */
    get content() { return this._content; }
    set content(p_value) {

        if (this._content === p_value) { return; }
        if (this._content) {
            if (this._content.modal == this) { this._content.modal = null; }
            this._content.Unwatch(SIGNAL.CLOSE_REQUESTED, this.Close);
            if (this._ownsContent) {
                this._content.Release();
            } else {
                // TODO : Clear inline style properties
                if (`DisplayLost` in this._content) { this._content.DisplayLost(); }
                if (this._content.parent == this) {
                    this._content.parent = null;
                }
            }
            this._content = null;
        }

        if (!p_value) {
            this._ownsContent = false;
            return;
        }

        this._ownsContent = u.isFunc(p_value);

        this._content = this.Attach(p_value, `content`);
        this._content.modal = this;
        this._content.Watch(SIGNAL.CLOSE_REQUESTED, this.Close);
        if (`DisplayGranted` in this._content) { this._content.DisplayGranted(); }

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get context() { return this._context; }
    set context(p_value) {
        if (p_value == __defaultBody) { p_value = env.APP.body || document.body; }
        if (this._context === p_value) { return; }
        if (this._context) {
            dom.Detach(this);
            this._rectTracker.Remove(this._context);
        }
        this._context = p_value;
        if (this._context) {
            this._rectTracker.Add(this._context);
            dom.Attach(this, this._context);
        }
    }

    /**
     * @description TODO
     * @type {Element}
     */
    get anchor() { return this._anchor; }
    set anchor(p_value) {
        if (this._anchor === p_value) { return; }

        let oldAnchor = this._anchor;
        if (oldAnchor) { this._rectTracker.Remove(oldAnchor); }

        this._anchor = p_value;

        //if (this._anchor) { com.time.TIME.Watch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }
        //else { com.time.TIME.Unwatch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }
        if (this._anchor) {
            this._Ready(false);
            this._rectTracker.Add(this._anchor);
            this._rectTracker.Enable();
        } else {
            this._Ready();
            this._rectTracker.Disable();
        }


        // Guess parent modal from anchor
        if (this._anchor && !this._parentModal) {
            let a = this._anchor;
            while (a) {
                if (u.isInstanceOf(a, Modal)) {
                    this.parentModal = a;
                    return;
                }
                a = a._parent;
            }
        }

    }

    _Ready(p_toggle = true) {
        this._isReady = p_toggle;
        if (p_toggle) {
            //this.visible = true;
            this.classList.add(__isReady);
            this._delayedReady.Cancel();
        } else {
            //this.visible = false;
            this.classList.remove(__isReady);
        }
    }

    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (p_options.parentModal) { this.parentModal = p_options.parentModal; }
    }

    /**
     * @access protected
     * @description TODO
     * @param {object} p_options 
     */
    _OnOptionsUpdated(p_options, p_altOptions, p_defaults) {
        let callback = p_options.callback;
        if (callback) {
            if (callback.thisArg) { callback.fn.apply(callback.thisArg, this); }
            else { callback.fn(this); }
        }
    }


    // ----> DOM

    static _Style() {
        return {
            ':host': {
                '@': ['fade-in'],
                'transition': 'opacity 0.01s ease !important',
                'position': 'absolute',
                'border': '1px solid red',
                //'width':'0', 'height':'0',
                'display': 'flex', // making sure things are properly sized,
                'max-width': '100%',
                'max-height': '100%',
                'z-index': '100' //TODO : Need to update this is the modal is on top of an overlay
            },
            ':host(.mode-float-inside)': {

            },
            ':host(.mode-anchor)': {

            },
            ':host(:not(.isready))': {
                'opacity': `0`,
                'pointer-events': 'none'
            },
            /*
            // Float inside
            ':host(.mode-float-inside.top)':{ 'top':'0px' },
            ':host(.mode-float-inside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-inside.left)':{ 'left':'0px' },
            ':host(.mode-float-inside.right)':{ 'right':'0px' },
    
            // Float outside
            ':host(.mode-float-outside.top)':{ 'top':'0px' },
            ':host(.mode-float-outside.bottom)':{ 'bottom':'0px' },
            ':host(.mode-float-outside.left)':{ 'left':'0px' },
            ':host(.mode-float-outside.right)':{ 'right':'0px' },
            */
        };
    }

    /**
     * @access private
     * @description TODO
     */
    _UpdateAnchoredPosition() {

        if (!this._isReady) { this._delayedReady.Schedule(); }

        let
            contextRect = this._rectTracker.GetRect(this._context),
            anchorRect = this._rectTracker.GetRect(this._anchor),
            selfRect = this._rectTracker.GetRect(this),
            ax = anchorRect.x - contextRect.x,
            ay = anchorRect.y - contextRect.y,
            aw = anchorRect.width,
            ah = anchorRect.height;

        let
            anchorCX = ax + aw * 0.5,
            anchorCY = ay + ah * 0.5,
            x = anchorCX + aw * this._placement.x,
            y = anchorCY + ah * this._placement.y;

        x -= this._origin.x * selfRect.width;
        y -= this._origin.y * selfRect.height;

        x += this._margins.x * this._placement.x;
        y += this._margins.y * this._placement.y;

        if (this._keepWithinScreen) {

            let
                screenW = window.innerWidth,
                screenH = window.innerHeight,
                diffX = screenW - (x + selfRect.width),
                diffY = screenH - (y + selfRect.height);

            // lazy temp fix

            if (diffX < 0) { x += diffX; }
            else if (x < 0) { x = 0; }

            if (diffY < 0) { y += diffY; }
            else if (y < 0) { y = 0; }


            //First, move on the opposite side


            //Then, if still outside of boundaries
            //Force within window boundaries

        }

        this.style.setProperty(`transform`, `translateX(${x}px) translateY(${y}px)`);

    }

    _mDown(p_evt) {
        POINTER.Watch(POINTER.MOUSE_UP, this._mUp);
    }

    _mUp(p_evt) {

        POINTER.Unwatch(POINTER.MOUSE_UP, this._mUp);

        if (this._static || this.ChecksPointer()) { return; }

        this.Close();

    }

    ChecksPointer() {

        if (this._pointer.isMouseOver
            || this._pointer.isMouseDown()) {
            return true;
        }

        for (let i = 0, n = this._subModals.count; i < n; i++) {
            if (this._subModals.At(i).ChecksPointer()) { return true; }
        }

        return false;

    }

    Close() {

        while (!this._subModals.isEmpty) {
            let child = this._subModals.Pop();
            child.Close();
        }


        this.Release();
    }

    _CleanUp() {

        this._Ready(false);

        this.constructor.modalStack.Remove(this);

        POINTER.Unwatch(POINTER.MOUSE_DOWN, this._mDown);
        POINTER.Unwatch(POINTER.MOUSE_UP, this._mUp);

        this._pointer.Disable();

        this.parentModal = null;

        this.context = null;
        this.content = null;
        this.anchor = null;
        this.mode = null;
        this.static = false;
        this.keepWithinScreen = true;

        this._contentOptionsGetter = null;

        this._options = null;

        this._ownsContent = false;

        super._CleanUp();

    }

}

module.exports = Modal;
UI.Register(`nkmjs-modal`, Modal);