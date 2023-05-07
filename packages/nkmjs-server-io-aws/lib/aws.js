'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);
const LOCATION = require('./locations');

class AWS extends nkm.com.helpers.SingletonEx {
    constructor() { super(); }

    _Init() {

        super._Init();
        this._configured = false;
        this._config = null;
        this._ready = false;
        this._region = null;

    }

    static get ready() { return this.instance._ready; }
    static get region() { return this.instance._region; }

    static Configure(p_config) { this.instance._Configure(p_config); }
    _Configure(p_config) {

        if (this._configured) { return; }
        this._configured = true;

        this._config = p_config || {};

        //Set region
        let region = process.env.AWS_REGION || this._config.region || 'us-west-2';
        if (!LOCATION.LIST.includes(region)) {
            throw new Error(`'${region}' is not a valid location.`);
        }

        if (!process.env.AWS_ACCESS_KEY_ID) { throw new Error(`AWS_ACCESS_KEY_ID is undefined.`); }
        if (!process.env.AWS_SECRET_ACCESS_KEY) { throw new Error(`AWS_SECRET_ACCESS_KEY is undefined.`); }

        this._region = region;

    }

}

module.exports = AWS;