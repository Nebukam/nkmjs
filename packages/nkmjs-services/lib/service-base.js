'use strict';

const { LOG } = require(`@nkmjs/utils`);
const { SingletonEx, DelayedCall } = require(`@nkmjs/common`);
const ServicesManager = require(`./services-manager`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.helpers.SingletonEx
 * @memberof services
 */
class ServiceBase extends SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._initialized = false;
        this._started = false;
        this._running = false;
        this._tick = new DelayedCall(this._Bind(this._Tick));
    }

    /**
     * @description TODO
     */
    Initialize() {
        if (this._initialized) { return; }

        ServicesManager.instance.Register(this);
        this._initialized = true;
    }

    /**
     * @description TODO
     */
    InitializeAndStart() {
        this.Initialize();
        this.Start();
    }

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
        if (this._started) { return false; }
        this._started = true;
        LOG._(`STARTED :· ${this.constructor.name}`, `#add800`, `#2e3a00`);
        return true;
    }

    /**
     * @description TODO
     */
    Stop() {
        if (!this._started) { return; }
        this._started = false;
        LOG._(`STOPPED :: ${this.constructor.name}`, `#ef8700`, `#492900`);
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