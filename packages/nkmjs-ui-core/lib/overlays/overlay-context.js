'use strict';

const { CSYMBOL } = require(`@nkmjs/common`);

/**
 * DEFAULT_OVERLAY Context
 * @class
 * @memberof data.core.serialization
 */
class OVERLAY extends CSYMBOL{ constructor() { super(); } }

/**
 * DEFAULT_CONTENT Context
 * @class
 * @memberof data.core.serialization
 */
class CONTENT extends CSYMBOL{ constructor() { super(); } }

/**
 * DEFAULT_DRAWER Context
 * @class
 * @memberof data.core.serialization
 */
 class DRAWER extends CSYMBOL{ constructor() { super(); } }

module.exports = {
    OVERLAY:OVERLAY,
    CONTENT:CONTENT,
    DRAWER:DRAWER,
};