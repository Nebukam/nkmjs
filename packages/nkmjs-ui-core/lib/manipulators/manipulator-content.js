'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const dom = require(`../utils-dom`);
const FLAGS = require(`../flags`);
const IDS = require(`../ids`);
const FlagEnum = require("../helpers/flag-enum");
const Manipulator = require("./manipulator");

/**
 * @description An BaseManipulator is an abstract control wrapper to manipulate a DOM element.
 * It circumvents the need for a fully-fledged display object to avoid bloating the DOM.
 * @class
 * @augments ui.core.manipulators.Manipulator
 * @memberof ui.core.manipulators
 */
class ContentManipulator extends Manipulator {

    /**
     * @description TODO
     * @param {Element} p_element 
     * @param {boolean} p_autoHide 
     */
    constructor(p_element = null, p_autoHide = true, p_sizeControl = false) {
        super(p_element, p_autoHide, p_sizeControl);
    }

    _Init(p_autoHide = true, p_sizeControl = false) {
        this._content = null;
        this._autoHide = p_autoHide;
        this._isVisible = true;

        if (p_sizeControl) { FlagEnum.Attach(this, IDS.SIZE, FLAGS.sizes); }
    }

    /**
     * @description TODO
     * @type {string}
     * @customtag write-only
     */
    set opacity(p_value) { dom.CSS(this._element, 'opacity', p_value != null ? `${p_value}` : p_value); }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isVisible() { return this._isVisible; }

    _OnElementChanged(p_oldElement) {

        if (this._size) {
            if (p_oldElement) {
                this.size = null;
                this._size.Remove(p_oldElement);
                let oldFlag = this.size;

                if (this._element) { this._size.Add(this._element); }
                this.size = oldFlag;

            } else if (this._element) {
                this._size.Add(this._element);
            }
        }

    }

    /**
     * @description TODO
     * @type {*}
     * @customflag read-only
     */
    get content() { return this._content; }

    /**
     * @description Set the content of the manipulated element.
     * @param {*} p_value 
     * @returns {boolean} True if the content is valid & visible, otherwise false.
     */
    Set(p_value, p_direct = false) {

        let result = this._Apply(this._element, p_value, p_direct);

        let oldContent = this._content;
        if (oldContent && u.isInstanceOf(oldContent, com.Observable)) {
            oldContent
                .Unwatch(com.SIGNAL.UPDATED, this._OnContentUpdate, this)
                .Unwatch(com.SIGNAL.RENAMED, this._OnContentUpdate, this)
                .Unwatch(com.SIGNAL.RELEASED, this._OnContentReleased, this);
        }
        if (p_value && u.isInstanceOf(this._content, com.Observable)) {
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

    TryReplace(p_value, p_direct = false) {

        let oldContent = this.content,
            result = this._Apply(this._element, p_value, p_direct);

        if (!result) {
            this._Apply(this._element, oldContent, p_direct);
            return false;
        }
        else {
            this._Toggle(result);
            return true;
        }

    }

    _OnContentUpdate() {
        this._Toggle(this._Apply(this._element, this._content));
    }

    _Toggle(p_toggle) {

        if (this._isVisible != p_toggle && this._autoHide) {
            this._isVisible = p_toggle;
            dom.CSS(this._element, `display`, p_toggle ? null : `none`);
        }

        return p_toggle;

    }

    _OnContentReleased(p_content) { this._content = null; }

}

module.exports = ContentManipulator;