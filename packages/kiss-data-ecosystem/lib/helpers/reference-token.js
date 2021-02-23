'use strict';

const { DisposableObjectEx } = require(`@nkmjs/common`);

class ReferenceToken extends DisposableObjectEx {
    constructor() { super(); }

    _Init() {
        super._Init();
    }

    _CleanUp() {
        super._CleanUp();
    }

    toString() {
        if (this._id) {
            return `[${this.constructor.name}::${this._id.name}]`;
        } else {
            return `[${this.constructor.name}::]`;
        }
    }



}

module.exports = ReferenceToken;