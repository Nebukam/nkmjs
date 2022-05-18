'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");

const DataBlock = require(`./data-block`);

class SimpleFieldDescriptor extends DataBlock {


    constructor(p_id) {
        this._id = p_id;
    }

    get id() { return this._id; }

}

module.exports = SimpleFieldDescriptor;