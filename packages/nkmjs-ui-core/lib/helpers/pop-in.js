'use strict';

const u = require("@nkmjs/utils");
const collections = require("@nkmjs/collections");
const com = require("@nkmjs/common");

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
 * A PopIn is a lightweight container with absolute positioning added to an object.
 * It is attached to a specific position in parent screen-space, and can follow an object if attached to one.
 * Use cases :
 * - input field feedback
 * - overlay search box (closable)
 * - informational popins
 * - contextual menu
 * 
 * If used at document level, the PopIn will attempt to find the best possible placement to stay visible (moving left/right/up/down)
 * @class
 * @hideconstructor
 * @augments ui.core.DisplayObjectContainer
 * @memberof ui.core.helpers
 */
class PopIn extends DisplayObjectContainer {
    constructor() { super(); }

    static popinStack = new collections.List();

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
        let popin = UI.Rent(PopIn);
        popin.options = p_options;
        return popin;
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
        if (!p_parent) { p_parent = this.popinStack.last; }
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

        this._optionsHandler.Hook(`mode`);
        this._optionsHandler.Hook(`context`, null, document.body);
        this._optionsHandler.Hook(`anchor`);
        this._optionsHandler.Hook(`static`, null, false);
        this._optionsHandler.Hook(`placement`, null, PopIn.CENTER);
        this._optionsHandler.Hook(`origin`, null, PopIn.CENTER);

        this._pointer = new extensions.PointerStatic(this);

        this._ownsContent = false;

        this._Bind(this._mUp);
        this._Bind(this._mDown);
        this._Bind(this.Close);
        this._Bind(this._UpdateAnchoredPosition);

        this._parentPopin = null;
        this._subPopins = new collections.List();

    }

    _Wake() {
        super._Wake();
        POINTER.Watch(POINTER.MOUSE_DOWN, this._mDown);
        this._pointer.Enable();
        this.constructor.popinStack.Add(this);
    }

    /**
     * @description TODO
     * @type {ui.core.helpers.PopIn}
     */
    get parentPopin() { return this._parentPopin; }
    set parentPopin(p_value) {
        if (this._parentPopin == p_value) { return; }
        let oldParentPopin = this._parentPopin;
        this._parentPopin = p_value;
        if (oldParentPopin) { oldParentPopin._subPopins.Remove(this); }
        if (this._parentPopin) { this._parentPopin._subPopins.Add(this); }
    }

    /**
     * @description TODO
     * @type {object}
     */
    get options() { return this._options; }
    set options(p_options) {
        this._options = p_options;
        this.content = p_options.content;
        if (this._content) { this._optionsHandler.Process(this, this._options); }
        else { throw new Error(`PopIn options has no content set.`); }
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
                // Clear inline style properties
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
    }

    _OnOptionsWillUpdate(p_options, p_altOptions, p_defaults) {
        if (p_options.parent) { this.parentPopin = p_options.parent; }
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
                'border': '2px solid #ff0000',
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

        if (this._static) { return; }

        if (this._pointer.isMouseOver || this._pointer.isMouseDown()) { return; }

        for (let i = 0, n = this._subPopins.count; i < n; i++) {
            let child = this._subPopins.At(i);
            if (child._pointer.isMouseOver || this._pointer.isMouseDown()) { return; }
        }

        this.Close();

    }

    Close() {

        while (!this._subPopins.isEmpty) {
            let child = this._subPopins.Pop();
            child.Close();
        }

        this.Release();
    }

    _CleanUp() {

        this.constructor.popinStack.Remove(this);

        POINTER.Unwatch(POINTER.MOUSE_DOWN, this._mDown);
        POINTER.Unwatch(POINTER.MOUSE_UP, this._mUp);

        this._pointer.Disable();

        this.parentPopin = null;

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

module.exports = PopIn;
UI.Register(`nkmjs-pop-in`, PopIn);