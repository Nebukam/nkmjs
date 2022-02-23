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
const extensions = require(`../extensions`);

const DisplayObjectContainer = require(`../display-object-container`);
const Widget = require(`../widget`);

const FlagEnum = require(`./flag-enum`);


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
class Modal extends DisplayObjectContainer {
    constructor() { super(); }

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
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static LEFT = { x: -0.5, y: 0 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static RIGHT = { x: 0.5, y: 0 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP = { x: 0, y: -0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM = { x: 0, y: 0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP_LEFT = { x: -0.5, y: -0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static TOP_RIGHT = { x: 0.5, y: -0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM_LEFT = { x: -0.5, y: 0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static BOTTOM_RIGHT = { x: 0.5, y: 0.5 };

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     * @group Placement
     */
    static CENTER = { x: 0, y: 0 };


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
        //console.log(this);
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

    _Init() {

        super._Init();

        this._content = null;
        this._options = null;
        this._placement = null;

        this._placementEnum = new FlagEnum(FLAGS.placements);
        this._placementEnum.Add(this);

        this._modeEnum = new FlagEnum(this.constructor.modes, true);
        this._modeEnum.Add(this);

        this._optionsHandler = new com.helpers.OptionsHandler(
            this._Bind(this._OnOptionsUpdated),
            this._Bind(this._OnOptionsWillUpdate));

        this._optionsHandler
            .Hook(`mode`)
            .Hook(`context`, null, env.APP.body || document.body)
            .Hook(`anchor`)
            .Hook(`static`, null, false)
            .Hook(`placement`, null, Modal.CENTER)
            .Hook(`origin`, null, Modal.CENTER);

        this._pointer = new extensions.PointerStatic(this);

        this._ownsContent = false;

        this._Bind(this._mUp);
        this._Bind(this._mDown);
        this._Bind(this.Close);
        this._Bind(this._UpdateAnchoredPosition);

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

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.content = p_options.content;
        if (this._content) {
            this._optionsHandler.Process(this, this._options);
            if (`options` in this._content) {
                let o = null;

                if (`contentOptions` in p_options) {
                    o = p_options.contentOptions;
                } else if (`contentOptionsGetter` in p_options) {
                    let
                        oGet = p_options.contentOptionsGetter,
                        thisArg = u.tils.Get(oGet, `thisArg`, null);

                    if (oGet.args) { o = oGet.fn.call(thisArg, ...oGet.args); }
                    else if (oGet.arg) { o = oGet.fn.call(thisArg, oGet.arg); }
                    else { o = oGet.fn.call(thisArg); }
                }

                if (o) { this._content.options = o; }
            }

        } else { throw new Error(`Modal options has no content set.`); }
    }

    /**
     * @description TODO
     * @type {string}
     * @group Mode
     */
    get mode() { return this._modeEnum.currentFlag; }
    set mode(p_value) { this._modeEnum.Set(p_value); }

    /**
     * @description TODO
     * @type {object}
     * @group Placement
     */
    get placement() { return this._placement; }
    set placement(p_value) { this._placement = p_value; }

    /**
     * @description Point inside the pop-in to pin at position
     * @type {object}
     * @group Placement
     */
    get origin() { return this._placement; }
    set origin(p_value) { this._placement = p_value; }

    /**
     * @description Point inside the pop-in to pin at position
     * @type {object}
     * @group Placement
     */
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

        this._content = this.Add(p_value, `content`);
        this._content.Watch(SIGNAL.CLOSE_REQUESTED, this.Close);
        if (`DisplayGranted` in this._content) { this._content.DisplayGranted(); }

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get context() { return this._context; }
    set context(p_value) {
        if (this._context === p_value) { return; }
        if (this._context) { dom.Detach(this); }
        this._context = p_value;
        if (this._context) { dom.Attach(this, this._context); }
    }

    /**
     * @description TODO
     * @type {Element}
     */
    get anchor() { return this._anchor; }
    set anchor(p_value) {
        if (this._anchor === p_value) { return; }
        this._anchor = p_value;
        if (this._anchor) { com.time.TIME.Watch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }
        else { com.time.TIME.Unwatch(com.SIGNAL.TICK, this._UpdateAnchoredPosition); }

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

    _Style() {
        return {
            ':host': {
                'position': 'absolute',
                'border': '1px solid red',
                //'width':'0', 'height':'0',
                'display': 'flex' // making sure things are properly sized
            },
            ':host(.mode-float-inside)': {

            },
            ':host(.mode-anchor)': {

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

        let rect = dom.Rect(this._anchor, this.parentElement),
            centerX = rect.x + rect.width * 0.5,
            centerY = rect.y + rect.height * 0.5,
            x = centerX + rect.width * this._placement.x,
            y = centerY + rect.height * this._placement.y;


        if (this._placement.x < 0.5) {
            // offset by pop-in width
        } else {
            // no re-positioning
        }

        if (this._placement.y < 0.5) {
            // offset by pop-in width
        } else {
            // no re-positioning
        }

        this.style.transform = `translateX(${x}px) translateY(${y}px)`;

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

        this._options = null;

        this._ownsContent = false;

        super._CleanUp();

    }

}

module.exports = Modal;
UI.Register(`nkmjs-pop-in`, Modal);