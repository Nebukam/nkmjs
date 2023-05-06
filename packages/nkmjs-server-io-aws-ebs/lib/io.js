const nkm = require(`@nkmjs/core/nkmserver`);
const nkmAWS = require(`@nkmjs/server-io-aws`);

class IO extends nkmAWS.IO {
    constructor() { super(); }

    static __transceiverClass = require(`./transceiver`);

    _Init() {
        super._Init();
    }

}

module.exports = IO;