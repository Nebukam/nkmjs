'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const dom = require(`../utils-dom`);

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
        dom.CSSClass(p_element, `icon-element`);
    }

    get content() { return this._element ? this._element.getAttribute(__id_i) : null; }
    get flavor() { return this._element ? this._element.icon : null; }
    get variant() { return this._element ? this._element.icon : null; }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @param {*} p_value 
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_value = null, p_direct = false, p_flavor = null, p_variant = null) {

        let result = super.Set(p_value, p_direct)

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

        return result;

    }

    /**
     * @access private
     * @param {*} p_element 
     * @param {string} p_value 
     */
    _Apply(p_element, p_value, p_direct = false) {

        if (u.isString(p_value)) {
            p_value = p_value.trim();
            if (p_value === ``) { p_value = null; }
        } else if (u.isInstanceOf(p_value, data.DataBlock)) {
            let nfos = com.NFOS.Get(p_value);
            if (nfos) { p_value = nfos[IDS.ICON]; }
            else { p_value = null; }
        } else if (u.isObject(p_value)) {
            p_value = p_value[IDS.ICON] || null;
        }

        if (!u.isVoid(p_value)) {
            this._element.setAttribute(__id_i, p_value);
            return true;
        } else {
            this._element.removeAttribute(__id_i);
            return false;
        }

    }

}

module.exports = IconHandler;