'use strict';

const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelDelete extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return super.CanExecute(p_context);
    }

    _InternalExecute() {

        let options = {
            data: this._context
        };

        Request.Emit(ACTION_REQUEST.DELETE,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) { this._Fail(); }
    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelDelete;
