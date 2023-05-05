'use strict';

const u = require(`@nkmjs/utils`);
const HandlerBase = require(`./handler-base`);
const STATUSES = require("../status-codes");

class HandlerFn extends HandlerBase {
    constructor() { super(); }

    Handle() {
        try {
            u.Call(this._def.options.fn, this._req, this._res);
        } catch (e) {
            this.Abort(STATUSES.INTERNAL_SERVER_ERROR);
            throw e;
        }
    }

}

module.exports = HandlerFn;