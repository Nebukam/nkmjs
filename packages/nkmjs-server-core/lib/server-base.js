'use strict';
const io = require(`@nkmjs/server-io`);
const u = require(`@nkmjs/utils`);
const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const collections = require(`@nkmjs/collections`);

env.ENV.features._isNodeEnabled = true;

const dotenv = require('dotenv');

const fs = require(`fs`);

const http = require('http');
const express = require(`express`);
const fileUpload = require('express-fileupload');
const cors = require("cors");

const path = require(`path`);

const APIDefinition = require("./api-definition");
const FLAGS = require(`./flags`);
const STATUSES = require('./status-codes');
const handlers = require('./handlers');
const operations = require(`./operations`);

class ServerBase extends com.Observable {

    constructor(p_constants) {
        super();

        this._useWebsockets = false;
        this._wss = null;

        this._appendPortToBase = true;

        env.ENV._app = this;

        u.LOG.toggle(true);

        operations.Manager.defaultHandler = handlers.Operation;
        operations.Actions.defaultHandler = handlers.Action;

        this._starting = false;
        this._config = p_constants;

        dotenv.config({ path: this._config.envPath });

        if (process.env.NODE_MAX_MEMORY) {//268435456

            console.log(`------------`);
            console.log(`NODE MEMORY LIMIT SET TO ${process.env.NODE_MAX_MEMORY} bytes (${process.env.NODE_MAX_MEMORY / 1048576}mb)`);
            console.log(`------------`);

            require('v8').setFlagsFromString(`--max_old_space_size=${process.env.NODE_MAX_MEMORY}`);

        }

        this._dirName = this._config.dirname;
        this._dirServer = this._config.dirServer;
        this._dirViews = this._config.dirViews;
        this._dirPublic = path.join(this._dirName, 'public');

        this._staticPaths = [this._dirPublic];
        this._viewPaths = [this._dirViews];

        ///

        let ioservices = [];
        this._RegisterIOServices(ioservices);

        let waitForIO = ioservices.length ? true : false;
        if (waitForIO) {

            let
                dict = new collections.Dictionary(),
                ios = [];

            for (const conf of ioservices) {

                let mainConf = dict.Get(conf.cl);

                if (!mainConf) {
                    ios.push(conf.cl);
                    mainConf = { ...conf.config };
                    if (!mainConf.transceivers) { mainConf.transceivers = []; }
                    dict.Set(conf.cl, mainConf);
                    continue;
                }

                for (var p in conf.config) {
                    let value = conf.config[p];
                    if (p == `transceivers`) {
                        mainConf.transceivers.push(...value);
                    } else { mainConf[p] = value; }
                }

            };

            for (const ioss of ios) { io.IO_SERVICES.Use(ioss, dict.Get(ioss)); };

            dict.Clear();
            io.IO_SERVICES.WatchOnce(com.SIGNAL.READY, () => {
                if (this._starting) { this._PrepareInternalInit(); }
            });

        } else {
            console.warn(`⚠️  No IO Service registered.`);
            console.log(__dirname);
        }

        env.ENV.Start(p_constants);
        if ((!waitForIO || io.IO_SERVICES.ready) && this._starting) {
            this._PrepareInternalInit();
        }

    }

    get dirName() { return this._dirName; }
    get dirServer() { return this._dirServer; }
    get dirViews() { return this._dirViews; }
    get dirPublic() { return this._dirPublic; }

    get baseURL() { return this._appendPortToBase ? `${this._baseURL}:${this._port}` : this._baseURL; }

    //#region IO Services & Internal Preparation

    /**
     * Register services in the form { cl:IO_CLASS, options:{} }
     * @param {IOServiceSettings} p_ioConfigs 
     */
    _RegisterIOServices(p_ioConfigs) {

    }

    /**
     * Called by ENV when services are ready.
     */
    _InternalStart() {
        if (this._starting) { return; }
        this._starting = true;
    }

    async _PrepareInternalInit() {
        await this._InternalInit();
    }

    //#endregion

    async _InternalInit() {

        this._internalInit = true;
        this._requireAuth = false;
        this._port = process.env.PORT || 8080;
        this._baseURL = process.env.BASE_URL || `http://localhost:${this._port}`;

        this._whitelist = this._config.whitelist;
        this._authFn = null;

        await this._InitServer();
        await this._PostInitServer();

        if (this._useWebsockets) {
            await this._InitWebsockets();
            await this._PostInitWebsockets();
        }

        this._InternalBoot = this._InternalBoot.bind(this);

        this._server = http.createServer(this._express)
            .listen(this._port, this._InternalBoot);

    }

