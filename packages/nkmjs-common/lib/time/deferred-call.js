'use strict';

class DeferredCall {

    constructor(p_init = null, p_resolve = null, p_reject = null) {

        this._promise = null;
        this._resolve = null;
        this._reject = null;

        this._initCb = p_init;
        this._resolveCb = p_resolve;
        this._rejectCb = p_reject;

        this.Resolve = this.Resolve.bind(this);
        this.Reject = this.Reject.bind(this);
        
    }

    async Call() {

        if (!this._promise) {
            this._promise = new Promise((res, rej) => {
                this._resolve = res;
                this._reject = rej;
                this._initCb?.();
            }).then(
                (p_result) => { this._Clear(); }
            );
        }

        return this._promise;

    }

    Resolve(p_resolveArg) {
        this._resolve?.(p_resolveArg);
        this._resolveCb?.();
    }

    Reject(p_resolveArg) {
        this._reject?.(p_resolveArg);
        if (this._rejectCb) { this._rejectCb(); }
        else { this._resolveCb?.(); }
    }

    _Clear() {
        this._promise = null;
        this._resolve = null;
        this._reject = null;
    }

}

module.exports = DeferredCall;