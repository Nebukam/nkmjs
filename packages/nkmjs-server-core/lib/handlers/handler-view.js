'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");

const base = require(`./handler-operation`);
class ViewHandler extends base {
    constructor() { super(); }

    Complete(p_output) {

        p_output.title = p_output.title || this._def.Get(`title`) || nkm.main.constructor.name;
        p_output.isAuthenticated = nkm.main.IsAuthenticated(this._req);
        p_output.user = nkm.main.GetUser(this._req);
        p_output.params = this._req.params;

        this.PostprocessLocals?.(p_output);

        //TODO: REMOVE THIS
        p_output.strLocals = JSON.stringify(p_output, null, 2);

        this._res.render(this.GetView(), p_output);
        this._OnHandled();

    }

    GetView() { return com.NFOS.GetValue(this._operation, `view`, this._def.Get(`view`)); }

    /**
     * 
     * @param {*} p_status 
     */
    Abort(p_status = null, p_message = null) {

        if (!p_status) { p_status = STATUSES.NO_RESPONSE; }

        if (u.isNumber(p_status)) { p_status = STATUSES.getStatus(p_status); }

        if (this._res) {

            let locales = {
                title: 'Error',
                isAuthenticated: nkm.main.IsAuthenticated(this._req),
                error: STATUSES.toError(p_status),
            };

            if (p_message) { locales.message = p_message; }

            this._res.render('error', locales);

        }

        this._OnHandled();

    }

}

module.exports = ViewHandler;