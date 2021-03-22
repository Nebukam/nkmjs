'use strict';

const u = require("@nkmjs/utils");

const POINTER = require(`../pointer`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);

const Extension = require("./extension");

let _activeTarget = null;

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments ui.core.extensions.Extension
 * @memberof ui.core.extensions
 */
class DropExtension extends Extension {
    constructor() { super(); }

    // ----> Init

    /**
     * @description TODO
     * @type {ui.core.extensions.ExtDrop}
     */
    static get ACTIVE_TARGET() { return _activeTarget; }
    static set ACTIVE_TARGET(p_value) {
        let oldTarget = _activeTarget;
        _activeTarget = p_value;
        if (oldTarget) { oldTarget._Activate(false); }
        if (_activeTarget) { _activeTarget._Activate(true); }
    }

    _Init() {

        super._Init();
        this._target = null;
        this._feedbackHost = null;

        //TODO : Gotta emulate dragenter/leave
        //in order to neatly handle nested drop handlers

        this._hooks = new Array(0);

        this._candidatesHooks = new Array(0);
        this._allowedHooks = new Array(0);
        this._onDragOverHooks = new Array(0);
        this._onLeaveHooks = new Array(0);

        this._isAcceptingCurrentData = false;
        this._isActive = false;
        this._acceptExternalDrops = false;
        this._draggingOver = false;

        this._Bind(this._OnPointerDragStarted);
        this._Bind(this._OnPointerDragEnded);
        this._Bind(this._mDragEnter);
        this._Bind(this._mDragLeave);
        this._Bind(this._mDragOver);
        this._Bind(this._mDrop);

        this._hintElement = null;

        //TODO : Add event callbacks to handle differently different types of drop
        //check if a drop is acceptable etc
    }

    /**
     * @description TODO
     * @type {Element}
     */
    get target() { return this._target; }
    set target(p_value) {
        if (this._target === p_value) { return; }
        let oldValue = this._target;
        this._target = p_value;

        if (this._isEnabled) {
            if (oldValue) { oldValue.removeEventListener(`dragenter`, this._mDragEnter); }
            if (p_value) { p_value.addEventListener(`dragenter`, this._mDragEnter); }
        }

    }

