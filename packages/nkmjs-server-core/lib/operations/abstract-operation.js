'use strict';

const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`)

/**
 * Get EDIT manages the creation & serving of pages for editing.
 */
const base = com.Disposable;
class AbstractOperation extends base {
    constructor() { super(); }

    static __NFO__ = {
        name: null,
        prefix: null,
        params: [],
        model: {}
    };

    _Init() {
        super._Init();
        this._handler = null;
        this._output = null;
        this._cbs = new com.helpers.Callbacks();
    }

    get output() { return this._output; }

    get handler() { return this._handler; }
    set handler(p_value) { this._handler = p_value; }

    async Execute(p_params, p_onSuccess, p_onError) {

        this._params = p_params;

        this._cbs.onSuccess = p_onSuccess;
        this._cbs.onError = p_onError;

        await this._InternalExecute(this._params);

        return this;

    }

    async _InternalExecute(p_params) { return false; }

    _OnSuccess() {
        this._cbs.OnSuccess(this._output).Clear();
        this._OnEnd();
    }

    _OnError() {
        this._cbs.OnError(this._output).Clear();
        this._OnEnd();
    }

    _OnEnd() { this.Release(); }

    _CleanUp() {
        this._handler = null;
        this._output = null;
        this._params = null;
        this._cbs.Clear();
        super._CleanUp();
    }

}

module.exports = AbstractOperation;