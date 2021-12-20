'use strict';

const collections = require(`@nkmjs/collections`);
const express = require(`express`);
const cors = require("cors");
const APIDefinition = require("./api-definition");

class ServerBase {

    constructor(p_constants) {

        this.p_constants = p_constants;

        this._CheckCors = this._CheckCors.bind(this);
        this._whitelist = p_constants.whitelist;
        this._express = express();

        this._express.use(cors({ origin: this._CheckCors }));
        this._apiMap = new collections.Dictionary();
        this._port = null;

        this._Init();

        this._InternalBoot = this._InternalBoot.bind(this);
        this._server = this._express.listen(process.env.PORT || this._port || 8080, this._InternalBoot);

    }

    _Init() {

    }

    _CheckCors(p_origin, p_callback) {

        if (!this._whitelist) {
            p_callback(null, true);
            return;
        }

        if (this._whitelist.indexOf(p_origin) !== -1) {
            p_callback(null, true);
        } else {
            p_callback(new Error('Not allowed by CORS'));
        }

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

        if (p_config.owner) { p_config.owner[p_identifier] = api; }
        if (p_config.start) { api.Start(); }

        return api;

    }

    _PostInit() {
        super._PostInit();

    }

    _InternalBoot() {
        console.log("Listening on port %s", this._server.address().port);
        this._Boot();
    }

    _Boot() {

    }

}

module.exports = ServerBase;