const nkm = require(`@nkmjs/core/nkmserver`);

class SERVER_IO_FS extends nkm.io.BaseIOService {
    constructor() { super(); }

    static __transceiverClass = require(`./transceiver-fs`);

    _Init() {
        super._Init();
        this._defaultConfig = {
            transceivers: [
                {
                    root: nkm.main.dirServer,
                    uid: `dirServer`
                },
                {
                    root: nkm.main.dirPublic,
                    uid: `dirPublic`
                }
            ]
        }
    }

}

module.exports = SERVER_IO_FS;