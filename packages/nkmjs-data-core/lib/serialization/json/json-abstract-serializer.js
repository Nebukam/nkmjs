const com = require("@nkmjs/common");

const CONTEXT = require(`../context`);
const BaseSerializer = require(`../serializer-base`);
const JSONSerializer = require(`../serializer-json`);

/**
 * @description TODO
 * @class
 * @hideconstructor
 * @augments data.core.serialization.BaseSerializer
 * @memberof data.core.serialization
 */
class AbstractJSONSerializer extends BaseSerializer {
    constructor() { super(); }

    static __context = CONTEXT.JSON;
    static __master = JSONSerializer;
    
}

module.exports = AbstractJSONSerializer;