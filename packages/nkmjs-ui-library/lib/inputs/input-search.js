'use strict';

const u = require("@nkmjs/utils");
const ui = require(`@nkmjs/ui-core`);

class InputSearch extends ui.inputs.InputTextBase {
    constructor() { super(); }

    static __inputProperties = { type: 'search' };

    _Init() {
        super._Init();
    }

}

module.exports = InputSearch;
ui.Register(`nkmjs-input-search`, InputSearch);