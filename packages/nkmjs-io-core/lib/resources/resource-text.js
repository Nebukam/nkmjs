'use strict';

const u = require("@nkmjs/utils");

const Resource = require(`../resource`);
const RESPONSE_TYPE = require(`../response-type`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.Resource
 * @memberof io.core.resources
 */
class TextResource extends Resource {

    constructor() { super(); }

    static defaultType = RESPONSE_TYPE.TEXT;

    _Encode() {
        return this._content ? this._content : '';
    }

    _Decode() {

        if (u.isString(this._raw)) {
            return this._raw;
        } else if (u.isArrayBuffer(this._raw)) {
            let decoder = new TextDecoder(this._encoding);
            return decoder.decode(ArrayBuffer.isView(this._raw) ? this._raw : new DataView(this._raw, 0));
        }

        try {
            // Fallback to Blob, wrapped in try{} in case this code is
            // executed in Node
            let fileReader = new FileReaderSync();
            if (u.isInstanceOf(this._raw, Blob)) {
                return fileReader.readAsString(this._raw, this._encoding);
            } else {
                return ``;
            }
        } catch (e) {
            return ``;
        }

    }

}

module.exports = TextResource;