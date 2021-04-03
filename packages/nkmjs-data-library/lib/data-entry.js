'use strict';

const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const IDS = require(`./ids`);
const DataBlocExtendable = require(`./data-block-extendable`);

/**
 * @class
 * @augments ecosystem.DataBlocExtendable
 * @memberof ecosystem
 */
class DataEntry extends DataBlocExtendable {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.UID]: `@nkmjs/ecosystem:data-entry`,
        [com.IDS.ICON]: `data-entry`
    };

    _Init() {
        super._Init();
        this._model = null;
        this._fieldValues = {};
    }

    get model() { return this._model; }
    set model(p_value) {
        if (this._model === p_value) { return; }
        let oldModel = this._model;
        this._model = p_value;
    }

    get uri(){ return `${IDS.ENTRY}/${this._model._id._name}/${this._id._name}`; }

    get fieldValues() { return this._fieldValues; }

    _CleanUp() {
        super._CleanUp();
        this.model = null;
        this._fieldValues = {};
    }

}

module.exports = DataEntry;
