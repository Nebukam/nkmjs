'use strict';

const u = require("@nkmjs/utils");
const TIME = require(`./time`);

/**
 * Allows to simply Schedule or Cancel a call on TIME.NEXT_TICK.
 * Useful to debounce function calls that are knowns to happen often withing a single frame 
 * yet only useful/more performant if called once after a batch of updates.)
 * @class
 * @memberof common.time
 */
class DelayedCall {
    constructor(p_fn = null, p_delay = -1) {
        this.Clear();
        this._scheduled = false;
        this._Call = this._Call.bind(this);
        this.Schedule = this.Schedule.bind(this);
        this._delay = p_delay;
        this._elapsed = 0;
        if (p_fn) { this._callback = p_fn; }
    }

    get delay() { return this._delay; }
    set delay(p_value) { this._delay = p_value; }

    /**
     * @description Whether this DelayedCall is scheduled or not
     * @type {boolean}
     * @customtag read-only
     */
    get scheduled() { return this._scheduled; }

    /**
     * @description This delayed' call callback
     * @type {function}
     */
    set callback(p_value) {
        let wasScheduled = this._scheduled;

        this.Cancel();
        this._callback = p_value;

        if (wasScheduled) {
            this.Schedule();
        }
    }
    get callback() { return this._callback; }

    /**
     * @description Schedule this DelayedCall's callback to be called on TIME.NEXT_TICK
     */
    Schedule() {
        if (this._scheduled) { return; }
        this._scheduled = true;
        TIME.instance.NextTickAdd(this._Call);
    }

    /**
     * @description Cancel the delayed call, if it was scheduled.
     */
    Cancel() {
        if (!this._scheduled) { return; }
        this._scheduled = false;
        TIME.instance.NextTickRemove(this._Call);
        this._elapsed = 0;
    }

    /**
     * @access private
     * @param {*} p_obj 
     */
    _Call(p_delta) {
        if (this._delay > 0) {
            this._elapsed += p_delta;
            if (this._elapsed < this._delay) {
                TIME.instance.NextTickAdd(this._Call);
                return;
            }
        }
        this._scheduled = false;
        this._elapsed = 0;
        this._callback(p_delta);
    }

    /**
     * @description TODO
     */
    Clear() {
        this.Cancel();
        this._scheduled = false;
        this._callback = null;
    }

}

module.exports = DelayedCall;