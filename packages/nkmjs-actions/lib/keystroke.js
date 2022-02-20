'use strict';

const com = require("@nkmjs/common"); //{ POOL, DisposableObject }

const SIGNAL = require(`./signal`);
const KEYBOARD = require(`./keyboard`);

/**
 * @description
 * A Keystroke object that represents an ordered chain of keys
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof actions 
 */
class Keystroke extends com.pool.DisposableObjectEx {
    constructor() { super(); }


    /**
     * @description TODO
     * @param {*} p_string 
     * @param {*} p_class 
     */
    static CreateFromString(p_string, p_class = null) {

        p_string = p_string.toLowerCase();
console.log(p_string);
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

            if (char in KEYBOARD._map) {
                key = KEYBOARD._map[char].code;
            }

            if (key == -1) { continue; }

            keys.push(key);

        }

        result.keys = keys;
        return result;

    }

    /**
     * @description TODO
     * @param {*} p_stroke 
     * @param {*} p_class 
     */
    static CreateFromKeyCodes(p_stroke, p_class = null) {

        let
            result = com.Rent(p_class ? p_class : Keystroke),
            keys = p_stroke;

        result.keys = keys;

        return result;

    }

    _Init() {
        super._Init();
        this._keys = [];
        this._active = false;
        this._enabled = false;
    }

    get keys() { return this._keys; }
    set keys(p_keys) {
        this._keys = [...p_keys];
    }

    Enable() {
        if (this._enabled) { return; }
        this._enabled = true;
        KEYBOARD.instance._Register(this);
        this._Broadcast(SIGNAL.ENABLED, this);
    }

    Disable() {
        if (!this._enabled) { return; }
        this._enabled = false;
        KEYBOARD.instance._Unregister(this);
        if(this._active){ this.Deactivate(); }
        this._Broadcast(SIGNAL.DISABLED, this);
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
        if(this._active){ return false; }
        this._active = true;
        this._Broadcast(SIGNAL.ACTIVATED, this);
        return true;
    }

    Deactivate() {
        if(!this._active){ return false; }
        this._active = false;
        this._Broadcast(SIGNAL.DEACTIVATED, this);
        return true;
    }

    _CleanUp() {
        this._keys.length = 0;
        super._CleanUp();
    }

}

module.exports = Keystroke;