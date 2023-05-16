'use strict';

const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");
const GetterManager = require(`../getters/getter-manager`);

const base = require(`./abstract-base`);
class HandlerGetter extends base {
    constructor() { super(); }

    static __METHOD = FLAGS.GET;

    _SanitizeRequest(p_req) {
        if (!GetterManager.Has(this._def.id)) { return STATUSES.BAD_REQUEST; }
        return true;
    }

    Handle() {

        let getter = GetterManager.Get(this._def.id);
        getter.handler = this;
        getter.Execute(this._req.params,
            (p_getter) => { this.Complete(p_getter.response); },
            (p_getter) => {
                this.Abort(STATUSES.isStatus(p_getter.response) ?
                    p_getter.response : STATUSES.BAD_REQUEST);
            });

    }

}

module.exports = HandlerGetter;