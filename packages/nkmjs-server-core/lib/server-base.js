'use strict';

const u = require(`@nkmjs/utils`);
const env = require(`@nkmjs/environment`);

const dotenv = require('dotenv');
const collections = require(`@nkmjs/collections`);
const http = require('http');
const express = require(`express`);
const cors = require("cors");
const path = require(`path`);

const APIDefinition = require("./api-definition");

class ServerBase {

    static __USE_AUTH = true;

    constructor(p_constants) {

        this._config = p_constants;
        env.ENV.instance.Start(p_constants);
        env.ENV.instance._app = this;

        this._authConfig = {
            authRequired: this._config.authRequired || false,
            auth0Logout: this._config.auth0Logout || true
        };

        dotenv.config({ path: this._config.envPath });

        this._CheckCors = this._CheckCors.bind(this);
        this._whitelist = p_constants.whitelist;
        this._express = express();

        if (this.constructor.__USE_AUTH) {
            this._oidc = require('express-openid-connect');
            this._requireAuth = this._oidc.requiresAuth;
        } else {
            this._requireAuth = null;
            this._authConfig.authRequired = false;
            this._authConfig.auth0Logout = false;
        }

        this._InitExpress(this._express);

        this._express.use(cors({
            origin: this._CheckCors,
            credentials: true
        }));
        this._apiMap = new collections.Dictionary();
        this._port = null;

        this._Init(this._express);
        this._PostInit();

        this._InternalBoot = this._InternalBoot.bind(this);
        this._server = http.createServer(this._express)
            .listen(process.env.PORT || this._port || 8080, this._InternalBoot);

        if (this.constructor.__USE_AUTH) {
            this._InitErrorHandlers(this._express);
        }

    }

    /**
     * 
     * @param {*} p_express 
     */
    _InitExpress(p_express) {

        this._InitRenderEngine(p_express);

        //p_express.use(logger('dev'));
        p_express.use(express.static(path.join(__dirname, 'public')));
        p_express.use(express.json());

        if (this._requireAuth) {

            const port = process.env.PORT || this._port || 8080;
            if (!this._authConfig.baseURL && !process.env.BASE_URL && process.env.PORT && process.env.NODE_ENV !== 'production') {
                this._authConfig.baseURL = `http://localhost:${port}`;
            }

            p_express.use(this._oidc.auth(this._authConfig));

            // Middleware to make the `user` object available for all views
            this._express.use(function (req, res, next) {
                console.log(req.oidc);
                res.locals.user = req.oidc.user;
                next();
            });

        }

    }

    /**
     * 
     * @param {*} p_express 
     */
    _InitRenderEngine(p_express) {

        let viewPath = path.join(this._config.serverDir, 'views');
        console.log(`>>> Render engine view directory: '${viewPath}'`);
        p_express.set('views', viewPath);
        p_express.set('view engine', 'ejs');

    }

    /**
     * 
     * @param {*} p_express 
     */
    _InitErrorHandlers(p_express) {

        // Catch 404 and forward to error handler
        p_express.use(function (req, res, next) {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // Error handlers
        p_express.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                status: err.status || 500,
                message: err.message,
                error: process.env.NODE_ENV !== 'production' ? err : {}
            });
        });

    }

    _Init(p_express) {


    }

    _PostInit() {

        let apis = [];

        this._apiMap.keys.forEach(key => { apis.push(this._apiMap.Get(key)); });

        apis.sort((a, b) => { return a.route.localeCompare(b.route) * -1; });
        apis.forEach(api => { api.Start(); });
        apis.length = 0;

    }

    /**
     * 
     * @param {*} p_origin 
     * @param {*} p_callback 
     * @returns 
     */
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

    /**
     * Register a list of endpoints to be added to the server
     * @param {Array|Object} p_apis 
     */
    _RegisterAPIs(p_apis) {
        if (u.isArray(p_apis)) {
            p_apis.forEach(api => { this._RegisterAPI(`@${api.route}`, p_apis[identifier]); });
        } else {
            for (var identifier in p_apis) { this._RegisterAPI(identifier, p_apis[identifier]); }
        }
    }

    /**
     * 
     * @param {String} p_identifier 
     * @param {Object} p_config 
     * @param {String} p_config.route
     * @param {Class} [p_config.handlerClass]
     * @param {Boolean} [p_config.requireAuth]
     * @param {*} [p_config.owner]
     * @returns 
     */
    _RegisterAPI(p_identifier, p_config) {

        let api = this._apiMap.Get(p_identifier);
        if (api) { throw new Error(`identifier '${p_identifier}' already in use`); }

        api = new APIDefinition(this._express, this);
        api.id = p_identifier;
        api.route = p_config.route;
        api.handlerClass = p_config.handler;
        api.requireAuth = p_config.requireAuth ? this._requireAuth : false;
        api.options = p_config;

        this._apiMap.Set(p_identifier, api);

        if (p_config.owner) { p_config.owner[p_identifier] = api; }

        return api;

    }

    _InternalBoot() {
        let a = this._server.address();
        console.log(`Listening ${a.address}:${a.port}`);
        this._Boot();
    }

    _Boot() {

    }

}

module.exports = ServerBase;