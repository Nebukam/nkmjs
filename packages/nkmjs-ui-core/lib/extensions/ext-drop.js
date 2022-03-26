'use strict';

const u = require("@nkmjs/utils");

const dom = require(`../utils-dom`);
const POINTER = require(`../pointer`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);

const Extension = require("./extension");

let _activeTarget = null;

/**
 * @description The DropExtension enable drop capabilities to a widget.
 * @class
 * @hideconstructor
 * @example //Basic setup
 * dropHandler = this._extensions.Add(ui.extensions.Drop);
 * dropHandler.Hook({
 *      check: { fn: (p_data) => { return true; } }, // Required
 *      drop: { fn: (p_data) => { } }, // Required
 *      dropCandidate:{ fn:(p_isDropCandidate) => { } ) } // Optional (force watchGlobalBroadcasts = true if set)
 * });
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

        this._hooks = [];

        this._candidatesHooks = [];
        this._allowedHooks = [];
        this._onDragOverHooks = [];
        this._onLeaveHooks = [];

        this._isAcceptingCurrentData = false;
        this._isActive = false;
        this._watchGlobalBroadcasts = false;
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

    get watchGlobalBroadcasts() { return this._watchGlobalBroadcasts; }
    set watchGlobalBroadcasts(p_value) {
        if (this._watchGlobalBroadcasts == p_value) { return; }
        this._watchGlobalBroadcasts = p_value;
        if (this._isEnabled) {
            if (p_value) { POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
            else { POINTER.Unwatch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        }
    }

    /**
     * @description TODO
     * @param {*} p_target The target object that will be listening to drop events
     * @param {*} [p_feedbackHost] HTML element that will host drop feedback/highlights
     */
    Setup(p_target, p_feedbackHost = null) {

        let oldTarget = this._target;
        this.target = p_target;

        this._feedbackHost = p_feedbackHost ? p_feedbackHost : p_target;

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
        if (this._watchGlobalBroadcasts) { POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        return true;

    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._target) { this._target.removeEventListener(`dragenter`, this._mDragEnter); }
        if (this._watchGlobalBroadcasts) { POINTER.Unwatch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        return true;
    }

    _OnPointerDragStarted(dragData) {

        this._candidatesHooks.length = 0;

        // Look for 'candidate' hooks with a 'check' hook
        outerloop:
        for (let i = 0, n = this._hooks.length; i < n; i++) {

            let hook = this._hooks[i],
                pass = false;

            if (hook.check && hook.dropCandidate) {
                if (POINTER.DRAG_MULTIPLE > 0) {

                    let dragLength = POINTER.dragLength;

                    innerloop:
                    for (let d = 0, n2 = dragData.length; d < n2; d++) {
                        pass = u.Call(hook.check, dragData[d]);
                        if (pass) { break innerloop; }
                    }

                } else {
                    pass = u.Call(hook.check, dragData);
                }
            }

            if (pass) {
                this._candidatesHooks.push(hook);
            }

        }

        this._ToggleDropCandidate(true);

    }

    _OnPointerDragEnded() {
        POINTER.Unwatch(SIGNAL.DRAG_ENDED, this._OnPointerDragEnded);
        this._ToggleDropCandidate(false);
    }

    _ToggleDropCandidate(p_toggle) {

        if (this._candidatesHooks.length > 0) {

            POINTER.Watch(SIGNAL.DRAG_ENDED, this._OnPointerDragEnded);

            for (let i = 0, n = this._candidatesHooks.length; i < n; i++) {
                let candidate = this._candidatesHooks[i].dropCandidate;
                if (candidate.fn) { candidate.fn(p_toggle); }
                if (candidate.flag) { this._target.flags.Set(candidate.flag, p_toggle); }
            }
        }
    }

    _getDragData(p_evt) {

        if(POINTER.DRAG_DATA){
            POINTER.EXTERNAL_DRAG = false;
            return POINTER.DRAG_DATA;
        }else{
            POINTER.EXTERNAL_DRAG = true;
            return p_evt.dataTransfer;
        }
        
    }

    _mDragEnter(p_evt) {

        this._allowedHooks.length = 0;
        this._onDragOverHooks.length = 0;
        this._onLeaveHooks.length = 0;

        let dragData = this._getDragData(p_evt);

        if (dragData) {

            outerloop:
            for (let i = 0, n = this._hooks.length; i < n; i++) {

                let hook = this._hooks[i],
                    pass = false;

                if (hook.check) {

                    if (POINTER.DRAG_MULTIPLE) {

                        let dragLength = POINTER.dragLength;

                        innerloop:
                        for (let d = 0; d < dragLength; d++) {
                            pass = u.Call(hook.check, dragData[d]);
                            if (pass) { break innerloop; }
                        }

                    } else {
                        pass = u.Call(hook.check, dragData);
                    }

                } else {
                    pass = true;
                }

                if (pass) {
                    this._allowedHooks.push(hook);
                    if (hook.dragOver) { this._onDragOverHooks.push(hook.dragOver); }
                    if (hook.dragLeave) { this._onLeaveHooks.push(hook.dragLeave); }
                }

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
        this._ToggleDropCandidate(false);
    }

    _mDragLeave(p_evt) {
        this._Clear();
        this._ToggleDropCandidate(true);
    }

    _mDragOver(p_evt) {


        //if (this._draggingOver) { return; }
        this._draggingOver = true;

        if (p_evt.defaultPrevented) {
            this._Activate(false);
            return;
        }

        if (this._isAcceptingCurrentData) {

            p_evt.preventDefault();
            this._Activate(true);

            let dragData = this._getDragData(p_evt);

            for (let i = 0, n = this._onDragOverHooks.length; i < n; i++) {
                pass = u.Call(this._onDragOverHooks[i], dragData);
            }
        }

    }

    _mDrop(p_evt) {

        let dragData = this._getDragData(p_evt);

        if (POINTER.DRAG_MULTIPLE) {
            for (let d = 0, n = dragData.length; d < n; d++) { this._DropSingleDataItem(dragData[d]); }
        } else { this._DropSingleDataItem(dragData); }

        if (POINTER.DRAG_TARGET) {
            POINTER.DRAG_TARGET.Broadcast(SIGNAL.DROPPED, POINTER.DRAG_TARGET);
        }

        this._Clear();

    }

    _DropSingleDataItem(p_dragDataItem) {

        // Process drop hooks for a single data item

        for (let i = 0, n = this._allowedHooks.length; i < n; i++) {

            let hook = this._allowedHooks[i];

            if (!u.Call(hook.check, p_dragDataItem)) { continue; }
            u.Call(hook.drop, p_dragDataItem);

        }

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
            u.Call(this._onLeaveHooks[i], dragData);
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
            if (this._hintElement) { dom.Attach(this._hintElement, this._feedbackHost); }
            else { this._hintElement = dom.El(`div`, { class: `ext-overlay drag-overlay` }, this._feedbackHost); }
        }
    }

    _HideHint() {
        if (this._hintElement) { dom.Detach(this._hintElement); }
    }

    // ----> Check

    /**
     * 
     * Register callback list for specified steps in the form { fn:xxx, thisArg:xxx, flag:xxx }
     * where fn is the Function to be called with thisArg (optional).
     * 
     * @param {object} p_hookOptions 
     * @param {object} p_hookOptions.check
     * @param {object} p_hookOptions.dropCandidate
     * @param {object} p_hookOptions.drop
     * @param {object} p_hookOptions.dragOver
     * @param {object} p_hookOptions.dragLeave
     * @param {object} p_hookOptions.flag optional flag or array of flags to be set TRUE on the feedbackTarget when the drop operation starts
     */
    Hook(p_hookOptions) {
        this._hooks.push(p_hookOptions);
        if (p_hookOptions.dropCandidate) { this.watchGlobalBroadcasts = true; }
        return this;
    }

    // ----> Pooling

    _CleanUp() {

        this.watchGlobalBroadcasts = false;
        this._hooks.length = 0;

        this._allowedHooks.length = 0;
        this._onDragOverHooks.length = 0;
        this._onLeaveHooks.length = 0;
        this._candidatesHooks.length = 0;

        super._CleanUp();
    }

}

module.exports = DropExtension;