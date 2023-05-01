'use strict';

const server = require(`@nkmjs/core/server`).core;

class PagePublish extends server.handlers.HandlerBase{
    constructor() { super(); }

    Handle(){
        console.log(this._req);
        this._res.send(`pong`);
    }

}

module.exports = PagePublish;