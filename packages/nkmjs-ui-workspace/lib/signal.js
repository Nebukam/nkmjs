'use strict';

class SIGNAL{
    constructor() {}

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static VALUE_CHANGED = Symbol(`valueChanged`);

    /**
     * @description TODO
     * @type {symbol}
     * @customtag read-only
     */
    static VALUE_COMMITTED = Symbol(`valueCommitted`);
    
}

module.exports = SIGNAL;