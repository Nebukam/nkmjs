'use strict';

const { CommandChain } = require(`@nkmjs/actions`);

const ModelApply = require(`./model-apply`);
const ModelSave = require(`./model-save`);

class ModelApplyAndSave extends CommandChain {
    constructor() { super(); }

    set proxy(p_value) { this._cmdApply.proxy = p_value; }
    get proxy() { return this._cmdApply.proxy; }

    _Init() {
        super._Init();

        this._cmdApply = new ModelApply();
        this._cmdSave = new ModelSave();

        this._nodes.push(this._cmdApply, this._cmdSave);
    }

}

module.exports = ModelApplyAndSave;
