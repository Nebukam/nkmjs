'use strict';

const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");
const ActionsManager = require(`../operations/manager-actions`);

const base = require(`./handler-operation`);
class ActionHandler extends base {
    constructor() { super(); }

    static __METHOD = FLAGS.POST;

    _SanitizeRequest(p_req) {
        
        this._actionId = p_req.params.id;
        if (!this._actionId) { return false; }

        return this._SanitizeAgainstNFOS(
            p_req, ActionsManager.GetNFOS(this._actionId));
            
    }

    async Handle() {

        let action = ActionsManager.Get(this._actionId);
        action.handler = this;

        return await action.Execute(this._req.params,
            (p_output) => { this.Complete(p_output); },
            (p_output) => { this.Abort(STATUSES.isStatus(p_output) ? p_output : STATUSES.BAD_REQUEST); }
        );

    }

    _CleanUp() {
        this._actionId = null;
        super._CleanUp();
    }

}

module.exports = ActionHandler;