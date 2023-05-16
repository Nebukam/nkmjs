'use strict';

const HandlerBase = require(`./handler-base`);
const FLAGS = require(`../flags`);

class HandlerGet extends HandlerBase {
    constructor() { super(); }

    static __MODE = FLAGS.GET;

}

module.exports = HandlerGet;