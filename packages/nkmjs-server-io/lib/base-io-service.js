const collections = require(`@nkmjs/collections`);
const com = require(`@nkmjs/common`);
const services = require(`@nkmjs/services`);

class BaseIOService extends services.ServiceBase {
    constructor() { super(); }

    static __transceiverClass = null;

    _Init() {
        super._Init();

        this._map = {};
        this._transceivers = new collections.List();
        this._defaultConfig = null;
        this._config = null;

        this._registeredTransceivers = 0;
        this._startedTransceivers = 0;

        this._transceiverObserver = new com.signals.Observer();
        this._transceiverObserver
            .Hook(services.SIGNAL.STARTING, (p_transceiver) => {

            })
            .Hook(services.SIGNAL.STARTED, (p_transceiver) => {
                this._startedTransceivers++;
                this.constructor[p_transceiver.uid] = p_transceiver;
                console.log(` ⇆ ${p_transceiver.constructor.name} | (${p_transceiver.uid} >> '${p_transceiver.prefix}${p_transceiver.root}')`);
                if (this._starting) {
                    if (this._startedTransceivers == this._registeredTransceivers) {
                        this._MountingComplete();
                    }
                }
            })
            .Hook(services.SIGNAL.STOPPING, (p_transceiver) => {

            })
            .Hook(services.SIGNAL.STOPPED, (p_transceiver) => {
                this._startedTransceivers--;
            });

    }

    _InternalStart() {

        if (this._defaultConfig) {
            if (this._config) {
                //Merge default config into provided one
                for (var id in this._defaultConfig) {
                    if (id in this._config) {
                        if (id == `transceivers`) {
                            this._defaultConfig.transceivers.forEach(tr => {
                                this._config.transceivers.push(tr);
                            });
                        }
                        continue;
                    }
                    this._config[id] = this._defaultConfig[id];
                }
            } else {
                this._config = this._defaultConfig;
            }
        }

        if (this._config) {
            this._StartConfiguration();
        } else {
            this._OnStarted();
        }
    }

    _StartConfiguration() {
        this._OnConfigurationComplete();
    }

    _OnConfigurationComplete() {
        let transceivers = this._config.transceivers;
        if (transceivers) {
            this._registeredTransceivers += transceivers.length;
            transceivers.forEach(t => { this.Mount(t); });
        } else {
            this._MountingComplete();
        }
    }

    _MountingComplete() {
        this._OnStarted();
    }

    Mount(p_config) {

        if (!p_config.uid) { p_config.uid = `@${p_config.root}`; }

        let uid = p_config.uid;
        if (uid in this._map) {
            console.log(`⚠️     Transceiver '${uid}' already exists and will be overwritten.   ⚠️`);
        }

        if (!this._starting) { this._registeredTransceivers++; }

        let newTransceiver = com.Rent(this.constructor.__transceiverClass);
        this._transceivers.Add(newTransceiver)

        newTransceiver.service = this;
        newTransceiver.root = p_config.root;
        newTransceiver.uid = uid;

        this._map[uid] = newTransceiver;
        this[uid] = newTransceiver;

        this._transceiverObserver.Observe(newTransceiver);
        newTransceiver.Start(p_config);

        return newTransceiver;

    }

}

module.exports = BaseIOService;