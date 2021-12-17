'use strict';

const u = require("@nkmjs/utils");

const SIGNAL = require(`../signal`);
const helpers = require(`../helpers`);

/**
 * A ticker singleton that allow for easy manipulation of time & frame.
 * Mostly useful for animation, as well as debouncing.
 * @class
 * @memberof common.time
 */
class TIME extends helpers.SingletonEx {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {function}
     * @customtag write-only
     */
    static set NEXT_TICK(p_fn) { TIME.instance.NextTickAdd(p_fn); }

    /**
     * @description TODO
     * @type {function}
     */
    static NextTick(p_fn){ TIME.instance.NextTickAdd(p_fn); }

    _Init() {

        super._Init();
        this._lastTick = null;
        this._deltaTime = 0;
        this._timeScale = 1;

        this._clA = new helpers.CallList();
        this._clB = new helpers.CallList();

        this._nextTick = this._clA;
        this._nextTickScheduled = false;

        this._Bind(this._Tick);

    }

    _PostInit() {
        super._PostInit();
        if (this._isBrowser) { window.requestAnimationFrame(this._Tick); }
    }

    /**
     * @description Current delta time.
     * Up-to-date only in functions called on NEXT_TICK, otherwise represent the last frame' deltaTime.
     * @type {number}
     * @customtag read-only
     */
    get deltaTime() {
        return this._deltaTime;
    }

    /**
     * @description TODO
     * @type {number}
     */
    get timeScale() { return this._timeScale; }
    set timeScale(value) {
        this._timeScale = value;
    }

    /**
     * @description Add a callback to next frame's tick (if browser) or process.nextTick (if nodejs).
     * @param {function} p_fn 
     */
    NextTickAdd(p_fn) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        this._nextTick.Add(p_fn);
        this._ScheduleNextTick();
    }

    /**
     * @description Add a callback to next frame's tick (if browser) or process.nextTick (if nodejs).
     * @param {function} p_fn 
     */
    NextTickRemove(p_fn) {
        if (!u.isFunc(p_fn)) { throw new Error(`p_fn is not a function`); }
        this._nextTick.Remove(p_fn);
    }

    /**
     * @access private
     */
    _ScheduleNextTick() {
        if (!this._isBrowser
            && !this._nextTickScheduled) {
            // In node only schedule NextTick once, otherwise the process stays open.
            this._nextTickScheduled = true;
            process.nextTick(this._Tick);
        }
    }

    /**
     * @access private
     * @param {*} p_timestamp 
     */
    _Tick(p_timestamp) {

        if (this._lastTick === null) {
            this._lastTick = p_timestamp;
        }

        this._deltaTime = (p_timestamp - this._lastTick) * this._timeScale;
        this._lastTick = p_timestamp;

        // Push callback in an alternate calllist
        let currentCl = this._nextTick;
        this._nextTick = currentCl === this._clA ? this._clB : this._clA;

        currentCl.Notify(this._deltaTime).Clear();
        this._Broadcast(SIGNAL.TICK, this._deltaTime);

        if (this._isBrowser) {
            window.requestAnimationFrame(this._Tick);
        }
        else {
            this._nextTickScheduled = false;
            if (this._nextTick.count > 0) { this._ScheduleNextTick(); }
        }
    }

}

module.exports = TIME;
