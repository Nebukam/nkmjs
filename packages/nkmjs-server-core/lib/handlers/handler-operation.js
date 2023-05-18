'use strict';

const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");
const OperationsManager = require(`../operations/manager-operations`);

const base = require(`./abstract-base`);
class OperationHandler extends base {
    constructor() { super(); }

    _SanitizeRequest(p_req) {
        return this._SanitizeAgainstNFOS(
            p_req, OperationsManager.GetNFOS(this._def.id));
    }

    _SanitizeAgainstNFOS(p_req, p_nfos = null) {

        if (!p_nfos) { return STATUSES.BAD_REQUEST; }

        if (p_nfos.sanitize) {
            let result = p_nfos.sanitize(p_req);
            if (!result || STATUSES.isStatus(result)) { return result ? result : STATUSES.BAD_REQUEST; }
        }

        if (p_nfos.body) {
            let body = p_req.body;
            if (!body) { return STATUSES.BAD_REQUEST; }
            for (let id in p_nfos.body) {
                let conf = p_nfos.body[id];
                if (conf.optional) { continue; }
                if (!(id in body)) { return STATUSES.BAD_REQUEST; }
                if (conf.type && typeof body[id] !== conf.type) { return STATUSES.BAD_REQUEST; }
            }

            if (!p_req.params) { p_req.params = {}; }
            p_req.params.body = p_req.body;
        }

        if (p_nfos.params) {
            for (let id in p_nfos.params) {
                let def = p_nfos.params[id];
                if (!(id in p_params)) {
                    if (def.default) {
                        p_params[id] = def.default;
                        continue;
                    }
                    return STATUSES.BAD_REQUEST;
                }
            }
        }

        return true;

    }

    async Handle() {

        let operation = OperationsManager.Get(this._def.id);
        operation.handler = this;

        return await operation.Execute(this._req.params,
            (p_output) => { this.Complete(p_output); },
            (p_output) => { this.Abort(STATUSES.isStatus(p_output) ? p_output : STATUSES.BAD_REQUEST); }
        );

    }

}

module.exports = OperationHandler;