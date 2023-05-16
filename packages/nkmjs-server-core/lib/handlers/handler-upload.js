'use strict';

const u = require(`@nkmjs/utils`);

const STATUSES = require("../status-codes");
const ActionManager = require(`../actions/action-manager`);

const base = require(`./abstract-post`);
class HandlerUpload extends base {
    constructor() { super(); }

    _SanitizeRequest(p_req) {

        this._file = null;
        this._dir = null;

        if (!p_req.files || !p_req.files.upload) { return STATUSES.BAD_REQUEST; }

        let directory = this._def.options.directory;
        if (!directory) { return STATUSES.INTERNAL_SERVER_ERROR; }

        if (u.isString(directory)) { this._dir = directory; }
        else { this._dir = u.Call(directory, p_req); }

        if (!this._dir) { return STATUSES.INTERNAL_SERVER_ERROR; }

        this._file = p_req.files;

        return true;

    }

    Handle() {

        this._file = path.join(this._dir, `${file.name}`)

        file.mv(path.join(this._dir, `${this._file.name}`), err => {
            if (err) { return this.Abort(STATUSES.INTERNAL_SERVER_ERROR); }
            this.Complete(STATUSES.CREATED);
        });

    }

    _CleanUp() {
        this._file = null;
        this._dir = null;
        super._CleanUp();
    }

}

module.exports = HandlerUpload;