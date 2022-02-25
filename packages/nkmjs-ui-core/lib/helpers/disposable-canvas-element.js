'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

const dom = require(`../utils-dom`);
const SIGNAL = require(`../signal`);

const __unpainted = `unpainted`;

let uinc = 0;

const __paintingObserver = new IntersectionObserver(
    (entries, observer) => {

        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        //   entry.isIntersecting
        //   entry.rootBounds
        //   entry.target
        //   entry.time

        for (let i = 0, n = entries.length; i < n; i++) {
            let entry = entries[i],
                target = entry.target;
            if (entry.isIntersecting) {
                if (target._isPainted) { continue; }
                target._isPainted = true;
                target._OnPaintChange();
                target._isFirstPaint = false;
            } else {
                if (!target._isPainted) { continue; }
                target._isPainted = false;
                target._OnPaintChange();
            }
        }
    },

    { threshold: 0 });

const __resizeObserver = new ResizeObserver(
    (entries, observer) => {

        for (let i = 0, n = entries.length; i < n; i++) {
            let entry = entries[i],
                target = entry.target;

            target._OnSizeChange(entry.contentRect);

            /*
        if (entry.contentBoxSize) {
            // Firefox implements `contentBoxSize` as a single content rect, rather than an array
            let boxSize = u.isArray(entry.contentBoxSize) ? entry.contentBoxSize[0] : entry.contentBoxSize;
 
            h1Elem.style.fontSize = Math.max(1.5, boxSize.inlineSize / 200) + 'rem';
            pElem.style.fontSize = Math.max(1, boxSize.inlineSize / 600) + 'rem';
        } else {
            h1Elem.style.fontSize = Math.max(1.5, entry.contentRect.width / 200) + 'rem';
            pElem.style.fontSize = Math.max(1, entry.contentRect.width / 600) + 'rem';
            console.log
        }
        */
        }
    });

/**
 * Ah hah !
 * <pre class="prettyprint" data-title="constructor"><code>Yey, new shit {@link ui.core.DisplayObject}</code></pre>
 * @class
 * @hideconstructor
 * @augments HTMLCanvasElement
 * @memberof ui.core
 * @category Some Category
 * @signal SignalReleasing Broadcasted right before the object is about to be released. 
 * Offers the opportunity to cancel release using `{@link ui.core.DisposableHTMLElement.PreventRelease|PreventRelease}`.
 * @signal SignalReleased Broadcasted when the object has been released.
 * @signal SignalFirstPaint Broadcasted once in the lifetime of the object, the first time it is painted.
 * @signal SignalPainted Broadcasted when the object has at least one painted pixel.
 * @signal SignalUnpainted Broadcasted when the object was painted but stopped being painted.
 */
class DisposableCanvasElement extends HTMLCanvasElement {

    static __extendsNode = `canvas`;
    static __redrawDelay = 300;

    constructor() {
        super();
        this._Init();
        this._PostInit();
    }

    _Init() {
        this._uinc = uinc++;

        this._releasing = false;
        this._signals = new com.signals.SignalBox();
        this._released = false;
        this._isPainted = false;
        this._isFirstPaint = true;
        this._sizeNeedRefresh = true;

        this._ctxType = '2d';
        this._realtime = false;
        this._requestDraw = false;
        this._requestAfter = false;
        this._alwaysFit = true;
        this._size = { width: 0, height: 0 };
        this._deltaSum = 0;

        this._delayedRedraw = com.DelayedCall(this._Bind(this.Draw), this.constructor.__resizeDelay);

    }

    _PostInit() {
        this._ctx = this._GetContext();
    }

    //#region Canvas logic

    get requestDraw() { return this._requestDraw; }
    set requestDraw(p_value) { this._requestDraw = p_value; }

    SetSize(p_width = null, p_height = null) {
        p_width = p_width || this._size.width;
        p_height = p_height || this._size.height;

        if (p_width == this._size.width
            && p_height == this._size.height) {
            return;
        }

        this._size.width = p_width;
        this._size.height = p_height;
        this._sizeNeedRefresh = true;
        this._delayedRedraw.Schedule();
    }

    get realtime() { return this._realtime; }
    set realtime(p_value) {
        if (this._realtime == p_value) { return; }
        this._realtime = p_value;
        if (!p_value) { com.time.TIME.Unwatch(com.SIGNAL.TICK, this.Draw); }
        else { if (this._isPainted) { com.time.TIME.Watch(com.SIGNAL.TICK, this.Draw); } }
    }

    // ---->

    _GetContext() { return this.getContext(this._ctxType) }

    Draw(p_delta = 0) {
        if (!this._isPainted) {
            // Offscreen, schedule draw for next paint instead
            this._deltaSum += p_delta;
            this._waitingForDraw = true;
            return;
        } else {
            this._deltaSum = 0;
        }

        if (this._sizeNeedRefresh) {
            this.width = this._size.width;
            this.height = this._size.height;
            this._sizeNeedRefresh = false;
        }

        if (this._requestDraw) {
            this._Broadcast(SIGNAL.DRAW_REQUEST_BEFORE, this, this._ctx, p_delta);
            this._InternalDraw(this._ctx, p_delta);
            this._Broadcast(SIGNAL.DRAW_REQUEST_AFTER, this, this._ctx, p_delta);
        } else {
            this._InternalDraw(this._ctx, p_delta);
        }

    }

    _InternalDraw(ctx, p_delta = 0) { }

    Clear() {
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.clearRect(0, 0, this.width, this.height);
    }

    //#endregion

