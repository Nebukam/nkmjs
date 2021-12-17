'use strict';

const com = require(`@nkmjs/common`);
const HandlerGet = require(`./handler-get`);
const axios = require(`axios`);

class HandlerFetch extends HandlerGet {

    constructor() { super(); }

    _Init(){
        super._Init();
        this._Bind(this._OnFetchSuccess);
        this._Bind(this._OnFetchError);
    }

    Fetch(p_url){
        axios
        .get(p_url)
        .then(this._OnFetchSuccess)
        .catch(this._OnFetchError);
    }

    _OnFetchSuccess(p_response){
        this._Handled();
    }

    _OnFetchError(p_err){
        this._response.status(p_err.response.status);
        this._Handled();
    }

}

module.exports = HandlerFetch;