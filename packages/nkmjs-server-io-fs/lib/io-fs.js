const nkm = require(`@nkmjs/core/nkmserver`);

class SERVER_IO_FS extends nkm.io.BaseIOService {
    constructor() { super(); }

    static __transceiverClass = require(`./transceiver-fs`);

    _InternalStart() {

        this._defaultConfig = {
            transceivers: [
                {
                    root: nkm.main.dirServer,
                    uid: `dirServer`,
                    prependRoot:true
                },
                {
                    root: nkm.main.dirPublic,
                    uid: `dirPublic`,
                    prependRoot:true
                }
            ]
        }

        super._InternalStart();

    }

}

module.exports = new SERVER_IO_FS();