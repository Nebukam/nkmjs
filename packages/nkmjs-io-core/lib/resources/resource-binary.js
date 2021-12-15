'use strict';

const Resource = require(`../resource`);
const RESPONSE_TYPE = require(`../response-type`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments io.core.Resource
 * @memberof io.core.resources
 */
class BinaryResource extends Resource {

    constructor() { super(); }

    static __defaultType = RESPONSE_TYPE.ARRAYBUFFER;

    //TODO : Implement this

}

module.exports = BinaryResource;