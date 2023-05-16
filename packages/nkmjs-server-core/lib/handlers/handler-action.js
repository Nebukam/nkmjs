'use strict';

const u = require(`@nkmjs/utils`);

const STATUSES = require("../status-codes");
const ActionManager = require(`../actions/action-manager`);

const base = require(`./abstract-post`);
class HandlerAction extends base {
    constructor() { super(); }

    _SanitizeRequest(p_req) {

        let sup = super._SanitizeRequest(p_req);
        if (!sup) { return; }

        this._actionId = p_req.params.id;
        this._actionParams = p_req.body;

        // Validate model against params
        let model = ActionManager.GetModel(this._actionId);
        if (!model) { return STATUSES.BAD_REQUEST; }
        if (!this._actionParams) { return STATUSES.BAD_REQUEST; }

        //TODO: Validate model

        return true;

    }

    Handle() {
        ActionManager.Get(this._actionId)
            .Execute(this._actionParams,
                (p_action) => { this.Complete(p_action.response); },
                (p_action) => {
                    this.Abort(STATUSES.isStatus(p_action.response) ? p_action.response : STATUSES.BAD_REQUEST);
                });

    }

}

module.exports = HandlerAction;