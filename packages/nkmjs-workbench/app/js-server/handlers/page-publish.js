'use strict';

const server = require(`@nkmjs/core/server`).core;

class PagePublish extends server.handlers.POST{
    constructor() { super(); }

    Handle(){
        console.log(this._req);
        this._res.send(`pong`);
        this._OnHandled();
    }

}

module.exports = PagePublish;