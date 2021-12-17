'use strict';

const com = require(`@nkmjs/common`);
const HandlerBase = require(`./handler-base`);

class HandlerPing extends HandlerBase {

    constructor() { super(); }

    Handle(){
        this._res.send(`pong`);
    }

}

module.exports = HandlerPing;