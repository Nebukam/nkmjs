'use strict';
const io = require(`@nkmjs/server-io`);
const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const collections = require(`@nkmjs/collections`);

env.ENV.features._isNodeEnabled = true;

const dotenv = require('dotenv');

const http = require('http');
const express = require(`express`);
const fileUpload = require('express-fileupload');
const cors = require("cors");

const path = require(`path`);

const APIDefinition = require("./api-definition");
const STATUSES = require('./status-codes');
const handlers = require('./handlers');

class ServerBase extends com.Observable {

    constructor(p_constants) {
        super();

        env.ENV._app = this;

        u.LOG.toggle(true);

        this._starting = false;
        this._config = p_constants;
        dotenv.config({ path: this._config.envPath });

        this._dirName = this._config.dirname;
        this._dirServer = this._config.dirServer;
        this._dirViews = this._config.dirViews;
        this._dirPublic = path.join(this._config.dirname, 'public');

        //TODO: Make this an array which items are either
        //a string or [string,string] (route/path)
        this._staticPaths = [this._dirPublic];

        let ioservices = [];
        this._RegisterIOServices(ioservices);

        this._waitForIO = ioservices.length ? true : false;
        this._ioReady = !this._waitForIO;

        if (this._waitForIO) {

            let
                dict = new collections.Dictionary(),
                ios = [];

            ioservices.forEach(conf => {

                let mainConf = dict.Get(conf.cl);
                if (!mainConf) {
                    ios.push(conf.cl);
                    mainConf = { ...conf.config };
                    if (!mainConf.transceivers) { mainConf.transceivers = []; }
                    dict.Set(conf.cl, mainConf);
                    return;
                }

                for (var p in conf.config) {
                    let value = conf.config[p];
                    if (p == `transceivers`) {
                        mainConf.transceivers.push(...value);
                    } else { mainConf[p] = value; }
                }

            });

            ios.forEach(ioss => { io.IO_SERVICES.Use(ioss, dict.Get(ioss)); });
            dict.Clear();
            io.IO_SERVICES.WatchOnce(com.SIGNAL.READY, this._OnIOReady.bind(this));
        } else {
            console.warn(`⚠️  No IO Service registered.`);
            console.log(__dirname);
        }

        env.ENV.Start(p_constants);

    }

    get dirName() { return this._dirName; }
    get dirServer() { return this._dirServer; }
    get dirViews() { return this._dirViews; }
    get dirPublic() { return this._dirPublic; }

    /**
     * Register services in the form { cl:IO_CLASS, options:{} }
     * @param {IOServiceSettings} p_ioConfigs 
     */
    _RegisterIOServices(p_ioConfigs) {

    }

    _OnIOReady() {
        if (!this._starting) { return; }
        this._PrepareInternalInit();
    }

    /**
     * Called by ENV when services are ready.
     */
    _InternalStart() {
        if (this._starting) { return; }
        this._starting = true;

        com.time.TIME._ScheduleNextTick();
        if (io.IO_SERVICES.ready) { this._PrepareInternalInit(); }
    }

    _PrepareInternalInit() {

        if (this._IsReadyForInit()) { this._InternalInit(); }
        else { this._delayedCheck = setInterval(this._Bind(this._CheckPreparation), 1000); }
    }

    _CheckPreparation() {
        if (this._IsReadyForInit()) {
            this._InternalInit();
            clearInterval(this._delayedCheck);
        }
    }

    /**
     * Return true by default. This is where you can test for server readyness and things like that.
     * @returns true if the app is ready for display, false otherwise
     */
    _IsReadyForInit() {
        return true;
    }

    _InternalInit() {

        this._internalInit = true;
        this._requireAuth = false;
        this._port = process.env.PORT || 8080;
        this._baseURL = process.env.BASE_URL || `http://localhost:${this._port}`;

        this._whitelist = this._config.whitelist;
        this._authFn = null;

        this._InitServer();
        this._PostInitServer();

        this._InternalBoot = this._InternalBoot.bind(this);

        this._server = http.createServer(this._express)
            .listen(this._port, this._InternalBoot);

    }

    _InitServer() {

        this._apiMap = new collections.Dictionary();

        this._express = express();
        this._InitRenderEngine(this._express);
        this._InitExpress(this._express);

        this._requireAuth = this._InitAuthenticationMiddleware(this._express);

        // Add middleware to make the `user` object available for all views
        this._express.use(function (req, res, next) {
            let user = env.app.GetUser(req);
            req.user = user;
            res.locals.user = user;
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

        this._staticPaths.forEach(i => {
            if (u.isString(i)) { p_express.use(express.static(i)); }
            else if (u.isArray(i) && i.length == 2) { p_express.use(i[0], express.static(i[1])); }
            else { console.warn(`Invalid static route config: ${i}`) }
        });

        p_express.use(express.json());
        p_express.use(express.urlencoded({ extended: true }));



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

        let viewPath = this._dirViews;
        console.log(`>>> Render engine view directory: '${viewPath}'`);
        p_express.set('views', viewPath);
        p_express.set('view engine', 'ejs');

    }

    _InitAuthenticationMiddleware(p_express) {
        return false;
    }

    GetUser(p_req) { return null; }
    IsAuthenticated(p_req) { return true; }

    _PostInitServer() {

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
            p_apis.forEach(api => { this._RegisterAPI(`@${api.route}`, api); });
        } else {
            for (var identifier in p_apis) {
                let api = p_apis[identifier];
                this._RegisterAPI(`@${api.route}`, api);
            }
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
        console.log(a);
        console.log(`Listening @ ${this._baseURL}`);
        this._Boot();
    }

    _Boot() {

    }

}

module.exports = ServerBase;