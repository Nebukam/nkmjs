'use strict';

const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");
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
        console.log(JSON.stringify(this._context.Pack(), u.tils.JSONStripEmpty, '  '));

        actions.Request.Emit(actions.ACTION_REQUEST.SAVE,
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
