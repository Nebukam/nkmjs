'use strict';

const Extension = require("./extension");

 /**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 */
class PointerMoveExtension extends Extension {

    /**
     * 
     * @param {*} p_element 
     */
    constructor(p_element = null) {
        super();

        this._element = p_element;

        this._isMouseOver = false;

        this._Bind(this._mOver);
        this._Bind(this._mOut);
        this._Bind(this._mMove);

        this._moveFn = null;

        this._startPos = null;
        this._currentPos = null;
        this._currentOffset = null;

    }

    /**
     * @description TODO
     * @type {Element}
     */
    get element() { return this._element; }
    set element(p_value) {
        if (this._element === p_value) { return; }

        let oldElement = this._element;
        this._element = p_value;

        if (this._isEnabled) {
            if (oldElement) { oldElement.removeEventListener(`mouseenter`, this._mOver); }
            if (this._element) { this._element.addEventListener(`mouseenter`, this._mOver); }
        }

    }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._element) { this._element.addEventListener(`mouseenter`, this._mOver); }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._element) { this._element.removeEventListener(`mouseenter`, this._mOver); }
        return true;
    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isMouseOver() { return this._isMouseOver; }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get startPos() { return this._startPos; }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get currentPos() { return this._currentPos; }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get currentOffset() { return this._currentOffset; }

    /**
     * @description Pin current position as start
     */
    PinStart() {
        this._startPos.x = this._currentPos.x;
        this._startPos.y = this._currentPos.y;
    }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get distanceToStart() {
        let a = this._startPos.x - this._currentPos.x;
        let b = this._startPos.y - this._currentPos.y;
        return Math.sqrt(a * a + b * b);
    }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     */
    get distanceOffset() {
        
        let a = this._currentOffset.x;
        let b = this._currentOffset.y;

        return Math.sqrt(a * a + b * b);

    }

    /**
     * @description TODO
     * @type {function}
     * @customtag write-only
     */
    set moveFn(p_value) { this._moveFn = p_value; }

    _mOver(p_evt) {

        if (this._isMouseOver) { return; }

        this._isMouseOver = true;

        this._startPos = { x: p_evt.clientX, y: p_evt.clientY };
        this._currentPos = { x: p_evt.clientX, y: p_evt.clientY };
        this._currentOffset = { x: 0, y: 0 };

        this._element.addEventListener(`mousemove`, this._mMove);

    }

    _mOut(p_evt) {

        if (!this._isMouseOver) { return; }

        this._isMouseOver = false;
        this._element.removeEventListener(`mousemove`, this._mMove);

    }

    _mMove(p_evt) {

        this._currentOffset.x = this._currentPos.x - p_evt.clientX;
        this._currentOffset.y = this._currentPos.y - p_evt.clientY;

        this._currentPos.x = p_evt.clientX;
        this._currentPos.y = p_evt.clientY;

        if (this._moveFn) { this._moveFn(this); }

    }


}

module.exports = PointerMoveExtension;