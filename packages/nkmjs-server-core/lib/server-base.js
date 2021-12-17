'use strict';

const com = require(`@nkmjs/common`);
const collections = require(`@nkmjs/collections`);
const express = require(`express`);
const APIDefinition = require("./api-definition");

class ServerBase {

    constructor(p_constants) {

        this.p_constants = p_constants;

        this._express = express();
        this._apiMap = new collections.Dictionary();
        this._port = null;

        this._Init();

        this._InternalBoot = this._InternalBoot.bind(this);
        this._server = this._express.listen(process.env.PORT || this._port || 8080, this._InternalBoot);
    }

    _Init() {
        
    }

    _RegisterAPIs(p_apis, p_start = false) {
        for (var identifier in p_apis) {
            let
                config = p_apis[identifier],
                api = this._RegisterAPI(identifier, config);

            if (p_start) { api.Start(); }
        }
    }

    _RegisterAPI(p_identifier, p_config) {

        let api = this._apiMap.Get(p_identifier);
        if (api) { throw new Error(`identifier '${p_identifier}' already in use`); }

        api = new APIDefinition(this._express);
        api.id = p_identifier;
        api.route = p_config.route;
        api.handlerClass = p_config.handler;

        this._apiMap.Set(p_identifier, api);

        if(p_config.owner){ p_config.owner[p_identifier] = api; }

        return api;

    }

    _PostInit() {
        super._PostInit();

    }

    _InternalBoot(){
        console.log("Listening on port %s", this._server.address().port);
        this._Boot();
    }

    _Boot(){
        
    }

}

module.exports = ServerBase;