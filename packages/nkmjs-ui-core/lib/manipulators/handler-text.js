'use strict';

const data = require("@nkmjs/data-core");
const u = require("@nkmjs/utils");

const FLAGS = require(`../flags`);
const dom = require(`../utils-dom`);

const ContentManipulator = require("./manipulator-content");

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.ContentManipulator
 * @memberof ui.core.manipulators
 */
class TextHandler extends ContentManipulator {

    /**
     * @description TODO
     * @param {*} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    get content() {
        return this._element ? this._element.innerHTML : null;
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set uppercase(p_value) { dom.CSS(this._element, 'text-transform', p_value ? `uppercase` : null); }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set ellipsis(p_value) { dom.CSSClass(this._element, 'ellispsis', p_value); }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set selectable(p_value) { dom.CSS(this._element, 'user-select', p_value ? `text` : null); }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set bold(p_value) { dom.CSS(this._element, 'font-weight', p_value ? `bolder` : null); }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set italic(p_value) { dom.CSS(this._element, 'font-style', p_value ? `italic` : null); }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set color(p_value) { dom.CSS(this._element, 'color', p_value ? p_value : null); }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set textSize(p_value) {
        if (FLAGS.sizes.includes(p_value)) { p_value = `var(--font-${p_value})`; }
        dom.CSS(this._element, 'font-size', p_value);
    }

    /**
     * @access private
     * @param {*} p_element 
     * @param {string} p_value 
     */
    _Apply(p_element, p_value, p_direct = false) {


        if (u.isVoid(p_value)) {
            p_element.innerHTML = ``;
            return false;
        }

        if (u.isInstanceOf(p_value, data.DataBlock)) {
            if (p_value.id) {
                if (!p_direct) { p_element.innerHTML = p_value.id.name; }
                else { p_element.textContent = p_value.id.name; }
                return true;
            }
        }

        let text = ``;

        if (u.isString(p_value)) { text = p_value; }
        else if (`label` in p_value) { text = p_value.label; }
        else if (`name` in p_value) { text = p_value.name; }
        else if (`title` in p_value) { text = p_value.title }

        if (text === ``) { return false; }

        if (!p_direct) { p_element.innerHTML = text; }
        else { p_element.textContent = text; }
        return true;

    }

}

module.exports = TextHandler;