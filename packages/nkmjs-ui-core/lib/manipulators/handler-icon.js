'use strict';

const u = require("@nkmjs/utils");

const IDS = require(`../ids`);
const ContentManipulator = require(`./manipulator-content`);

const __id_i = `data-icon`;
const __id_v = `data-variant`;
const __id_f = `data-flavor`;

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ContentManipulator
 * @memberof ui.core.manipulators
 */
class IconHandler extends ContentManipulator {

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

        if(u.isString(p_value)){
            p_value = p_value.trim();
            if(p_value === ``){ p_value = null; }
        }

        if (u.isObject(p_value)) {
            if (IDS.ICON in p_value) { p_flavor = p_value[IDS.ICON]; }
            else if (IDS.IMG in p_value) { p_value = p_value[IDS.IMG]; }
            else { p_value = null; }
        }

        if (p_value) { this._element.setAttribute(__id_i, p_value); }
        else { this._element.removeAttribute(__id_i); }

        // Flavor

        if (u.isObject(p_flavor)) {
            if (IDS.FLAVOR in p_flavor) { p_flavor = p_flavor[IDS.FLAVOR]; }
            else { p_flavor = null; }
        }

        if (p_flavor) { this._element.setAttribute(__id_f, p_flavor); }
        else { this._element.removeAttribute(__id_f); }

        // Variant

        if (u.isObject(p_variant)) {
            if (IDS.VARIANT in p_variant) { p_variant = p_variant[IDS.VARIANT]; }
            else { p_variant = null; }
        }

        if (p_variant) { this._element.setAttribute(__id_v, p_variant); }
        else { this._element.removeAttribute(__id_v); }

        return this._Toggle(p_value === null ? false : true);
        
    }

}

module.exports = IconHandler;