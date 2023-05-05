'use strict';

const com = require(`@nkmjs/common`);
const axios = require(`axios`);
const STATUSES = require("../status-codes");

const base = require(`./handler-get`);
class HandlerFetch extends base {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._Bind(this._OnFetchSuccess);
        this._Bind(this._OnFetchError);
        this._requestOptions = {};
    }

    Fetch(p_url) {
        axios
            .request({
                url: p_url,
                method: "get",
                ...this._requestOptions
            })
            .then(this._OnFetchSuccess)
            .catch(this._OnFetchError);
    }

    _OnFetchSuccess(p_fetchRes) {
        this._OnHandled();
    }

    _OnFetchError(p_err) {
        this.Abort(p_err.response ? STATUSES.getStatus(p_err.response.status) : STATUSES.NOT_FOUND);
    }

}

module.exports = HandlerFetch;