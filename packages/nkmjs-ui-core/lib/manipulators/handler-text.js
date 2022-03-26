'use strict';

const data = require("@nkmjs/data-core");
const u = require("@nkmjs/utils");

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
    set uppercase(p_value) {
        if (p_value) { this._element.style.setProperty('text-transform', `uppercase`); }
        else { this._element.style.removeProperty('text-transform'); }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set ellipsis(p_value) {
        if (p_value) {
            this._element.classList.add('ellispsis');
        } else {
            this._element.classList.remove('ellispsis');
        }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set selectable(p_value) {
        if (p_value) { this._element.style.setProperty('user-select', `text`); }
        else { this._element.style.removeProperty('user-select'); }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set bold(p_value) {
        if (p_value) { this._element.style.setProperty('font-weight', `bolder`); }
        else { this._element.style.removeProperty('font-weight'); }
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag write-only
     */
    set italic(p_value) {
        if (p_value) { this._element.style.setProperty('font-style', `italic`); }
        else { this._element.style.removeProperty('font-style'); }
    }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set color(p_value) {
        if (p_value) { this._element.style.setProperty('color', p_value); }
        else { this._element.style.removeProperty('color'); }
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