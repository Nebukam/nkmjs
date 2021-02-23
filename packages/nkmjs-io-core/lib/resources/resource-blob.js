'use strict';

const { U, PATH } = require(`@nkmjs/utils`);
const { SIGNAL } = require(`@nkmjs/common`);

const BinaryResource = require(`./resource-text`);
const RESPONSE_TYPE = require(`../response-type`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.Resource
 * @memberof io.core.resources
 */
class BlobResource extends BinaryResource {

    constructor() { super(); }

    static defaultType = RESPONSE_TYPE.BLOB;

    _Init() {
        super._Init();
        this._objectURL = null;
    }

    get objectURL() {
        if (this._objectURL) { return this._objectURL; }
        this._objectURL = URL.createObjectURL(this._content);
    }

    _Encode() {
        if (U.isInstanceOf(this._content, Blob)) { return this._content; }
        else if (this._mime) { return new Blob([this._content], { type: this._mime.type }); }
        else { return new Blob([this._content]); }
    }

    _Decode() {
        this._objectURL = null;
        if (U.isInstanceOf(this._raw, Blob)) { return this._raw; }
        else if (this._mime) { return new Blob([this._raw], { type: this._mime.type }); }
        else { return new Blob([this._raw]); }
    }

    _CleanUp() {

        if (this._objectURL) {
            URL.revokeObjectURL(this._objectURL);
            this._objectURL = null;
        }

        super._CleanUp();
    }

}

module.exports = BlobResource;