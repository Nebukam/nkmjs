'use strict';

const com = require("@nkmjs/common");

const CONTEXT = require(`./lib/context`);
const fields = require(`./lib/fields`);

class Bindings extends com.helpers.BindingKit {
    constructor() { super(); }
    _Init() {
        super._Init();

        this.Add(
            {
                context: CONTEXT.FIELD_DETAILS,
                kvps: [
                    { key: fields.Array, binding: fields.DetailsArray },
                ]
            });

    }
}

module.exports = Bindings;