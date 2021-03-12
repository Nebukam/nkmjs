'use strict';

const u = require("@nkmjs/utils");
const actions = require("@nkmjs/actions");

const DataManipulationCommand = require(`../../commands/command-data`);

class ModelSave extends DataManipulationCommand {
    constructor() { super(); this._dataClass = require(`../model`); }

    CanExecute(p_context) {
        if (!p_context) { return false; }
        return super.CanExecute(p_context);
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

    _OnRequestFail(p_request) { this._Fail(); }
    _OnRequestSuccess(p_request) { this._Success(); }

}

module.exports = ModelSave;
