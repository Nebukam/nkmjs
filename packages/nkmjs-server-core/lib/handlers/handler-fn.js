'use strict';

const u = require(`@nkmjs/utils`);
const HandlerBase = require(`./handler-base`);

class HandlerFn extends HandlerBase {

    constructor() { super(); }

    Handle() {
        try {
            u.Call(this._def.options.fn, this._req, this._res);
        } catch (e) {
            this._res.sendStatus(520).end();
            throw e;
        }
    }

}

module.exports = HandlerFn;