'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = com.Observable;
class AbstractAction extends base {
    constructor() { super(); }

    static __model = {};

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

    Execute(p_operation, p_onSuccess, p_onError) {

        this._done = false;
        this._operation = p_operation;

        this._cbs.onSuccess = p_onSuccess;
        this._cbs.onError = p_onError;

        let result = this._InternalExecute(this._operation);

        if (u.isBoolean(result)) {
            if (result) { this._OnSuccess(); }
            else { this._OnError(); }
        }

        return this;
    }

    _InternalExecute(p_ops) {
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
        this._operation = null;
        super._CleanUp();
    }

}

module.exports = AbstractAction;