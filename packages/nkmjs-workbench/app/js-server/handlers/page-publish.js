'use strict';

const nkm = require(`@nkmjs/core/nkmserver`);

class PagePublish extends nkm.server.handlers.POST{
    constructor() { super(); }

    Handle(){
        console.log(this._req);
        this._res.send(`pong`);
        this._OnHandled();
    }

}

module.exports = PagePublish;