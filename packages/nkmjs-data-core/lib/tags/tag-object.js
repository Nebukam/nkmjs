
'use strict';

const u = require("@nkmjs/utils");
const com = require("@nkmjs/common");
const SIGNAL = require(`../signal`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments common.pool.DisposableObject
 * @memberof data.core
 */
class TagObject extends com.pool.DisposableObjectEx {

    constructor() {
        super();
        this._name = null;
        this._uid = null;
        this._useCount = 0;
    }

    get uid() { return this._uid; }
    set uid(p_value) { this._uid = p_value; }

    get name() { return this._name; }
    set name(p_value) { this._name = p_value; }

    get useCount() { return this._useCount; }

    AddUser() {
        this._useCount++;
        this._Broadcast(SIGNAL.USE_COUNT_CHANGED, this);
    }

    RemoveUser() {
        this._useCount--;
        this._Broadcast(SIGNAL.USE_COUNT_CHANGED, this);
    }

    toString() {
        return `[☑${this._name}]`;
    }

}

module.exports = TagObject;