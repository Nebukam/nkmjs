const com = require("@nkmjs/common");
const data = require("@nkmjs/data-core");

const DataBlocExtendable = require(`./data-block-extendable`);

class DataEntry extends DataBlocExtendable {
    constructor() { super(); }

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

    get fieldValues(){ return this._fieldValues; }

    _CleanUp(){
        super._CleanUp();
        this.model = null;
        this._fieldValues = {};
    }

}

module.exports = DataEntry;
