'use strict';

const HandlerBase = require(`./handler-base`);
const FLAGS = require(`../flags`);

class HandlerPost extends HandlerBase {
    constructor() { super(); }

    static __MODE = FLAGS.POST;

}

module.exports = HandlerPost;