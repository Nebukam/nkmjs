'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const FLAGS = require(`../flags`);
const FlagEnum = require("../helpers/flag-enum");
const UI = require("../ui");

/**
 * @description An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 * @class
 * @memberof ui.core.manipulators
 */
class Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {

        this._element = p_element;
        this._content = null;
        this._autoHide = p_autoHide;
        this._isVisible = true;

        if (p_sizeControl) {
            this._sizeFlags = new FlagEnum(FLAGS.sizes, true);
        } else { this._sizeFlags = null; }

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isVisible() { return this._isVisible; }

    /**
     * @description TODO
     * @type {Element}
     */
    get element() { return this._element; }
    set element(p_value) {
        if (this._element === p_value) { return; }

        let oldFlag = null;

        if (this._sizeFlags) {
            let oldElement = this._element;
            oldFlag = this._sizeFlags._currentFlag
            this._sizeFlags.Set(null);
            if (oldElement) { this._sizeFlags.Remove(oldElement); }
        }

        this._element = p_value;

        if (this._sizeFlags) {
            if (this._element) { this._sizeFlags.Add(this._element); }
            this._sizeFlags.Set(oldFlag);
        }

    }

    /**
     * @description TODO
     * @type {number}
     */
    get order() { return this._element.style.order; }
    set order(p_value) { this._element.style.order = p_value; }

    /**
     * @description TODO
     * @type {*}
     * @customflag read-only
     */
    get content() { return this._content; }

    /**
     * @description TODO
     * @type {ui.core.helpers.FlagEnum}
     * @customflag read-only
     */
    get size() { return this._sizeFlags; }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_value) {

        let result = this._Update(this._element, p_value);

        let oldContent = this._content;
        if (oldContent && u.isInstanceOf(oldContent, com.pool.DisposableObjectEx)) {
            oldContent
                .Unwatch(com.SIGNAL.UPDATED, this._OnContentUpdate, this)
                .Unwatch(com.SIGNAL.RENAMED, this._OnContentUpdate, this)
                .Unwatch(com.SIGNAL.RELEASED, this._OnContentReleased, this);
        }
        if (p_value && u.isInstanceOf(this._content, com.pool.DisposableObjectEx)) {
            this._content = p_value;
            this._content
                .Watch(com.SIGNAL.UPDATED, this._OnContentUpdate, this)
                .Watch(com.SIGNAL.RENAMED, this._OnContentUpdate, this)
                .Watch(com.SIGNAL.RELEASED, this._OnContentReleased, this);
        } else {
            this._content = null;
        }

        return this._Toggle(result);
    }

    _Update(p_element, p_value) {
        return true;
    }

    _OnContentUpdate() {
        this._Toggle(this._Update(this._element, this._content));
    }

    _Toggle(p_toggle) {

        if (this._isVisible != p_toggle && this._autoHide) {
            this._isVisible = p_toggle;
            if (!p_toggle) { this._element.style.setProperty(`display`, `none`); }
            else { this._element.style.removeProperty(`display`); }
        }

        return p_toggle;

    }

    _OnContentReleased(p_content) { this.content = null; }

}

module.exports = Manipulator;