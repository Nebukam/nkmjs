'use strict';

const com = require(`@nkmjs/common`);

class HandlerBase extends com.pool.DisposableObjectEx {

    constructor() { super(); }

    _Init() {
        super._Init();
        this._req = null;
        this._res = null;
    }

    get def() { return this._def; }
    set def(p_value) { this._def = p_value; }

    get req() { return this._req; }
    set req(p_value) { this._req = p_value; }

    get res() { return this._res; }
    set res(p_value) { this._res = p_value; }

    _InternalHandle(p_req, p_res) {
        if (!this._SanitizeRequest(p_req)) {
            p_res.sendStatus(400).end();
            return;
        }
        this._req = p_req;
        this._res = p_res;
        this.Handle();
    }

    _SanitizeRequest(p_req) {
        return true;
    }

    Handle() {
        p_res.sendStatus(400).end();
        throw new Error(`Handle not implemented.`);
    }

    _OnHandled() {
        this.Release();
    }

    Cancel() {
        if (this._res) { this._res.sendStatus(444).end(); }
        this.Release();
    }

    _CleanUp() {
        super._CleanUp();
        this._req = null;
        this._res = null;
        this._def = null;
    }

}

module.exports = HandlerBase;