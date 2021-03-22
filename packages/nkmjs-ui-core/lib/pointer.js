'use strict';

const com = require("@nkmjs/common");
const SIGNAL = require("./signal");


/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.SingletonEx
 * @memberof ui.core
 */
class POINTER extends com.helpers.SingletonEx {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Buttons
     */
    static MOUSE_LEFT = 0;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Buttons
     */
    static MOUSE_MIDDLE = 1;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Buttons
     */
    static MOUSE_RIGHT = 2;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Buttons
     */
    static MOUSE_PREV = 3;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Buttons
     */
    static MOUSE_NEXT = 4;


    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static DOWN = 0;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static UP = 1;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static RELEASE = 2;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static RELEASE_TWICE = 3;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static RELEASE_OUTSIDE = 4;

    /**
     * @description TODO
     * @type {number}
     * @customtag read-only
     * @group Button Event
     */
    static MOUSE_WHEEL = 5;

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    static MOUSE_UP = Symbol('mouseUp');

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    static MOUSE_DOWN = Symbol('mouseDown');

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     * @group Button State
     */
    static MOUSE_MOVE = Symbol('mouseMove');

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    static get POINTER() { return this.instance.mouse; }

    /**
     * @description TODO
     * @param {Element} p_el 
     */
    static LocalMouse(p_el) {

        let rect = p_el.getBoundingClientRect(),
            m = this.instance._position,
            x = m.x - rect.left,
            y = m.y - rect.top;

        return {
            x: x,
            y: y,
            normalized: {
                x: x / rect.width,
                y: y / rect.height
            }
        }
    }

    _Init() {

        super._Init();

        this._running = false;
        this._using = new Array(0);
        this._usingDeprecated = new Array(0);
        this._position = { x: 0, y: 0 };
        this._clearUsing = new com.time.DelayedCall(this._Bind(this._ClearUsing));

        this._Bind(this._mExternalDragEnter);
        this._Bind(this._mExternalDragOver);
        this._Bind(this._mExternalDragLeave);
        this._Bind(this._mExternalDrop);

        this._Bind(this._mDown);
        this._Bind(this._mUp);
        this._Bind(this._mMove);

        this._Bind(this._tStart);
        this._Bind(this._tMove);
        this._Bind(this._tEnd);
        this._Bind(this._tCancel);

        this._Bind(this._gStart);
        this._Bind(this._gChange);
        this._Bind(this._gEnd);


        if (this._isBrowser) { this._Start(); }

    }

    _Start() {

        if (this._running) { return; }

        document.addEventListener('mousedown', this._mDown);
        document.addEventListener('mouseup', this._mUp);
        document.addEventListener('mousemove', this._mMove);
        document.addEventListener('touchstart', this._tStart);
        document.addEventListener('gesturestart', this._gStart);

        document.addEventListener('dragenter', this._mExternalDragEnter);

        this._running = true;

    }

    _Stop() {

        if (!this._running) { return; }

        document.removeEventListener('mousedown', this._mDown);
        document.removeEventListener('mouseup', this._mUp);
        document.removeEventListener('mousemove', this._mMove);
        document.removeEventListener('touchstart', this._tStart);
        document.removeEventListener('gesturestart', this._gStart);

        document.removeEventListener('dragenter', this._mExternalDragEnter);

        this._running = false;

    }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get position() { return this._position; }

    StartUsing(p_btns) {

        let dIndex = this._usingDeprecated.indexOf(p_btns);
        if (dIndex != -1) { this._usingDeprecated.splice(dIndex, 1); }

        if (this._using.includes(p_btns)) { return; }
        this._using.push(p_btns);

    }

    StopUsing(p_btns) {

        if (this._usingDeprecated.includes(p_btns)) { return; }
        this._usingDeprecated.push(p_btns);
        this._clearUsing.Schedule();

    }

    _IsUsing(p_btn) {

        if (p_btn === POINTER.MOUSE_LEFT) { return false; }

        for (let i = 0, n = this._using.length; i < n; i++) {
            if (p_btn in this._using[i]) { return true; }
        }
        return false;
    }

    _ClearUsing() {
        for (let i = 0, n = this._usingDeprecated.length; i < n; i++) {
            let btns = this._usingDeprecated[i],
                index = this._using.indexOf(btns);
            if (index != -1) { this._using.splice(index, 1); }
        }
    }

    // ----> Event handling

    /**
     * @access private
     * @param {Event} p_evt 
     */
    _mDown(p_evt) {
        if (this._IsUsing(p_evt.button)) { p_evt.preventDefault(); }
        this._Broadcast(POINTER.MOUSE_DOWN, p_evt);
    }

