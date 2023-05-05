'use strict';

const com = require(`@nkmjs/common`);

const base = require(`./handler-get`);
class HandlerPing extends base {
    constructor() { super(); }

    Handle(){
        this._res.send(`pong`);
    }

}

module.exports = HandlerPing;