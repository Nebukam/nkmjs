'use strict';

const CTX = require(`../context`);
const BaseSerializer = require(`../serializer-base`);
const JSONSerializer = require(`../serializer-json`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.s11n.BaseSerializer
 * @memberof data.core.s11n
 */
class AbstractJSONSerializer extends BaseSerializer {
    constructor() { super(); }

    static __context = CTX.JSON;
    static __master = JSONSerializer;
    
}

module.exports = AbstractJSONSerializer;