    //#region Server

    async _InitServer() {

        this._apiMap = new collections.Dictionary();

        this._express = express();
        await this._InitRenderEngine(this._express);
        await this._InitExpress(this._express);

        this._requireAuth = await this._InitAuthenticationMiddleware(this._express);

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

        for (const i of this._staticPaths) {

            let
                staticRoute = u.isArray(i) ? i[0] : null,
                staticPath = path.join(staticRoute ? i[1] : i);

            console.log(`static @${staticRoute} : ${staticPath}`);

            if (staticRoute) { p_express.use(staticRoute, express.static(staticPath)); }
            else { p_express.use(express.static(staticPath)); }

        };

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
    async _InitRenderEngine(p_express) {

        for (let i = 0; i < this._viewPaths.length; i++) {
            try { fs.statSync(this._viewPaths[i]); }
            catch (e) { this._viewPaths.splice(i, 1); i--; }
        }

        console.log(`>>> Render engine view directories:`, this._viewPaths);
        p_express.set('views', this._viewPaths);
        p_express.set('view engine', 'ejs');

    }

    async _InitAuthenticationMiddleware(p_express) { return false; }

    GetUser(p_req) { return null; }
    IsAuthenticated(p_req) { return true; }

    async _PostInitServer() {

        await this._InitAPIs();

        let apis = [];

        console.log(`· · · Routes · · ·`);

        //Create getter APIs

        for (const op of operations.Manager.List()) {
            this._RegisterAPI(op.id, {
                route: env.routing.Model(op.nfos),
                handler: op.handler || operations.Manager.defaultHandler,
                method: op.nfos.method || op.nfos.body ? FLAGS.POST : null,
                requireAuth: op.nfos.requireAuth
            })
        };

        let actions = operations.Actions.List();
        if (actions.length) {
            //Register generic action api
            this._RegisterAPI(`action`, {
                route: `${env.routing.actionPrefix}/:id`,
                handler: operations.Actions.defaultHandler,
                requireAuth: true
            });
        }

        for (const key of this._apiMap.keys) { apis.push(this._apiMap.Get(key)); };

        apis.sort((a, b) => { return a.route.localeCompare(b.route) * -1; });
        for (const api of apis) { api.Start(); };
        apis.length = 0;

        console.log(`· · · · · · · · ·`);

        this._InitErrorHandlers(this._express);

    }

    async _InitAPIs() { }

    /**
     * 
     * @param {*} p_express 
     */
    _InitErrorHandlers(p_express) {

        // Catch 404 and forward to error handler
        p_express.use(function (req, res, next) {
            console.log(req.url);
            const err = new Error('Not Found');
            err.status = STATUSES.NOT_FOUND.code;
            next(err);
        });

        // Error handlers
        p_express.use(function (err, req, res, next) {
            console.log(err);
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
            for (const api of p_apis) { this._RegisterAPI(`@${api.route}`, api); };
        } else {
            for (var identifier in p_apis) {
                let api = p_apis[identifier];
                this._RegisterAPI(identifier, api);
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
        if (api) { console.warn(`identifier '${p_identifier}' already in use, and will be overrwritten.`); }
        else { api = new APIDefinition(this._express, this); }

        api.id = p_identifier;
        api.mode = p_config.mode || null;
        api.route = p_config.route;
        api.handlerClass = p_config.handler;
        api.requireAuth = p_config.requireAuth ? this._authFn : false;
        api.options = p_config;

        this._apiMap.Set(p_identifier, api);

        if (p_config.owner) { p_config.owner[p_identifier] = api; }

        return api;

    }

    //#endregion

    //#region Websockets

    async _InitWebsockets() {
        let WebSocket = require('ws');
        this._wss = new WebSocket.Server(this._server);

        await this._InitWSRoutes();

        this._wss.on('connection', (ws) => {
            // Handle incoming WebSocket connections
            ws.on('message', (message) => {
                console.log('Received message:', message);

                // Handle the incoming message
                ws.send('Server received your message');
            });
        });

    }

    async _InitWSRoutes() {

    }

    async _PostInitWebsockets() {

    }

    //#endregion

    _InternalBoot() {
        let a = this._server.address();
        console.log(a);
        console.log(`Listening @ ${this._baseURL}`);
        this._Boot();
    }

    async _Boot() {

    }

}

module.exports = ServerBase;