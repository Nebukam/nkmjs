'use strict';

const u = require(`@nkmjs/utils`);

const UI = require(`../ui`);
const POINTER = require(`../pointer`);
const SIGNAL = require(`../signal`);

const PointerExtension = require("./ext-pointer");

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 */
class PointerStaticExtension extends PointerExtension {

    /**
     * 
     * @param {*} p_element 
     */
    constructor(p_element = null) { super(p_element); }

    set element(p_value) {

        if (this._element === p_value) { return; }

        let oldElement = this._element;
        this._element = p_value;

        if (this._isEnabled) {
            if (oldElement) {
                oldElement.removeEventListener(`mouseenter`, this._mOver);
                oldElement.removeEventListener(`mousedown`, this._mDown);
                oldElement.removeEventListener(`mouseup`, this._mUp);
                if(this._moveFn){ this._element.addEventListener('move', this._mMove); }
                if (this._wheelFn) { oldElement.removeEventListener('wheel', this._mWheel); }
            }
            if (this._element) {
                this._element.addEventListener(`mouseenter`, this._mOver);
                this._element.addEventListener(`mousedown`, this._mDown);
                this._element.addEventListener(`mouseup`, this._mUp);
                if(this._moveFn){ this._element.removeEventListener('move', this._mMove); }
                if (this._wheelFn) { this._element.addEventListener('wheel', this._mWheel); }
            }
        }

    }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._element) {
            this._element.addEventListener(`mouseenter`, this._mOver);
            this._element.addEventListener(`mousedown`, this._mDown);
            this._element.addEventListener(`mouseup`, this._mUp);
            if(this._moveFn){ this._element.addEventListener('move', this._mMove); }
            if (this._wheelFn) { this._element.addEventListener('wheel', this._mWheel); }
        }
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._element) {
            this._element.removeEventListener(`mouseenter`, this._mOver);
            this._element.removeEventListener(`mousedown`, this._mDown);
            this._element.removeEventListener(`mouseup`, this._mUp);
            if(this._moveFn){ this._element.removeEventListener('move', this._mMove); }
            if (this._wheelFn) { this._element.removeEventListener('wheel', this._mWheel); }
        }
        return true;
    }

    // ----> Internal Events

    _mOver(p_evt) {

        if (this._isMouseOver) { return; }

        this._isMouseOver = true;

        this._element.addEventListener(`mouseleave`, this._mOut);

        if (this._isAnyBtnDown) { POINTER.Unwatch(SIGNAL.MOUSE_UP, this._mUpOutside); }
        if (this._focusFn) { this._focusFn(true); }



    }

    _mOut(p_evt) {

        if (!this._isMouseOver) { return; }

        this._isMouseOver = false;

        this._element.removeEventListener(`mouseleave`, this._mOut);

        if (this._isAnyBtnDown) { POINTER.Watch(SIGNAL.MOUSE_UP, this._mUpOutside); }
        else if (this._focusFn) { this._focusFn(false); }



    }

}

module.exports = PointerStaticExtension;