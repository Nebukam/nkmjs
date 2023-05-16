'use strict';

const HandlerBase = require(`./abstract-base`);
const FLAGS = require(`../flags`);

class HandlerGet extends HandlerBase {
    constructor() { super(); }

    static __METHOD = FLAGS.GET;

}

module.exports = HandlerGet;