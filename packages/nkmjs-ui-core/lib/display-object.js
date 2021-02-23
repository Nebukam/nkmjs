'use strict';

const { U, UDOM, PATH } = require(`@nkmjs/utils`);
const { Dictionary, List, DictionaryList } = require(`@nkmjs/collections`);
const { RELAY, Request } = require(`@nkmjs/actions`);
const { SignalBox, NFOS } = require(`@nkmjs/common`);
const { STYLE, CSS } = require(`@nkmjs/style`);

const UI = require(`./ui`);
const UI_FLAG = require("./ui-flag");
const DisposableHTMLElement = require(`./disposable-htmlelement`);
const FlagBox = require("./helpers/flag-box");

/**
 * @typedef DisplayObjectTransform
 * @property {number} [x]
 * @property {number} [y]
 * @property {number} [z]
 * @property {number} [rotation]
 * @property {number} [rotationX]
 * @property {number} [rotationY]
 * @property {number} [rotationZ]
 * @property {number} [scale]
 * @property {number} [scaleX]
 * @property {number} [scaleY]
 * @property {number} [scaleZ]
 */

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.DisposableHTMLElement
 * @memberof ui.core
 */
class DisplayObject extends DisposableHTMLElement {
    constructor() { super(); }

    

    // ----> Init

    _Init() {

        super._Init();

        this._isTransformDirty = false;
        this._transforms = {};

        this._wrapper = null;
        this._host = null;
        this._styles = null;
        this._shadowConfig = { mode: `open` };
        this._visible = true;

        this._flags = new FlagBox();

        this._requestSignalBox = null;

        this._order = null;

        this._parent = null;

    }

    _PostInit() {

        super._PostInit();

        this._BuildHost();
        this._wrapper = this._host;

        this._PrintStyle();

        this._Render();
        this._PostRender();

    }

    // ---->

    /**
     * @description TODO
     * @type {number}
     */
    get order() { return this._order; }
    set order(p_value) {
        if(this._order === p_value){ return; }
        this._order = p_value;
        if(p_value === null){ this.style.removeProperty(`--order`); }
        else{ this.style.setProperty(`--order`, p_value); }
    }

    /**
     * @description TODO
     * @customtag read-only
     * @returns {Node}
     */
    get host() { return this._host; }

    /**
     * @description TODO
     * @customtag read-only
     * @returns {Node}
     */
    get wrapper() { return this._wrapper; }

    _BuildHost() { this._host = this.attachShadow(this._shadowConfig); }


    // ----> DOM

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Styling
     */
    _Style() { }

    /**
     * @access private
     * @description TODO
     * @group Styling
     */
    _PrintStyle(p_invalidateCache = false) {

        if (this._styles) {
            for (let i = 0, n = this._styles.length; i < n; i++) {
                this._styles[i].remove();
            }
            this._styles.length = 0;
        }

        this._styles = STYLE.Get(this.constructor, this._Bind(this._Style), p_invalidateCache);
        for (let i = 0, n = this._styles.length; i < n; i++) {
            UDOM.Attach(this._styles[i].cloneNode(true), this._host);
        }
    }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _Render() { }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _PostRender() { }

    /**
     * @description TODO
     * @group Hierarchy
     */
    BringToFront() { UDOM.ToFront(this); }

    // ----> Hierarchy

    /**
     * @description The parent of this DisplayObject.
     * <div class="tip warning" data-title="Important">Given how @nkmjs works, it is critical to understand that 
     * a DisplayObject's `parent` while related to, is completely different from DOM' parentNode & parentElement.</div>
     * @type {ui.core.DisplayObjectContainer}
     * @group Hierarchy
     */
    get parent() { return this._parent; }
    set parent(p_value) {

        if (this._parent === p_value) { return; }

        let oldParent = this._parent;
        this._parent = p_value;

        if (oldParent) { oldParent.Remove(this); }
        if (this._parent) { this._parent.Add(this); }

        this._OnParentChanged(oldParent);

    }

    /**
     * @access protected
     * @description Called when the parent of this display object has changed. 
     * @param {*} p_oldParent 
     * @customtag override-me
     * @group Hierarchy
     */
    _OnParentChanged(p_oldParent) { }


    // ----> DOM

    /**
     * @description TODO
     * @type {boolean}
     * @group Rendering
     */
    get visible() { return this._visible; }
    set visible(p_value) {
        if (this._visible === p_value) { return; }
        this._visible = p_value;
        if (!p_value) { this.style.display = `none`; }
        else { this.style.removeProperty(`display`); }
        //if(p_value){ this.style.display = ``; }
        //else{ this.style.display = `none`; }
    }


