'use strict';

var _enabled = true;

module.exports = {

    toggle: function (p_toggle) { _enabled = p_toggle; },

    _: function (p_text, p_color = `#818181`, p_bg = null) {
        if (!_enabled) { return; }
        if (p_bg) {
            console.log(`%c ${p_text} `, `background: ${p_bg}; color: ${p_color}; border-radius: 5px;`);
        } else {
            console.log(`%c${p_text} `, `color: ${p_color}`);
        }
    },

    _U: function (p_name, p_new, p_old, p_color = `#818181`, p_bg = null) {
        if (!_enabled) { return; }
        if (p_bg) {
            console.log(`%c ⭮ ${p_name} 🠚 '${p_new}' %c(was '${p_old}') `, `background: ${p_bg}; color: ${p_color}; border-radius: 5px;`, `background: ${p_bg}; color: ${p_color}; font-style: italic; border-radius: 5px;`);
        } else {
            console.log(`%c⭮ ${p_name} 🠚 '${p_new}' %c(was '${p_old}')`, `color: ${p_color}`, `color: ${p_color}; font-style: italic`);
        }
    },

}