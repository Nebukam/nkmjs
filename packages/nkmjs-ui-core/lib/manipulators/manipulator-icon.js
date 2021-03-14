'use strict';

const u = require("@nkmjs/utils");

const UI_ID = require(`../ui-id`);
const Manipulator = require(`./manipulator`);

const __id_i = `data-icon`;
const __id_v = `data-variant`;
const __id_f = `data-flavor`;

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.BaseManipulator
 * @memberof ui.core.manipulators
 */
class IconManipulator extends Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    get content() { return this._element ? this._element.icon : null; }
    get flavor() { return this._element ? this._element.icon : null; }
    get variant() { return this._element ? this._element.icon : null; }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @param {*} p_value 
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_value = null, p_flavor = null, p_variant = null) {

        // Icon

        if(u.tils.isString(p_value)){
            p_value = p_value.trim();
            if(p_value === ``){ p_value = null; }
        }

        if (u.tils.isObject(p_value)) {
            if (UI_ID.ICON in p_value) { p_flavor = p_value[UI_ID.ICON]; }
            else if (UI_ID.IMG in p_value) { p_value = p_value[UI_ID.IMG]; }
            else { p_value = null; }
        }

        if (p_value) { this._element.setAttribute(__id_i, p_value); }
        else { this._element.removeAttribute(__id_i); }

        // Flavor

        if (u.tils.isObject(p_flavor)) {
            if (UI_ID.FLAVOR in p_flavor) { p_flavor = p_flavor[UI_ID.FLAVOR]; }
            else { p_flavor = null; }
        }

        if (p_flavor) { this._element.setAttribute(__id_f, p_flavor); }
        else { this._element.removeAttribute(__id_f); }

        // Variant

        if (u.tils.isObject(p_variant)) {
            if (UI_ID.VARIANT in p_variant) { p_variant = p_variant[UI_ID.VARIANT]; }
            else { p_variant = null; }
        }

        if (p_variant) { this._element.setAttribute(__id_v, p_variant); }
        else { this._element.removeAttribute(__id_v); }

        return this._Toggle(p_value === null ? false : true);
    }

}

module.exports = IconManipulator;