'use strict';

const u = require(`@nkmjs/utils`);

const SIGNAL = require(`./signal`);
const Keystroke = require(`./keystroke`);

/**
 * @description
 * A Keystroke object that represents an ordered chain of keys
 * @class
 * @hideconstructor
 * @augments common.Disposable
 * @memberof actions 
 */
class KeystrokeEx extends Keystroke {
    constructor() { super(); }

    /**
     * @description TODO
     * @param {*} p_string 
     * @returns 
     */
    static CreateFromString(p_string, p_trigger, p_silent = false) {
        let ks = Keystroke.CreateFromString(p_string, KeystrokeEx, p_silent);
        ks.trigger = p_trigger;
        return ks;
    }

    /**
     * @description TODO
     * @param {*} p_stroke 
     * @returns 
     */
    static CreateFromKeyCodes(p_stroke, p_trigger, p_silent = false) {
        let ks = Keystroke.CreateFromKeyCodes(p_stroke, KeystrokeEx, p_silent);
        ks.trigger = p_trigger;
        return ks;
    }

    _Init() {
        super._Init();
        this._trigger = null;
    }

    set trigger(p_value) { this._trigger = p_value; }
    get trigger() { return this._trigger; }


    Activate() {

        if (this._active) { return false; }
        if (this._focusedFieldPreventActivation && nkm.ui.INPUT.focusedField != null) { return false; }
        if (this._textSelectionPreventActivation && nkm.ui.dom.isTextHighlighted) { return false; }
        this._active = true;
        this._consumed = false;
        this.Broadcast(SIGNAL.ACTIVATED, this);

        if (this._consumed || !this._trigger) { return this._consumed; }
        this._consumed = u.Call(this._trigger);

        return this._consumed;
    }

    _CleanUp() {
        this._keys.length = 0;
        this._trigger = null;
        super._CleanUp();
    }

}

module.exports = KeystrokeEx;