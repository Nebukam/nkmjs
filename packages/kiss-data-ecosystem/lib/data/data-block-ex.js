'use strict';

const data = require("@nkmjs/data-core");

class EcosystemDataBlock extends data.DataBlock {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._ecosystem = null;
    }

    get ecosystem() { return this._ecosystem; }
    set ecosystem(p_value) { this._ecosystem = p_value; }

    _CleanUp() {
        this._ecosystem = null;
        super._CleanUp();
    }

}

module.exports = EcosystemDataBlock;