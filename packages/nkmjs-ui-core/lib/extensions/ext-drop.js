'use strict';

const u = require("@nkmjs/utils");

const dom = require(`../utils-dom`);
const POINTER = require(`../pointer`);
const FLAGS = require(`../flags`);
const SIGNAL = require(`../signal`);

const RectTracker = require(`../helpers/rect-tracker`);

const Extension = require("./extension");

let _activeTarget = null;

/**
 * @description The DropExtension enable drop capabilities to a widget.
 * @class
 * @hideconstructor
 * @example //Basic setup 
    // in _Init()

    this._extDrop = this._extensions.Add(ui.extensions.Drop);
    this._extDrop.Hook({
        check: { fn: (p_data) => { return true; }
        drop: {
            fn: (p_data) => {
                p_data = p_data[0]; //Data is an array.
                let nfos = this._extDrop.mouseInfos;
                if (nfos.ry > 0.5) { ... } //Dropped in the lower half of the element
                else { ... } //Dropped in the upper half of the element
            }
        }, // Required
    }
    );

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
        this._activator = null;
        this._feedbackHost = null;

        //TODO : Gotta emulate dragenter/leave
        //in order to neatly handle nested drop handlers

        this._hooks = [];

        this._candidatesHooks = [];
        this._allowedHooks = [];
        this._onDragOverHooks = [];
        this._onLeaveHooks = [];

        this._useHint = true;

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

        this._hintOverlay = null;

        this._mouseInfos = {
            x: 0, y: 0,
            inner_x: 0, inner_y: 0,
            rx: 0, ry: 0,
            rect: null,
        };

        this._rectTracker = new RectTracker(this._Bind(this._UpdateDropRect));

        //TODO : Add event callbacks to handle differently different types of drop
        //check if a drop is acceptable etc
    }

    _OnOwnerChanged(p_oldOwner) {
        super._OnOwnerChanged(p_oldOwner);
        this.activator = this._owner;
    }

    get useHint() { return this._useHint; }
    set useHint(p_value) { this._useHint = p_value; }

    /**
     * @description The target object that will be listening to drop events
     * @type {Element}
     */
    get activator() { return this._activator; }
    set activator(p_value) {

        p_value = p_value || this._owner;

        if (this._activator === p_value) { return; }

        let oldActivator = this.activator;
        this._activator = p_value;
        this.feedbackHost = this.feedbackHost || p_value;

        this._rectTracker.Remove(oldActivator);
        this._rectTracker.Add(this._activator);

        if (this._isEnabled) {
            if (oldActivator) { oldActivator.removeEventListener(`dragenter`, this._mDragEnter); }
            if (p_value) { p_value.addEventListener(`dragenter`, this._mDragEnter); }
        }

        if (oldActivator) { oldActivator.flags.Remove(oldActivator, FLAGS.ALLOW_DROP); }
        if (p_value) { p_value.flags.Add(p_value, FLAGS.ALLOW_DROP); }

    }

    /**
     * @description HTML element that will host drop feedback/highlights
     * @type {Element}
     */
    get feedbackHost() { return this._feedbackHost; }
    set feedbackHost(p_value) { this._feedbackHost = p_value || this.activator; }

    get watchGlobalBroadcasts() { return this._watchGlobalBroadcasts; }
    set watchGlobalBroadcasts(p_value) {
        if (this._watchGlobalBroadcasts == p_value) { return; }
        this._watchGlobalBroadcasts = p_value;
        if (this._isEnabled) {
            if (p_value) { POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
            else { POINTER.Unwatch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        }
    }

    get mouseInfos() { return this._mouseInfos; }

    // ----> Availability

    /**
     * @description TODO
     */
    Enable() {
        if (!super.Enable()) { return false; }
        if (this._activator) { this._activator.addEventListener(`dragenter`, this._mDragEnter); }
        if (this._watchGlobalBroadcasts) { POINTER.Watch(SIGNAL.DRAG_STARTED, this._OnPointerDragStarted); }
        return true;

    }

    /**
     * @description TODO
     */
    Disable() {
        if (!super.Disable()) { return false; }
        if (this._activator) { this._activator.removeEventListener(`dragenter`, this._mDragEnter); }
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

        if (this._candidatesHooks.length) {

            POINTER.Watch(SIGNAL.DRAG_ENDED, this._OnPointerDragEnded);

            for (let i = 0, n = this._candidatesHooks.length; i < n; i++) {
                let candidate = this._candidatesHooks[i].dropCandidate;
                if (candidate.fn) { candidate.fn(p_toggle); }
                if (candidate.flag) { this._activator.flags.Set(candidate.flag, p_toggle); }
            }
        }

    }

    _getDragData(p_evt) {

        if (POINTER.DRAG_DATA) {
            POINTER.EXTERNAL_DRAG = false;
            return POINTER.DRAG_DATA;
        } else {
            POINTER.EXTERNAL_DRAG = true;
            return p_evt.dataTransfer;
        }

    }

    _mDragEnter(p_evt) {

        this._rectTracker.Enable();

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
            this._activator.addEventListener(`dragleave`, this._mDragLeave);
            this._activator.addEventListener(`dragover`, this._mDragOver);
        }

        return this._isAcceptingCurrentData;

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

        this._UpdateMouseInfos();

        let dragData = this._getDragData(p_evt);

        if (POINTER.DRAG_MULTIPLE) {
            for (let d = 0, n = dragData.length; d < n; d++) { this._DropSingleDataItem(dragData[d]); }
        } else { this._DropSingleDataItem(dragData); }

        if (POINTER.DRAG_TARGET) {
            POINTER.DRAG_TARGET.Broadcast(SIGNAL.DROPPED, POINTER.DRAG_TARGET);
        }

        this._Clear();

    }

    _UpdateDropRect() { this._UpdateMouseInfos(); }

    _UpdateMouseInfos() {

        let
            rect = this._rectTracker.GetRect(this._activator) || this._activator.getBoundingClientRect(),
            mx = POINTER.position.x,
            my = POINTER.position.y,
            m = this._mouseInfos;

        m.x = mx;
        m.y = my;
        m.inner_x = mx - rect.x;
        m.inner_y = my - rect.y;
        m.rx = (mx - rect.x) / rect.width;
        m.ry = (my - rect.y) / rect.height;
        m.rect = rect;

        return m;

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

            this._allowedHooks.forEach(hook => {
                let flag = hook.flag;
                if (!flag) { return; }
                if (Array.isArray(flag)) {
                    flag.forEach(f => { this._feedbackHost.flags.Set(f, p_toggle) });
                } else {
                    this._feedbackHost.flags.Set(flag, p_toggle);
                }
            });

        }

        if (p_toggle) {
            //Becomes the main drop target        
            DropExtension.ACTIVE_TARGET = this;
            this.activator.addEventListener(`drop`, this._mDrop);
            POINTER.Unwatch(SIGNAL.DRAG_ENDED, this._dragEnd, this);
            this._ShowHint();
        } else {
            //Stops being the main drop target
            if (DropExtension.ACTIVE_TARGET === this) { DropExtension.ACTIVE_TARGET = null; }
            this.activator.removeEventListener(`drop`, this._mDrop);
            POINTER.Watch(SIGNAL.DRAG_ENDED, this._dragEnd, this);
        }

    }

    _Clear() {

        this._draggingOver = false;

        let dragData = POINTER.DRAG_DATA;

        for (let i = 0, n = this._onLeaveHooks.length; i < n; i++) {
            u.Call(this._onLeaveHooks[i], dragData);
        }

        this._activator.removeEventListener(`dragleave`, this._mDragLeave);
        this._activator.removeEventListener(`dragover`, this._mDragOver);
        this._Activate(false);

        this._allowedHooks.length = 0;
        this._onDragOverHooks.length = 0;
        this._onLeaveHooks.length = 0;

        this._rectTracker.Disable();

        this._HideHint();

    }

    // ----> Hint

    //TODO: Implement hint management -- may need something more complex than just a bare div overlay
    //in order to provide visual feedback/text on what's going to happen when item is dropped

    _ShowHint() {
        if (!this._useHint) { return; }
        if (this._hintOverlay) { dom.Attach(this._hintOverlay, this._feedbackHost); }
        else { this._hintOverlay = dom.El(`div`, { class: `ext-overlay drop-target-overlay` }, this._feedbackHost); }
    }

    _HideHint() {
        if (this._hintOverlay) { dom.Detach(this._hintOverlay); }
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