    // ----> Flags

    /**
     * @description TODO
     * @customtag read-only
     * @returns {ui.core.FlagEnum}
     */
    get flags() { return this._flags; }

    // ----> Request Handling

    /**
     * @access private
     */
    _EmitLocalRequest(p_requestType, p_options = null, p_onSuccess = null, p_onFail = null, p_timeout = 0, p_requestClass = Request) {
        this._HandleLocalRequest(Request.Emit(
            p_requestType,
            p_options,
            this,
            p_onSuccess,
            p_onFail,
            p_timeout,
            p_requestClass,
            false));
    }

    /**
     * @access private
     */
    _HandleLocalRequest(p_request) {
        if (p_request.emitter != this && this._requestSignalBox) {
            this._requestSignalBox.Broadcast(p_request.requestType, p_request);
        }

        if (this._parent) { this._parent._HandleLocalRequest(p_request); }
        else { RELAY.HandleRequest(p_request); }
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_requestType 
     * @param {function} p_fn 
     */
    _RegisterLocalRequestHandler(p_requestType, p_fn) {
        if (!this._requestSignalBox) { this._requestSignalBox = new SignalBox(); }
        this._requestSignalBox.Add(p_requestType, p_fn, this);
    }

    /**
     * @access protected
     * @description TODO
     * @param {*} p_requestType 
     * @param {function} p_fn 
     */
    _UnregisterLocalRequestHandler(p_requestType, p_fn) {
        if (!this._requestSignalBox) { return; }
        this._requestSignalBox.Remove(p_requestType, p_fn, this);
    }

    // ----> Transforms

    /**
     * @description TODO
     * @customtag slow
     * @type {DisplayObjectTransform}
     * @group Transforms
     * @groupdescription Shortcuts to inline a DisplayObject's transforms. 
     * <br>Note : Transforms are only applied once right before the frame refreshes. If you are relying on
     * methods such as 'getBoundingClientRect', changes made to transforms will be late by one frame.
     * @discreet
     */
    get transforms() { return this._transforms; }
    set transforms(p_value) {
        if (this._transforms === p_value) { return; }
        this._transforms = p_value;
        this._DirtyTransform();
    }

    /**
     * @description TODO
     * @customtag read-only
     * @type {boolean}
     * @group Transforms
     * @discreet
     */
    get dirty() { return this._isTransformDirty; }


    _DirtyTransform(){
        if (this._isTransformDirty) { return; }
        this._isTransformDirty = true;
        UI.AddDirty(this);
    }

    /**
     * @description Will set transform.translateX
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set x(p_value) { if (this._transforms.x != p_value) { this._transforms.x = p_value; this._DirtyTransform(); } }
    get x() { return U.Get(this._transforms, 'x', 0); }

    /**
     * @description Will set transform.translateY
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set y(p_value) { if (this._transforms.y != p_value) { this._transforms.y = p_value; this._DirtyTransform(); } }
    get y() { return U.Get(this._transforms, 'y', 0); }

    /**
     * @description Will set transform.translateZ
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set z(p_value) { if (this._transforms.z != p_value) { this._transforms.z = p_value; this._DirtyTransform(); } }
    get z() { return U.Get(this._transforms, 'z', 0); }

    /**
     * @description Will set transform.rotation
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set rotation(p_value) { if (this._transforms.rotation != p_value) { this._transforms.rotation = p_value; this._DirtyTransform(); } }
    get rotation() { return U.Get(this._transforms, 'rotation', 0); }

    /**
     * @description Will set transform.rotationX
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set rotationX(p_value) { if (this._transforms.rotationX != p_value) { this._transforms.rotationX = p_value; this._DirtyTransform(); } }
    get rotationX() { return U.Get(this._transforms, 'rotationX', 0); }

    /**
     * @description Will set transform.rotationX
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set rotationY(p_value) { if (this._transforms.rotationY != p_value) { this._transforms.rotationY = p_value; this._DirtyTransform(); } }
    get rotationY() { return U.Get(this._transforms, 'rotationY', 0); }

    /**
     * @description Will set transform.rotationX
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set rotationZ(p_value) { if (this._transforms.rotationZ != p_value) { this._transforms.rotationZ = p_value; this._DirtyTransform(); } }
    get rotationZ() { return U.Get(this._transforms, 'rotationZ', 0); }

    /**
     * @description Will set transform.scale
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set scale(p_value) { if (this._transforms.scale != p_value) { this._transforms.scale = p_value; this._DirtyTransform(); } }
    get scale() { return U.Get(this._transforms, 'scale', 0); }

    /**
     * @description Will set transform.scaleX
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set scaleX(p_value) { if (this._transforms.scaleX != p_value) { this._transforms.scaleX = p_value; this._DirtyTransform(); } }
    get scaleX() { return U.Get(this._transforms, 'scaleX', 0); }

    /**
     * @description Will set transform.scaleY
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set scaleY(p_value) { if (this._transforms.scaleY != p_value) { this._transforms.scaleY = p_value; this._DirtyTransform(); } }
    get scaleY() { return U.Get(this._transforms, 'scaleY', 0); }

    /**
     * @description Will set transform.scaleZ
     * @type {number}
     * @group Transforms
     * @discreet
     */
    set scaleZ(p_value) { if (this._transforms.scaleZ != p_value) { this._transforms.scaleZ = p_value; this._DirtyTransform(); } }
    get scaleZ() { return U.Get(this._transforms, 'scaleZ', 0); }

    /**
     * @description Apply all transformations immediately. Note that this function is otherwise called at the end of the frame.
     * @customtag slow
     * @group Transforms
     * @discreet
     */
    ApplyTransforms() {
        //Update host's inline style according to stored transforms
        let t = this._transforms;

        if (!t) {
            this.style.removeProperty(`transform`);
            return;
        }

        //TODO : Optimize this

        let rr = U.Get(t, 'rotation', 0),
            rx = U.Get(t, 'rotationX', 0),
            ry = U.Get(t, 'rotationY', 0),
            rz = U.Get(t, 'rotationZ', 0),
            r = `${rr === 0 ? `` : `rotate(${rr}deg)`}${rx === 0 ? `` : `rotateX(${rx}deg)`}${ry === 0 ? `` : `rotateX(${ry}deg)`}${rz === 0 ? `` : `rotateZ(${rz}deg)`}`,

            tx = U.Get(t, 'x', 0),
            ty = U.Get(t, 'y', 0),
            tz = U.Get(t, 'z', 0),
            tt = `${tx === 0 ? `` : `translateX(${tx}px)`}${ty === 0 ? `` : `translateY(${ty}px)`}${tz === 0 ? `` : `translateZ(${tz}px)`}`,

            ss = U.Get(t, 'scale', 1),
            sx = U.Get(t, 'scaleX', 1),
            sy = U.Get(t, 'scaleY', 1),
            sz = U.Get(t, 'scaleZ', 1),
            s = `${ss === 1 ? `` : `scale(${ss},${ss})`}${sx === 1 ? `` : `scaleX(${sx})`}${sy === 1 ? `` : `scaleX(${sy})`}${sz === 1 ? `` : `scaleZ(${sz})`}`;

        this.style.transform = `${tt}${r}${s}`;
        this._isTransformDirty = false;

    }

    /**
     * @description Sets both the width & height of the display object to a given value.
     * @group Transforms
     * @discreet
     */
    set size(p_value) {
        this.width = p_value;
        this.height = p_value;
    }

    /**
     * @group Transforms
     * @discreet
     */
    set width(p_value) { this.style.width = U.isEmpty(p_value) ? `` : `${p_value}px`; }

    /**
     * @group Transforms
     * @discreet
     */
    set height(p_value) { this.style.height = U.isEmpty(p_value) ? `` : `${p_value}px`; }

    set sizeRel(p_value) {
        this.widthRel = p_value;
        this.heightRel = p_value;
    }

    set widthRel(p_value) { this.style.width = U.isEmpty(p_value) ? `` : `${p_value}%`; }
    set heightRel(p_value) { this.style.height = U.isEmpty(p_value) ? `` : `${p_value}%`; }

    // ----> Pooling

    _CleanUp() {

        this.visible = true;
        this.parent = null;

        this.order = null;

        this._transforms = {};
        this.style.removeProperty(`transform`);

        super._CleanUp();

        //Workaround shadow dom leaving webcomponents floating around.
        UDOM.Detach(this);
        //UI.GRAVEYARD.appendChild(this);

    }

    /**
     * @description TODO
     * @customtag debug
     * @type {string}
     * @discreet
     */
    get displayPath() {

        let arr = new Array(0),
            p = this._parent;

        while (p != null) {
            arr.push(p.constructor.name);
            p = p.parent;
        }

        arr.reverse();
        arr.push(this.constructor.name);
        return arr.join('.');
    }



}

module.exports = DisplayObject;
//UI.Register(`nkmjs-display-object`, DisplayObject);