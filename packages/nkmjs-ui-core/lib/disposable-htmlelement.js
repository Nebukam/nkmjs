'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");

const dom = require(`./utils-dom`);
const SIGNAL = require(`./signal`);

const __unpainted = `unpainted`;

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
                target.classList.remove(__unpainted);
                if (target.constructor.__usePaintCallback) { target._OnPaintChange(); }
                target._isFirstPaint = false;
            } else {
                if (!target._isPainted) { continue; }
                target._isPainted = false;
                target.classList.add(__unpainted);
                if (target.constructor.__usePaintCallback) { target._OnPaintChange(); }
            }
        }
    },

    { threshold: 0 });

const __resizeObserver = new ResizeObserver(
    (entries, observer) => {

        for (let i = 0, n = entries.length; i < n; i++) {
            let entry = entries[i],
                target = entry.target;

            if (target.constructor.__useResizeCallback) {
                target._OnSizeChange(entry.contentRect);
            }

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
 * @typedef SignalReleasing
 * @type common.SIGNAL.RELEASING
 * @property {ui.core.DisposableHTMLElement} target Source of the signal ( would be event.target )
 */

/**
* @typedef SignalReleased
* @type common.SIGNAL.RELEASED
* @property {ui.core.DisposableHTMLElement} target Source of the signal ( would be event.target )
*/

/**
 * @typedef SignalFirstPaint
 * @type ui.core.SIGNAL.FIRST_PAINT
 * @property {ui.core.DisposableHTMLElement} target Source of the signal ( would be event.target )
 */

/**
 * @typedef SignalPainted
 * @type ui.core.SIGNAL.PAINTED
 * @property {ui.core.DisposableHTMLElement} target Source of the signal ( would be event.target )
 */

/**
 * @typedef SignalUnpainted
 * @type ui.core.SIGNAL.UNPAINTED
 * @property {ui.core.DisposableHTMLElement} target Source of the signal ( would be event.target )
 */

/**
 * Ah hah !
 * <pre class="prettyprint" data-title="constructor"><code>Yey, new shit {@link ui.core.DisplayObject}</code></pre>
 * @class
 * @hideconstructor
 * @augments HTMLElement
 * @memberof ui.core
 * @category Some Category
 * @signal SignalReleasing Broadcasted right before the object is about to be released. 
 * Offers the opportunity to cancel release using `{@link ui.core.DisposableHTMLElement.PreventRelease|PreventRelease}`.
 * @signal SignalReleased Broadcasted when the object has been released.
 * @signal SignalFirstPaint Broadcasted once in the lifetime of the object, the first time it is painted.
 * @signal SignalPainted Broadcasted when the object has at least one painted pixel.
 * @signal SignalUnpainted Broadcasted when the object was painted but stopped being painted.
 */
class DisposableHTMLElement extends HTMLElement {

    static __extendsNode = null;

    constructor() {
        super();
        this.__URID = dom.URID;
        this._Init();
        this._PostInit();
    }

    _Init() {

        this._releasing = false;

        this._signals = new com.signals.SignalBox(this);

        this._released = false;
        this._isPainted = false;
        this._isFirstPaint = true;

        if (this.constructor.__usePaintCallback) { this.classList.add(__unpainted); }

    }

    _PostInit() { }

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
     * @description Determine whether the object uses resize callbacks and thus broadcast resize signals.
     * <br>Note : this property is set on a per-class basis, rather than on a per-instance basis. 
     * Set this value by overloading it in your class definition.
     * @group Rendering
     * @customtag static
     * @example ... extends DisposableHTMLElement{
     *  static __useResizeCallback = true;
     * }
     */
    static __useResizeCallback = false;

    /**
     * @access protected
     * @description TODO
     * @customtag override-me
     * @group Rendering
     */
    _OnSizeChange(p_contentRect) { this.Broadcast(SIGNAL.RESIZE, this, p_contentRect); }

    //#endregion

    //#region Painting

    /**
     * @access protected
     * @description TODO
     * @group Rendering
     * @customtag static
     * @example ... extends DisposableHTMLElement{
     *  static __observableIntersection = true;
     * }
     */
    static __observableIntersection = false;

    /**
     * @access protected
     * @description Determine whether the object uses paint callbacks and thus broadcast paint signals.
     * <br>Note : this property is set on a per-class basis, rather than on a per-instance basis. 
     * Set this value by overloading it in your class definition.
     * @group Rendering
     * @customtag static
     * @example ... extends DisposableHTMLElement{
     *  static __usePaintCallback = true;
     * }
     */
    static __usePaintCallback = false;


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
            this.Broadcast(SIGNAL.PAINTED, this);
        } else {
            this.Broadcast(SIGNAL.UNPAINTED, this);
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
    Broadcast(p_signal, ...args) { /* owned by local SignalBox */ }

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
    Watch(p_signal, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description Watch a signal broadcasted by this object, once only; meaning if the signal the listener gets automatically 
     * removed right after the next signal broadcast.
     * @param {*} p_signalId The signal to watch for
     * @param {function} p_fn The callback to trigger when the signal fires
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {ui.core.DisposableHTMLElement}
     * @group Broadcasting
     */
    WatchOnce(p_signal, p_fn, p_listener = null) { /* owned by local SignalBox */ }

    /**
     * @description Unwatch a signal broadcasted by this object
     * @param {*} p_signal The signal that was being watched
     * @param {function} p_fn The callback to be removed
     * @param {*} p_listener The callback's 'thisArg', if any
     * @returns {ui.core.DisposableHTMLElement}
     * @group Broadcasting
     */
    Unwatch(p_signal, p_fn, p_listener = null) {
        //this._signals.Remove(p_signal, p_fn, p_listener);
        //return this;
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

        this.Broadcast(com.SIGNAL.RELEASING, this);

        if (this._releasePrevented) {
            this._releasing = false;
            delete this._releasePrevented;
            return;
        }

        this._released = true;

        this.Broadcast(com.SIGNAL.RELEASED, this);
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
            this.classList.add(__unpainted);
            if (this.constructor.__usePaintCallback) { this._OnPaintChange(); }
        }

        if (this.constructor.__observableIntersection
            || this.constructor.__usePaintCallback) {
            __paintingObserver.unobserve(this);
        }
        if (this.constructor.__useResizeCallback) {
            __resizeObserver.unobserve(this);
        }

    }

    Wake() {
        this._released = false;
        this._Wake();
        this._PostWake();
        if (this.constructor.__observableIntersection
            || this.constructor.__usePaintCallback) {
            __paintingObserver.observe(this);
        }
        if (this.constructor.__useResizeCallback) {
            __resizeObserver.observe(this);
        }

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

module.exports = DisposableHTMLElement;