'use strict';

const u = require(`@nkmjs/utils`);
const collections = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const env = require(`@nkmjs/environment`);
const actions = require(`@nkmjs/actions`);
const services = require(`@nkmjs/services`);

const SIGNAL = require(`./signal`);
const POINTER = require("./pointer");
const UI = require("./ui");
const dom = require(`./utils-dom`);

const KB = actions.KEYBOARD;

const MODIFIERS = require(`./input-modifiers`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof ui.core
 */
class INPUT extends services.ServiceBase {
    constructor() { super(); }

    get MODIFIERS() { return MODIFIERS; }
    get selectionModifier() { return this._activeSelModifier; }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    ONKeyUp(p_key, p_fn) { this.Watch(`U_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    OFFKeyUp(p_key, p_fn) { this.Unwatch(`U_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    ONKeyDown(p_key, p_fn) { this.Watch(`D_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    OFFKeyDown(p_key, p_fn) { this.Unwatch(`D_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    ONKeyToggle(p_key, p_fn) { this.Watch(`T_${p_key}`, p_fn); }

    /**
    * @description TODO
    * @param {*} p_key 
    * @param {*} p_fn 
    */
    OFFKeyToggle(p_key, p_fn) { this.Unwatch(`T_${p_key}`, p_fn); }

    /**
         * @description TODO
         * @param {*} p_key 
         * @param {*} p_fn 
         */
    ONKeyRepeat(p_key, p_fn) { this.Watch(`R_${p_key}`, p_fn); }

    /**
     * @description TODO
     * @param {*} p_key 
     * @param {*} p_fn 
     */
    OFFKeyRepeat(p_key, p_fn) { this.Unwatch(`R_${p_key}`, p_fn); }

    get focusedField() { return this.__focusedField; }
    set focusedField(p_value) { this.__focusedField = p_value; }

    get mouseDownPosition() { return this._mouseDownPosition; }

    _Init() {

        super._Init();

        this._enabled = false;

        this._down = new collections.Dictionary();
        this._kcodes = {};

        this._mouseDownPosition = { x: 0, y: 0, relX: 0, relY: 0 };

        this._Bind(this._KHandle);
        this._Bind(this._KBlur);
        this._Bind(this._MDown);

        this._shiftKey = false;
        this._ctrlKey = false;
        this._altKey = false;
        this._currentKeyEvent = null;

        this._activeSelModifier = MODIFIERS.NONE;

        if (this._isBrowser) {
            this._pointer = POINTER;
        }

    }

    _InternalStart() {
        if (env.features.domState === env.DOM_STATE.COMPLETE) { this._OnStarted(); }
        else { env.features.WatchOnce(env.SIGNAL.DOMSTATE_CHANGED, this._OnStarted, this); }
    }

    _OnStarted() {
        this.Enable();
        super._OnStarted();
    }

    Enable() {

        if (this._enabled) { return; }

        window.addEventListener('keydown', this._KHandle);
        window.addEventListener('keyup', this._KHandle);
        window.addEventListener('keypress', this._KHandle);

        window.addEventListener('blur', this._KBlur);

        window.addEventListener('mousedown', this._MDown);

        POINTER.Enable();

        u.LOG._(`🗸 INPUT enabled`, `#e5e5e5`, `#000000`);
        this._enabled = true;

    }

    Disable() {

        if (!this._enabled) { return; }

        window.removeEventListener('keydown', this._KHandle);
        window.removeEventListener('keyup', this._KHandle);
        window.removeEventListener('keypress', this._KHandle);

        window.removeEventListener('blur', this._KBlur);

        window.removeEventListener('mousedown', this._MDown);

        POINTER.Disable();

        u.LOG._(`🞫 INPUT disabled`, `#e5e5e5`, `#e50000`);
        this._enabled = false;

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get enabled() { return this._enabled; }

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

        if (this._shiftKey) { this._activeSelModifier = MODIFIERS.RANGE; }
        else if (this._ctrlKey) { this._activeSelModifier = MODIFIERS.TOGGLE; }
        else { this._activeSelModifier = MODIFIERS.NONE; }

        if (was == this._activeSelModifier) { return; }

        this.Broadcast(SIGNAL.SEL_MODIFIER_CHANGED, this._activeSelModifier, was);

    }

    /**
     * @description TODO
     * @type {ui.core.POINTER}
     * @customtag read-only
     */
    get mouse() { return this._pointer; }

    _MDown(p_evt) {

        this._mouseDownPosition.x = p_evt.clientX;
        this._mouseDownPosition.y = p_evt.clientY;
        this._mouseDownPosition.relX = p_evt.clientX / window.innerWidth;
        this._mouseDownPosition.relY = p_evt.clientY / window.innerHeight;

        if (INPUT.selectionModifier != MODIFIERS.NONE) {
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

        this.Broadcast(SIGNAL.KEY_DOWN);
        this.Broadcast(`D_${p_name}`);
        this.Broadcast(`T_${p_name}`, true);

        let consumed = KB._Push(p_keyCode);
        if (consumed) { p_evt.preventDefault(); }

    }

    _processKeyRepeat(p_name, p_keyCode, p_evt) {

        if (!this._down.Get(p_name)) {
            this._processKeyDown(p_name, p_keyCode);
        }

        this.Broadcast(SIGNAL.KEY_REPEAT);
        this.Broadcast(`R_${p_name}`);

    }

    _processKeyUp(p_name, p_keyCode, p_evt) {

        if (!this._down.Get(p_name)) { return; }

        this._down.Remove(p_name);
        this.Broadcast(SIGNAL.KEY_UP, p_name);
        this.Broadcast(`U_${p_name}`);
        this.Broadcast(`T_${p_name}`, false);
        KB._Pull(p_keyCode);

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

module.exports = new INPUT();
