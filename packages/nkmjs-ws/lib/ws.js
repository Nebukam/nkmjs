const com = require(`@nkmjs/common`);
const env = require(`@nkmjs/environment`);
const col = require(`@nkmjs/collections`);
const services = require(`@nkmjs/services`);

class WS extends services.ServiceBase {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

}

module.exports = new WS();