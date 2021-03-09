'use strict';

const { CSYMBOL } = require(`@nkmjs/common`);

/**
 * OVERLAY_LAYER Context
 * @class
 * @memberof data.core.serialization
 */
class DEFAULT_OVERLAY extends CSYMBOL{ constructor() { super(); } }

/**
 * OVERLAY_CONTENT Context
 * @class
 * @memberof data.core.serialization
 */
class DEFAULT_CONTENT extends CSYMBOL{ constructor() { super(); } }

module.exports = {
    DEFAULT_OVERLAY:DEFAULT_OVERLAY,
    DEFAULT_CONTENT:DEFAULT_CONTENT
};