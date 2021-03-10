'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL, DisposableObjectEx, SignalBox, Callbacks } = require(`@nkmjs/common`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObjectEx
 * @memberof io.core
 */
class ResourceOperation extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._callbacks = new Callbacks();
        this._originalState = null;
        this._ioType = null;
        this._cancelled = false;
        this._fullPath = null;
        this._Reset();
    }

    /**
     * @description TODO
     * @type {io.core.Resource}
     */
    set rsc(p_value) {
        if (U.isVoid(p_value)) { p_value = this; }
        this._rsc = p_value;
    }
    get rsc() { return this._rsc; }

    /**
     * @description TODO
     * @type {io.core.IOType}
     * @customtag read-only
     */
    get ioType() { return this._ioType; }

    /**
     * @description TODO
     * @type {string}
     * @customtag read-only
     */
    get fullPath() { return this._fullPath; }

    _Reset() {
        this._rsc = null; // Ressource
        this._originalState = null;
        this._callbacks.Clear();
        this._states = null;
        this._ioType = null;
        this._fullPath = null;
    }

    /*

        operation.Start(
            this,
            {
                start:{ state:xxx, evt:xxx },
                progress:{ state:xxx, evt:xxx },
                error:{ state:xxx, evt:xxx },
                complete:{ state:xxx, evt:xxx },
                end:{ state:xxx, evt:xxx }
            },
            {
                success:fn,
                error:fn,
                any:fn
            });

    */


    /**
     * @description TODO
     * @param {Resource} p_rsc
     * @param {function} p_fn
     * 
     * @param {object} p_states { state:xxx, evt:xxx, fn:xxx }
     * @param {object} p_states.prepare
     * @param {object} p_states.start
     * @param {object} p_states.progress
     * @param {object} p_states.error
     * @param {object} p_states.success
     * @param {object} p_states.end
     * 
     * @param {object} p_options
     * @param {function} p_callbacks.success
     * @param {function} p_callbacks.error
     * @param {function} p_callbacks.any
     * 
     * @param {array} args to be passed to p_fn
     */
    Prepare(p_rsc, p_fn, p_states, p_options = null, args = []) {
        this._cancelled = false;
        this._rsc = p_rsc;
        this._fullPath = PATH.FULL(p_rsc.path);
        this._ioType = U.Get(p_options, `io`, null);
        this._callbacks.Add(p_options);
        this._states = p_states;
        this._originalState = this._rsc._state.currentState;
        this._rsc._state.currentState = this._states.prepare.state;
        args.unshift(this);
        p_fn.apply(null, args);
    }

    /**
     * @description Cancel the current operation
     */
    Cancel() {
        //TODO : Implement cancelation in the IO process
        this._cancelled = true;
        this._rsc._state.currentState = this._originalState;
        this.OnEnd();
    }

    /**
     * @description TODO
     */
    OnStart() {
        this._rsc._state.currentState = this._states.start;
        this._rsc._Broadcast(this._states.start.evt, this._rsc);
        if (this._states.start.fn) {
            try {
                this._states.start.fn();
            } catch (e) {
                this.OnError(e);
                return;
            }
        }
    }

    /**
     * @description TODO
     * @param {*} p_err 
     */
    OnError(p_err) {
        if (this._states.error.fn) { this._states.error.fn(); }
        this._rsc._state.currentState = this._states.error.state;
        p_err.rsc = this._rsc;
        this._callbacks.OnError(p_err).Clear();
        this._rsc._Broadcast(this._states.error.evt, this._rsc, p_err);
        this.OnEnd();
    }

    /**
     * @description TODO
     * @param {*} p_progress 
     */
    OnProgress(p_progress) {
        if (this._states.progress.fn) {
            try {
                this._states.progress.fn();
            } catch (e) {
                this.OnError(e);
                return;
            }
        }
        this._rsc._state.currentState = this._states.progress.state;
        this._rsc._Broadcast(this._states.progress.evt, this._rsc, p_progress);
    }

    /**
     * @description TODO
     */
    OnSuccess() {
        if (this._states.success.fn) {
            try {
                this._states.success.fn();
            } catch (e) {
                this.OnError(e);
                return;
            }
        }
        this._rsc._state.currentState = this._states.success.state;
        this._callbacks.OnSuccess(this._rsc).Clear();
        this._rsc._Broadcast(this._states.success.evt, this._rsc);
        this.OnEnd();
    }

    /**
     * @description TODO
     */
    OnEnd() {
        if (this._rsc._operation === this) { this._rsc._operation = null; }
        this.Release();
    }

    _CleanUp() {
        this._Reset();
        super._CleanUp();
    }

}

module.exports = ResourceOperation;