    get acceptExternalDrops(){ return this._acceptExternalDrops; }
    set acceptExternalDrops(p_value){
        if(this._acceptExternalDrops == p_value){ return; }
        this._acceptExternalDrops = p_value;
        if(this._isEnabled){
            if(p_value){ POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
            else{ POINTER.Unwatch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        }
    }

    /**
     * @description TODO
     * @param {*} p_target 
     * @param {*} [p_feedback] 
     */
    Setup(p_target, p_feedback = null) {

        let oldTarget = this._target;
        this.target = p_target;

        this._feedbackHost = p_feedback ? p_feedback : p_target;

        if (oldTarget) { oldTarget.flags.Remove(oldTarget, FLAGS.ALLOW_DROP); }
        if (p_target) { p_target.flags.Add(p_target, FLAGS.ALLOW_DROP); }

    }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._target) { this._target.addEventListener(`dragenter`, this._mDragEnter); }
        if (this._acceptExternalDrops) { POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        return true;

    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._target) { this._target.removeEventListener(`dragenter`, this._mDragEnter); }
        if (this._acceptExternalDrops) { POINTER.Unwatch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        return true;
    }

    _OnPointerDragStarted(dragData) {

        this._candidatesHooks.length = 0;

        let dragLength = POINTER.dragLength;

        // Look for 'candidate' hooks with a 'check' hook
        outerloop:
        for (let i = 0, n = this._hooks.length; i < n; i++) {

            let hook = this._hooks[i],
                pass = false;

            if (hook.check && hook.candidate) {
                if (dragLength > 0) {

                    innerloop:
                    for (let d = 0, n2 = dragData.length; d < n2; d++) {

                        let dataItem = dragData[d];

                        if (hook.check.thisArg) { pass = hook.check.fn.call(hook.check.thisArg, dataItem); }
                        else { pass = hook.check.fn(dataItem); }

                        if (pass) { break innerloop; }
                    }

                } else {

                    if (hook.check.thisArg) { pass = hook.check.fn.call(hook.check.thisArg, dragData); }
                    else { pass = hook.check.fn(dragData); }

                }
            }

            if (pass) {
                this._candidatesHooks.push(hook);
            }

        }

        if (this._candidatesHooks.length > 0) {

            POINTER.Watch(SIGNAL.DRAG_ENDED, this._OnPointerDragEnded);

            for (let i = 0, n = this._candidatesHooks.length; i < n; i++) {
                let candidate = this._candidatesHooks[i].candidate;
                if (candidate.fn) { candidate.fn(true); }
                if (candidate.flag) { this._target.flags.Set(candidate.flag, true); }
            }
        }

    }

    _OnPointerDragEnded() {

        POINTER.Unwatch(SIGNAL.DRAG_ENDED, this._OnPointerDragEnded);

        for (let i = 0, n = this._candidatesHooks.length; i < n; i++) {
            let candidate = this._candidatesHooks[i].candidate;
            if (candidate.fn) { candidate.fn(false); }
            if (candidate.flag) { this._target.flags.Set(candidate.flag, false); }
        }

    }

    _mDragEnter(p_evt) {

        this._allowedHooks.length = 0;
        this._onDragOverHooks.length = 0;
        this._onLeaveHooks.length = 0;

        let dragData = POINTER.DRAG_DATA,
            dragLength = POINTER.dragLength;

        outerloop:
        for (let i = 0, n = this._hooks.length; i < n; i++) {

            let hook = this._hooks[i],
                pass = false;

            if (hook.check) {

                if (dragLength > 0) {

                    innerloop:
                    for (let d = 0, n2 = dragData.length; d < n2; d++) {

                        let dataItem = dragData[d];

                        if (hook.check.thisArg) { pass = hook.check.fn.call(hook.check.thisArg, dataItem); }
                        else { pass = hook.check.fn(dataItem); }

                        if (pass) { break innerloop; }
                    }

                } else {

                    if (hook.check.thisArg) { pass = hook.check.fn.call(hook.check.thisArg, dragData); }
                    else { pass = hook.check.fn(dragData); }

                }

            } else {
                pass = true;
            }

            if (pass) {
                this._allowedHooks.push(hook);
                if (hook.drag) { this._onDragOverHooks.push(hook.drag); }
                if (hook.leave) { this._onLeaveHooks.push(hook.leave); }
            }

        }

        if (this._allowedHooks.length === 0) {
            this._isAcceptingCurrentData = false;
            this._Clear();
        } else {
            this._isAcceptingCurrentData = true;
            this._target.addEventListener(`dragleave`, this._mDragLeave);
            this._target.addEventListener(`dragover`, this._mDragOver);
        }

    }

    _dragEnd(p_extDrag) {
        this._Clear();
    }

    _mDragLeave(p_evt) {
        this._Clear();
    }

    _mDragOver(p_evt) {

        if (this._draggingOver) { return; }
        this._draggingOver = true;

        if (p_evt.defaultPrevented) {
            this._Activate(false);
            return;
        }

        if (this._isAcceptingCurrentData) {

            p_evt.preventDefault();
            this._Activate(true);

            let dragData = POINTER.DRAG_DATA;

            for (let i = 0, n = this._onDragOverHooks.length; i < n; i++) {
                let hook = this._onDragOverHooks[i];
                if (hook.thisArg) { hook.fn.call(hook.thisArg, dragData); }
                else { hook.fn(dragData); }
            }
        }

    }

    _mDrop(p_evt) {

        let dragList = POINTER.DRAG_DATA,
            pass = false;

        for (let d = 0, n = dragList.length; d < n; d++) {

            let dragData = dragList[d];

            for (let i = 0, n2 = this._allowedHooks.length; i < n2; i++) {

                let hook = this._allowedHooks[i];

                if (hook.check.thisArg) { pass = hook.check.fn.call(hook.check.thisArg, dragData); }
                else { pass = hook.check.fn(dragData); }

                if (!pass) { continue; }

                if (hook.drop) { hook.drop.fn.call(hook.drop.thisArg, dragData); }
                else { hook.drop.fn(dragData); }

            }
        }

        if (POINTER.DRAG_TARGET) {
            POINTER.DRAG_TARGET._Broadcast(SIGNAL.DROPPED, POINTER.DRAG_TARGET);
        }

        this._Clear();

    }

    _Activate(p_toggle) {

        if (this._isActive === p_toggle) { return; }
        this._isActive = p_toggle;

        if (this._feedbackHost) {
            this._feedbackHost.flags.Set(FLAGS.ALLOW_DROP, p_toggle);

            for (let i = 0, n = this._allowedHooks.length; i < n; i++) {

                let hook = this._allowedHooks[i],
                    flags = hook.flag;

                if (!flags) { continue; }
                if (Array.isArray(flags)) {
                    for (let i = 0, n2 = flags.length; i < n2; i++) {
                        this._feedbackHost.flags.Set(flags[i], p_toggle);
                    }
                } else {
                    this._feedbackHost.flags.Set(flags, p_toggle);
                }
            }

        }

        if (p_toggle) {
            //Becomes the main drop target        
            DropExtension.ACTIVE_TARGET = this;
            this._target.addEventListener(`drop`, this._mDrop);
            POINTER.instance.Unwatch(SIGNAL.DRAG_ENDED, this._dragEnd, this);
        } else {
            //Stops being the main drop target
            if (DropExtension.ACTIVE_TARGET === this) { DropExtension.ACTIVE_TARGET = null; }
            this._target.removeEventListener(`drop`, this._mDrop);
            POINTER.instance.Watch(SIGNAL.DRAG_ENDED, this._dragEnd, this);
        }

    }

    _Clear() {

        this._draggingOver = false;

        let dragData = POINTER.DRAG_DATA;

        for (let i = 0, n = this._onLeaveHooks.length; i < n; i++) {
            let hook = this._onLeaveHooks[i];
            if (hook.thisArg) { hook.fn.call(hook.thisArg, dragData); }
            else { hook.fn(dragData); }
        }

        this._target.removeEventListener(`dragleave`, this._mDragLeave);
        this._target.removeEventListener(`dragover`, this._mDragOver);
        this._Activate(false);

        this._allowedHooks.length = 0;
        this._onDragOverHooks.length = 0;
        this._onLeaveHooks.length = 0;

    }

    // ----> Hint

    //TODO: Implement hint management -- may need something more complex than just a bare div overlay
    //in order to provide visual feedback/text on what's going to happen when item is dropped

    _ShowHint() {
        if (this._feedbackHost) {
            if (this._hintElement) { u.dom.Attach(this._hintElement, this._feedbackHost); }
            else { this._hintElement = u.dom.El(`div`, { class: `ext-overlay drag-overlay` }, this._feedbackHost); }
        }
    }

    _HideHint() {
        if (this._hintElement) { u.dom.Detach(this._hintElement); }
    }

    // ----> Check

    /**
     * 
     * Register callback list for specified steps in the form { fn:xxx, thisArg:xxx, flag:xxx }
     * where fn is the Function to be called with thisArg (optional).
     * 
     * @param {object} p_hookOptions 
     * @param {object} p_hookOptions.check
     * @param {object} p_hookOptions.candidate
     * @param {object} p_hookOptions.drop
     * @param {object} p_hookOptions.drag
     * @param {object} p_hookOptions.leave
     * @param {object} p_hookOptions.flag optional flag or array of flags to be set TRUE on the feedbackTarget when the drop operation starts
     */
    Hook(p_hookOptions) {
        this._hooks.push(p_hookOptions);
        return this;
    }

    // ----> Pooling

    _CleanUp() {
        this._hooks.length = 0;
        super._CleanUp();
    }

}

module.exports = DropExtension;