'use strict';

const com = require("@nkmjs/common"); //{ POOL, DisposableObject }
const u = require(`@nkmjs/utils`);

const SIGNAL = require(`./signal`);
const KEYBOARD = require(`./keyboard`);

const Keystroke = require(`./keystroke`);

/**
 * @description
 * A Keystroke object that represents an ordered chain of keys
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
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

        if (!super.Activate()) { return false; }
        if (!this._trigger) { return true; }

        u.Call(this._trigger);

        return true;

    }

    Deactivate() {
        if (!super.Deactivate()) { return false; }
        if (!this._trigger) { return true; }
        return true;
    }

    _CleanUp() {
        this._keys.length = 0;
        super._CleanUp();
    }

}

module.exports = KeystrokeEx;