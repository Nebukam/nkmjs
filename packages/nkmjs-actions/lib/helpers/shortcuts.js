'use strict';

const KeystrokeEx = require(`../keystroke-ex`);

/**
 * A CommandBox is meant to be a repo of commands available for a single context.
 * It is also a mean to centralize command instances and have them act as "soft singleton" if needed,
 * especially if a broad context should be able to enable/disable specific commands.
 * @class
 * @hideconstructor
 * @augments actions.Command
 * @memberof actions
 */
class Shortcuts {
    constructor(p_onRegister = null) {

        this._isEnabled = false;
        this._keystrokes = [];

    }

    Enable() {
        if (this._isEnabled) { return; }
        this._isEnabled = true;
        this._Toggle(true);
    }

    Disable() {
        if (!this._isEnabled) { return; }
        this._isEnabled = false;
        this._Toggle(false);
    }

    CreateFromString(p_string, p_trigger) {
        return this._Register(KeystrokeEx.CreateFromString(p_string, p_trigger));
    }

    CreateFromKeyCodes(p_stroke, p_trigger) {
        return this._Register(KeystrokeEx.CreateFromKeyCodes(p_stroke, p_trigger));
    }

    _Register(p_keystroke) {
        this._keystrokes.push(p_keystroke);
        if (this._isEnabled) { p_keystroke.Enable(); }
        else { p_keystroke.Disable(); }
        return p_keystroke;
    }

    _Toggle(p_toggle) {
        for (let i = 0; i < this._keystrokes.length; i++) {
            if (p_toggle) { this._keystrokes[i].Enable(); }
            else { this._keystrokes[i].Disable(); }
        }
    }

}

module.exports = Shortcuts;