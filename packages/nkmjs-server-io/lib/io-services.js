const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const collections = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);

class IO_SERVICES extends com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {
        super._Init();

        this._defaultIO = null;

        this._ioServices = new collections.List();

        this._servicesCount = 0;
        this._startCount = 0;
        this._ready = false;

        this._Bind(this._OnServiceStarted);

    }

    static get ready() { return this.instance._ready; }

    static get defaultIO() { return this.instance._defaultIO; }
    static set defaultIO(p_value) { this.instance._defaultIO = p_value; }

    /**
     * @typedef TokensSettings
     * @property {object} tokens
     * @property {string} [start]
     * @property {string} [end]
     */

    /**
     * @typedef TransceiverSettings
     * @property {string} [id]
     * @property {string} [delimiter]
     * @property {boolean} [readOnly]
     * @property {TokensSettings} [tokens]
     * @property {boolean} [recursive]
     */

    /**
     * @typedef IOServiceConfig
     * @property {class} cl IO_CLASS
     * @property {object} config
     * @property {[TransceiverSettings]} config.transceivers
     */

    /**
     * 
     * @param {Class} p_serviceClass 
     * @param {IOServiceConfig} [p_config] 
     * @param {boolean} [p_setAsDefault] 
     * @returns 
     */
    static Use(p_serviceClass, p_config, p_setAsDefault = false) {

        if (!this.instance._ioServices.Add(p_serviceClass)) { return p_serviceClass; }

        this.instance._servicesCount++;
        p_serviceClass.instance.Watch(services.SIGNAL.STARTED, this.instance._OnServiceStarted);

        p_serviceClass.instance._config = p_config;
        env.ENV.instance.RegisterServices(p_serviceClass);

        if (p_setAsDefault || !this.defaultIO) {
            this.defaultIO = p_serviceClass;
        }

        return p_serviceClass;

    }

    _OnServiceStarted(p_service) {
        if (this._ready) { return; }
        this._startCount++;
        if (this._startCount == this._servicesCount) {
            // All registered services ready
            this._ready = true;
            this.Broadcast(com.SIGNAL.READY, this);
        }
    }

}

module.exports = IO_SERVICES;