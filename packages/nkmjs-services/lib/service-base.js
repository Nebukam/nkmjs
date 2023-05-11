'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const ServicesManager = require(`./services-manager`);
const SIGNAL = require(`./signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.Observable
 * @memberof services
 */
class ServiceBase extends com.Observable {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._initialized = false;
        this._starting = false;
        this._started = false;
        this._running = false;
        this._tick = com.DelayedCall(this._Bind(this._Tick));
        
        this._Bind(this._OnStarted);
    }

    /**
     * @description TODO
     */
    Initialize() {
        if (this._initialized) { return; }

        ServicesManager.Register(this);
        this._initialized = true;
    }

    /**
     * @description TODO
     */
    InitializeAndStart() {
        this.Initialize();
        this.Start();
    }

    get starting() { return this._starting; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get started() { return this._started; }

    /**
     * @description TODO
     * @type {boolean}
     * @customtag read-only
     */
    get running() { return this._running; }

    /**
     * @description TODO
     */
    Start() {
        if (!this._initialized) {
            console.error(`Attempting to start a service (${this.constructor.name}) that hasn't been initialized yet.`);
            return false;
        }
        if (this._starting || this._started) { return false; }
        u.LOG._(`<${this.constructor.name}>`, `#586e00`, `#1b2100`);
        this._started = false;
        this._starting = true;
        this.Broadcast(SIGNAL.STARTING, this);
        this._InternalStart();
        return true;
    }

    _InternalStart() {
        this._OnStarted();
    }

    _OnStarted() {
        this._starting = false;
        this._started = true;
        u.LOG._(`</${this.constructor.name}>`, `#add800`, `#2e3a00`);
        this.Broadcast(SIGNAL.STARTED, this);
    }

    /**
     * @description TODO
     */
    Stop() {
        if (!this._started) { return; }
        //TODO: Handle situation is this._starting == true
        this._started = false;
        u.LOG._(`<//${this.constructor.name}>`, `#ef8700`, `#492900`);
    }

    /**
     * @description TODO
     */
    Restart() {

    }

    _Tick(p_delta) {

    }

}

module.exports = ServiceBase;