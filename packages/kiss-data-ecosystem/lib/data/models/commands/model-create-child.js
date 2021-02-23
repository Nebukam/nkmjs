'use strict';

const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelCreateChild extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return super.CanExecute(p_context);
    }

    _InternalExecute() {

        let tempModel = this._ecosystem.models.CreateTemp(this._context),
            options = {
                data: tempModel
            };

        Request.Emit(ACTION_REQUEST.CREATE,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        p_request.options.data.Release();
        this._Fail(`Model creation from ${this._context} has not been handled. Reason : ${p_request.failReason}`);
    }

    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelCreateChild;
