'use strict';

const HandlerBase = require(`./abstract-base`);

const FLAGS = require(`../flags`);
const STATUSES = require(`../status-codes`);

class HandlerPost extends HandlerBase {
    constructor() { super(); }

    static __METHOD = FLAGS.POST;

    _SanitizeRequest(p_req) {
        // Ensure body is present
        if (!p_req.body) { return STATUSES.BAD_REQUEST; }
        return true;
    }

}

module.exports = HandlerPost;