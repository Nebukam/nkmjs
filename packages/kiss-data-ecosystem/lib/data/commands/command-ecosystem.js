'use strict';

const actions = require("@nkmjs/actions");

class EcosystemCommand extends actions.Command {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._ecosystem = null;
    }

    set ecosystem(p_value) { this._ecosystem = p_value; }
    get ecosystem() { return this._ecosystem; }

    CanExecute(p_context) {
        if (!this._ecosystem) { return false; }
        return super.CanExecute(p_context);
    }

}


module.exports = EcosystemCommand;