'use strict';

const CallList = require("../helpers/call-list");

class DeferredCall {

    constructor(p_init = null, p_resolve = null, p_reject = null) {

        this._promise = null;
        this._resolve = null;
        this._reject = null;

        this._initCb = p_init;
        this._resolveCb = p_resolve;
        this._rejectCb = p_reject || p_resolve;

        this._thenResolve = new CallList();
        this._thenReject = new CallList();

        this.Resolve = this.Resolve.bind(this);
        this.Reject = this.Reject.bind(this);

    }

    /**
     * 
     * @param {*} p_onResolveOrAny If only callback set, will be called on both resolve AND reject.
     * @param {*} p_onReject 
     * @returns 
     */
    async Call(p_onResolveOrAny = null, p_onReject = null) {

        if (p_onResolveOrAny) {
            this._thenResolve.Add(p_onResolveOrAny);
            if (!p_onReject) { this._thenReject.Add(p_onResolveOrAny); }
        }

        if (p_onReject) {
            this._thenReject.Add(p_onReject);
        }

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
        this._resolveCb?.(p_resolveArg);
        this._thenResolve.Notify(p_resolveArg).Clear();
    }

    Reject(p_resolveArg) {
        this._reject?.(p_resolveArg);
        this._rejectCb?.(p_resolveArg);
        this._thenReject.Notify(p_resolveArg).Clear();
    }

    _Clear() {
        this._promise = null;
        this._resolve = null;
        this._reject = null;
    }

}

module.exports = DeferredCall;