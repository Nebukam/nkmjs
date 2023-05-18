'use strict';

const com = require("@nkmjs/common");

/**
 * DEFAULT_OVERLAY Context
 * @class
 * @memberof data.core.serialization
 */
class OVERLAY extends com.CSYMBOL{ constructor() { super(); } }

/**
 * DEFAULT_CONTENT Context
 * @class
 * @memberof data.core.serialization
 */
class CONTENT extends com.CSYMBOL{ constructor() { super(); } }

module.exports = {
    OVERLAY:OVERLAY,
    CONTENT:CONTENT,
};