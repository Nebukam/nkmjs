const nkm = require(`@nkmjs/core/nkmserver`);

class IO extends nkm.io.BaseIOService {
    constructor() { super(); }

    static __transceiverClass = require(`./transceiver`);

    _Init() {
        super._Init();
    }

}

module.exports = IO;