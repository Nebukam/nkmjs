'use strict';

const com = require(`@nkmjs/common`);
const collections = require(`@nkmjs/collections`);
const express = require(`express`);

class ServerBase extends com.helpers.SingletonEx {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._server = express();
        this._apis = new collections.List();

    }

    _RegisterAPI(p_apiObject){
        let apiObject;
        if(p_apiObject.type == )
        this._
    }

    _PostInit() {
        super._PostInit();

    }

}

module.exports = ServerBase;