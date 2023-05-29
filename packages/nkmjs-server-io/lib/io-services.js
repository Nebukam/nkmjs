const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const col = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);

class IO_SERVICES extends com.Observable { // PORT_TO_MODULE
    constructor() { super(); }

    _Init() {
        super._Init();

        this._defaultIO = null;

        this._ioServices = [];
        this._queue = [];

        this._ready = false;

    }

    get ready() { return this._ready; }

    get defaultIO() { return this._defaultIO; }
    set defaultIO(p_value) { this._defaultIO = p_value; }

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
    Use(p_serviceClass, p_config, p_setAsDefault = false) {

        if (this._ready) { throw new Error(`Cannot register new IO Services after boot`); }

        if (!this._ioServices.AddNew(p_serviceClass)) { return p_serviceClass; }

        this._ready = false;

        this._queue.Add(p_serviceClass);
        p_serviceClass.Watch(services.SIGNAL.STARTED, (p_service) => {
            this._queue.Remove(p_service);
            if (!this._queue.length) { this._OnServiceQueueEmpty(); }
        });

        p_serviceClass._config = p_config;
        env.ENV.RegisterServices(p_serviceClass);

        if (p_setAsDefault || !this.defaultIO) {
            this.defaultIO = p_serviceClass;
        }

        return p_serviceClass;

    }

    _OnServiceQueueEmpty() {
        if (this._ready) { return; }
        this._ready = true;
        this.Broadcast(com.SIGNAL.READY, this);

    }

}

module.exports = new IO_SERVICES();