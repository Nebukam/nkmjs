'use strict';
const io = require(`@nkmjs/server-io`);
const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const collections = require(`@nkmjs/collections`);

const dotenv = require('dotenv');

const http = require('http');
const express = require(`express`);
const fileUpload = require('express-fileupload');
const cors = require("cors");

const path = require(`path`);

const APIDefinition = require("./api-definition");
const STATUSES = require('./status-codes');

class ServerBase {

    constructor(p_constants) {

        this._starting = false;
        this._config = p_constants;
        dotenv.config({ path: this._config.envPath });

        let ioservices = [];
        this._RegisterIOServices(ioservices);

        this._waitForIO = ioservices.length ? true : false;
        if (this._waitForIO) {
            ioservices.forEach(cl => { io.IO_SERVICES.Use(cl); });
            io.IO_SERVICES.instance.WatchOnce(com.SIGNAL.READY, this._OnIOReady.bind(this));
        }

        env.ENV.instance._app = this;
        env.ENV.instance.Start(p_constants);

    }

    /**
     * 
     * @param {*} p_ioClasses 
     */
    _RegisterIOServices(p_ioClasses) {

    }

    _InternalStart() {
        this._starting = true;
        if (!this._waitForIO || io.IO_SERVICES.ready) { this._OnIOReady(); }
    }

    _InternalInit() {

        this._requireAuth = false;
        this._port = process.env.PORT || 8080;
        this._baseURL = process.env.BASE_URL || `http://localhost:${this._port}`;

        this._whitelist = this._config.whitelist;
        this._authFn = null;

        this._Init();
        this._PostInit();

        this._InternalBoot = this._InternalBoot.bind(this);

        this._server = http.createServer(this._express)
            .listen(this._port, this._InternalBoot);

    }

    _OnIOReady() {
        if (!this._starting) { return; }
        this._InternalInit();
    }

    _Init() {

        this._apiMap = new collections.Dictionary();

        this._express = express();
        this._InitRenderEngine(this._express);
        this._InitExpress(this._express);

        this._requireAuth = this._InitAuthenticationMiddleware(this._express);

        // Add middleware to make the `user` object available for all views
        this._express.use(function (req, res, next) {
            res.locals.user = env.APP.GetUser(req);
            next();
        });
        

    }

    /**
     * 
     * @param {*} p_express 
     */
    _InitExpress(p_express) {

        //p_express.use(logger('dev'));
        p_express.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
        p_express.use(express.static(path.join(__dirname, 'public')));
        p_express.use(express.json());
        p_express.use(express.urlencoded({ extended: true }))

        // Add CORS Middleware
        p_express.use(cors({
            origin: (p_origin, next) => {
                if (!this._whitelist || this._whitelist.includes(p_origin)) {
                    next(null, true);
                } else {
                    next(new Error('Not allowed by CORS'));
                }
            },
            credentials: true
        }));

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

    _InitAuthenticationMiddleware(p_express) {
        return false;
    }

    GetUser(p_req) { return null; }
    IsAuthenticated(p_req) { return true; }

    _PostInit() {

        this._InitAPIs();

        let apis = [];

        this._apiMap.keys.forEach(key => { apis.push(this._apiMap.Get(key)); });

        apis.sort((a, b) => { return a.route.localeCompare(b.route) * -1; });
        apis.forEach(api => { api.Start(); });
        apis.length = 0;

        this._InitErrorHandlers(this._express);

    }

    _InitAPIs() { }

    /**
     * 
     * @param {*} p_express 
     */
    _InitErrorHandlers(p_express) {

        // Catch 404 and forward to error handler
        p_express.use(function (req, res, next) {
            const err = new Error('Not Found');
            err.status = STATUSES.NOT_FOUND.code;
            next(err);
        });

        // Error handlers
        p_express.use(function (err, req, res, next) {
            let status = err.status || STATUSES.INTERNAL_SERVER_ERROR.code;
            res.status(status);
            res.render('error', {
                status: status,
                message: err.message,
                error: process.env.NODE_ENV !== 'production' ? err : {}
            });
        });

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
        api.requireAuth = p_config.requireAuth ? this._authFn : false;
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