'use strict';

const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);

const POINTER = require("./pointer");
const UI = require("./ui");


/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.SingletonEx
 * @memberof ui.core
 */
class INPUT extends com.helpers.SingletonEx {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {symbole}
     * @customtag read-only
     * @group Key Signal
     */
    static KEY_UP = Symbol('keyUp');

    /**
     * @description TODO
     * @type {symbole}
     * @customtag read-only
     * @group Key Signal
     */
    static KEY_DOWN = Symbol('keyDown');

    /**
     * @description TODO
     * @type {symbole}
     * @customtag read-only
     * @group Key Signal
     */
    static KEY_REPEAT = Symbol('keyRepeat');


    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    static get shift() { return this.instance.shiftKey; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    static get ctrl() { return this.instance.ctrlKey; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    static get alt() { return this.instance.altKey; }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    static ONKeyUp(p_key, p_fn) { this.Watch(`U_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    static OFFKeyUp(p_key, p_fn) { this.Unwatch(`U_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    static ONKeyDown(p_key, p_fn) { this.Watch(`D_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    static OFFKeyDown(p_key, p_fn) { this.Unwatch(`D_${p_key}`, p_fn); }

    /**
         * @description TODO
         * @param {*} p_key 
         * @param {*} p_fn 
         */
    static ONKeyRepeat(p_key, p_fn) { this.Watch(`R_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    static OFFKeyRepeat(p_key, p_fn) { this.Unwatch(`R_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @type {ui.core.POINTER}
     * @customtag read-only
     */
    static get POINTER() { return this.instance._mouse; }

    _Init() {

        super._Init();

        this._running = false;

        this._down = new collections.Dictionary();

        this._Bind(this._KHandle);
        this._Bind(this._KBlur);

        this._shiftKey = false;
        this._ctrlKey = false;
        this._altKey = false;
        this._currentKeyEvent = null;

        if (this._isBrowser) {
            this._Start();
            this._pointer = POINTER.instance;
        }

    }

    _Prepare() {
        if (env.features.doMState === env.DOM_STATE.INTERACTIVE) { this._OnDomInteractive(); }
        else { env.features.WatchOnce(env.SIGNAL.DOMSTATE_CHANGED, this._OnDomInteractive, this); }
    }

    _OnDomInteractive() {
        this._Start();
    }

    _Start() {

        if (this._running) { return; }

        console.log(`INPUT START`);

        window.addEventListener('keydown', this._KHandle);
        window.addEventListener('keyup', this._KHandle);
        window.addEventListener('keypress', this._KHandle);

        window.addEventListener('blur', this._KBlur);

        POINTER.instance._Start();
        
        this._running = true;

    }

    _Stop() {

        if (!this._running) { return; }

        window.removeEventListener('keydown', this._KHandle);
        window.removeEventListener('keyup', this._KHandle);
        window.removeEventListener('keypress', this._KHandle);

        window.removeEventListener('blur', this._KBlur);

        POINTER.instance._Stop();

        this._running = false;

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

    /**
     * @description TODO
     * @type {Event}
     * @customtag read-only
     */
    get currentKeyEvent() { return this._currentKeyEvent; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get shiftKey() { return this._shiftKey; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get ctrlKey() { return this._ctrlKey; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get altKey() { return this._altKey; }

    /**
     * @description TODO
     * @type {ui.core.POINTER}
     * @customtag read-only
     */
    get mouse() { return this._pointer; }

    /**
     * @access private
     * @param {*} p_evt 
     */
    _KHandle(p_evt) {
        //p_evt.preventDefault();

        this._currentKeyEvent = p_evt;

        this._shiftKey = p_evt.shiftKey;
        this._ctrlKey = p_evt.ctrlKey;
        this._altKey = p_evt.altKey;

        let type = p_evt.type,
            key = p_evt.key,
            code = p_evt.code,
            which = p_evt.which;

        if (type === 'keydown') {
            if (p_evt.repeat) {
                this._Broadcast(INPUT.KEY_REPEAT);
                this._Broadcast(`R_${which}`);
            } else {
                this._down.Set(which, true);
                this._Broadcast(INPUT.KEY_DOWN);
                this._Broadcast(`D_${which}`);
            }
        } else if (type === 'keyup') {
            this._down.Remove(which);
            this._Broadcast(INPUT.KEY_UP, which);
            this._Broadcast(`U_${which}`);
        }

        this._currentKeyEvent = null;
    }

    /**
     * @access private
     * @param {*} p_evt 
     */
    _KBlur(p_evt) {
        let keys = this._down.keys;

        // Broadcast up events for all keys currently down.
        for (let i = 0, n = keys.length; i < n; i++) {
            this._Broadcast(INPUT.KEY_UP, null);
            this._Broadcast(`U_${keys[i]}`, null);
        }
        this._down.Clear();
    }

}

module.exports = INPUT;
