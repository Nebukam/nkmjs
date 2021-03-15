'use strict';

const com = require("@nkmjs/common");
const u = require("@nkmjs/utils");
const SIGNAL = require(`./signal`);

let uinc = 0;

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

    static __fouc_hidden = false;

    constructor() {
        super();
        this._Init();
        this._PostInit();
    }

    _Init() {
        this._uinc = uinc++;

        this._returnFn = null;
        this._releasing = false;
        this._releasePrevented = false;
        this._signals = new com.signals.SignalBox();
        this._released = false;
        this._isPainted = false;
        this._isFirstPaint = true;
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

    // ----> Painting

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

    static __paintingObserver = new IntersectionObserver(
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
                    if (target.constructor.__usePaintCallback) { target._OnPaintChange(); }
                    target._isFirstPaint = false;
                } else {
                    if (!target._isPainted) { continue; }
                    target._isPainted = false;
                    if (target.constructor.__usePaintCallback) { target._OnPaintChange(); }
                }
            }
        },

        { threshold: 0 });

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
        } else {
            this._signals.Broadcast(SIGNAL.UNPAINTED, this);
        }
    }

    // ----> Signals

    /**
     * @access protected
     * @param {*} p_signal 
     * @param {...any} args 
     * @group Broadcasting
     * @groupdescription This section list the main methods used to watch/unwatch signals on this object.
     * For more info on signals, see {@tutorial signals}
     */
    _Broadcast(p_signal, ...args) { this._signals.Broadcast(p_signal, ...args); }

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

    // ----> Pooling

    /**
     * @description Whether the object is currently in the process of being released or not.
     * @customtag read-only
     * @type {boolean}
     * @group Pooling
     */
    get isReleasing(){ return this._isReleasing; }

    set returnFunc(value) { this._returnFn = value; }
    set returnContext(value) { this._returnContext = value; }

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
            this._releasePrevented = false;
            return;
        }

        this._released = true;
        this._Broadcast(com.SIGNAL.RELEASED, this);
        this._CleanUp();

        u.dom.Detach(this);

        if (this._returnFn != undefined) { this._returnFn(this); }
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
        this._releasePrevented = false;
        this._signals.Clear();
        this._isFirstPaint = true;
        this.constructor.__paintingObserver.unobserve(this);
    }

    Wake() {
        this._released = false;
        this._Wake();
        this._PostWake();
        this.constructor.__paintingObserver.observe(this);
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

    toString() { return `<${this.constructor.name}>`; }
}

module.exports = DisposableHTMLElement;