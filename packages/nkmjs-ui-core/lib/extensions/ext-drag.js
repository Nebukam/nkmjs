'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const dom = require(`../utils-dom`);
const INPUT = require(`../input`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);
const POINTER = require("../pointer");

const Extension = require("./extension");


let _dragDataContent = [];

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @example //Basic setup 
    // in _Init()

    this._extDrag = this._extensions.Add(ui.extensions.Drag);
    this._extDrag.grabDataCallback = this._Bind(this._GrabDragData);

 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 * 
 */
class DragExtension extends Extension {
    constructor() { super(); }

    // ----> Init

    _Init() {

        super._Init();

        this._isEnabled = true;
        this._target = null;
        this._activator = null;
        this._feedbackHost = null;
        this._grabDataCallback = null;

        this._ownerObserver = new com.signals.Observer();
        this._ownerObserver
            .Hook(SIGNAL.DRAG_STARTED, this._OnOwnerDragStarted, this)
            .Hook(SIGNAL.DRAG_ENDED, this._OnOwnerDragEnded, this);

        this._Bind(this._mUp);
        this._Bind(this._mDown);
        this._Bind(this._mDragStart);
        this._Bind(this._mDrag);
        this._Bind(this._mDragEnd);

        this._hintElement = null;

        //The trick is not to add the draggable attribute until the drag handle gets the mousedown event.
    }

    _OnOwnerChanged(p_oldOwner) {
        super._OnOwnerChanged(p_oldOwner);
        if (this._isEnabled) { this._ownerObserver.ObserveOnly(this._owner); }
        this.target = this._owner;
    }

    /**
     * @description The target object that will be listening to drop events
     * @type {Element}
     */
    get target() { return this._target; }
    set target(p_value) {

        p_value = p_value || this._owner;
        if (this._target === p_value) { return; }

        let oldTarget = this._target;
        this._target = p_value;

        this.activator = this.activator || p_value;
        this.feedbackHost = this.feedbackHost || p_value;

        if (oldTarget) { oldTarget.flags.Remove(oldTarget, FLAGS.DRAGGED); }
        if (p_value) { p_value.flags.Add(p_value, FLAGS.DRAGGED); }

    }

    /**
     * @description Element that will host drag feedback/highlights
     * @type {Element}
     */
    get feedbackHost() { return this._feedbackHost; }
    set feedbackHost(p_value) { this._feedbackHost = p_value || this.target; }

    /**
     * @description Element that activates the drag action
     * @type {Element}
     */
    get activator() { return this._activator; }
    set activator(p_value) {
        if (this._activator === p_value) { return; }
        let oldValue = this._activator;
        this._activator = p_value || this.target;

        if (this._isEnabled) {
            if (oldValue) { oldValue.removeEventListener(`mousedown`, this._mDown); }
            if (this._activator) { this._activator.addEventListener(`mousedown`, this._mDown); }
        }

    }

    /**
     * @description TODO
     * @type {function}
     */
    get grabDataCallback() { return this._grabDataCallback; }
    set grabDataCallback(p_value) { this._grabDataCallback = p_value; }

    _OnOwnerChanged(p_oldOwner) {
        this._ownerObserver.ObserveOnly(this._owner);
        this.target = this._owner;
    }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._activator) { this._activator.addEventListener(`mousedown`, this._mDown); }
        this._ownerObserver.ObserveOnly(this._owner);
        return true;
    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._activator) { this._activator.removeEventListener(`mousedown`, this._mDown); }
        this._ownerObserver.ObserveOnly(null);
        return true;
    }

    //

    _mDown(p_evt) {
        if (!this._isEnabled || p_evt.button !== POINTER.MOUSE_LEFT) { return; }
        this._target.setAttribute(`draggable`, true);
        this._target.addEventListener(`dragstart`, this._mDragStart);
        POINTER.Watch(POINTER.MOUSE_UP, this._mUp);
    }

    _mUp(p_evt) {
        if (!this._isEnabled || p_evt.button !== POINTER.MOUSE_LEFT) { return; }
        POINTER.Unwatch(POINTER.MOUSE_UP, this._mUp);
        this._EndDrag();
    }

    _mDragStart(p_evt) {

        if (this._feedbackHost) {
            //p_evt.dataTransfer.setDragImage(this._feedbackHost);//, -10, -10);
        }

        POINTER.Unwatch(POINTER.MOUSE_UP, this._mUp);

        this._target.addEventListener(`dragend`, this._mDragEnd);
        this._target.addEventListener(`drag`, this._mDrag);

        _dragDataContent.length = 0;
        this._OwnerBroadcast(SIGNAL.DRAG_STARTED);
        POINTER.DragStarted(_dragDataContent, this._target);

        this._ShowHint();

        console.log(`DRAG START! in ${this._owner}`);

    }

    _mDrag(p_evt) {
        //Keep mouse position up-to-date in POINTER
        //mousemove being muted on drag :/
        POINTER.instance._mMove(p_evt);
        this._OwnerBroadcast(SIGNAL.DRAGGED);
    }

    _mDragEnd(p_evt) {
        this._EndDrag();
        this._OwnerBroadcast(SIGNAL.DRAG_ENDED);
        POINTER.DragEnded();
    }

    _GrabData() { return this._grabDataCallback(); }

    _EndDrag() {
        this._target.removeAttribute(`draggable`);
        this._target.removeEventListener(`dragstart`, this._mDragStart);
        this._target.removeEventListener(`dragend`, this._mDragEnd);
        this._target.removeEventListener(`drag`, this._mDrag);
        this._HideHint();
    }

    // ----> Generic event handling

    _OwnerBroadcast(p_evt) {
        this._owner.Broadcast(p_evt, this._owner);
    }

    _OnOwnerDragStarted(p_target) {
        if (!this._isEnabled) { return; }
        _dragDataContent.push(this._GrabData());
        this._target.flags.Set(FLAGS.DRAGGED, true);
    }

    _OnOwnerDragEnded(p_target) {
        if (!this._isEnabled) { return; }
        this._target.flags.Set(FLAGS.DRAGGED, false);
    }

    _ShowHint() {
        if (this._feedbackHost) {
            if (this._hintElement) { dom.Attach(this._hintElement, this._feedbackHost); }
            else { this._hintElement = dom.El(`div`, { class: `ext-overlay drag-overlay` }, this._feedbackHost); }
        }
    }

    _HideHint() {
        if (this._hintElement) { dom.Detach(this._hintElement); }
    }

    // ----> Pooling

    _CleanUp() {
        this._HideHint();
        this._hintElement = null;
        this._EndDrag();
        super._CleanUp();
    }





}

module.exports = DragExtension;