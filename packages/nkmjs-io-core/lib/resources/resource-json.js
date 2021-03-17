'use strict';

const u = require("@nkmjs/utils");

const TextResource = require(`./resource-text`);
const RESPONSE_TYPE = require(`../response-type`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.Resource
 * @memberof io.core.resources
 */
class JSONResource extends TextResource {

    constructor() { super(); }

    static defaultType = RESPONSE_TYPE.JSON;

    _Encode() {
        return u.isObject(this._content) ? JSON.stringify(this._content, null, `     `) : `{}`;
    }

    _Decode() {
        return JSON.parse(super._Decode());
    }

}

module.exports = JSONResource;