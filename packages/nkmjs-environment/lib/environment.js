/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const col = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const services = require(`@nkmjs/services`);

const SIGNAL = require(`./signal`);
const SW_SIGNAL = require(`./sw-signal`);
const Features = require(`./helpers/features`);
const DOM_STATE = require(`./dom-state`);
const ServiceWorkerHandler = require(`./helpers/service-worker-handler`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class ENV extends com.Observable {
    constructor() { super(); }

    /**
     * @description TODO
     * @type {utils.Argv}
     * @customtag read-only
     */
    get ARGV() { return this._config.argv; }

    /**
     * @description TODO
     * @param {function} p_fn 
     * @customtag write-only
     */
    onStart(p_fn) { this._onStart.Add(p_fn); }

    /**
     * @description Checks whether nodejs is enabled and return the value
     * according to that.
     * @param {*} p_ifNodeIsEnabled
     * @param {*} p_ifNodeIsDisabled 
     * @returns {*} p_ifNodeIsEnabled if node is enabled, otherwise p_ifNodeIsDisabled
     */
    IF_NODE(p_ifNodeIsEnabled, p_ifNodeIsDisabled) {
        return this.features.isNodeEnabled ? p_ifNodeIsEnabled : p_ifNodeIsDisabled;
    }

    _Init() {

        super._Init();

        this._features = new Features();
        this._features
            .Watch(SIGNAL.ONLINE, this._OnEnvOnline, this)
            .Watch(SIGNAL.OFFLINE, this._OnEnvOffline, this);

        this._app = null;
        this._appName = `nkmjs-app`;
        this._config = null;

        this._updateQueued = false;
        this._started = false;
        this._running = false;

        this._services = [];
        this._pwaSWHandler = new ServiceWorkerHandler();
        this._pwaSWHandler
            .Watch(SW_SIGNAL.SW_READY, this._OnServiceWorkerReady, this)
            .Watch(SW_SIGNAL.SW_UPDATE_AVAILABLE, this._OnServiceWorkerUpdateAvailable, this)
            .Watch(SW_SIGNAL.SW_REGISTRATION_ERROR, this._OnServiceWorkerRegistrationError, this);

        this._Bind(this._BootService);

        this._onStart = new com.helpers.CallList();

        this._useFetchRequestAsDefault = false;
        this._manifestVersion = 0;

        this._semVer = [0, 0, 0];

    }

    set useFetchRequestAsDefault(p_value) { this._useFetchRequestAsDefault = p_value; }
    get useFetchRequestAsDefault() { return this._useFetchRequestAsDefault; }

    get manifestVersion() { return this._manifestVersion; }

    /**
     * @description TODO
     * @type {environment.helpers.Features}
     * @customtag read-only
     */
    get features() { return this._features; }

    // ----> 

    /**
     * @description TODO
     * @type {nkm.app.AppBase}
     * @customtag read-only
     */
    get app() { return this._app; }

    /**
     * @description TODO
     * @type {Array}
     * @customtag read-only
     */
    get paths() { return this._config.paths; }

    /**
     * @description TODO
     * @type {object}
     * @customtag read-only
     */
    get config() { return this._config; }

    /**
     * @description Add any number of services to be started during bootstrap.
     * @param  {...services.ServiceBase} args Service constructor to InitializeAndStart
     */
    RegisterServices(...args) {

        for (const serviceClass of args) {
            if (this._services.AddNew(serviceClass)) {
                if (this._running) {
                    console.warn(`RegisterServices called post-Start. Make sure this is intended.`);
                    this._BootService(serviceClass);
                }
            }
        };

    }

    /**
     * 
     * @param {Array} p_semVer [0,0,0]
     * @return -1 : p_semVer is inferior, 1: p_semVer is superior, 0 : p_semVer == 
     */
    VersionDiff(p_semVer) {

        for (let i = 0; i < 3; i++) {
            let t = p_semVer[i], c = this._semVer[i];
            if (t < c) { return -1; }
            else if (t > c) { return 1; }
        }

        return 0;
    }

    /**
     * @description Starts the environment : 
     * - process the provided config object
     * - register & initialize the registered services
     * @param {object} p_config 
     * @param {object} p_config.paths
     * @param {object} p_config.argv
     * @param {object} p_config.app
     * @param {object} p_config.service_worker
     */
    Start(p_config) {

        if (this._started) { throw new Error(`Cannot this.Start more than once.`); }
        this._started = true;

        this._manifestVersion = p_config ? (p_config.manifestVersion || 0) : 0;
        this._features._manifestVersion = this._manifestVersion;

        if (p_config) {

            this._appName = p_config.appName || `nkmjs-app`;

            if (p_config.version) {
                try {
                    this._semVer = p_config.version.split(`.`);
                    this._semVer.length = 3;
                    for (let i = 0; i < 3; i++) { this._semVer[i] = Number(this._semVer[i]); }
                } catch (e) {
                    console.warn(`Malformed version : ${p_config.version}`);
                }
            }
        }

        // Use service worker to handle HTTP requests if extension manifest v3
        //if(this._manifestVersion == 3){ this._useFetchRequestAsDefault = true; }

        u.LOG._(`⏵ENV`, `#33979b`, `#212121`);

        this._features.List();

        if (this._features.isBrowser) {
            if (!p_config.argv) {
                // Feed URL params to argv
                var argvs = new u.Argv();
                let searchParams = new URLSearchParams(window.location.search);
                searchParams.forEach((p_val, p_key) => { argvs[p_key] = p_val });
                p_config.argv = argvs;
            } else {
                p_config.argv = new u.Argv(p_config.argv);
            }
        } else {
            p_config.argv = new u.Argv(p_config.argv);
        }

        this._config = p_config;

        if (p_config.argv.Has(`offline`)) {
            this._features._isOnline = false;
        }

        // Register the service worker if available.
        let swPath = p_config.service_worker || false;
        if (swPath !== false) {
            if (!this._pwaSWHandler.Register(swPath)) { this._InternalStart(); }
        } else {
            this._InternalStart();
        }

    }


    // ----> Service Worker handling

    _OnServiceWorkerReady() {
        this._InternalStart();
    }

    _OnServiceWorkerUpdateAvailable() {
        if (!this._running) {
            this._updateQueued = true; // ENV will call again when running.
        } else {
            this.Broadcast(SIGNAL.PWA_UPDATE_AVAILABLE);
        }
    }

    /**
     * @access private
     * @param {*} err 
     */
    _OnServiceWorkerRegistrationError(err) {
        console.warn('Error whilst registering service worker', err);
        this._InternalStart();
    }


    // ----> Start

    /**
     * @access private
     */
    _InternalStart() {

        let paths = this._config.paths;
        if (paths) { for (let member in paths) { u.PATH.SET(member, paths[member]); } }

        if (!this._app) {
            // Initialize app, if any.
            let appClass = this._config.renderer || null;
            if (appClass) {
                u.LOG._(`ENV : App found (${appClass.name})`, `#33979b`, `#212121`);
                this._app = new appClass();
            } else {
                u.LOG._(`ENV : App not found`, `#fff`, `#980700`);
            }
        } else {
            u.LOG._(`ENV : App set to ${this._app.constructor.name}`, `#fff`, `#980700`);
        }


        services.ServicesManager.Boot();
        this._ProcessNextService();

    }

    _ProcessNextService() {

        if (!this._services.length) {
            this._OnServicesReady();
            return;
        }

        let newService = this._services.shift();
        newService.WatchOnce(services.SIGNAL.STARTED, () => { this._ProcessNextService(); });

        this._BootService(newService);

    }

    /**
     * @access private
     * @description InitializeAndStart a single service from its constructor
     * @param {services.ServiceBase} p_serviceClass 
     */
    _BootService(p_serviceClass) {
        if (!u.isInstanceOf(p_serviceClass, services.ServiceBase)) {
            throw new Error(`${p_serviceClass} is not a service.`);
        }
        p_serviceClass.InitializeAndStart(this);
    }

    _OnServicesReady() {

        u.LOG._(`All services ready!`, `#33979b`, `#212121`);
        //this._services.forEach(this._BootService);

        // Only dispatch SIGNAL.START once the DOM is ready.
        // otherwise _OnStart() will be called in _OnDOMReady
        if (this._features.isBrowser) {

            switch (this._features.domState) {
                case DOM_STATE.NONE:
                case DOM_STATE.LOADING:
                case DOM_STATE.INTERACTIVE:
                    if (this._features.domState == DOM_STATE.INTERACTIVE && this._app) { this._app.SetUp(); }
                    this._features.Watch(SIGNAL.DOMSTATE_CHANGED, this._OnDOMStateChanged, this);
                    break;
                case DOM_STATE.COMPLETE:
                    if (this._app) { this._app.SetUp(); }
                    this._OnStart();
                    break;
            }

        } else {
            this._OnStart();
        }

    }

    /**
     * @access private
     * @param {*} state 
     */
    _OnDOMStateChanged(state) {
        switch (this._features.domState) {
            case DOM_STATE.LOADING:
                break;
            case DOM_STATE.INTERACTIVE:
                if (this._app) { this._app.SetUp(); }
                break;
            case DOM_STATE.COMPLETE:
                this._features.Unwatch(SIGNAL.DOMSTATE_CHANGED, this._OnDOMStateChanged, this);
                this._OnStart();
                break;
        }
    }

    /**
     * @access private
     * @description Commit environment start
     */
    _OnStart() {

        if (this._running) { return; }
        this._running = true;

        if (this._app) { this._app._InternalStart(); }

        this._onStart.Notify(this).Clear();
        this.Broadcast(SIGNAL.START, this);

        if (this._updateQueued) { this._OnServiceWorkerUpdateAvailable(); }

    }

    //

    /**
     * @access private
     */
    _OnEnvOnline() { this.Broadcast(SIGNAL.ONLINE); }

    /**
     * @access private
     */
    _OnEnvOffline() { this.Broadcast(SIGNAL.OFFLINE); }

}

module.exports = new ENV();