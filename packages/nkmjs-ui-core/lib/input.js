'use strict';

const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const actions = require(`@nkmjs/actions`);

const SIGNAL = require(`./signal`);
const POINTER = require("./pointer");
const UI = require("./ui");
const KB = actions.KEYBOARD;
const dom = require(`./utils-dom`);


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
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static SELECT_MODIFIER_NONE = Symbol('none');

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     * @group Generic
     */
    static SELECT_MODIFIER_TOGGLE = Symbol('toggle');

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Generic
    */
    static SELECT_MODIFIER_RANGE = Symbol('range');

    /**
    * @description TODO
    * @type {string}
    * @customtag read-only
    * @group Generic
    */
    static SELECT_MODIFIER_ADD = Symbol('add');


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

    static get selectionModifier() { return this.instance._activeSelModifier; }
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
    static ONKeyToggle(p_key, p_fn) { this.Watch(`T_${p_key}`, p_fn); }

    /**
    * @description TODO
    * @param {*} p_key 
    * @param {*} p_fn 
    */
    static OFFKeyToggle(p_key, p_fn) { this.Unwatch(`T_${p_key}`, p_fn); }

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

    static get focusedField() { return this.__focusedField; }
    static set focusedField(p_value) { this.__focusedField = p_value; }

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
        this._kcodes = {};

        this._Bind(this._KHandle);
        this._Bind(this._KBlur);
        this._Bind(this._MDown);

        this._shiftKey = false;
        this._ctrlKey = false;
        this._altKey = false;
        this._currentKeyEvent = null;

        this._activeSelModifier = INPUT.SELECT_MODIFIER_NONE;

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

        window.addEventListener('mousedown', this._MDown);

        POINTER.instance._Start();

        this._running = true;

    }

    _Stop() {

        if (!this._running) { return; }

        window.removeEventListener('keydown', this._KHandle);
        window.removeEventListener('keyup', this._KHandle);
        window.removeEventListener('keypress', this._KHandle);

        window.removeEventListener('blur', this._KBlur);

        window.removeEventListener('mousedown', this._MDown);

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
    set shiftKey(p_value) {
        if (this._shiftKey == p_value) { return; }
        this._shiftKey = p_value;
        this._OnSelectionModifierChanged();
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get ctrlKey() { return this._ctrlKey; }
    set ctrlKey(p_value) {
        if (this._ctrlKey == p_value) { return; }
        this._ctrlKey = p_value;
        this._OnSelectionModifierChanged();
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get altKey() { return this._altKey; }
    set altKey(p_value) {
        if (this._altKey == p_value) { return; }
        this._altKey = p_value;
        this._OnSelectionModifierChanged();
    }

    _OnSelectionModifierChanged() {

        let was = this._activeSelModifier;

        if (this._shiftKey) { this._activeSelModifier = INPUT.SELECT_MODIFIER_RANGE; }
        else if (this._ctrlKey) { this._activeSelModifier = INPUT.SELECT_MODIFIER_TOGGLE; }
        else { this._activeSelModifier = INPUT.SELECT_MODIFIER_NONE; }

        if (was == this._activeSelModifier) { return; }

        this.Broadcast(SIGNAL.SELECTION_MODIFIER_CHANGED, this._activeSelModifier, was);

    }

    /**
     * @description TODO
     * @type {ui.core.POINTER}
     * @customtag read-only
     */
    get mouse() { return this._pointer; }

    _MDown(p_evt) {
        if (INPUT.selectionModifier != INPUT.SELECT_MODIFIER_NONE) {
            //p_evt.preventDefault();
            dom.ClearHighlightedText();
        }
    }

    /**
     * @access private
     * @param {*} p_evt 
     */
    _KHandle(p_evt) {
        //p_evt.preventDefault();

        this._currentKeyEvent = p_evt;

        this.shiftKey = p_evt.shiftKey;
        this.ctrlKey = p_evt.ctrlKey;
        this.altKey = p_evt.altKey;

        let type = p_evt.type,
            key = p_evt.key,
            code = p_evt.code,
            which = p_evt.which;

        if (type === 'keydown') {
            if (p_evt.repeat) {
                this._processKeyRepeat(which, p_evt.keyCode, p_evt);
            } else {
                this._processKeyDown(which, p_evt.keyCode, p_evt);
            }
        } else if (type === 'keyup') {
            this._processKeyUp(which, p_evt.keyCode, p_evt);
        }

        this._currentKeyEvent = null;
    }

    _processKeyDown(p_name, p_keyCode, p_evt) {

        this._kcodes[p_name] = p_keyCode;

        this._down.Set(p_name, true);

        this.Broadcast(INPUT.KEY_DOWN);
        this.Broadcast(`D_${p_name}`);
        this.Broadcast(`T_${p_name}`, true);

        let consumed = KB.instance._Push(p_keyCode);
        if (consumed) { p_evt.preventDefault(); }

    }

    _processKeyRepeat(p_name, p_keyCode, p_evt) {

        if (!this._down.Get(p_name)) {
            this._processKeyDown(p_name, p_keyCode);
        }

        this.Broadcast(INPUT.KEY_REPEAT);
        this.Broadcast(`R_${p_name}`);

    }

    _processKeyUp(p_name, p_keyCode, p_evt) {

        if (!this._down.Get(p_name)) { return; }

        this._down.Remove(p_name);
        this.Broadcast(INPUT.KEY_UP, p_name);
        this.Broadcast(`U_${p_name}`);
        this.Broadcast(`T_${p_name}`, false);
        KB.instance._Pull(p_keyCode);

    }

    /**
     * @access private
     * @param {*} p_evt 
     */
    _KBlur(p_evt) {

        let keys = this._down.keys;

        // Broadcast up events for all keys currently pressed.
        for (let i = 0, n = keys.length; i < n; i++) {
            let name = keys[i];
            this._processKeyUp(name, this._kcodes[name]);
        }

        this._down.Clear();

    }




}

module.exports = INPUT;
