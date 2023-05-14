'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = com.Observable;
class AbstractGetter extends base {
    constructor() { super(); }

    static __NFO__ = {
        identifier:null,
        prefix:null,
        params:[],
        model: {}
    };
    
    static Execute(p_operation, p_onSuccess, p_onError) {
        return com.Rent(this).Execute(p_operation, p_onSuccess, p_onError);
    }

    _Init() {
        super._Init();
        this._done = false;
        this._response = null;
        this._cbs = new com.helpers.Callbacks();
    }

    get done() { return this._done; }
    get response() { return this._response; }

    CanExecute(p_params) { return true; }

    Execute(p_params, p_onSuccess, p_onError) {

        this._done = false;
        this._params = p_params;

        this._cbs.onSuccess = p_onSuccess;
        this._cbs.onError = p_onError;

        if (!this.CanExecute(p_params)) {
            this._OnError();
            return this;
        }

        let result = this._InternalExecute(this._params);

        if (result === true) { this._OnSuccess(); }
        else if (result === false) { this._OnError(); }

        return this;
    }

    _InternalExecute(p_params) {
        return false;
    }

    _OnSuccess() {
        this._cbs.OnSuccess(this).Clear();
        this._OnEnd();
    }

    _OnError() {
        this._cbs.OnError(this).Clear();
        this._OnEnd();
    }

    _OnEnd() {
        this._done = true;
        this.Release();
    }

    _CleanUp() {
        this._done = false;
        this._response = null;
        this._cbs.Clear();
        this._params = null;
        super._CleanUp();
    }

}

module.exports = AbstractGetter;