    /**
     * @access protected
     * @description Bind a function to this instance.
     * @param {function} p_func
     * @example this._Bind(this.foo);
     * @group Utils
     * @discreet
     */
    _Bind(p_func) { return this[p_func.name] = p_func.bind(this); }

    //#region Resizing

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _OnSizeChange(p_contentRect) {
        if (this._alwaysFit) {
            this.SetSize(p_contentRect.width, p_contentRect.height);
        }
    }

    //#endregion

    //#region Painting

    /**
     * @description TODO
     * @customtag read-only
     * @returns {boolean} hah
     * @group Rendering
     */
    get isPainted() { return this._isPainted; }

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _OnPaintChange() {
        if (this._isPainted) {

            if (this._isFirstPaint) { this._signals.Broadcast(SIGNAL.FIRST_PAINT, this); }
            this._signals.Broadcast(SIGNAL.PAINTED, this);


            if (this._realtime) {
                com.time.TIME.Watch(com.SIGNAL.TICK, this.Draw);
                this.Draw();
            } else {
                if (this._waitingForDraw) {
                    this._waitingForDraw = false;
                    this.Draw(this._deltaSum);
                    this._deltaSum = 0;
                }
            }
        } else {

            this._signals.Broadcast(SIGNAL.UNPAINTED, this);

            if (this._realtime) {
                com.time.TIME.Unwatch(com.SIGNAL.TICK, this.Draw);
            } else {

            }
        }
    }

    //#endregion

    //#region Signals

    /**
     * @access protected
     * @param {*} p_signal 
     * @param {...any} args 
     * @group Broadcasting
     * @groupdescription This section list the main methods used to watch/unwatch signals on this object.
     * For more info on signals, see {@tutorial signals}
     */
    _Broadcast(p_signal, ...args) {
        this._signals.Broadcast(p_signal, ...args);
        return this;
    }

    /**
     * @description Watch a signal broadcasted by this object.  
     * Note that while you can provide an anonymous function, you won't be able to Unwatch it.
     * @param {*} p_signal The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {ui.core.DisposableHTMLElement}
     * @group Broadcasting
     * @example var foo = someFunction;
     * object.Watch(com.SIGNAL.RELEASED, foo);
     * @example object.Watch(com.SIGNAL.RELEASED, foo, this);
     * @example object.Watch(com.SIGNAL.RELEASED, (obj)=>{ ... }));
     */
    Watch(p_signal, p_fn, p_listener = null) {
        this._signals.Add(p_signal, p_fn, p_listener);
        return this;
    }

    /**
     * @description Watch a signal broadcasted by this object, once only; meaning if the signal the listener gets automatically 
     * removed right after the next signal broadcast.
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {ui.core.DisposableHTMLElement}
     * @group Broadcasting
     */
    WatchOnce(p_signal, p_fn, p_listener = null) {
        this._signals.AddOnce(p_signal, p_fn, p_listener);
        return this;
    }

    /**
     * @description Unwatch a signal broadcasted by this object
     * @param {*} p_signal The signal that was being watched
     * @param {function} p_fn The callback to be removed
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {ui.core.DisposableHTMLElement}
     * @group Broadcasting
     */
    Unwatch(p_signal, p_fn, p_listener = null) {
        this._signals.Remove(p_signal, p_fn, p_listener);
        return this;
    }

    //#endregion

    //#region Pooling

    /**
     * @description Whether the object is currently in the process of being released or not.
     * @customtag read-only
     * @type {boolean}
     * @group Pooling
     */
    get isReleasing() { return this._isReleasing; }

    /**
     * @description Prevents the object from being released.
     * @group Pooling 
     */
    PreventRelease() { this._releasePrevented = true; }

    /**
     * @description Releases the object and returns it back to the pool.
     * @broadcasts common.SIGNAL.RELEASING
     * @broadcasts common.SIGNAL.RELEASED
     * @group Pooling
     * @groupdescription Group of methods related to the NKMjs pooling system.
     */
    Release() {

        if (this._releasing) { return; }
        this._releasing = true;

        this._Broadcast(com.SIGNAL.RELEASING, this);

        if (this._releasePrevented) {
            this._releasing = false;
            delete this._releasePrevented;
            return;
        }

        this._released = true;

        this._Broadcast(com.SIGNAL.RELEASED, this);
        this._CleanUp();

        dom.Detach(this);

        if (this._returnFn) { this._returnFn(this); }
        this._releasing = false;

    }

    /**
     * @access protected
     * @description Called when the object is released. Resets most properties to their initial values.  
     * Override this method in your own implementations to 'reset' the object to the state you want it to be
     * when it gets rented again through `{@link common.POOL.Rent}`
     * @customtag override-me
     * @group Pooling 
     */
    _CleanUp() {

        this._signals.Clear();
        this._isFirstPaint = true;

        if (this._isPainted) {
            this._isPainted = false;
            this._OnPaintChange();
        }

        __paintingObserver.unobserve(this);
        __resizeObserver.unobserve(this);

    }

    Wake() {
        this._released = false;
        this._Wake();
        this._PostWake();

        __resizeObserver.observe(this);
        __paintingObserver.observe(this);

    }

    /**
     * @description Wake is called when using UI' `{@link ui.core.UI.Rent}` when an item is rented. Since objects are pooled, 
     * this acts as a surrogate constructor. 
     * In order to take advantage of the Wake call, override `_Wake`.
     * @group Pooling 
     * @customtag override-me
     */
    _Wake() { }
    _PostWake() { }

    //#endregion

    toString() { return `<${this.constructor.name}>`; }
}

module.exports = DisposableCanvasElement;