const services = require(`@nkmjs/services`);
const com = require(`@nkmjs/common`);

class BaseIOService extends services.ServiceBase {
    constructor() { super(); }

    static __transceiverClass = null;

    _Init() {
        super._Init();
        this._map = {};
    }

    Mount(p_rootPath, p_options = null) {

        if (p_rootPath in this._map) {
            throw new Error(`Transceiver '${p_rootPath}' already exists.`);
        }

        let newTransceiver = com.Rent(this.constructor.__transceiverClass);
        this._map[p_rootPath] = newTransceiver;
        newTransceiver.Start(p_options);

        return newTransceiver;
        
    }

}

module.exports = BaseIOService;