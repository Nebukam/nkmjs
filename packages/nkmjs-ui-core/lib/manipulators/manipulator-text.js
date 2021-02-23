'use strict';

const { U } = require(`@nkmjs/utils`);
const HSLA = require("@nkmjs/style/lib/colors/hsla");
const RGBA = require("@nkmjs/style/lib/colors/rgba");
const BaseManipulator = require("./manipulator-base");

/**
 * @description TODO
 * @class
 * @augments ui.core.manipulators.BaseManipulator
 * @memberof ui.core.manipulators
 */
class TextManipulator extends BaseManipulator {

    /**
     * @description TODO
     * @param {*} p_element 
     * @param {boolean} p_autoHide 
     * @param {boolean} p_sizeControl 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) { 
        super(p_element, p_autoHide, p_sizeControl); }

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
            this._element.style.setProperty('white-space', `nowrap`);
            this._element.style.setProperty('overflow', `hidden`);
            this._element.style.setProperty('text-overflow', `ellipsis`);
        } else {
            this._element.style.removeProperty('white-space');
            this._element.style.removeProperty('overflow');
            this._element.style.removeProperty('text-overflow');
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
    _Update(p_element, p_value) {

        if (U.isVoid(p_value)) {
            p_element.innerHTML = ``;
            return false;
        } else {

            let text = ``;

            if (U.isString(p_value)) { text = p_value; }
            else if (`name` in p_value) { text = p_value.name; }
            else if (`title` in p_value) { text = p_value.title }
            else if (`objectURL` in p_value) { text = p_value.objectURL; }

            if (text === ``) { return false; }

            p_element.innerHTML = text;
            return true;

        }

    }

}

module.exports = TextManipulator;