'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");

const Views = require(`../views`);

const base = require(`./handler-get`);
class HandlerView extends base {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._view = null;
        this._title = null;
    }

    Complete(p_response) {

        p_response.title = p_response.title || this._def.Get(`title`);
        p_response.isAuthenticated = nkm.main.IsAuthenticated(this._req);
        p_response.user = nkm.main.GetUser(this._req);

        this._res.render(Views.Get(this._view || this._def.Get(`view`), p_response));
        this._OnHandled();
    }

    /**
     * 0
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

            this._res.render(Views.Get(Views.VIEW_ERROR), locales);

        }

        this._OnHandled();

    }

    _CleanUp() {
        this._view = null;
        this._title = null;
        this._CleanUp();
    }

}

module.exports = HandlerView;