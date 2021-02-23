'use strict';

const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelEdit extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return p_context.editable;
    }

    _InternalExecute() {

        let options = {
            data: this._context
        };

        Request.Emit(ACTION_REQUEST.EDIT,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        this._Fail(`Model editing request has not been handled. Reason : ${p_request.failReason}`);
    }

    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelEdit;
