'use strict';

const com = require("@nkmjs/common"); //{ POOL, DisposableObject }

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
    static CreateFromString(p_string, p_trigger) {
        let ks = Keystroke.CreateFromString(p_string, KeystrokeEx);
        ks.trigger = p_trigger;
        return ks;
    }

    /**
     * @description TODO
     * @param {*} p_stroke 
     * @returns 
     */
    static CreateFromKeyCodes(p_stroke, p_trigger) {
        let ks = Keystroke.CreateFromKeyCodes(p_stroke, KeystrokeEx);
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

        let thisArg = u.tils.Get(this._trigger, `thisArg`, null);

        if (this._trigger.args) { this._trigger.fn.call(thisArg, ...this._trigger.args); }
        else if (this._trigger.arg) { this._trigger.fn.call(thisArg, this._trigger.arg); }
        else { this._trigger.fn.call(thisArg); }

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