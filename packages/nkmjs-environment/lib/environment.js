/**
 * This is the core facade for all system and apps.
 */
'use strict';

const u = require("@nkmjs/utils");
const { List } = require(`@nkmjs/collections`);
const com = require("@nkmjs/common");
const { ServicesManager, ServiceBase } = require(`@nkmjs/services`);

const ENV_SIGNAL = require(`./env-signal`);
const Features = require(`./helpers/features`);
const DOM_STATE = require(`./dom-state`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @memberof environment
 */
class ENV extends com.helpers.SingletonEx {

    constructor() { super(); }

    /**
     * @description TODO
     * @type {environment.helpers.Features}
     * @customtag read-only
     */
    static get FEATURES() { return this.instance._features; }

    /**
     * @description TODO
     * @type {app.core.AppBase}
     * @customtag read-only
     */
    static get APP() { return this.instance._app; }

    /**
     * @description TODO
     * @type {utils.Argv}
     * @customtag read-only
     */
    static get ARGV() { return this.instance._config.argv; }

    /**
     * @description TODO
     * @param {function} p_fn 
     * @customtag write-only
     */
    static onStart(p_fn) { this.instance._onStart.Add(p_fn); }

    /**
     * @description Checks whether nodejs is enabled and return the value
     * according to that.
     * @param {*} p_ifNodeIsEnabled
     * @param {*} p_ifNodeIsDisabled 
     * @returns {*} p_ifNodeIsEnabled if node is enabled, otherwise p_ifNodeIsDisabled
     */
    static IF_NODE(p_ifNodeIsEnabled, p_ifNodeIsDisabled) {
        return this.instance.features.isNodeEnabled ? p_ifNodeIsEnabled : p_ifNodeIsDisabled;
    }

    _Init() {

        super._Init();

        this._features = new Features();
        this._features.Watch(ENV_SIGNAL.ONLINE, this._OnEnvOnline, this);
        this._features.Watch(ENV_SIGNAL.OFFLINE, this._OnEnvOffline, this);

        this._app = null;
        this._config = null;

        this._started = false;
        this._running = false;

        this._services = new List();

        this._Bind(this._BootService);

        this._onStart = new com.helpers.CallList();

    }

    /**
     * @description TODO
     * @type {environment.helpers.Features}
     * @customtag read-only
     */
    get features() { return this._features; }

    // ----> 

    /**
     * @description TODO
     * @type {app.core.AppBase}
     * @customtag read-only
     */
    get app() { return this._app; }

    /**
     * @description TODO
     * @type {array}
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

        let serviceClass;

        if (this._running) {
            console.warn(`RegisterServices called post-Start. Be sure this is intended.`);
            args.forEach(this._BootService);
            return;
        }

        for (let i = 0, n = args.length; i < n; i++) { this._services.Add(args[i]); }

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

        if (this._started) { throw new Error(`Cannot ENV.Start more than once.`); }
        this._started = true;

        u.LOG._(`ENV : START`, `#33979b`, `#212121`);
        ENV.instance._features.List();

        if (ENV.instance._features.isBrowser) {
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
        console.log(this._config);

        if(p_config.argv.Has(`offline`)){
            this._features._isOnline = false;
        }

        // Register the service worker if available.
        let swPath = u.tils.Get(this._config, `service_worker`, false);
        if (swPath !== false) {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register(swPath)
                    .then(this._Bind(this._InternalStart))
                    .catch(this._Bind(this._OnServiceWorkerRegistrationError));
            } else {
                this._InternalStart();
            }
        } else {
            this._InternalStart();
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

    /**
     * @access private
     */
    _InternalStart() {

        let paths = this._config.paths;
        if (paths) { for (let member in paths) { u.PATH.SET(member, paths[member]); } }

        u.PATH.SET(`%ICON%`, `img/icons`);
        u.PATH.SET(`%PATTERN%`, `img/patterns`);

        // Initialize app, if any.
        let appClass = u.tils.Get(this._config, `renderer`, null);
        if (appClass) {
            u.LOG._(`ENV : App found (${appClass.name})`, `#33979b`, `#212121`);
            this._app = new appClass();
        } else {
            u.LOG._(`ENV : App not found`, `#fff`, `#980700`);
        }


        ServicesManager.instance.Boot();
        this._services.ForEach(this._BootService);

        // Only dispatch ENV_SIGNAL.START once the DOM is ready.
        // otherwise _OnStart() will be called in _OnDOMReady
        if (this._features.isBrowser) {

            switch (this._features.domState) {
                case DOM_STATE.NONE:
                case DOM_STATE.LOADING:
                case DOM_STATE.INTERACTIVE:
                    if (this._features.domState == DOM_STATE.INTERACTIVE && this._app) { this._app.SetUp(); }
                    this._features.Watch(ENV_SIGNAL.DOMSTATE_CHANGED, this._OnDOMStateChanged, this);
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
                this._features.Unwatch(ENV_SIGNAL.DOMSTATE_CHANGED, this._OnDOMStateChanged, this);
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
        this._Broadcast(ENV_SIGNAL.START, this);

    }

    /**
     * @access private
     * @description InitializeAndStart a single service from its constructor
     * @param {services.ServiceBase} p_serviceClass 
     */
    _BootService(p_serviceClass) {
        if (!u.tils.isInstanceOf(p_serviceClass, ServiceBase)) {
            throw new Error(`${p_serviceClass} is not a service.`);
        }
        p_serviceClass.instance.InitializeAndStart(this);
    }

    //

    /**
     * @access private
     */
    _OnEnvOnline() { this._Broadcast(ENV_SIGNAL.ONLINE); }

    /**
     * @access private
     */
    _OnEnvOffline() { this._Broadcast(ENV_SIGNAL.OFFLINE); }

}

module.exports = ENV;