    /**
     * @access private
     * @param {Event} p_evt 
     */
    _mUp(p_evt) {
        if (this._IsUsing(p_evt.button)) { p_evt.preventDefault(); }
        this._Broadcast(POINTER.MOUSE_UP, p_evt);
    }

    /**
     * @access private
     * @param {Event} p_evt 
     */
    _mMove(p_evt) {
        this._position.x = p_evt.clientX;
        this._position.y = p_evt.clientY;
        this._Broadcast(POINTER.MOUSE_MOVE, p_evt);
    }

    _tStart(p_evt) {
        if (p_evt.cancelable) { p_evt.preventDefault(); }
        document.addEventListener('touchmove', this._tMove);
        document.addEventListener('touchend', this._tEnd);
        document.addEventListener('touchcancel', this._tCancel);
    }

    _tMove(p_evt) {
        //if(p_evt.cancelable){ p_evt.preventDefault(); }
        //console.log(`touch move`,p_evt);
    }

    _tEnd(p_evt) {
        //if(p_evt.cancelable){ p_evt.preventDefault(); }
        this._clearTouchListeners();
    }

    _tCancel(p_evt) {
        //if(p_evt.cancelable){ p_evt.preventDefault(); }
        this._clearTouchListeners();
    }

    _clearTouchListeners() {
        document.removeEventListener('touchmove', this._tMove);
        document.removeEventListener('touchend', this._tEnd);
        document.removeEventListener('touchcancel', this._tCancel);
    }

    // Gesture events

    _gStart(p_evt) {
        if (p_evt.cancelable) { p_evt.preventDefault(); }
        document.addEventListener('gesturechange', this._gChange);
        document.addEventListener('gestureend', this._gEnd);
    }

    _gChange(p_evt) {
        if (p_evt.cancelable) { p_evt.preventDefault(); }
    }

    _gEnd(p_evt) {
        if (p_evt.cancelable) { p_evt.preventDefault(); }
        document.removeEventListener('gesturechange', this._gChange);
        document.removeEventListener('gestureend', this._gEnd);
    }

    // ----> Data drag handling    


    static _dragLength = 0;
    static _dragData = null;
    static _dragDataExternal = null;
    static _dragTarget = null;

    /**
     * @description TODO
     * @type {*}
     * @group Drag and drop
     */
    static get DRAG_DATA() { return this._dragData; }
    static set DRAG_DATA(p_data) { this._dragData = p_data; }

    /**
     * @description TODO
     * @type {*}
     * @group Drag and drop
     */
    static get DRAG_TARGET() { return this._dragTarget; }
    static set DRAG_TARGET(p_target) { this._dragTarget = p_target; }

    /**
     * @description TODO
     * @type {number}
     * @group Drag and drop
     */
    static get dragLength() { return this._dragLength; }
    static set dragLength(p_value) { this._dragLength = p_value; }

    /**
     * @description TODO
     * @param {*} p_data 
     * @param {*} p_target 
     * @group Drag and drop
     */
    static DragStarted(p_data, p_target) {

        let dLength = 0;
        if (p_data) {
            if (Array.isArray(p_data)) {
                dLength = p_data.length;
            }
        }

        this.dragLength = dLength;

        this.DRAG_DATA = p_data;
        this.DRAG_TARGET = p_target;
        this.instance._Broadcast(SIGNAL.DRAG_STARTED, p_data);
    }

    /**
     * @description TODO
     * @group Drag and drop
     */
    static DragEnded() {
        this.instance._Broadcast(SIGNAL.DRAG_ENDED);
        this.DRAG_DATA = null;
        this.DRAG_TARGET = null;
        this.dragLength = 0;
    }


    //

    _mExternalDragEnter(p_evt) {
        if (POINTER.DRAG_DATA) { return; } // Internal drag

        POINTER.DRAG_DATA = p_evt.dataTransfer;
        POINTER.DragStarted(POINTER.DRAG_DATA, null);

        document.addEventListener('dragleave', this._mExternalDragLeave);
        document.addEventListener('dragover', this._mExternalDragOver);
        document.addEventListener('drop', this._mExternalDrop);

    }

    _mExternalDragLeave(p_evt) {
        p_evt.preventDefault(); // Prevent default browser behavior
        this._ClearExternalDragDrop();
    }

    _mExternalDragOver(p_evt) {
        p_evt.preventDefault(); // Prevent default browser behavior
    }

    _mExternalDrop(p_evt) {
        p_evt.preventDefault(); // Prevent default browser behavior
        this._ClearExternalDragDrop();
    }

    _ClearExternalDragDrop() {
        POINTER.DragEnded();
        POINTER.DRAG_DATA = null;
        document.removeEventListener('dragleave', this._mExternalDragLeave);
        document.removeEventListener('dragover', this._mExternalDragOver);
        document.removeEventListener('drop', this._mExternalDrop);
    }

}

module.exports = POINTER;
