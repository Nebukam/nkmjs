const nkm = require(`@nkmjs/core/nkmserver`);

class SERVER_IO_FS extends nkm.io.BaseIOService {
    constructor() { super(); }
    
    static __transceiverClass = require(`./transceiver-fs`);

    _Init(){
        super._Init();
        this._defaultConfig ={
            transceivers:[
                {
                    identifier:nkm.main.dirServer,
                    id:`dirServer`
                },
                {
                    identifier:nkm.main.dirPublic,
                    id:`dirPublic`
                }
            ]
        }
    }

}

module.exports = SERVER_IO_FS;