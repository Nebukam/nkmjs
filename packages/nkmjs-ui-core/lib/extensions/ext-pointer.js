'use strict';

const u = require(`@nkmjs/utils`);

const UI = require(`../ui`);
const POINTER = require(`../pointer`);
const SIGNAL = require(`../signal`);

const Extension = require(`./extension`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 */
class PointerExtension extends Extension {

    /**
     * 
     * @param {*} p_element 
     */
    constructor(p_element = null) {
        super();

        this._element = p_element;
        this._hooks = {};
        this._using = {};
        this._buttons = {};
        this._position = { x: 0, y: 0, dx: 0, dy: 0, tdx: 0, tdy: 0 };

        this._isMouseOver = false;
        this._isAnyBtnDown = false;

        this._Bind(this._mOver);
        this._Bind(this._mOut);
        this._Bind(this._mDown);
        this._Bind(this._mUp);
        this._Bind(this._mUpOutside);
        this._Bind(this._mWheel);
        this._Bind(this._mMove);

        this._focusFn = null;
        this._moveFn = null;

        this._triggerMask = {};

        /*

            p_evt.button 

            0 = Left click
            1 = Middle click
            2 = Right click
            3 = Prev click (ish)
            4 = Next click (ish)

        */

    }

    /**
     * If flagged as  true, will always dispatch RELEASE event, no matter the event detail count
     * @param {*} p_id 
     * @param {*} p_value 
     */
    SetTriggerMask(p_id, p_value = false) {
        if (!p_value) { delete this._triggerMask[p_id]; }
        else { this._triggerMask[p_id] = true; }
        return this;
    }

    /**
     * @description TODO
     * @type {function}
     * @customtag write-only
     */
    set wheelFn(p_value) { this._wheelFn = p_value; }

    /**
     * @description TODO
     * @type {function}
     * @customtag write-only
     */
    set focusFn(p_value) { this._focusFn = p_value; }

    //

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
        if (this._element) {
            this._element.addEventListener(`mouseenter`, this._mOver);
            this.Ping();
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
            this._mOut(null);
        }
        return true;
    }

    Ping() {
        if (!this._isEnabled || this._isMouseOver || !this._element) { return; }
        if (this._element.matches(':hover')) { this._mOver(null); }
    }

    // ----> Internal Events

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get isMouseOver() { return this._isMouseOver; }

    /**
     * @description TODO
     * @param {number} p_btn 
     */
    isMouseDown(p_btn = null) {
        if (p_btn === null) {
            for (var btn in this._buttons) { if (this._buttons[btn] === POINTER.KEYS.DOWN) { return true; } }
            return false;
        }
        return p_btn in this._buttons && this._buttons[p_btn] === POINTER.KEYS.DOWN;
    }

    _mOver(p_evt) {

        if (this._isMouseOver) { return; }

        this._isMouseOver = true;

        this._element.addEventListener(`mousedown`, this._mDown);
        this._element.addEventListener(`mouseup`, this._mUp);
        this._element.addEventListener(`mouseleave`, this._mOut);

        if (this._isAnyBtnDown) { POINTER.Unwatch(SIGNAL.MOUSE_UP, this._mUpOutside); }
        if (this._focusFn) { this._focusFn(true); }

        if (this._wheelFn) { this._element.addEventListener('wheel', this._mWheel); }
        if (this._moveFn) { this._element.addEventListener('mousemove', this._mMove); }

    }

    _mOut(p_evt) {

        if (!this._isMouseOver) { return; }

        this._isMouseOver = false;

        this._element.removeEventListener(`mousedown`, this._mDown);
        this._element.removeEventListener(`mouseup`, this._mUp);
        this._element.removeEventListener(`mouseleave`, this._mOut);

        if (this._isAnyBtnDown) { POINTER.Watch(SIGNAL.MOUSE_UP, this._mUpOutside); }
        else if (this._focusFn) { this._focusFn(false); }

        if (this._wheelFn) { this._element.removeEventListener('wheel', this._mWheel); }
        if (this._moveFn) { this._element.removeEventListener('mousemove', this._mMove); }

    }

    _mDown(p_evt) {

        POINTER.StartUsing(this._using);

        this._position.x = p_evt.clientX;
        this._position.y = p_evt.clientY;

        this._isAnyBtnDown = true;

        // Check if any middle event is registered

        let eNum = p_evt.button;

        this._buttons[eNum] = POINTER.KEYS.DOWN;
        this._Trigger(`${eNum}_${POINTER.KEYS.DOWN}`);

        POINTER.Watch(SIGNAL.DRAG_ENDED, this._mUpOutside);

    }

    _mUp(p_evt) {

        let eNum = p_evt.button;

        if (this._buttons[eNum] === POINTER.KEYS.DOWN) {
            this._buttons[eNum] = POINTER.KEYS.UP;
            this._Trigger(`${eNum}_${POINTER.KEYS.UP}`);
            let mdl = p_evt.detail % 2;
            if (mdl || this._triggerMask[eNum]) { this._Trigger(`${eNum}_${POINTER.KEYS.RELEASE}`); }
            if (!mdl) { this._Trigger(`${eNum}_${POINTER.KEYS.RELEASE_TWICE}`); }
        } else {
            this._buttons[eNum] = POINTER.KEYS.UP;
            this._Trigger(`${eNum}_${POINTER.KEYS.UP}`);
        }

        delete this._buttons[eNum];

        this._isAnyBtnDown = this.isMouseDown();
        if (!this._isAnyBtnDown) {
            UI.Unwatch(SIGNAL.DRAG_ENDED, this._mUpOutside);
            POINTER.StopUsing(this._using);
        }

    }

    _mUpOutside(p_evt) {

        if (p_evt) {
            let eNum = p_evt.button;
            if (this._buttons[eNum] === POINTER.KEYS.DOWN) {
                this._Trigger(`${eNum}_${POINTER.KEYS.RELEASE_OUTSIDE}`);
            }
            delete this._buttons[eNum];
        } else {
            // INPUT.DRAG_END does not have a button
            for (var key in this._buttons) {
                this._Trigger(`${this._buttons[key]}_${POINTER.KEYS.RELEASE_OUTSIDE}`);
            }
            this._buttons = {};
        }

        this._isAnyBtnDown = this.isMouseDown();
        if (!this._isAnyBtnDown) {
            if (this._focusFn) { this._focusFn(false); }
            POINTER.Unwatch(SIGNAL.MOUSE_UP, this._mUpOutside);
            POINTER.Unwatch(SIGNAL.DRAG_ENDED, this._mUpOutside);
            POINTER.StopUsing(this._using);
        }

    }

    _mWheel(p_evt) {
        if (this._wheelFn) {
            let consumed = this._wheelFn(p_evt);
            if (consumed) { p_evt.preventDefault(); }
        }
    }

    _mMove(p_evt) {
        if (this._moveFn) {
            let
                tdx = p_evt.clientX - this._position.x,
                tdy = p_evt.clientY - this._position.y,
                dx = tdx - this._position.tdx,
                dy = tdy - this._position.tdy;

            this._position.dx = dx;
            this._position.dy = dy;
            this._position.tdx = tdx;
            this._position.tdy = tdy;

            let consumed = this._moveFn(p_evt, this._position);
            if (consumed) { p_evt.preventDefault(); }
        }
    }

    // ----> Event hooks

    /**
     * @description TODO
     * @param {number} p_button 
     * @param {number} p_state 
     * @param {function} p_fn 
     * @group Hooks
     */
    Hook(p_button, p_state, p_fn) {

        let id = `${p_button}_${p_state}`,
            fnList = this._hooks[id];

        if (!this._using[p_button]) { this._using[p_button] = 1; }
        else { this._using[p_button]++; }

        if (!fnList) { fnList = this._hooks[id] = []; }
        else { fnList = this._hooks[id]; }

        if (fnList.includes(p_fn)) { return this; }
        fnList.push(p_fn);

        return this;
    }

    /**
     * @description TODO
     * @param {number} p_button 
     * @param {number} p_state 
     * @param {function} p_fn  
     * @group Hooks
     */
    Unhook(p_button, p_state, p_fn) {

        let id = `${p_button}_${p_state}`,
            fnList = this._hooks[id];
        if (!fnList) { return this; }

        if (this._using[p_button]) {
            this._using[p_button]--;
            if (this._using[p_button] <= 0) {
                delete this._using[p_button];
            }
        }

        let index = fnList.indexOf(p_fn);
        if (index === -1) { return this; }
        fnList.splice(index, 1);

        return this;

    }

    _Trigger(p_id, p_evt) {

        if (!this._isEnabled) { return; }
        let fnList = this._hooks[p_id];
        if (!fnList) { return; }
        for (let i = 0, n = fnList.length; i < n; i++) {
            fnList[i](p_evt);
        }

    }

    CleanUp() {
        super.CleanUp();
        if (this._isMouseOver) { this._mOut(null); }
        this._buttons = {}; // Garbage, but more efficient than loop-delete...
    }

}

module.exports = PointerExtension;