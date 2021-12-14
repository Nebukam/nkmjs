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
        if(u.isObject(this._raw)){ 
            return this._raw; 
        }else if(u.isString(this._raw)){
            return JSON.parse(this._raw)
        }else{
            var decoded = super._Decode();
            if(u.isObject(decoded)){
                return decoded;
            }else if(u.isString(decoded)){
                if(u.isEmpty(decoded)){
                    return {};
                }
                return JSON.parse(super._Decode());
            }
        }
    }

}

module.exports = JSONResource;