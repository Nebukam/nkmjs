const services = require(`@nkmjs/services`);
const com = require(`@nkmjs/common`);

class BaseIOService extends services.ServiceBase {
    constructor() { super(); }

    static __transceiverClass = null;

    _Init() {
        super._Init();
        this._map = {};
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
                if (p_transceiver.id) {
                    this.constructor[p_transceiver.id] = p_transceiver;
                    console.log(` ┗ ${this.constructor.name} ━ New Transceiver (${p_transceiver.id}) registered ('${p_transceiver.identifier}')`);
                } else {
                    console.log(` ┗ ${this.constructor.name} ━ New Transceiver (NO ID) registered ('${p_transceiver.identifier}')`);
                }
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
            transceivers.forEach(t => { this.Mount(t.identifier, t); });
        } else {
            this._MountingComplete();
        }
    }

    _MountingComplete() {
        this._OnStarted();
    }

    Mount(p_identifier, p_options = null) {

        if (p_identifier in this._map) {
            throw new Error(`Transceiver '${p_identifier}' already exists.`);
        }

        if (!this._starting) { this._registeredTransceivers++; }

        let newTransceiver = com.Rent(this.constructor.__transceiverClass);
        newTransceiver.service = this;
        newTransceiver.identifier = p_identifier;

        this._map[p_identifier] = newTransceiver;

        this._transceiverObserver.Observe(newTransceiver);
        newTransceiver.Start(p_options);

        return newTransceiver;

    }

}

module.exports = BaseIOService;