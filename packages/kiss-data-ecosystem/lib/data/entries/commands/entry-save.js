'use strict';

const { U } = require(`@nkmjs/utils`);
const { ACTION_REQUEST, Request } = require(`@nkmjs/actions`);
const DataManipulationCommand = require(`../../commands/command-data`);

class EntrySave extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../data-entry`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return true; //p_context.editable;
    }

    _InternalExecute() {

        let options = {
            data: this._context
        };

        console.log(`Stringifyied and packed ${this._context} =`);
        console.log(JSON.stringify(this._context.Pack(), U.JSONStripEmpty, '  '));

        Request.Emit(ACTION_REQUEST.SAVE,
            options, this,
            this._OnRequestSuccess,
            this._OnRequestFail);

    }

    _OnRequestFail(p_request) {
        this._Fail(`Unhandled request. Reason : ${p_request.failReason}`);
    }

    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = EntrySave;
