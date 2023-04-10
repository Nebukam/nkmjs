'use strict';

class LOG {
    constructor() { }

    static toggle(p_toggle) { this._enabled = p_toggle; }

    static _(p_text, p_color = `#818181`, p_bg = null) {
        if (!this._enabled) { return; }
        if (p_bg) {
            console.log(`%c ${p_text} `, `background: ${p_bg}; color: ${p_color}; border-radius: 5px;`);
        } else {
            console.log(`%c${p_text} `, `color: ${p_color}`);
        }
    }

    static _U(p_name, p_new, p_old, p_color = `#818181`, p_bg = null) {
        if (!this._enabled) { return; }
        if (p_bg) {
            console.log(`%c ⭮ ${p_name} 🠚 '${p_new}' %c(was '${p_old}') `, `background: ${p_bg}; color: ${p_color}; border-radius: 5px;`, `background: ${p_bg}; color: ${p_color}; font-style: italic; border-radius: 5px;`);
        } else {
            console.log(`%c⭮ ${p_name} 🠚 '${p_new}' %c(was '${p_old}')`, `color: ${p_color}`, `color: ${p_color}; font-style: italic`);
        }
    }


}

module.exports = LOG;