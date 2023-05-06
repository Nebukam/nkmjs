const nkm = require(`@nkmjs/core/nkmserver`);
const nkmAWS = require(`@nkmjs/server-io-aws`);

class SERVER_IO_AWS_S3 extends nkmAWS.IO {
    constructor() { super(); }

    static __transceiverClass = require(`./transceiver`);

    _Init() {
        super._Init();
    }

}

module.exports = SERVER_IO_AWS_S3;