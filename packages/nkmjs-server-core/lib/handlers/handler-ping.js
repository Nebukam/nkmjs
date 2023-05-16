'use strict';

const com = require(`@nkmjs/common`);
const FLAGS = require(`../flags`);

const base = require(`./abstract-base`);
class HandlerPing extends base {
    constructor() { super(); }

    static __METHOD = FLAGS.POST_AND_GET;

    Handle() { this.Complete(`pong`); }

}

module.exports = HandlerPing;