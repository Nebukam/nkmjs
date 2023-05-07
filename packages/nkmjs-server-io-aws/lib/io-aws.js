const nkm = require(`@nkmjs/core/nkmserver`);

const AWS = require(`./aws`);

class SERVER_IO_AWS extends nkm.io.BaseIOService {
    constructor() { super(); }

    static __SDK = null;

    _Init() {
        super._Init();

        if (!this._config) {
            this._config = {
                region: AWS.region
            };
        }

        this._api = new this.constructor.__SDK(this._config);

    }

    static get api() { return this.instance._api; }
    get api() { return this._api; }

}

module.exports = SERVER_IO_AWS;