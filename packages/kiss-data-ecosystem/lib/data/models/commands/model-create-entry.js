'use strict';

const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelCreateEntry extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        if (!p_context.entryCreationAllowed) { return false; }
        return super.CanExecute(p_context);
    }

    _InternalExecute() {

        let tempEntry = this._ecosystem.entries.CreateTemp(this._context),
            options = {
                data: tempEntry
            };

        Request.Emit(ACTION_REQUEST.CREATE,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        p_request.options.data.Release();
        this._Fail(`Entry creation of type ${this._context} has not been handled. Reason : ${p_request.failReason}`);
    }

    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelCreateEntry;
