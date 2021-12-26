'use strict';

const com = require(`@nkmjs/common`);
const HandlerGet = require(`./handler-get`);
const axios = require(`axios`);

class HandlerFetch extends HandlerGet {

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
        if (p_err.response) {
            this._res.status(p_err.response.status);
        } else {
            this._res.status(404).end();
        }
        this._OnHandled();
    }

}

module.exports = HandlerFetch;