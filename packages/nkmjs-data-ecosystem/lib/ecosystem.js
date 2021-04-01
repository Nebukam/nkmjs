'use strict';

/**
 * The goal of an ecosystem is to isolate and encapsulate
 * all data-related functionalities in a closed ecosystem such as :
 * - a field manager
 * - a model manager
 * - entries etc
 * These parts are usually singletons but it lack flexbility down the line.
 */
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const data = require(`@nkmjs/data-core`);
const actions = require("@nkmjs/actions");

const parts = require(`./parts`);

/**
 * @class
 * @augments data.DataBlock
 * @memberof ecosystem
 */
class Ecosystem extends data.DataBlock {
    constructor() { super(); }

    static __NFO__ = {
        [com.IDS.ICON]: `ecosystem`,
        [com.IDS.UID]: `@nkmjs/ecosystem:ecosystem`
    };

    _Init() {
        super._Init();

        this._fields = new parts.Fields();

        this._models = new parts.Models();

        this._entries = new parts.Entries();
        this._entries.models = this._models;

    }

    get fields() { return this._fields; }

    get models() { return this._models; }

    get entries() { return this._entries; }

    get catalog() { return this._catalog; }

    _CleanUp() {
        super._CleanUp();
    }

}

module.exports = Ecosystem;