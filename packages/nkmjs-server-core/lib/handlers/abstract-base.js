'use strict';

const com = require(`@nkmjs/common`);
const u = require(`@nkmjs/utils`);

const FLAGS = require(`../flags`);
const STATUSES = require("../status-codes");

class HandlerBase extends com.Observable {
    constructor() { super(); }

    static __MODE = null;

    _Init() {
        super._Init();
        this._req = null;
        this._res = null;
    }

    get def() { return this._def; }
    set def(p_value) { this._def = p_value; }

    get req() { return this._req; }

    get res() { return this._res; }

    /**
     * 
     * @param {*} p_req 
     * @param {*} p_res 
     * @returns 
     */
    _InternalHandle(p_req, p_res) {

        let status = this._SanitizeRequest(p_req);

        if (status !== true) {
            if (u.isNumber(status)) { status = STATUSES.getStatus(status); }
            if (!status) { status = STATUSES.BAD_REQUEST; }
            return this.Abort(status);
        }

        this._req = p_req;
        this._res = p_res;

        this.Handle();

    }

    /**
     * 
     * @param {*} p_req 
     * @returns 
     */
    _SanitizeRequest(p_req) { return true; }

    /**
     * 
     * @returns 
     */
    Handle() { return this.Abort(STATUSES.NOT_IMPLEMENTED); }

    Complete(p_response = null) {


        if (!p_response) { p_response = STATUSES.OK; }
        else if (u.isNumber(p_response)) { p_response = STATUSES.getStatus(p_status); }

        if (STATUSES.isStatus(p_response)) {
            this._res.status(p_response.code);
            this._res.send(p_response.msg);
        } else {
            this._res.status(STATUSES.OK.code);
            this._res.send(p_response);
        }

        this._OnHandled();

    }

    /**
     * 
     * @param {*} p_status 
     */
    Abort(p_status = null) {

        if (!p_status) { p_status = STATUSES.NO_RESPONSE; }

        if (u.isNumber(p_status)) { p_status = STATUSES.getStatus(p_status); }

        if (this._res) {
            this._res.status(p_status.code);
            this._res.send({ error: p_status.msg });
        }

        this._OnHandled();

    }

    _OnHandled() { this.Release(); }

    _CleanUp() {
        super._CleanUp();
        this._req = null;
        this._res = null;
        this._def = null;
    }

}

module.exports = HandlerBase;