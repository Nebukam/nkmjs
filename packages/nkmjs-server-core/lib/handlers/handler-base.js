'use strict';

const com = require(`@nkmjs/common`);

class HandlerBase extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    _Init(){
        super._Init();
        this._request = null;
        this._response = null;
    }

    get request(){ return this._request; }
    set request(p_value){ this._request = p_value; }

    get response(){ return this._response; }
    set response(p_value){ this._response = p_value; }

    _InternalHandle(p_request, p_response){
        this._request = p_request;
        this._response = p_response;
        this.Handle();
    }

    Handle(){

    }

    _Handled(){
        this.Release();
    }

    Cancel(){
        if(this._response){ this._response.sendStatus(404); }
        this.Release();
    }

    _Cleanup(){
        super._Cleanup();
        this._request = null;
        this._response = null;
    }

}

module.exports = HandlerBase;