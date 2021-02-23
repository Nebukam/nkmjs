'use strict';

const Model = require(`../model`);

class SystemModel extends Model {
    constructor() { super(); }

    _Init() {
        super._Init();
        this._editable = false;
    }

    _CleanUp() {
        super._CleanUp();
    }

    toString() {
        if (!this._id) {
            return `[Model::?]`;
        } else {
            return `[Model::${this._id.name}]`;
        }
    }

}

module.exports = SystemModel;