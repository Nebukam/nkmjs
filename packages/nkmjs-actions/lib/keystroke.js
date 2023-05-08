'use strict';

const com = require("@nkmjs/common"); //{ POOL, Disposable }

const SIGNAL = require(`./signal`);
const KB = require(`./keyboard`);

/**
 * @description
 * A Keystroke object that represents an ordered chain of keys
 * @class
 * @hideconstructor
 * @augments common.Disposable
 * @memberof actions 
 */
class Keystroke extends com.helpers.InfosObjectEx {
    constructor() { super(); }


    /**
     * @description TODO
     * @param {*} p_string 
     * @param {*} p_class 
     */
    static CreateFromString(p_string, p_class = null, p_silent = false) {

        p_string = p_string.toLowerCase();
        //console.log(p_string);
        // "Ctrl C"
        // "Ctrl V"
        // "Ctrl Alt Z"

        let
            result = com.Rent(p_class ? p_class : Keystroke),
            arr = p_string.split(` `),
            keys = [];

        for (let i = 0; i < arr.length; i++) {

            let
                char = arr[i],
                key = -1;

            if (char in KB.KEYS.map) {
                key = KB.KEYS.map[char].code;
            }

            if (key == -1) { continue; }

            keys.push(key);

        }

        result.keys = keys;
        result.silent = p_silent;
        return result;

    }

    /**
     * @description TODO
     * @param {*} p_stroke 
     * @param {*} p_class 
     */
    static CreateFromKeyCodes(p_stroke, p_class = null, p_silent = false) {

        let
            result = com.Rent(p_class ? p_class : Keystroke),
            keys = p_stroke;

        result.keys = keys;
        result.silent = p_silent;

        return result;

    }

    _Init() {
        super._Init();
        this._keys = [];
        this._focusedFieldPreventActivation = false;
        this._textSelectionPreventActivation = false;
        this._active = false;
        this._enabled = false;
        this._silent = false;
        this._consumed = false;
    }

    get keys() { return this._keys; }
    set keys(p_keys) {
        this._keys = [...p_keys];
    }

    get silent() { return this._silent; }
    set silent(p_value) { this._silent = p_value; }

    get isEnabled() { return this._enabled; }

    NoFieldFocus() {
        this._focusedFieldPreventActivation = true;
        return this;
    }

    NoTextSelect() {
        this._textSelectionPreventActivation = true;
        return this;
    }

    Strict() {
        this._focusedFieldPreventActivation = true;
        this._textSelectionPreventActivation = true;
        return this;
    }

    Enable() {
        if (this._enabled) { return; }
        this._enabled = true;
        KB._Register(this);
        this.Broadcast(SIGNAL.ENABLED, this);
    }

    Disable() {
        if (!this._enabled) { return; }
        this._enabled = false;
        KB._Unregister(this);
        if (this._active) { this.Deactivate(); }
        this.Broadcast(SIGNAL.DISABLED, this);
    }

    /**
     * 
     * @param {*} p_chain 
     * @returns {Number} -1 if there is no match, 0 if the match is ongoing but incomplete, 1 if perfect match.
     */
    GetMatch(p_chain) {

        let
            n = this._keys.length,
            oN = p_chain.length;

        if (n == 0) { return -1; }
        if (n < oN) { return -1; }

        for (let i = 0; i < oN; i++) {
            //TODO : Support alternative keys
            let A = p_chain[i], B = this._keys[i];
            if (A != B) { return -1; }
        }

        return n == oN ? 1 : 0;

    }

    Activate() {
        if (this._active) { return false; }
        if (this._focusedFieldPreventActivation && nkm.ui.INPUT.focusedField != null) { return false; }
        if (this._textSelectionPreventActivation && nkm.ui.dom.isTextHighlighted) { return false; }
        this._active = true;
        this._consumed = false;
        this.Broadcast(SIGNAL.ACTIVATED, this);
        return this._consumed;
    }

    Deactivate() {
        if (!this._active) { return false; }
        this._active = false;
        this.Broadcast(SIGNAL.DEACTIVATED, this);
        return true;
    }

    get consumed() { return this._consumed; }

    Consume() {
        if (!this._active) { return; }
        this._consumed = true;
    }

    _CleanUp() {
        this._keys.length = 0;
        this._focusedFieldPreventActivation = false;
        this._textSelectionPreventActivation = false;
        super._CleanUp();
    }

    toString() {
        return `${this._keys.join(`+`)}`;
    }

}

module.exports = Keystroke;